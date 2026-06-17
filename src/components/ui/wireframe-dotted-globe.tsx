"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/* Module-level cache — survives navigation, only fetches once per session */
let geoCache: any = null;
let geoPending: Promise<any> | null = null;

interface RotatingEarthProps {
  width?: number
  height?: number
  className?: string
  highlightCountry?: string
}

export default function RotatingEarth({
  width = 800,
  height = 600,
  className = "",
  highlightCountry = "Canada",
}: RotatingEarthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    /* ── Dimensions & DPR ──────────────────────────────── */
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.5

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    /* ── Projection ────────────────────────────────────── */
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    /* ── State ─────────────────────────────────────────── */
    let countryFeatures: any = null
    let hoveredCountry: string | null = null
    let autoRotate = true
    const rotation: [number, number] = [80, -45] // Start facing Canada
    const rotationSpeed = 0.2

    /* ── Colours ───────────────────────────────────────── */
    const COLORS = {
      ocean:          "rgba(0, 0, 0, 0.25)",
      globeStroke:    "rgba(225, 6, 0, 0.35)",
      graticule:      "rgba(225, 6, 0, 0.1)",
      landFill:       "rgba(246, 244, 239, 0.06)",
      landStroke:     "rgba(246, 244, 239, 0.25)",
      highlightFill:  "rgba(225, 6, 0, 0.45)",
      highlightStroke: "rgba(225, 6, 0, 0.9)",
      highlightGlow:  "rgba(225, 6, 0, 0.3)",
      hoverFill:      "rgba(246, 244, 239, 0.15)",
      hoverStroke:    "rgba(246, 244, 239, 0.6)",
      dotDefault:     "rgba(246, 244, 239, 0.35)",
      dotHighlight:   "rgba(225, 6, 0, 0.8)",
      dotHover:       "rgba(246, 244, 239, 0.7)",
    }

    /* ── Dot generation helpers ────────────────────────── */
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === "Polygon") {
        const coords = geometry.coordinates
        if (!pointInPolygon(point, coords[0])) return false
        for (let i = 1; i < coords.length; i++) {
          if (pointInPolygon(point, coords[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    interface CountryDot {
      lng: number
      lat: number
      countryName: string
    }

    const allDots: CountryDot[] = []

    const generateDotsForFeature = (feature: any, name: string, spacing = 16) => {
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const step = spacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const pt: [number, number] = [lng, lat]
          if (pointInFeature(pt, feature)) {
            allDots.push({ lng, lat, countryName: name })
          }
        }
      }
    }

    /* ── Graticule cached outside render loop ───────────── */
    const graticule = d3.geoGraticule()
    const graticuleFeature = graticule()

    /* ── Render ─────────────────────────────────────────── */
    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const sf = currentScale / radius

      // Globe sphere
      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = COLORS.ocean
      context.fill()
      context.strokeStyle = COLORS.globeStroke
      context.lineWidth = 1.5 * sf
      context.stroke()

      if (!countryFeatures) return

      // Graticule (use cached feature — no object allocation per frame)
      context.beginPath()
      path(graticuleFeature)
      context.strokeStyle = COLORS.graticule
      context.lineWidth = 0.4 * sf
      context.stroke()

      // Draw countries in 3 passes: default → hover → highlight
      const features = countryFeatures.features

      // Pass 1: Default countries
      features.forEach((f: any) => {
        const name = f.properties.name || f.properties.NAME || ""
        if (name === highlightCountry || name === hoveredCountry) return
        context.beginPath()
        path(f)
        context.fillStyle = COLORS.landFill
        context.fill()
        context.strokeStyle = COLORS.landStroke
        context.lineWidth = 0.5 * sf
        context.stroke()
      })

      // Pass 2: Hovered country (if not the highlighted one)
      if (hoveredCountry && hoveredCountry !== highlightCountry) {
        features.forEach((f: any) => {
          const name = f.properties.name || f.properties.NAME || ""
          if (name !== hoveredCountry) return
          context.beginPath()
          path(f)
          context.fillStyle = COLORS.hoverFill
          context.fill()
          context.strokeStyle = COLORS.hoverStroke
          context.lineWidth = 1.2 * sf
          context.stroke()
        })
      }

      // Pass 3: Highlighted country (Canada) — drawn last, on top
      features.forEach((f: any) => {
        const name = f.properties.name || f.properties.NAME || ""
        if (name !== highlightCountry) return

        // Fill + border (no shadowBlur — extremely expensive on canvas)
        context.beginPath()
        path(f)
        context.fillStyle = COLORS.highlightFill
        context.fill()

        context.beginPath()
        path(f)
        context.strokeStyle = COLORS.highlightStroke
        context.lineWidth = 1.6 * sf
        context.stroke()
      })

      // Halftone dots
      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (!projected) return
        if (projected[0] < 0 || projected[0] > containerWidth) return
        if (projected[1] < 0 || projected[1] > containerHeight) return

        const isHighlight = dot.countryName === highlightCountry
        const isHover = dot.countryName === hoveredCountry
        const dotRadius = isHighlight ? 1.6 * sf : 1.1 * sf

        context.beginPath()
        context.arc(projected[0], projected[1], dotRadius, 0, 2 * Math.PI)
        context.fillStyle = isHighlight
          ? COLORS.dotHighlight
          : isHover
            ? COLORS.dotHover
            : COLORS.dotDefault
        context.fill()
      })

      // Animated pulse ring on highlighted country centroid
      const canadaFeature = features.find(
        (f: any) => (f.properties.name || f.properties.NAME) === highlightCountry
      )
      if (canadaFeature) {
        const centroid = d3.geoCentroid(canadaFeature)
        const projected = projection(centroid)
        if (projected) {
          const t = (Date.now() % 3000) / 3000
          const pulseRadius = 8 * sf + 18 * sf * t
          const pulseAlpha = 0.6 * (1 - t)
          context.beginPath()
          context.arc(projected[0], projected[1], pulseRadius, 0, 2 * Math.PI)
          context.strokeStyle = `rgba(225, 6, 0, ${pulseAlpha})`
          context.lineWidth = 2 * sf * (1 - t * 0.5)
          context.stroke()

          // Static core dot
          context.beginPath()
          context.arc(projected[0], projected[1], 4 * sf, 0, 2 * Math.PI)
          context.fillStyle = "rgba(225, 6, 0, 0.9)"
          context.fill()
          context.strokeStyle = "rgba(246, 244, 239, 0.8)"
          context.lineWidth = 1.5 * sf
          context.stroke()
        }
      }
    }

    /* ── Hit testing ────────────────────────────────────── */
    const getCountryAtPoint = (clientX: number, clientY: number): string | null => {
      if (!countryFeatures) return null
      const rect = canvas.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const coords = projection.invert?.([x, y])
      if (!coords) return null

      for (const feature of countryFeatures.features) {
        if (d3.geoContains(feature, coords)) {
          return feature.properties.name || feature.properties.NAME || null
        }
      }
      return null
    }

    /* ── Load data (cached) ────────────────────────────── */
    let cancelled = false;
    const loadWorldData = async () => {
      try {
        if (geoCache) {
          countryFeatures = geoCache;
        } else {
          setIsLoading(true)
          if (!geoPending) {
            geoPending = fetch(
              "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/cultural/ne_110m_admin_0_countries.json"
            ).then((r) => { if (!r.ok) throw new Error("Failed"); return r.json(); })
          }
          const data = await geoPending;
          if (cancelled) return;
          geoCache = data;
          countryFeatures = data;
        }

        // Generate dots per country
        countryFeatures.features.forEach((feature: any) => {
          const name = feature.properties.name || feature.properties.NAME || "Unknown"
          const isHighlighted = name === highlightCountry
          generateDotsForFeature(feature, name, isHighlighted ? 12 : 18)
        })

        render()
        setIsLoading(false)
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load map data")
          setIsLoading(false)
        }
      }
    }

    /* ── Auto-rotation ─────────────────────────────────── */
    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += rotationSpeed
        projection.rotate(rotation)
      }
      render() // Always render for the pulse animation
    })

    /* ── Drag interaction ──────────────────────────────── */
    let isDragging = false

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        rotation[0] = startRotation[0] + dx * 0.4
        rotation[1] = startRotation[1] - dy * 0.4
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
      }

      const handleMouseUp = () => {
        isDragging = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => { autoRotate = true }, 2000)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    /* ── Hover interaction ─────────────────────────────── */
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) return
      const country = getCountryAtPoint(event.clientX, event.clientY)

      if (country !== hoveredCountry) {
        hoveredCountry = country
        canvas.style.cursor = country ? "pointer" : "grab"

        // Tooltip
        const tooltip = tooltipRef.current
        if (tooltip) {
          if (country) {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            tooltip.textContent = country
            tooltip.style.opacity = "1"
            tooltip.style.left = `${x}px`
            tooltip.style.top = `${y - 36}px`
          } else {
            tooltip.style.opacity = "0"
          }
        }
      }
    }

    /* ── Click interaction ─────────────────────────────── */
    const handleClick = (event: MouseEvent) => {
      const country = getCountryAtPoint(event.clientX, event.clientY)
      if (country) {
        // Spin to clicked country
        const feature = countryFeatures?.features.find(
          (f: any) => (f.properties.name || f.properties.NAME) === country
        )
        if (feature) {
          autoRotate = false
          const centroid = d3.geoCentroid(feature)
          const targetRotation: [number, number] = [-centroid[0], -centroid[1]]

          const startRot = [...rotation] as [number, number]
          const duration = 1200
          const startTime = Date.now()

          const animate = () => {
            const elapsed = Date.now() - startTime
            const t = Math.min(1, elapsed / duration)
            // Ease out cubic
            const ease = 1 - Math.pow(1 - t, 3)

            rotation[0] = startRot[0] + (targetRotation[0] - startRot[0]) * ease
            rotation[1] = startRot[1] + (targetRotation[1] - startRot[1]) * ease
            projection.rotate(rotation)

            if (t < 1) {
              requestAnimationFrame(animate)
            } else {
              setTimeout(() => { autoRotate = true }, 3000)
            }
          }
          animate()
        }
      }
    }

    /* ── Zoom interaction ──────────────────────────────── */
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const sf = event.deltaY > 0 ? 0.95 : 1.05
      const newScale = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * sf))
      projection.scale(newScale)
    }

    /* ── Touch support ─────────────────────────────────── */
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return
      autoRotate = false
      const touch = event.touches[0]
      const startX = touch.clientX
      const startY = touch.clientY
      const startRotation: [number, number] = [...rotation]

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        const t = e.touches[0]
        const dx = t.clientX - startX
        const dy = t.clientY - startY
        rotation[0] = startRotation[0] + dx * 0.4
        rotation[1] = startRotation[1] - dy * 0.4
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
      }

      const handleTouchEnd = () => {
        canvas.removeEventListener("touchmove", handleTouchMove)
        canvas.removeEventListener("touchend", handleTouchEnd)
        setTimeout(() => { autoRotate = true }, 2000)
      }

      canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
      canvas.addEventListener("touchend", handleTouchEnd)
    }

    /* ── Bind events ───────────────────────────────────── */
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("click", handleClick)
    canvas.addEventListener("wheel", handleWheel, { passive: false })
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    canvas.style.cursor = "grab"

    loadWorldData()

    return () => {
      cancelled = true;
      rotationTimer.stop()
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("click", handleClick)
      canvas.removeEventListener("wheel", handleWheel)
      canvas.removeEventListener("touchstart", handleTouchStart)
    }
  }, [width, height, highlightCountry])

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="text-center">
          <p style={{ color: "#e10600", fontWeight: 600, marginBottom: 8 }}>Error loading Earth visualization</p>
          <p style={{ color: "#888", fontSize: 14 }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "2px solid #e10600",
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      )}

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.15s ease",
          background: "rgba(11, 11, 12, 0.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(225, 6, 0, 0.4)",
          color: "#f6f4ef",
          padding: "5px 12px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{ maxWidth: "100%", height: "auto", display: "block", willChange: "transform" }}
      />
    </div>
  )
}
