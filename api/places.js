export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { query, type } = req.query;
  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  let url = "";

  if (type === "search") {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  } else if (type === "details") {
    url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=reviews,url&key=${API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}