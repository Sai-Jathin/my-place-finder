import { useLocation, useNavigate } from "react-router-dom";

const allPlaces = [
  { name: "The Romantic Garden", type: "Restaurant", mood: "Romantic", budget: "High", emoji: "🌹", rating: 4.8, area: "Koramangala" },
  { name: "Candle Light Cafe", type: "Cafe", mood: "Romantic", budget: "Medium", emoji: "🕯️", rating: 4.5, area: "Indiranagar" },
  { name: "Sunset Rooftop", type: "Restaurant", mood: "Romantic", budget: "High", emoji: "🌅", rating: 4.7, area: "MG Road" },
  { name: "Chill Brew", type: "Cafe", mood: "Chill", budget: "Low", emoji: "☕", rating: 4.3, area: "HSR Layout" },
  { name: "The Lazy Hammock", type: "Park", mood: "Chill", budget: "Low", emoji: "🌿", rating: 4.1, area: "Whitefield" },
  { name: "Beats & Beans", type: "Cafe", mood: "Chill", budget: "Medium", emoji: "🎵", rating: 4.6, area: "Koramangala" },
  { name: "Trek Zone", type: "Adventure", mood: "Adventure", budget: "Medium", emoji: "🧗", rating: 4.7, area: "Nandi Hills" },
  { name: "Rapids River Camp", type: "Adventure", mood: "Adventure", budget: "High", emoji: "🏄", rating: 4.9, area: "Coorg" },
  { name: "Cycle Trail Park", type: "Park", mood: "Adventure", budget: "Low", emoji: "🚵", rating: 4.2, area: "Cubbon Park" },
  { name: "Fun World", type: "Adventure", mood: "Family", budget: "Medium", emoji: "🎡", rating: 4.4, area: "Mysore Road" },
  { name: "Lumbini Gardens", type: "Park", mood: "Family", budget: "Low", emoji: "🎠", rating: 4.3, area: "Hebbal" },
  { name: "Family Feast", type: "Restaurant", mood: "Family", budget: "Medium", emoji: "🍽️", rating: 4.5, area: "Jayanagar" },
];

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const { mood, budget, city } = location.state || {};

  const filtered = allPlaces.filter((place) => {
    if (mood && place.mood !== mood) return false;
    if (budget && place.budget !== budget) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-6">
        <button
          onClick={() => navigate("/")}
          className="text-white font-medium mb-4 flex items-center gap-2 hover:opacity-80"
        >
          ← Back to Search
        </button>
        <h1 className="text-3xl font-bold text-white">
          {filtered.length} Places Found
        </h1>
        <p className="text-white opacity-80 mt-1">
          {mood && `Mood: ${mood}`} {budget && `• Budget: ${budget}`} {city && `• ${city}`}
        </p>
      </div>

      {/* Results Grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">😕</p>
            <p className="text-xl text-gray-500">No places found for your filters</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-orange-400 text-white px-6 py-3 rounded-xl font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((place, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition-all"
              >
                {/* Emoji */}
                <div className="text-5xl">{place.emoji}</div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{place.name}</h2>
                  <p className="text-gray-500 text-sm">{place.type} • {place.area}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
                      {place.mood}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                      {place.budget} Budget
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-400">⭐ {place.rating}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Results;