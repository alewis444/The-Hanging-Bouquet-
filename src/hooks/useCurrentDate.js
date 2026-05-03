import { useState, useEffect } from "react";

export function useCurrentDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Update every minute
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return now;
}
