import { useState, useEffect, createContext, useCallback } from "react";


export const UserContext = createContext(null);


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");


  const fetchRandomUser = useCallback(async () => {
    setLoadingUser(true);
    setUserError("");
    const ctrl = new AbortController();
    try {
      const res = await fetch("https://randomuser.me/api", { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUser(data.results?.[0] ?? null);
    } catch (err) {
      if (err.name !== "AbortError") setUserError("Error al cargar usuario");
    } finally {
      setLoadingUser(false);
    }
    return () => ctrl.abort();
  }, []);


  useEffect(() => {
    fetchRandomUser();
  }, [fetchRandomUser]);


  return (
    <UserContext.Provider value={{ user, loadingUser, userError, fetchRandomUser }}>
      {children}
    </UserContext.Provider>
  );
}
