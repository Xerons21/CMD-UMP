// cmd-linkedin-feed/scraper.js
import fetch from "node-fetch";
import fs from "fs";

const LINKEDIN_URL = "https://www.linkedin.com/company/cmd-ump/posts/";
const OUTPUT_FILE = "cmd-linkedin-feed/linkedin.json";

async function fetchLinkedInFeed() {
  try {
    const encodedUrl = encodeURIComponent(LINKEDIN_URL);
    const res = await fetch(`https://api.allorigins.win/get?url=${encodedUrl}`);
    const text = await res.text(); // <- zamiast res.json()

    let data;
    try {
      data = JSON.parse(text); // allorigins zwraca JSON z pola 'contents'
    } catch (err) {
      console.error("❌ Nie udało się sparsować JSON:", text);
      return;
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ html: data.contents }, null, 2));
    console.log(`✅ Feed zapisany do ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ Błąd pobierania feedu:", err);
  }
}

fetchLinkedInFeed();