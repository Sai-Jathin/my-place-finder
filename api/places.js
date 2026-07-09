const https = require("https");

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          resolve({ json: JSON.parse(data), buffer: null });
        } catch (e) {
          resolve({ json: null, buffer: data });
        }
      });
    }).on("error", reject);
  });
}

function httpsGetBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers["content-type"],
        statusCode: res.statusCode,
        finalUrl: res.headers["location"] || url,
      }));
    }).on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const { query, type } = req.query;
  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;

  try {
    if (type === "search") {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
      const { json } = await httpsGet(url);
      res.status(200).json(json);

    } else if (type === "details") {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=reviews,url,formatted_phone_number,opening_hours,photos&key=${API_KEY}`;
      const { json } = await httpsGet(url);
      res.status(200).json(json);

    } else if (type === "find") {
      const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,photos,geometry&key=${API_KEY}`;
      const { json } = await httpsGet(url);
      res.status(200).json(json);

    } else if (type === "photos") {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${query}&fields=photos,name&key=${API_KEY}`;
      const { json } = await httpsGet(url);
      res.status(200).json(json);

    } else if (type === "photo") {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${query}&key=${API_KEY}`;
      const result = await httpsGetBuffer(url);

      if (result.statusCode === 302 || result.statusCode === 301) {
        const redirectResult = await httpsGetBuffer(result.finalUrl);
        res.setHeader("Content-Type", redirectResult.contentType || "image/jpeg");
        res.status(200).send(redirectResult.buffer);
      } else {
        res.setHeader("Content-Type", result.contentType || "image/jpeg");
        res.status(200).send(result.buffer);
      }

    } else {
      res.status(400).json({ error: "Invalid type" });
    }

  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: error.message });
  }
};