import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "YklydHlQNXN4aUJGWUJEVHJLcHRzTTFSQ0NlUThYclVHck8yTlVDeg==";
const BASE_URL = "https://api.countrystatecity.in/v1";

app.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/countries`, {
      headers: { "X-CSCAPI-KEY": API_KEY },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

app.get("/countries/:countryCode/states", async (req, res) => {
  const { countryCode } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/countries/${countryCode}/states`, {
      headers: { "X-CSCAPI-KEY": API_KEY },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching states for country ${countryCode}:`, error);
    res.status(500).json({ error: "Failed to fetch states" });
  }
});

app.get("/countries/:countryCode/states/:stateCode/cities", async (req, res) => {
  const { countryCode, stateCode } = req.params;
  try {
    const response = await axios.get(
      `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      {
        headers: { "X-CSCAPI-KEY": API_KEY },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      `Error fetching cities for state ${stateCode} in country ${countryCode}:`,
      error
    );
    res.status(500).json({ error: "Failed to fetch cities" });
  }
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});


app.get('/', (req, res) => {
  res.send('AraeneaCLI Country State City API');
});