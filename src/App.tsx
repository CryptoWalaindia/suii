
import { useState, useRef, useEffect } from "react";

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setContactOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white text-black font-sans selection:bg-black selection:text-white">

      {/* Header */}
      <header style={{ overflow: "visible", position: "relative", zIndex: 10 }} className="w-full flex justify-between items-center px-12 md:px-24 py-6 border-b border-gray-200">

        {/* CONTACT button + dropdown */}
        <div ref={contactRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setContactOpen(o => !o); setAboutOpen(false); }}
            className="text-base md:text-lg font-semibold tracking-wide hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none outline-none"
          >
            CONTACT
          </button>

          {contactOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
              padding: "16px 24px",
              minWidth: "220px",
              zIndex: 9999,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#374151" }}>
                <a
                  href="mailto:support@cryptowala.com"
                  style={{ display: "block", color: "#374151", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#000")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
                >
                  support@cryptowala.com
                </a>
                <a
                  href="tel:+918005550199"
                  style={{ display: "block", color: "#374151", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#000")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
                >
                  +91 (800) 555-0199
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ABOUT button + dropdown */}
        <div ref={aboutRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setAboutOpen(o => !o); setContactOpen(false); }}
            className="text-base md:text-lg font-semibold tracking-wide hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none outline-none"
          >
            ABOUT
          </button>

          {aboutOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
              padding: "20px 24px",
              minWidth: "280px",
              maxWidth: "320px",
              zIndex: 9999,
              textAlign: "right",
            }}>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6", marginBottom: "12px" }}>
                CryptoWala is an INDIAN platform built to make Bitcoin simple, trusted, and accessible for everyone.
              </p>
              <p style={{ fontSize: "14px", color: "#374151", lineHeight: "1.6" }}>
                We're on a mission to educate, empower, and turn India into a global Bitcoin and Crypto hub.
              </p>
            </div>
          )}
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 animate-fade-in-up -mt-8 md:-mt-16">
        <div className="flex flex-col items-center justify-center gap-0">
          <img src="/images/logo.svg" alt="CryptoWala Logo" className="h-56 md:h-80 w-auto object-contain" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.3em] text-gray-900 ml-4 mt-2">
            CRYPTOWALA
          </h1>
        </div>
        <p className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-gray-800 mt-4">
          Application Launching Soon
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full text-center px-4 py-8 animate-fade-in delay-200">
        <div className="flex flex-col items-center justify-center gap-3 text-xs md:text-sm font-bold tracking-wide text-gray-900">

          {/* FIU Badge */}
          <p>🛡️ FIU-IND REGISTERED</p>

          <p>©2025 - 2026. CRYPTOWALA.</p>
          <div className="flex gap-4 uppercase">
            <span>ALL RIGHTS RESERVED.</span>
            <a href="/T&C CryptoWala.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">LEGAL.</a>
            <a href="/Privacy Policy CryptoWala.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">PRIVACY.</a>
            <a href="/Risk_Disclosure_CryptoWala.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">RISK.</a>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
