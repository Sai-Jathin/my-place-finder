import { useState } from "react";

const allPlaces = [
  { name: "The Romantic Garden", type: "Restaurant", category: "Food", budget: "Under ₹1000", emoji: "🌹", rating: 4.8, area: "Koramangala", price: "₹800 for two" },
  { name: "Candle Light Cafe", type: "Cafe", category: "Food", budget: "₹1000–₹2500", emoji: "🕯️", rating: 4.5, area: "Indiranagar", price: "₹1500 for two" },
  { name: "Sunset Rooftop", type: "Restaurant", category: "Food", budget: "₹2500+", emoji: "🌅", rating: 4.7, area: "MG Road", price: "₹2800 for two" },
  { name: "Chill Brew", type: "Cafe", category: "Food", budget: "Under ₹1000", emoji: "☕", rating: 4.3, area: "HSR Layout", price: "₹500 for two" },
  { name: "Beats & Beans", type: "Cafe", category: "Food", budget: "₹1000–₹2500", emoji: "🎵", rating: 4.6, area: "Koramangala", price: "₹1200 for two" },
  { name: "Family Feast", type: "Restaurant", category: "Food", budget: "₹1000–₹2500", emoji: "🍽️", rating: 4.5, area: "Jayanagar", price: "₹1200 for two" },
  { name: "Cubbon Park", type: "Park", category: "Nature", budget: "Under ₹1000", emoji: "🌳", rating: 4.6, area: "Cubbon Park", price: "Free" },
  { name: "Lumbini Gardens", type: "Park", category: "Nature", budget: "Under ₹1000", emoji: "🎠", rating: 4.3, area: "Hebbal", price: "₹400 for two" },
  { name: "The Lazy Hammock", type: "Park", category: "Nature", budget: "Under ₹1000", emoji: "🌿", rating: 4.1, area: "Whitefield", price: "₹200 for two" },
  { name: "Trek Zone", type: "Adventure", category: "Adventure", budget: "₹1000–₹2500", emoji: "🧗", rating: 4.7, area: "Nandi Hills", price: "₹1200 for two" },
  { name: "Rapids River Camp", type: "Adventure", category: "Adventure", budget: "₹2500+", emoji: "🏄", rating: 4.9, area: "Coorg", price: "₹3000 for two" },
  { name: "Cycle Trail Park", type: "Adventure", category: "Adventure", budget: "Under ₹1000", emoji: "🚵", rating: 4.2, area: "Cubbon Park", price: "₹300 for two" },
  { name: "Tipu Sultan's Fort", type: "Heritage", category: "Heritage", budget: "Under ₹1000", emoji: "🏰", rating: 4.5, area: "City Center", price: "₹30 for two" },
  { name: "ISKCON Temple", type: "Heritage", category: "Heritage", budget: "Under ₹1000", emoji: "🛕", rating: 4.8, area: "Rajajinagar", price: "Free" },
  { name: "Bangalore Palace", type: "Heritage", category: "Heritage", budget: "₹1000–₹2500", emoji: "👑", rating: 4.4, area: "Palace Grounds", price: "₹600 for two" },
];

const glassCard = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(37,99,235,0.3)",
};

