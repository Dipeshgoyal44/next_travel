import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const locationInput = event.target.location.value;
      const daysInput = event.target.days.value;
      const travelVibeInput = event.target["travel-vibe"].value;
      const travelStyleInput = event.target["travel-style"].value;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: locationInput,
          days: daysInput,
          travelVibe: travelVibeInput,
          travelStyle: travelStyleInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Plan your next Adventure</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" placeholder="Enter destination" />

          <label htmlFor="days">Days:</label>
          <input type="number" id="days" name="days" placeholder="Enter number of days" />

          <label htmlFor="travel-vibe">Travel Style:</label>
          <select id="travel-vibe" name="travel-vibe">
            <option value="budget">Budget</option>
            <option value="affordable">Affordable</option>
            <option value="luxury">Luxury</option>
          </select>

          <label htmlFor="travel-style">Travel Vibe:</label>
          <select id="travel-style" name="travel-style">
            <option value="relaxed">Relaxed</option>
            <option value="cultural">Cultural</option>
            <option value="adventure">Adventure</option>
          </select>

          <input type="submit" value="Generate your Itinerary" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
