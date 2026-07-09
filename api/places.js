export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { query, type } = req.query;
  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  try {
    if (type === "search") {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);

    } else if (type === "details") {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=reviews,url,formatted_phone_number,opening_hours,photos&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);

    } else if (type === "find") {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos,geometry&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);

    } } else if (type === "photos") {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=photos,name&key=${API_KEY}`;
  console.log("Fetching photos URL:", url);
  const response = await fetch(url);
  const text = await response.text();
  console.log("Photos raw response:", text);
  try {
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: "Invalid JSON", raw: text });
  }
} else if (type === "photo") {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${query}&key=${API_KEY}`;
      const photoRes = await fetch(url);
      if (!photoRes.ok) {
        res.status(500).json({ error: "Photo fetch failed" });
        return;
      }
      const buffer = await photoRes.arrayBuffer();
      res.setHeader("Content-Type", "image/jpeg");
      res.status(200).send(Buffer.from(buffer));

    } else {
      res.status(400).json({ error: "Invalid type" });
    }

  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: error.message });
  }
}