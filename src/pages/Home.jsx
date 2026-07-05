import { useState } from "react";
import { searchPlaces, getPlaceDetails, getPlacePhoto } from "../services/places";

const glassCard = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(37,99,235,0.3)",
};

const blue = "linear-gradient(to right, #2563EB, #3B82F6)";
const cyan = "linear-gradient(to right, #06B6D4, #0891b2)";

const cityPlans = {
  Bengaluru: [
    {
      id: "blr-a",
      title: "Cubbon Park Day",
      emoji: "🌳",
      tagline: "Heritage, culture & food within 5km of city center",
      color: "#10B981",
      budget: "2,600-5,500 per person",
      stops: [
        { time: "8:00-9:00 AM", place: "Konark Kanteerava", type: "Breakfast", note: "Benne dosa, idli-vada, kesari bath and filter coffee right beside Cubbon Park", cost: "200-350" },
        { time: "9:00-10:30 AM", place: "Cubbon Park", type: "Nature", note: "Walk through bamboo groves, bandstand and red Central Library. One of Bengaluru's largest green spaces", cost: "Free" },
        { time: "10:30 AM-12:00 PM", place: "Visvesvaraya Industrial and Technological Museum", type: "Museum", note: "Interactive science exhibits enjoyable even for adults!", cost: "60-150" },
        { time: "12:10-1:00 PM", place: "Government Museum Bangalore", type: "Heritage", note: "Karnataka's history and archaeology great for culture lovers", cost: "15-250" },
        { time: "1:15-2:45 PM", place: "Karavalli Restaurant Bangalore", type: "Lunch", note: "Finest coastal South Indian meals. Reservation recommended", cost: "800-2,000" },
        { time: "3:00-4:30 PM", place: "Museum of Art and Photography Bangalore", type: "Museum", note: "One of the city's best modern museums within walking distance of Cubbon Park", cost: "200-400" },
        { time: "4:30-5:30 PM", place: "UB City Bangalore", type: "Coffee", note: "Coffee, dessert and boutique browsing at UB City's premium mall", cost: "250-500" },
        { time: "5:30-7:00 PM", place: "MG Road Bangalore", type: "Evening", note: "Browse bookstores, local shops and enjoy the lively evening atmosphere", cost: "Free" },
        { time: "7:30-9:30 PM", place: "Spice Terrace Bangalore", type: "Dinner", note: "Rooftop North Indian dining with stunning city views", cost: "1,200-2,500" },
      ],
    },
    {
      id: "blr-b",
      title: "Koramangala & Indiranagar Crawl",
      emoji: "🍽️",
      tagline: "Bangalore's trendiest neighbourhoods in one day",
      color: "#F59E0B",
      budget: "1,500-4,000 per person",
      stops: [
        { time: "8:30-9:30 AM", place: "Brahmin's Coffee Bar Bangalore", type: "Breakfast", note: "Iconic Bangalore breakfast spot. Famous for idli, vada and filter coffee. Arrive early — it gets packed!", cost: "80-150" },
        { time: "10:00-11:30 AM", place: "Domlur Park Bangalore", type: "Nature", note: "Quiet neighbourhood park perfect for a morning walk after breakfast", cost: "Free" },
        { time: "11:30 AM-1:00 PM", place: "Koramangala Social Bangalore", type: "Brunch", note: "Trendy all-day cafe with great food, board games and a buzzing crowd", cost: "400-800" },
        { time: "1:30-3:00 PM", place: "Indiranagar 100 Feet Road", type: "Shopping", note: "Browse the coolest boutiques, bookstores and lifestyle stores on Bangalore's most vibrant street", cost: "Free to browse" },
        { time: "3:00-4:30 PM", place: "Cubbon Pavilion ITC Windsor Bangalore", type: "Coffee", note: "High tea at one of Bangalore's most elegant hotel lobbies", cost: "600-1,200" },
        { time: "5:00-6:30 PM", place: "Ulsoor Lake Bangalore", type: "Nature", note: "Peaceful lakeside walk and boating just 3km from Indiranagar", cost: "50-100" },
        { time: "7:00-8:00 PM", place: "Toit Brewpub Bangalore", type: "Evening", note: "Bangalore's most loved craft brewery. Try their In Weiss We Trust wheat beer", cost: "400-800" },
        { time: "8:30-10:00 PM", place: "The Fatty Bao Bangalore", type: "Dinner", note: "Pan-Asian small plates in a stunning setting. Book in advance", cost: "800-1,500" },
      ],
    },
    {
      id: "blr-c",
      title: "South Bangalore Heritage Trail",
      emoji: "🛕",
      tagline: "Ancient temples, royal palaces and old-world charm",
      color: "#8B5CF6",
      budget: "800-2,500 per person",
      stops: [
        { time: "7:00-8:00 AM", place: "CTR Central Tiffin Room Bangalore", type: "Breakfast", note: "A Bangalore institution since 1952. Their benne masala dosa is legendary. Expect a queue — it moves fast!", cost: "100-200" },
        { time: "8:30-10:00 AM", place: "Bull Temple Bangalore", type: "Heritage", note: "16th century Nandi temple built by Kempe Gowda. One of the oldest and most revered temples in Bangalore", cost: "Free" },
        { time: "10:15-11:30 AM", place: "Bugle Rock Park Bangalore", type: "Nature", note: "Ancient granite rock formations and a peaceful park right next to Bull Temple", cost: "Free" },
        { time: "11:45 AM-1:00 PM", place: "Bangalore Palace", type: "Heritage", note: "Tudor-style palace inspired by Windsor Castle. Stunning architecture with royal artifacts inside", cost: "230-460" },
        { time: "1:30-2:30 PM", place: "Vidyarthi Bhavan Bangalore", type: "Lunch", note: "A South Bangalore legend since 1943. Their masala dosa is crispy, buttery perfection. Only open till 2:30 PM!", cost: "100-200" },
        { time: "3:00-4:30 PM", place: "ISKCON Temple Bangalore", type: "Heritage", note: "One of the largest ISKCON temples in the world. Beautiful architecture and peaceful evening aarti at 4:15 PM", cost: "Free" },
        { time: "5:00-6:30 PM", place: "Lalbagh Botanical Garden", type: "Nature", note: "250-year-old garden with a stunning glass house, rare plants and a beautiful lake. Perfect for a sunset stroll", cost: "20-30" },
        { time: "7:30-9:30 PM", place: "Nagarjuna Restaurant Bangalore", type: "Dinner", note: "Legendary Andhra-style meals on banana leaf. Their chicken curry and ghee rice are unmissable", cost: "300-600" },
      ],
    },
    {
      id: "blr-d",
      title: "North Bangalore Explorer",
      emoji: "🌿",
      tagline: "Lakes, gardens and hidden gems up north",
      color: "#06B6D4",
      budget: "1,000-3,000 per person",
      stops: [
        { time: "7:30-8:30 AM", place: "Veena Stores Bangalore", type: "Breakfast", note: "Old-school Bangalore breakfast joint in Malleshwaram. Their idli and chutney is comfort food at its finest", cost: "80-150" },
        { time: "9:00-10:30 AM", place: "Hebbal Lake Bangalore", type: "Nature", note: "One of Bangalore's most scenic lakes. A paradise for bird watchers — spot pelicans, painted storks and kingfishers in the morning", cost: "Free" },
        { time: "11:00 AM-12:30 PM", place: "Malleshwaram Market Bangalore", type: "Heritage", note: "Old Bangalore's most authentic neighbourhood market. Browse fresh flowers, silk sarees, traditional snacks and antique shops", cost: "Free to browse" },
        { time: "1:00-2:00 PM", place: "Taaza Thindi Bangalore", type: "Lunch", note: "Authentic Karnataka-style meals in the heart of Malleshwaram. Try their bisibelebath and kesari bath", cost: "150-300" },
        { time: "2:30-4:00 PM", place: "Sankey Tank Bangalore", type: "Nature", note: "Beautiful 130-year-old lake with a 3km walking track. Rent a paddle boat or just enjoy the peaceful surroundings", cost: "Free to 100" },
        { time: "4:30-6:00 PM", place: "Kadu Malleshwara Temple Bangalore", type: "Heritage", note: "Ancient Shiva temple in the middle of Malleshwaram. Beautiful architecture and very peaceful in the late afternoon", cost: "Free" },
        { time: "6:30-8:00 PM", place: "Mantri Square Mall Bangalore", type: "Evening", note: "One of Bangalore's biggest malls for an evening of window shopping, movies or a quick snack", cost: "Free to browse" },
        { time: "8:30-10:00 PM", place: "Meghana Foods Bangalore", type: "Dinner", note: "Bangalore's most loved biryani spot. Their Andhra chicken biryani is absolutely legendary. Always packed!", cost: "250-500" },
      ],
    },
    {
      id: "blr-e",
      title: "Whitefield Day Out",
      emoji: "🏙️",
      tagline: "East Bangalore's tech hub meets leisure",
      color: "#EF4444",
      budget: "1,500-4,500 per person",
      stops: [
        { time: "8:00-9:00 AM", place: "Koshy's Restaurant Bangalore", type: "Breakfast", note: "Bangalore's most legendary all-day restaurant since 1952. A must-visit institution loved by artists, writers and politicians", cost: "300-600" },
        { time: "9:30-11:00 AM", place: "Hoskote Lake Bangalore", type: "Nature", note: "Scenic lake on the east side of Bangalore. Great for bird watching and a peaceful morning walk away from the city rush", cost: "Free" },
        { time: "11:30 AM-1:00 PM", place: "Innovative Film City Bangalore", type: "Adventure", note: "Unique theme park with film sets, wax museum and adventure rides. Great for all ages!", cost: "500-800" },
        { time: "1:30-2:30 PM", place: "Truffles Bangalore", type: "Lunch", note: "Bangalore's most loved burger and comfort food spot. Their eggs Benedict and monster burgers are iconic", cost: "400-700" },
        { time: "3:00-5:00 PM", place: "Phoenix Marketcity Whitefield", type: "Shopping", note: "Massive mall with international brands, a food court and a multiplex. Perfect for an afternoon of shopping and leisure", cost: "Free to browse" },
        { time: "5:30-7:00 PM", place: "Varthur Lake Bangalore", type: "Nature", note: "Large lake in east Bangalore surrounded by walking paths. Beautiful in the evening light", cost: "Free" },
        { time: "7:30-9:30 PM", place: "Whitefield Arms Bangalore", type: "Dinner", note: "Popular pub and restaurant in the heart of Whitefield. Great burgers, wood-fired pizzas and a lively atmosphere", cost: "600-1,200" },
      ],
    },
    {
      id: "blr-f",
      title: "Family Fun Day",
      emoji: "👨‍👩‍👧",
      tagline: "A perfect day out for the whole family",
      color: "#EC4899",
      budget: "2,000-5,000 for family of 4",
      stops: [
        { time: "8:00-9:00 AM", place: "MTR Mavalli Tiffin Room Bangalore", type: "Breakfast", note: "Bangalore's most iconic breakfast restaurant since 1924. Their rava idli was actually invented here! Book in advance for weekends", cost: "200-400" },
        { time: "9:30-11:30 AM", place: "Bannerghatta National Park", type: "Nature", note: "Safari through real forest to spot elephants, tigers, lions and bears. India's first butterfly enclosure is here too!", cost: "400-800 per person" },
        { time: "12:00-1:30 PM", place: "Udupi Garden Restaurant Bangalore", type: "Lunch", note: "Family-friendly South Indian restaurant with an extensive menu loved by all ages. Great value for money", cost: "300-600" },
        { time: "2:00-4:30 PM", place: "Wonderla Amusement Park Bangalore", type: "Adventure", note: "Bangalore's best amusement park with 60+ rides including water rides and dry rides. Kids absolutely love it!", cost: "900-1,200 per person" },
        { time: "5:00-6:00 PM", place: "JP Nagar Park Bangalore", type: "Nature", note: "Large neighbourhood park perfect for kids to run around and families to relax after a day of excitement", cost: "Free" },
        { time: "6:30-7:30 PM", place: "Corner House Ice Cream Bangalore", type: "Coffee", note: "Bangalore's most beloved ice cream parlour since 1981. Their Death by Chocolate is a rite of passage!", cost: "150-300" },
        { time: "8:00-9:30 PM", place: "Punjabi By Nature Bangalore", type: "Dinner", note: "Family-friendly North Indian restaurant with generous portions, great naans and a warm atmosphere kids love", cost: "600-1,200" },
      ],
    },
  ],
  Chennai: [
    { id: "chn-a", title: "Plan A", emoji: "📍", tagline: "Coming soon", color: "#10B981", budget: null, stops: [] },
    { id: "chn-b", title: "Plan B", emoji: "📍", tagline: "Coming soon", color: "#F59E0B", budget: null, stops: [] },
    { id: "chn-c", title: "Plan C", emoji: "📍", tagline: "Coming soon", color: "#8B5CF6", budget: null, stops: [] },
  ],
  Hyderabad: [
    { id: "hyd-a", title: "Plan A", emoji: "📍", tagline: "Coming soon", color: "#10B981", budget: null, stops: [] },
    { id: "hyd-b", title: "Plan B", emoji: "📍", tagline: "Coming soon", color: "#F59E0B", budget: null, stops: [] },
    { id: "hyd-c", title: "Plan C", emoji: "📍", tagline: "Coming soon", color: "#8B5CF6", budget: null, stops: [] },
  ],
  Goa: [
    { id: "goa-a", title: "Plan A", emoji: "📍", tagline: "Coming soon", color: "#10B981", budget: null, stops: [] },
    { id: "goa-b", title: "Plan B", emoji: "📍", tagline: "Coming soon", color: "#F59E0B", budget: null, stops: [] },
    { id: "goa-c", title: "Plan C", emoji: "📍", tagline: "Coming soon", color: "#8B5CF6", budget: null, stops: [] },
  ],
};

