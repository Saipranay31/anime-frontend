"use client";



import { useEffect, useState } from "react";
import api from "@/lib/api";
import { getToken } from "@/lib/auth";
import AnimeCard from "@/components/AnimeCard";

export default function UserAnimeListPage({ status }) {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserAnime = async () => {
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await api.get(`/user-anime/status/${status}`, { headers });
        setAnimeList(res.data);
      } catch (err) {
        console.error("Failed to fetch user anime:", err);
        setError("Failed to load your list. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAnime();
  }, [status]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-20 text-red-600 dark:text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
        {status} Anime
      </h1>

      {animeList.length === 0 ? (
        <p className="text-center text-slate-500">No anime in this list yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeList.map((entry) => (
            // entry already contains animeId & details in your DTO
            <AnimeCard key={entry.animeId} animeId={entry.animeId} />
          ))}
        </div>
      )}
    </div>
  );
}
 