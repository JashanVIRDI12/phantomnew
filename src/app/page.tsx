import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Stats from "@/components/Stats";
import Run from "@/components/Run";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Fleet />
        <Stats />
        <Run />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
