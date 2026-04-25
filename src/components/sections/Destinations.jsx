export default function Destinations() {
  return (
    <section className="destinations">
      <div className="section-header">
        <h2 className="section-title">Trending Escapes</h2>
        <p className="section-desc">
          From the vibrant streets of Tokyo to the tranquil beaches of Bali, Voyaj unlocks experiences that go beyond the guidebook.
        </p>
      </div>
      
      <div className="dest-grid">
        <div className="dest-card">
          <img src="/images/destination_paris_1777105587504.png" alt="Paris" />
          <div className="dest-overlay">
            <span className="dest-country">France</span>
            <h3 className="dest-name">Paris</h3>
          </div>
        </div>

        <div className="dest-card">
          <img src="/images/destination_japan_1777105670394.png" alt="Kyoto" />
          <div className="dest-overlay">
            <span className="dest-country">Japan</span>
            <h3 className="dest-name">Kyoto</h3>
          </div>
        </div>

        <div className="dest-card">
          <img src="/images/destination_bali_1777105828082.png" alt="Bali" />
          <div className="dest-overlay">
            <span className="dest-country">Indonesia</span>
            <h3 className="dest-name">Bali</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
