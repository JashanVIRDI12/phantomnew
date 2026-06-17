import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Nav />
      {/* pt uses mobile nav height on small screens, desktop nav height on md+ */}
      <main className="pt-(--nav-h-mobile) md:pt-(--nav-h)">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
