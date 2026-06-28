import { useState } from "react";
import { searchPlaces, getPlaceDetails } from "../services/places";

const glassCard = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(37,99,235,0.3)",
};

const blue = "linear-gradient(to right, #2563EB, #3B82F6)";
const cyan = "linear-gradient(to right, #06B6D4, #0891b2)";

function ReviewModal({ place, onClose }) {
  const [reviews, setReviews] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  useState(() => {
    async function fetchReviews() {
      const details = await getPlaceDetails(place.placeId);
      setReviews(details?.reviews || []);
      setLoadingReviews(false);
    }
    fetchReviews();
  }, [place.placeId]);

  const handleSubmitReview = () => {
    if (!userReview.trim()) return;
    const newReview = {
      author_name: "You",
      rating: userRating,
      text: userReview,
      time: Date.now(),
    };
    setUserReviews([newReview, ...userReviews]);
    setUserReview("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden"
        style={{
          background: "#0F172A",
          border: "1px solid rgba(37,99,235,0.3)",
          maxHeight: "85vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white border-opacity-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-black text-xl mb-1">{place.name}</h2>
              <p className="text-sm" style={{ color: "#06B6D4" }}>
                {place.rating} stars · {place.totalRatings} reviews
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white opacity-50 hover:opacity-100 text-xl font-bold ml-4"
            >
              X
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>

          {/* Write review */}
          <div className="p-5 border-b border-white border-opacity-10">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#06B6D4" }}
            >
              Write Your Review
            </p>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
  <button
    key={star}
    onClick={() => setUserRating(star)}
    className="text-3xl transition-all"
    style={{
      color: star <= userRating ? "#FFD700" : "#4B5563",
      transform: star <= userRating ? "scale(1.1)" : "scale(1)",
      transition: "all 0.15s ease",
    }}
  >
    ★
  </button>
))}
              <span className="text-white opacity-50 text-sm ml-2 self-center">
                {userRating}/5
              </span>
            </div>
            <textarea
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
              placeholder="Share your experience..."
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none resize-none mb-3"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            />
            <button
              onClick={handleSubmitReview}
              className="w-full py-3 rounded-xl text-white text-sm font-bold"
              style={{
                background: submitted ? "rgba(16,185,129,0.8)" : blue,
              }}
            >
              {submitted ? "Review Submitted!" : "Submit Review"}
            </button>
          </div>

          {/* Your reviews */}
          {userReviews.length > 0 && (
            <div className="p-5 border-b border-white border-opacity-10">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#06B6D4" }}
              >
                Your Reviews
              </p>
              <div className="flex flex-col gap-3">
                {userReviews.map((review, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(37,99,235,0.15)",
                      border: "1px solid rgba(37,99,235,0.3)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: blue }}
                      >
                        Y
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold">You</p>
                        <p className="text-xs flex gap-0.5">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      style={{ color: star <= review.rating ? "#FFD700" : "#4B5563" }}
    >
      ★
    </span>
  ))}
</p>
                      </div>
                    </div>
                    <p className="text-white opacity-70 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Google reviews */}
          <div className="p-5">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#06B6D4" }}
            >
              Google Reviews
            </p>
            {loadingReviews ? (
              <p className="text-white opacity-50 text-sm text-center py-6">
                Loading reviews...
              </p>
            ) : reviews && reviews.length > 0 ? (
              <div className="flex flex-col gap-3">
                {reviews.map((review, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: cyan }}
                      >
                        {review.author_name?.charAt(0) || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-bold truncate">
                          {review.author_name}
                        </p>
                        <p className="text-xs flex gap-0.5 items-center">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      style={{ color: star <= review.rating ? "#FFD700" : "#4B5563" }}
    >
      ★
    </span>
  ))}
  <span className="text-white opacity-40 ml-2">
    {review.relative_time_description}
  </span>
</p>
                      </div>
                    </div>
                    <p className="text-white opacity-70 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white opacity-50 text-sm text-center py-6">
                No Google reviews found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceCard({ place, isSpinResult, onReview, onSpin }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={glassCard}>
      <div className="px-4 pt-4 pb-1">
        <span
          className="text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider"
          style={{ background: isSpinResult ? blue : cyan }}
        >
          {isSpinResult ? "Your Pick" : "Top Pick"}
        </span>
      </div>
      <div className="flex items-start gap-3 p-4">
        <div className="flex-1">
          <h2 className="text-white font-black text-xl leading-tight mb-2">
            {place.name}
          </h2>
          <p className="text-sm mb-1" style={{ color: "#06B6D4" }}>
            {place.rating} stars
            {place.totalRatings > 0 && (
              <span className="text-white opacity-40 ml-1">
                ({place.totalRatings} reviews)
              </span>
            )}
            {" · "}{place.type}{" · "}{place.price}
          </p>
          <p className="text-white opacity-50 text-xs mb-4">
            {place.area}
          </p>
          <div className="flex gap-2 flex-wrap">
            
<button
  onClick={() => window.open(place.mapsUrl, "_blank")}
  className="px-4 py-2 rounded-xl text-white text-xs font-bold"
  style={{ background: cyan }}
>
  View on Map
</button>
            <button
              onClick={() => onReview(place)}
              className="px-4 py-2 rounded-xl text-white text-xs font-bold"
              style={{ background: blue }}
            >
              Reviews
            </button>
          </div>
        </div>
        <div
          className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center text-5xl flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {place.photo ? (
            <img
              src={place.photo}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{place.emoji}</span>
          )}
        </div>
      </div>
      {isSpinResult && (
        <div className="px-4 pb-4">
          <button
            onClick={onSpin}
            className="w-full py-2.5 rounded-xl text-white text-sm font-bold opacity-60"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            Spin Again
          </button>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [city, setCity] = useState("Bengaluru");
  const [selectedLocation, setSelectedLocation] = useState("Anywhere in Bangalore");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewPlace, setReviewPlace] = useState(null);

  const categories = [
    { label: "Nature" },
    { label: "Adventure" },
    { label: "Food" },
    { label: "Heritage" },
  ];

  const budgets = ["Under 1000", "1000-2500", "2500+"];

  const cities = [
    { name: "Bengaluru", locked: false },
    { name: "Chennai", locked: true },
    { name: "Hyderabad", locked: true },
    { name: "Goa", locked: true },
  ];

  const bangaloreLocations = [
    "Anywhere in Bangalore",
    "Koramangala",
    "Indiranagar",
    "MG Road",
    "Brigade Road",
    "Jayanagar",
    "JP Nagar",
    "HSR Layout",
    "Whitefield",
    "Electronic City",
    "Marathahalli",
    "Bellandur",
    "Sarjapur Road",
    "Bannerghatta Road",
    "Hebbal",
    "Yelahanka",
    "Rajajinagar",
    "Malleswaram",
    "Basavanagudi",
    "BTM Layout",
    "Vijaya Nagar",
    "Cunningham Road",
    "Lavelle Road",
    "UB City",
    "Residency Road",
    "Old Airport Road",
    "Domlur",
    "HAL",
    "Brookefield",
    "Kadugodi",
    "KR Puram",
    "Nagarbhavi",
    "Kengeri",
    "Tumkur Road",
    "Yeshwanthpur",
    "Peenya",
    "RT Nagar",
    "Banaswadi",
    "CV Raman Nagar",
    "Frazer Town",
  ];

  const pillBase =
    "px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white border-opacity-10 text-white opacity-60 bg-white bg-opacity-10";
  const pillActive =
    "px-4 py-2 rounded-full text-sm font-semibold transition-all text-white";

  const handleFind = async () => {
    setSearched(true);
    setSpinResult(null);
    setResults([]);
    setLoading(true);
    try {
      const searchCity =
        selectedLocation === "Anywhere in Bangalore"
          ? city
          : selectedLocation + " Bangalore";
      const data = await searchPlaces(selectedCategory, selectedBudget, searchCity);
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpin = async () => {
    setSpinning(true);
    setSpinResult(null);
    setSearched(false);
    setResults([]);
    try {
      const categoriesList = ["Food", "Nature", "Adventure", "Heritage"];
      const randomCategory =
        selectedCategory ||
        categoriesList[Math.floor(Math.random() * categoriesList.length)];
      const searchCity =
        selectedLocation === "Anywhere in Bangalore"
          ? city
          : selectedLocation + " Bangalore";
      const data = await searchPlaces(randomCategory, selectedBudget, searchCity);
      if (data.length > 0) {
        const filtered = data.filter((p) => p.category === randomCategory);
        const pool = filtered.length > 0 ? filtered : data;
        const random = pool[Math.floor(Math.random() * pool.length)];
        setSpinResult({ ...random, category: randomCategory, type: randomCategory });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSpinning(false);
    }
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedBudget(null);
    setCity("Bengaluru");
    setSelectedLocation("Anywhere in Bangalore");
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
            PlaceFinder
          </h1>
          <p className="text-white opacity-60 text-sm sm:text-base font-medium">
            Find places that match your mood and budget
          </p>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 p-1 rounded-full mb-4" style={glassCard}>
          <button
            onClick={handleSpin}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white"
            style={{ background: blue }}
          >
            Spin
          </button>
          <button
            onClick={handleFind}
            className="flex-1 py-2.5 rounded-full text-sm font-bold text-white opacity-60"
          >
            Discover
          </button>
        </div>

        {/* City */}
        <div className="rounded-2xl p-4 mb-3" style={glassCard}>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#06B6D4" }}
          >
            City
          </p>
          <div className="flex gap-2 flex-wrap">
            {cities.map((c) => (
              <button
                key={c.name}
                onClick={() => !c.locked && setCity(c.name)}
                disabled={c.locked}
                className={
                  city === c.name
                    ? pillActive + (c.locked ? " opacity-30 cursor-not-allowed" : "")
                    : pillBase + (c.locked ? " opacity-30 cursor-not-allowed" : "")
                }
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

        {/* Area */}
        {city === "Bengaluru" && (
          <div className="rounded-2xl p-4 mb-3" style={glassCard}>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#06B6D4" }}
            >
              Pick your area
            </p>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {bangaloreLocations.map((loc) => (
                <option
                  key={loc}
                  value={loc}
                  style={{ background: "#0F172A", color: "white" }}
                >
                  {loc}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category */}
        <div className="rounded-2xl p-4 mb-3" style={glassCard}>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#06B6D4" }}
          >
            Where do you want to go?
          </p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.label ? null : cat.label
                  )
                }
                className={
                  selectedCategory === cat.label ? pillActive : pillBase
                }
                style={
                  selectedCategory === cat.label ? { background: blue } : {}
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="rounded-2xl p-4 mb-5" style={glassCard}>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#06B6D4" }}
          >
            Budget
          </p>
          <div className="flex gap-2 flex-wrap">
            {budgets.map((b) => (
              <button
                key={b}
                onClick={() =>
                  setSelectedBudget(selectedBudget === b ? null : b)
                }
                className={selectedBudget === b ? pillActive : pillBase}
                style={selectedBudget === b ? { background: blue } : {}}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase"
            style={{ background: cyan }}
          >
            {spinning ? "Spinning..." : "Spin The Wheel"}
          </button>
          <button
            onClick={handleFind}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase"
            style={{ background: blue }}
          >
            {loading ? "Searching..." : "Find My Spot"}
          </button>
        </div>

        {/* Spin result */}
        {spinResult && (
          <div className="mb-4">
            <PlaceCard
              place={spinResult}
              isSpinResult={true}
              onReview={setReviewPlace}
              onSpin={handleSpin}
            />
          </div>
        )}

        {/* Results */}
        {searched && (
          <div>
            {loading && (
              <div className="rounded-2xl p-8 text-center mb-4" style={glassCard}>
                <p className="text-white font-bold">Finding spots for you...</p>
                <p className="text-white opacity-50 text-sm mt-1">
                  Searching Google Places
                </p>
              </div>
            )}
            {!loading && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#3B82F6" }}
                  >
                    {results.length}{" "}
                    {results.length === 1 ? "Spot" : "Spots"} Found
                    {selectedLocation !== "Anywhere in Bangalore" &&
                      " in " + selectedLocation}
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-white opacity-60 text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    Reset
                  </button>
                </div>
                {results.length === 0 ? (
                  <div
                    className="rounded-2xl p-8 text-center"
                    style={glassCard}
                  >
                    <p className="text-white font-bold">No spots found</p>
                    <p className="text-white opacity-50 text-sm mt-1">
                      Try a different area or category!
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {results.map((place, index) => (
                      <PlaceCard
                        key={index}
                        place={place}
                        isSpinResult={false}
                        onReview={setReviewPlace}
                        onSpin={handleSpin}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-10 text-white opacity-20 text-xs">
          Built with React and Tailwind
        </div>

      </div>

      {/* Review Modal */}
      {reviewPlace && (
        <ReviewModal
          place={reviewPlace}
          onClose={() => setReviewPlace(null)}
        />
      )}

    </div>
  );
}

export default Home;