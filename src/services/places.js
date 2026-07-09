const categoryToKeyword = {
  Adventure: "trekking ATV kayaking paragliding go-karting adventure sports",
  Nature: "parks gardens zoo wildlife sanctuary lakes",
  Spiritual: "temples churches gurudwara mosque jain temple monastery",
  Food: "restaurants cafes pubs breweries dhaba street food",
  Heritage: "historical monuments museums art galleries forts palaces",
  Entertainment: "gaming arcade bowling VR escape room entertainment",
  Experiences: "wine tour farm stay play arena unique experiences",
};

function getCategoryEmoji(category) {
  const emojis = {
    Adventure: "🏕️",
    Nature: "🌿",
    Spiritual: "🛕",
    Food: "🍽️",
    Heritage: "🏛️",
    Entertainment: "🎮",
    Experiences: "🍷",
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

const BASE_URL = "https://my-place-finder.vercel.app/api/places";

export async function getPlaceDetails(placeId) {
  try {
    const response = await fetch(
      `${BASE_URL}?type=details&query=${placeId}`
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
  const query = keyword + " in " + location;

  try {
    const response = await fetch(
      `${BASE_URL}?type=search&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    console.log("Places response:", data);

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
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_KEY}`
          : null,
        placeId: place.place_id,
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`,

      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}

export async function getPlacePhoto(placeName, city = "Bengaluru") {
  try {
    const response = await fetch(
      `${BASE_URL}?type=find&query=${encodeURIComponent(placeName + " " + city)}`
    );
    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
      const place = data.candidates[0];
      const photoRef = place.photos?.[0]?.photo_reference;
      const placeId = place.place_id;
      const lat = place.geometry?.location?.lat;
      const lng = place.geometry?.location?.lng;
return {
  photoUrl: photoRef ? `${BASE_URL}?type=photo&query=${photoRef}` : null,
  placeId,
  lat,
  lng,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query_place_id=${placeId}&query=${encodeURIComponent(placeName)}`,
};
    }
    return null;
  } catch (error) {
    console.error("Error fetching place photo:", error);
    return null;
  }
}
export async function getPlacePhotos(placeId) {
  try {
    const response = await fetch(
      `${BASE_URL}?type=photos&query=${placeId}`
    );
    const data = await response.json();
    if (data.result?.photos) {
      return data.result.photos.slice(0, 10).map((photo) =>
        `${BASE_URL}?type=photo&query=${photo.photo_reference}`
      );
    }
    return [];
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}