import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Destinations from "@/components/sections/Destinations";
import Features from "@/components/sections/Features";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