const typeColors = {
  Breakfast: "#F59E0B",
  Nature: "#10B981",
  Museum: "#8B5CF6",
  Heritage: "#06B6D4",
  Lunch: "#EF4444",
  Coffee: "#92400E",
  Evening: "#F97316",
  Dinner: "#EC4899",
  Food: "#EF4444",
  Adventure: "#EF4444",
};

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
    const newReview = { author_name: "You", rating: userRating, text: userReview, time: Date.now() };
    setUserReviews([newReview, ...userReviews]);
    setUserReview("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.8)" }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden" style={{ background: "#0F172A", border: "1px solid rgba(37,99,235,0.3)", maxHeight: "85vh" }} onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-white border-opacity-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-black text-xl mb-1">{place.name}</h2>
              <p className="text-sm" style={{ color: "#06B6D4" }}>{place.rating} stars · {place.totalRatings} reviews</p>
            </div>
            <button onClick={onClose} className="text-white opacity-50 hover:opacity-100 text-xl font-bold ml-4">X</button>
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: "70vh" }}>
          <div className="p-5 border-b border-white border-opacity-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>Write Your Review</p>
            <div className="flex gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setUserRating(star)} className="text-3xl transition-all" style={{ color: star <= userRating ? "#FFD700" : "#4B5563", transform: star <= userRating ? "scale(1.1)" : "scale(1)" }}>
                  ★
                </button>
              ))}
              <span className="text-white opacity-50 text-sm ml-2 self-center">{userRating}/5</span>
            </div>
            <textarea value={userReview} onChange={(e) => setUserReview(e.target.value)} placeholder="Share your experience..." rows={3} className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none resize-none mb-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }} />
            <button onClick={handleSubmitReview} className="w-full py-3 rounded-xl text-white text-sm font-bold" style={{ background: submitted ? "rgba(16,185,129,0.8)" : blue }}>
              {submitted ? "Review Submitted!" : "Submit Review"}
            </button>
          </div>
          {userReviews.length > 0 && (
            <div className="p-5 border-b border-white border-opacity-10">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>Your Reviews</p>
              <div className="flex flex-col gap-3">
                {userReviews.map((review, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: blue }}>Y</div>
                      <div>
                        <p className="text-white text-sm font-bold">You</p>
                        <p className="text-xs flex gap-0.5">{[1,2,3,4,5].map((star) => (<span key={star} style={{ color: star <= review.rating ? "#FFD700" : "#4B5563" }}>★</span>))}</p>
                      </div>
                    </div>
                    <p className="text-white opacity-70 text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>Google Reviews</p>
            {loadingReviews ? (
              <p className="text-white opacity-50 text-sm text-center py-6">Loading reviews...</p>
            ) : reviews && reviews.length > 0 ? (
              <div className="flex flex-col gap-3">
                {reviews.map((review, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: cyan }}>{review.author_name?.charAt(0) || "U"}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-bold truncate">{review.author_name}</p>
                        <p className="text-xs flex gap-0.5 items-center">
                          {[1,2,3,4,5].map((star) => (<span key={star} style={{ color: star <= review.rating ? "#FFD700" : "#4B5563" }}>★</span>))}
                          <span className="text-white opacity-40 ml-2">{review.relative_time_description}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-white opacity-70 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white opacity-50 text-sm text-center py-6">No Google reviews found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanModal({ plan, onClose }) {
  const [stopData, setStopData] = useState({});
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  useState(() => {
    if (plan.stops.length === 0) {
      setLoadingPhotos(false);
      return;
    }
    async function fetchPhotos() {
      const results = {};
      await Promise.all(
        plan.stops.map(async (stop) => {
          const data = await getPlacePhoto(stop.place, "Bengaluru");
          if (data) results[stop.place] = data;
        })
      );
      setStopData(results);
      setLoadingPhotos(false);
    }
    fetchPhotos();
  }, [plan.id]);

  const validStops = plan.stops.filter((s) => stopData[s.place]?.lat);
  const mapCenter = validStops.length > 0
    ? `${stopData[validStops[0].place].lat},${stopData[validStops[0].place].lng}`
    : "12.9716,77.5946";
  const mapMarkers = validStops
    .map((s, i) => `markers=label:${i + 1}%7C${stopData[s.place].lat},${stopData[s.place].lng}`)
    .join("&");
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter}&zoom=14&size=600x250&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:labels.text.fill%7Ccolor:0x8ec3b9&${mapMarkers}&key=${process.env.REACT_APP_GOOGLE_PLACES_KEY}`;
  const routeUrl = validStops.length > 0
    ? `https://www.google.com/maps/dir/${validStops.map((s) => `${stopData[s.place].lat},${stopData[s.place].lng}`).join("/")}`
    : "https://www.google.com/maps";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-3xl overflow-hidden" style={{ background: "#0F172A", border: `1px solid ${plan.color}40`, maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="p-5" style={{ background: `${plan.color}15`, borderBottom: `1px solid ${plan.color}30` }}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{plan.emoji}</div>
              <div>
                <h2 className="text-white font-black text-xl">{plan.title}</h2>
                <p className="text-sm" style={{ color: plan.color }}>{plan.tagline}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white opacity-50 hover:opacity-100 text-xl font-bold ml-2">X</button>
          </div>
          {plan.budget && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: `${plan.color}40` }}>
                Budget: {plan.budget}
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ background: "rgba(255,255,255,0.1)" }}>
                {plan.stops.length} stops
              </span>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto p-5" style={{ maxHeight: "72vh" }}>
          {plan.stops.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">🚧</p>
              <p className="text-white font-bold text-lg">Coming Soon!</p>
              <p className="text-white opacity-50 text-sm mt-1">This plan is being curated for you</p>
            </div>
          ) : (
            <div>
              {/* Stops */}
              <div className="flex flex-col gap-3 mb-6">
                {plan.stops.map((stop, index) => {
                  const typeColor = typeColors[stop.type] || plan.color;
                  const data = stopData[stop.place];
                  return (
                    <div key={index} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {/* Photo */}
                      {data?.photoUrl ? (
                        <div className="w-full h-40 overflow-hidden">
                          <img src={data.photoUrl} alt={stop.place} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                        </div>
                      ) : loadingPhotos ? (
                        <div className="w-full h-32 flex items-center justify-center" style={{ background: `${plan.color}10` }}>
                          <p className="text-white opacity-30 text-xs">Loading photo...</p>
                        </div>
                      ) : (
                        <div className="w-full h-20 flex items-center justify-center text-4xl" style={{ background: `${plan.color}10` }}>
                          {plan.emoji}
                        </div>
                      )}

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${typeColor}20`, color: typeColor }}>
                            {stop.type}
                          </span>
                          <span className="text-white opacity-40 text-xs font-medium">{stop.time}</span>
                        </div>
                        <h3 className="text-white font-black text-base mb-1">{stop.place}</h3>
                        <p className="text-white opacity-60 text-sm leading-relaxed mb-3">{stop.note}</p>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          {stop.cost && (
                            <span className="text-xs font-semibold" style={{ color: plan.color }}>
                              Cost: {stop.cost}
                            </span>
                          )}
                          {data?.mapsUrl && (
                            <button onClick={() => window.open(data.mapsUrl, "_blank")} className="text-xs font-bold px-3 py-1.5 rounded-xl text-white" style={{ background: "rgba(6,182,212,0.3)" }}>
                              View on Map
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Route Map */}
              <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${plan.color}30` }}>
                <div className="p-3 flex items-center justify-between" style={{ background: `${plan.color}15` }}>
                  <div>
                    <p className="text-white font-bold text-sm">Full Day Route</p>
                    <p className="text-white opacity-50 text-xs">All {plan.stops.length} stops in one view</p>
                  </div>
                </div>
                {!loadingPhotos && validStops.length > 0 ? (
                  <div>
                    <img src={staticMapUrl} alt="Route map" className="w-full" style={{ minHeight: "180px", objectFit: "cover" }} />
                    <button onClick={() => window.open(routeUrl, "_blank")} className="w-full py-3 text-white font-bold text-sm" style={{ background: `${plan.color}30` }}>
                      Open Full Route in Google Maps
                    </button>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-white opacity-40 text-sm">{loadingPhotos ? "Loading map..." : "Map loading"}</p>
                  </div>
                )}
              </div>

              <button className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase" style={{ background: plan.color }} onClick={onClose}>
                Let's Go!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlaceCard({ place, isSpinResult, onReview, onSpin }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={glassCard}>
      <div className="px-4 pt-4 pb-1">
        <span className="text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider" style={{ background: isSpinResult ? blue : cyan }}>
          {isSpinResult ? "Your Pick" : "Top Pick"}
        </span>
      </div>
      <div className="flex items-start gap-3 p-4">
        <div className="flex-1">
          <h2 className="text-white font-black text-xl leading-tight mb-2">{place.name}</h2>
          <p className="text-sm mb-1" style={{ color: "#06B6D4" }}>
            {place.rating} stars
            {place.totalRatings > 0 && (<span className="text-white opacity-40 ml-1">({place.totalRatings} reviews)</span>)}
            {" · "}{place.type}{" · "}{place.price}
          </p>
          <p className="text-white opacity-50 text-xs mb-4">{place.area}</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => window.open(place.mapsUrl, "_blank")} className="px-4 py-2 rounded-xl text-white text-xs font-bold" style={{ background: cyan }}>View on Map</button>
            <button onClick={() => onReview(place)} className="px-4 py-2 rounded-xl text-white text-xs font-bold" style={{ background: blue }}>Reviews</button>
          </div>
        </div>
        <div className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center text-5xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }}>
          {place.photo ? (<img src={place.photo} alt={place.name} className="w-full h-full object-cover" />) : (<span>{place.emoji}</span>)}
        </div>
      </div>
      {isSpinResult && (
        <div className="px-4 pb-4">
          <button onClick={onSpin} className="w-full py-2.5 rounded-xl text-white text-sm font-bold opacity-60" style={{ background: "rgba(255,255,255,0.08)" }}>Spin Again</button>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [mode, setMode] = useState("spin");
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
  const [selectedPlan, setSelectedPlan] = useState(null);

  const categories = [{ label: "Nature" }, { label: "Adventure" }, { label: "Food" }, { label: "Heritage" }];
  const budgets = ["Under 1000", "1000-2500", "2500+"];
  const cities = [
    { name: "Bengaluru", locked: false },
    { name: "Chennai", locked: true },
    { name: "Hyderabad", locked: true },
    { name: "Goa", locked: true },
  ];
  const bangaloreLocations = [
    "Anywhere in Bangalore", "Koramangala", "Indiranagar", "MG Road",
    "Brigade Road", "Jayanagar", "JP Nagar", "HSR Layout", "Whitefield",
    "Electronic City", "Marathahalli", "Bellandur", "Sarjapur Road",
    "Bannerghatta Road", "Hebbal", "Yelahanka", "Rajajinagar", "Malleswaram",
    "Basavanagudi", "BTM Layout", "Vijaya Nagar", "Cunningham Road",
    "Lavelle Road", "UB City", "Residency Road", "Old Airport Road",
    "Domlur", "HAL", "Brookefield", "Kadugodi", "KR Puram", "Nagarbhavi",
    "Kengeri", "Tumkur Road", "Yeshwanthpur", "Peenya", "RT Nagar",
    "Banaswadi", "CV Raman Nagar", "Frazer Town",
  ];

  const pillBase = "px-4 py-2 rounded-full text-sm font-semibold transition-all border border-white border-opacity-10 text-white opacity-60 bg-white bg-opacity-10";
  const pillActive = "px-4 py-2 rounded-full text-sm font-semibold transition-all text-white";
  const cityLabel = city === "Bengaluru" ? "Bangalore" : city;
  const currentPlans = cityPlans[city] || [];

  const handleFind = async () => {
    setSearched(true);
    setSpinResult(null);
    setResults([]);
    setLoading(true);
    try {
      const searchCity = selectedLocation === "Anywhere in Bangalore" ? city : selectedLocation + " Bangalore";
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
      const randomCategory = selectedCategory || categoriesList[Math.floor(Math.random() * categoriesList.length)];
      const searchCity = selectedLocation === "Anywhere in Bangalore" ? city : selectedLocation + " Bangalore";
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
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2">PlaceFinder</h1>
          <p className="text-white opacity-60 text-sm sm:text-base font-medium">Find places that match your mood and budget</p>
        </div>

        {/* City Selector */}
        <div className="rounded-2xl p-4 mb-3" style={glassCard}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>City</p>
          <div className="flex gap-2 flex-wrap">
            {cities.map((c) => (
              <button
                key={c.name}
                onClick={() => { if (!c.locked) { setCity(c.name); setMode("spin"); } }}
                disabled={c.locked}
                className={city === c.name ? pillActive + (c.locked ? " opacity-30 cursor-not-allowed" : "") : pillBase + (c.locked ? " opacity-30 cursor-not-allowed" : "")}
                style={city === c.name ? { background: blue } : {}}
              >
                {c.name}
                {c.locked && (<span className="ml-1.5 text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full">Soon</span>)}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 p-1 rounded-full mb-4" style={glassCard}>
          <button onClick={() => setMode("spin")} className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-all" style={{ background: mode === "spin" ? blue : "transparent", opacity: mode === "spin" ? 1 : 0.6 }}>
            Spin
          </button>
          <button onClick={() => setMode("discover")} className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-all" style={{ background: mode === "discover" ? blue : "transparent", opacity: mode === "discover" ? 1 : 0.6 }}>
            Discover {cityLabel}
          </button>
        </div>

        {/* DISCOVER MODE */}
        {mode === "discover" && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#06B6D4" }}>Day Plans for {cityLabel}</p>
            <div className="flex flex-col gap-3">
              {currentPlans.map((plan) => (
                <button key={plan.id} onClick={() => setSelectedPlan(plan)} className="rounded-2xl p-4 text-left transition-all" style={{ background: `${plan.color}15`, border: `1px solid ${plan.color}40` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${plan.color}25` }}>
                      {plan.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-black text-lg mb-0.5">{plan.title}</h3>
                      <p className="text-sm" style={{ color: plan.color }}>{plan.tagline}</p>
                      <p className="text-white opacity-40 text-xs mt-1">
                        {plan.stops.length > 0 ? `${plan.stops.length} stops · Full day plan` : "Coming soon"}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: `${plan.color}40` }}>
                      →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SPIN MODE */}
        {mode === "spin" && (
          <div>
            {city === "Bengaluru" && (
              <div className="rounded-2xl p-4 mb-3" style={glassCard}>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>Pick your area</p>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  {bangaloreLocations.map((loc) => (<option key={loc} value={loc} style={{ background: "#0F172A", color: "white" }}>{loc}</option>))}
                </select>
              </div>
            )}

            <div className="rounded-2xl p-4 mb-3" style={glassCard}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>Where do you want to go?</p>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button key={cat.label} onClick={() => setSelectedCategory(selectedCategory === cat.label ? null : cat.label)} className={selectedCategory === cat.label ? pillActive : pillBase} style={selectedCategory === cat.label ? { background: blue } : {}}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-4 mb-5" style={glassCard}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#06B6D4" }}>Budget</p>
              <div className="flex gap-2 flex-wrap">
                {budgets.map((b) => (
                  <button key={b} onClick={() => setSelectedBudget(selectedBudget === b ? null : b)} className={selectedBudget === b ? pillActive : pillBase} style={selectedBudget === b ? { background: blue } : {}}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button onClick={handleSpin} disabled={spinning} className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase" style={{ background: cyan }}>
                {spinning ? "Spinning..." : "Spin The Wheel"}
              </button>
              <button onClick={handleFind} disabled={loading} className="w-full py-4 rounded-2xl text-white font-black text-sm tracking-widest uppercase" style={{ background: blue }}>
                {loading ? "Searching..." : "Find My Spot"}
              </button>
            </div>

            {spinResult && (
              <div className="mb-4">
                <PlaceCard place={spinResult} isSpinResult={true} onReview={setReviewPlace} onSpin={handleSpin} />
              </div>
            )}

            {searched && (
              <div>
                {loading && (
                  <div className="rounded-2xl p-8 text-center mb-4" style={glassCard}>
                    <p className="text-white font-bold">Finding spots for you...</p>
                    <p className="text-white opacity-50 text-sm mt-1">Searching Google Places</p>
                  </div>
                )}
                {!loading && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#3B82F6" }}>
                        {results.length} {results.length === 1 ? "Spot" : "Spots"} Found
                        {selectedLocation !== "Anywhere in Bangalore" && " in " + selectedLocation}
                      </p>
                      <button onClick={handleReset} className="text-white opacity-60 text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>Reset</button>
                    </div>
                    {results.length === 0 ? (
                      <div className="rounded-2xl p-8 text-center" style={glassCard}>
                        <p className="text-white font-bold">No spots found</p>
                        <p className="text-white opacity-50 text-sm mt-1">Try a different area or category!</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {results.map((place, index) => (<PlaceCard key={index} place={place} isSpinResult={false} onReview={setReviewPlace} onSpin={handleSpin} />))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="text-center pt-10 text-white opacity-20 text-xs">Built with React and Tailwind</div>
      </div>

      {reviewPlace && (<ReviewModal place={reviewPlace} onClose={() => setReviewPlace(null)} />)}
      {selectedPlan && (<PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />)}
    </div>
  );
}

export default Home;
