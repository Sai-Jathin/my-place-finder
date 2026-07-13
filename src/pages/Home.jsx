import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Bengaluru",
    label: "Bengaluru",
    tagline: "Silicon Valley of India",
    images: [
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=2000&q=90&fm=jpg&fit=crop",
      "https://images.unsplash.com/photo-1572879023364-ab4f53e9d5fa?w=2000&q=90&fm=jpg&fit=crop",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=2000&q=90&fm=jpg&fit=crop",
    ],
    locked: false,
  },
  {
    name: "Chennai",
    label: "Chennai",
    tagline: "Gateway of South India",
    images: [
      "https://images.unsplash.com/photo-1582651957983-56e9d6062e1c?w=2000&q=90&fm=jpg&fit=crop",
      "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=2000&q=90&fm=jpg&fit=crop",
    ],
    locked: true,
  },
  {
    name: "Hyderabad",
    label: "Hyderabad",
    tagline: "City of Nizams",
    images: [
      "https://images.unsplash.com/photo-1533461502717-83546f485d24?w=2000&q=90&fm=jpg&fit=crop",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2000&q=90&fm=jpg&fit=crop",
    ],
    locked: true,
  },
  {
    name: "Goa",
    label: "Goa",
    tagline: "Pearl of the Orient",
    images: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=2000&q=90&fm=jpg&fit=crop",
      "https://images.unsplash.com/photo-1587922546307-776227941871?w=2000&q=90&fm=jpg&fit=crop",
    ],
    locked: true,
  },
];

const heroImages = [
  "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=2400&q=90&fm=jpg&fit=crop", // adventure (hiking/mountain)
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2400&q=90&fm=jpg&fit=crop", // forest & water (waterfall in forest)
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=2400&q=90&fm=jpg&fit=crop", // resort (pool/luxury stay)
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90&fm=jpg&fit=crop", // food (spread of dishes)
  "https://images.unsplash.com/photo-1549366021-9f761d450615?w=2400&q=90&fm=jpg&fit=crop", // animals (wildlife)
];

export default function Home() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);
  const [citySearch, setCitySearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 500);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: fade ? 1 : 0,
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 sm:px-12 py-5">
          <div className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl">📍</span>
            <span className="text-white font-black text-2xl sm:text-3xl tracking-tight">JustSpin</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-8">
            <button className="text-white opacity-80 hover:opacity-100 text-base sm:text-lg font-medium hidden sm:block transition-all">About</button>
            <button className="text-white opacity-80 hover:opacity-100 text-base sm:text-lg font-medium hidden sm:block transition-all">Cities</button>
            <button
              className="bg-white text-gray-900 font-bold text-base sm:text-lg px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:shadow-lg transition-all"
            >
              Sign up
            </button>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="px-4 pt-10 sm:pt-14">
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Search your city"
              className="w-full bg-white rounded-full py-5 sm:py-6 pl-8 pr-16 text-gray-800 placeholder-gray-400 text-base sm:text-lg outline-none shadow-lg"
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center px-4 pt-10 sm:pt-14 pb-12 sm:pb-20">
          <h1 className="text-6xl sm:text-8xl font-black text-white mb-6 leading-tight">
            Find your<br />
            <span style={{ color: "#06B6D4" }}>Perfect spot</span>
          </h1>
        </div>

        {/* City Cards */}
        <div className="px-4 sm:px-12 pb-16">
          <p className="text-white opacity-60 text-sm sm:text-base font-bold uppercase tracking-widest text-center mb-8">
            Choose your city
          </p>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {cities.map((city) => (
              <button
                key={city.name}
                onClick={() => !city.locked && navigate(`/city/${city.name}`)}
                disabled={city.locked}
                className="relative rounded-2xl overflow-hidden text-left transition-all hover:scale-105"
                style={{ aspectRatio: "2 / 3", opacity: city.locked ? 0.6 : 1 }}
              >
                {/* City background image */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${city.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)" }}
                />
                {/* Text */}
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="text-white font-black text-2xl leading-tight">{city.label}</p>
                  <p className="text-white opacity-60 text-sm">{city.tagline}</p>
                </div>
                {/* Soon badge */}
                {city.locked && (
                  <div className="absolute top-4 right-4 bg-white bg-opacity-20 text-white text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    Soon
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Image dots */}
        <div className="flex justify-center gap-2 pb-8">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === currentImage ? "white" : "rgba(255,255,255,0.4)" }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}