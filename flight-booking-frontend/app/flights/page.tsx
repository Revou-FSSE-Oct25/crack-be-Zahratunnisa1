"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const router = useRouter();

  const searchFlights = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/flights?from=${from}&to=${to}`
      );

      const data = await res.json();
      setFlights(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>✈️ Search Flights</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="From (contoh: JKT)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          placeholder="To (contoh: DPS)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <button onClick={searchFlights}>Search</button>
      </div>

      <div>
        {flights.map((f) => (
          <div
            key={f.id}
            onClick={() => router.push(`/flights/${f.id}`)}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <p>
              <b>{f.from}</b> → <b>{f.to}</b>
            </p>
            <p>💰 Price: {f.price}</p>
            <p>🪑 Seats: {f.seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
