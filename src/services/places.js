const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;

const categoryToKeyword = {
  Food: "restaurants cafes food",
  Nature: "parks gardens nature lakes",
  Adventure: "adventure sports trekking outdoor",
  Heritage: "historical monuments temples heritage",
};

function getCategoryEmoji(category) {
  const emojis = {
    Food: "🍽️",
    Nature: "🌿",
    Adventure: "🏕️",
    Heritage: "🏛️",
  };
  return emojis[category] || "📍";
}

function getPriceLabel(level) {
  const labels = {
    0: "Free",
    1: "Under ₹1000",
    2: "₹1000-₹2500",
    3: "₹2500+",
    4: "₹2500+",
  };
  return labels[level] || "Under ₹1000";
}

export async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,url,formatted_phone_number,opening_hours&key=${API_KEY}`;
  try {
    const response = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(url)}`
    );
    const data = await response.json();
    return data.result || null;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}

export async function searchPlaces(category, budget, city) {
  const keyword = categoryToKeyword[category] || "places";
  const location = city || "Bengaluru";

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(keyword + " in " + location)}&key=${API_KEY}`;

  try {
    const response = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(url)}`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results.slice(0, 10).map((place) => ({
        name: place.name,
        type: category,
        category: category,
        budget: budget || "Under ₹1000",
        emoji: getCategoryEmoji(category),
        rating: place.rating || 4.0,
        totalRatings: place.user_ratings_total || 0,
        area: place.vicinity || place.formatted_address || location,
        price: getPriceLabel(place.price_level),
        photo: place.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
          : null,
        placeId: place.place_id,
        mapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}