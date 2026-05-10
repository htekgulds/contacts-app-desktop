import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export function useContactsData(shouldFetch) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) return;
    setLoading(true);
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
  }, [shouldFetch]);

  return { data, loading, error };
}
