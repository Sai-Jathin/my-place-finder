export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { query, type } = req.query;
  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  let url = "";

  if (type === "search") {
    url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  } else if (type === "details") {
    url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=reviews,url,formatted_phone_number,opening_hours&key=${API_KEY}`;
  } else if (type === "find") {
    url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos,geometry&key=${API_KEY}`;
  } else if (type === "photo") {
    url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${query}&key=${API_KEY}`;
    const photoRes = await fetch(url);
    res.setHeader("Content-Type", "image/jpeg");
    const buffer = await photoRes.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
}