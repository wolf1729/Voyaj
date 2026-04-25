"use client";

import { useState, useEffect } from "react";
import styles from "./Features.module.css";
import { Map } from "@/components/ui/map";

const mapStyles = {
  light: "https://tiles.openfreemap.org/styles/bright",
  dark: "https://tiles.openfreemap.org/styles/liberty"
};

const featuresData = [
  {
    id: 1,
    title: "Global Discovery",
    desc: "Uncover hidden gems worldwide with our advanced AI curation that matches your unique travel DNA. We analyze millions of data points to find places you'll truly love.",
    isMap: true,
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Smart Itineraries",
    desc: "Say goodbye to spreadsheets. Get beautifully crafted, minute-by-minute itineraries optimized for travel time, local hours, and your personal pacing.",
    image: "/images/feature_smart_itineraries_1777107563654.png",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Flexible Travel Modes",
    desc: "Experience the world your way. Go at your own pace with Solo trips, invite your closest friends to Private journeys, or meet new adventurers on Public expeditions.",
    image: "/images/destination_paris_1777105587504.png",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Reel to Reality",
    desc: "Add places directly to your itineraries from Instagram simply by sharing reels or posts with Voyaj. We automatically extract the location and save it to your trip.",
    image: "/images/destination_bali_1777105828082.png",
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="28" height="28">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth={2} />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth={2} />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth={3} />
      </svg>
    )
  }
];

export default function Features() {
  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((currentId) => (currentId === featuresData.length ? 1 : currentId + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [activeId]);

  return (
    <section className={styles.features}>
      <div className={styles.header}>
        <h2>Reimagining Travel</h2>
        <p>A suite of intelligent features designed to make every journey effortless and extraordinary.</p>
      </div>

      <div className={styles.accordionContainer}>
        {featuresData.map((feature) => {
          const isActive = activeId === feature.id;
          
          return (
            <div 
              key={feature.id}
              className={`${styles.panel} ${isActive ? styles.panelActive : ""}`}
              style={{ backgroundImage: feature.image ? `url('${feature.image}')` : 'none', backgroundColor: feature.isMap ? '#000000' : 'transparent' }}
              onClick={() => setActiveId(feature.id)}
            >
              {feature.isMap && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: isActive ? 1 : 0.6, transition: 'opacity 0.5s ease' }}>
                  <Map 
                    center={[-0.1276, 51.5074]} 
                    zoom={12} 
                    styles={mapStyles} 
                  />
                </div>
              )}
              
              <div className={styles.panelOverlay} style={{ zIndex: 1 }}>
                <div className={styles.verticalTitle}>{feature.title}</div>
                
                <div className={styles.panelIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.panelTitle}>{feature.title}</h3>
                <p className={styles.panelDesc}>{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
