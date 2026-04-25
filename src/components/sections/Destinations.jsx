import Image from "next/image";

export default function Destinations() {
  return (
    <section className="destinations" id="destinations">
      <div className="container">
        <div className="section-header">
          <h2>Popular Destinations</h2>
          <p>Explore the most sought-after locations curated by our AI</p>
        </div>
        <div className="destination-grid">
          <div className="destination-card">
            <Image 
              src="/images/destination_paris_1777105587504.png" 
              alt="Paris" 
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="destination-info">
              <h3>Paris, France</h3>
            </div>
          </div>
          <div className="destination-card">
            <Image 
              src="/images/destination_japan_1777105670394.png" 
              alt="Kyoto" 
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="destination-info">
              <h3>Kyoto, Japan</h3>
            </div>
          </div>
          <div className="destination-card">
            <Image 
              src="/images/destination_bali_1777105828082.png" 
              alt="Bali" 
              width={600}
              height={400}
              className="object-cover"
            />
            <div className="destination-info">
              <h3>Bali, Indonesia</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
