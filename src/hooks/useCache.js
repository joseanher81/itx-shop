import { useEffect, useState } from 'react';

export const useCache = (key, fetchFunc, validFor = 3600000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log;
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(key); // Retrieve cached data
      const now = Date.now();

      // Check if cached data exists and is still valid
      if (cachedData) {
        const { timestamp, data } = JSON.parse(cachedData);
        if (now - timestamp < validFor) {
          console.log('Using cached data');
          setData(data);
          setLoading(false);
          return;
        }
      }

      // If no valid cached data, fetch new data
      try {
        console.log('Fetching new data');
        const newData = await fetchFunc();
        console.log('Fetched new data:', newData);
        setData(newData);
        localStorage.setItem(key, JSON.stringify({ timestamp: now, data: newData })); // Cache the new data
      } catch (err) {
        console.error(err);
        setError(err);
      }

      setLoading(false);
    };

    loadData();
  }, [key, fetchFunc, validFor]);

  return { data, loading, error };
};
