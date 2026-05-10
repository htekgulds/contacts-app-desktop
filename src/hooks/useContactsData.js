import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useContactsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await invoke("get_all_data");
        setData(result);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}