const blue = "linear-gradient(to right, #2563EB, #3B82F6)";
const cyan = "linear-gradient(to right, #06B6D4, #0891b2)";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [city, setCity] = useState("Bengaluru");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const categories = [
    { label: "Nature", emoji: "🌿" },
    { label: "Adventure", emoji: "🏕️" },
    { label: "Food", emoji: "🍽️" },
    { label: "Heritage", emoji: "🏛️" },
  ];

  const budgets = ["Under ₹1000", "₹1000–₹2500", "₹2500+"];

  const cities = [
    { name: "Bengaluru", locked: false },
    { name: "Chennai", locked: true },
    { name: "Hyderabad", locked: true },
    { name: "Goa", locked: true },
  ];

  const pillBase = "px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white border-opacity-10 text-white opacity-60 bg-white bg-opacity-10";
  const pillActive = "px-4 py-2 rounded-full text-sm font-semibold transition-all text-white";

  const handleFind = () => {
    const filtered = allPlaces.filter((place) => {
      if (selectedCategory && place.category !== selectedCategory) return false;
      if (selectedBudget && place.budget !== selectedBudget) return false;
      return true;
    });
    setResults(filtered);
    setSearched(true);
    setSpinResult(null);
  };

  const handleSpin = () => {
    setSpinning(true);
    setSpinResult(null);
    setSearched(false);
    setTimeout(() => {
      const random = allPlaces[Math.floor(Math.random() * allPlaces.length)];
      setSpinResult(random);
      setSpinning(false);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedBudget(null);
    setCity("Bengaluru");
    setResults([]);
    setSearched(false);
    setSpinResult(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#0F172A" }}>
      <div className="max-w-lg mx-auto px-4 pb-12">

        {/* Header */}
        <div className="text-center pt-10 pb-6">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">
            📍 PlaceFinder
          </h1>
          <p className="text-white opacity-60 text-sm sm:text-base font-medium">
            Find places that match your mood & budget
          </p>
        </div>

        {/* Spin / Discover Toggle */}
        <div className="flex gap-2 p-1 rounded-full mb-4" style={glassCard}>
          <button
            onClick={handleSpin}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white"
            style={{ background: blue }}
          >
            🎲 Spin
          </button>
          <button
            onClick={handleFind}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white opacity-60"
          >
            🔍 Discover
          </button>
        </div>

        {/* City Card */}
        <div className="rounded-2xl p-4 mb-3" style={glassCard}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#06B6D4" }}>
            🏙️ City
          </p>
          <div className="flex gap-2 flex-wrap">
            {cities.map((c) => (
              <button
                key={c.name}
                onClick={() => !c.locked && setCity(c.name)}
                disabled={c.locked}
                className={`${city === c.name ? pillActive : pillBase} ${c.locked ? "opacity-30 cursor-not-allowed" : ""}`}
                style={city === c.name ? { background: blue } : {}}
              >
                {c.name}
                {c.locked && (
                  <span className="ml-1.5 text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full">
                    Soon
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category Card */}
        <div className="rounded-2xl p-4 mb-3" style={glassCard}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#06B6D4" }}>
            🗺️ Where do you want to go?
          </p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(
                  selectedCategory === cat.label ? null : cat.label
                )}
                className={selectedCategory === cat.label ? pillActive : pillBase}
                style={selectedCategory === cat.label ? { background: blue } : {}}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Card */}
        <div className="rounded-2xl p-4 mb-5" style={glassCard}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#06B6D4" }}>
            💰 Budget
          </p>
          <div className="flex gap-2 flex-wrap">
            {budgets.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBudget(selectedBudget === b ? null : b)}
                className={selectedBudget === b ? pillActive : pillBase}
                style={selectedBudget === b ? { background: blue } : {}}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase"
            style={{ background: cyan }}
          >
            {spinning ? "🌀 Spinning..." : "🎲 Spin The Wheel"}
          </button>
          <button
            onClick={handleFind}
            className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase"
            style={{ background: blue }}
          >
            🔵 Find My Spot
          </button>
        </div>

        {/* Spin Result Card */}
        {spinResult && (
          <div className="rounded-2xl overflow-hidden mb-4" style={glassCard}>
            <div className="px-4 pt-4 pb-1">
              <span
                className="text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: blue }}
              >
                🎯 Your Pick
              </span>
            </div>
            <div className="flex items-start gap-3 p-4">
              <div className="flex-1">
                <h2 className="text-white font-black text-2xl leading-tight mb-2">
                  {spinResult.name}
                </h2>
                <p className="text-sm mb-1" style={{ color: "#06B6D4" }}>
                  ⭐ {spinResult.rating} · {spinResult.type} · {spinResult.price}
                </p>
                <p className="text-white opacity-50 text-xs mb-4">
                  📍 {spinResult.area}
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold"
                    style={{ background: cyan }}
                  >
                    🗺️ View on Map
                  </button>
                  <button
                    className="px-4 py-2 rounded-xl text-white text-xs font-bold"
                    style={{ background: blue }}
                  >
                    ✍️ Review
                  </button>
                </div>
              </div>
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                {spinResult.emoji}
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={handleSpin}
                className="w-full py-2.5 rounded-xl text-white text-sm font-bold opacity-60"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                🔄 Spin Again
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {searched && (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#3B82F6" }}>
                ✨ {results.length} {results.length === 1 ? "Spot" : "Spots"} Found
              </p>
              <button
                onClick={handleReset}
                className="text-white opacity-60 text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                Reset ↺
              </button>
            </div>

            {results.length === 0 ? (
              <div className="rounded-2xl p-8 text-center" style={glassCard}>
                <p className="text-4xl mb-3">😕</p>
                <p className="text-white font-bold">No spots found</p>
                <p className="text-white opacity-50 text-sm mt-1">
                  Try different filters!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {results.map((place, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden"
                    style={glassCard}
                  >
                    <div className="px-4 pt-4 pb-1">
                      <span
                        className="text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
                        style={{ background: cyan }}
                      >
                        ✨ Top Pick
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-4">
                      <div className="flex-1">
                        <h2 className="text-white font-black text-xl leading-tight mb-2">
                          {place.name}
                        </h2>
                        <p className="text-sm mb-1" style={{ color: "#06B6D4" }}>
                          ⭐ {place.rating} · {place.type} · {place.price}
                        </p>
                        <p className="text-white opacity-50 text-xs mb-4">
                          📍 {place.area}
                        </p>
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 rounded-xl text-white text-xs font-bold"
                            style={{ background: cyan }}
                          >
                            🗺️ View on Map
                          </button>
                          <button
                            className="px-4 py-2 rounded-xl text-white text-xs font-bold"
                            style={{ background: blue }}
                          >
                            ✍️ Review
                          </button>
                        </div>
                      </div>
                      <div
                        className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.08)" }}
                      >
                        {place.emoji}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="text-center pt-10 text-white opacity-20 text-xs">
          Built with React & Tailwind 🚀
        </div>

      </div>
    </div>
  );
}

export default Home;