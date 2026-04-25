import Image from "next/image";
import WaitlistForm from "../ui/WaitlistForm";

export default function Hero() {
  return (
    <>
      <div className="hero-bg-wrapper">
        <Image 
          src="/images/hero_travel_bg_1777105564032.png" 
          alt="Travel Landscape" 
          fill
          priority
          className="hero-bg object-cover" 
        />
      </div>
      <div className="hero-overlay"></div>
      <section className="hero">
        <div className="badge">
          🌍 Exclusive Early Access
        </div>
        
        <h1 className="hero-title">
          Discover the unmapped.<br />
          Experience the world.
        </h1>
        
        <p className="hero-subtitle">
          Voyaj is your ultimate AI travel companion. Seamlessly discover breathtaking destinations, craft personalized itineraries, and embark on solo, private, or public journeys—all from one app.
        </p>

        <WaitlistForm />
      </section>
    </>
  );
}
