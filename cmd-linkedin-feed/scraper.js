// cmd-linkedin-feed/scraper.js
import fetch from "node-fetch";
import fs from "fs";

const LINKEDIN_URL = "https://www.linkedin.com/company/cmd-ump/posts/";
const OUTPUT_FILE = "cmd-linkedin-feed/linkedin.json";

async function fetchLinkedInFeed() {
  try {
    const encodedUrl = encodeURIComponent(LINKEDIN_URL);
    const response = await fetch(`https://api.allorigins.win/get?url=${encodedUrl}`);
    const data = await response.json();

    // Zawartość strony w data.contents
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ html: data.contents }, null, 2));
    console.log(`✅ Feed zapisany do ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ Błąd pobierania feedu:", err);
  }
}

fetchLinkedInFeed();