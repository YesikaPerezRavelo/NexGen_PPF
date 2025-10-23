// import { createContext, useContext, useState } from "react";


// const AuthContext = createContext(null);
// export const useAuth = () => useContext(AuthContext);


// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // {id, name, role: 'user' | 'admin'}


//   const login = (name, role) => setUser({ id: 1, name, role });
//   const logout = () => setUser(null);


//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


import { createContext, useContext, useEffect, useRef, useState } from "react";


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


async function mockLogin(email, password) {
  const ADMIN_EMAIL = "admin@nexgenppf.com";
  const ADMIN_PASS  = "panel12345";
  const USER_EMAIL  = "user@nexgenppf.com";
  const USER_PASS   = "12345";


  const okAdmin = email === ADMIN_EMAIL && password === ADMIN_PASS;
  const okUser  = email === USER_EMAIL && password === USER_PASS;
  if (!okAdmin && !okUser) throw new Error("Credenciales inválidas");


  const role = okAdmin ? "admin" : "user";
  
  return {
    token: `mock.${role}.token`,
    user: { email, role },
    expiresAt: Date.now() + 1000 * 60 * 30, 
  };
}


export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      const user  = JSON.parse(localStorage.getItem("user") || "null");
      const exp   = Number(localStorage.getItem("expiresAt") || 0);
      if (!token || !user || Date.now() >= exp) return null;
      return { token, user, expiresAt: exp };
    } catch { return null; }
  });
  const logoutTimer = useRef(null);


  const scheduleLogout = (expiresAt) => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    const ms = Math.max(0, expiresAt - Date.now());
    logoutTimer.current = setTimeout(() => logout(true), ms);
  };


  const login = async (email, password) => {
    const { token, user, expiresAt } = await mockLogin(email, password);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expiresAt", String(expiresAt));
    setSession({ token, user, expiresAt });
    scheduleLogout(expiresAt);
  };


  const logout = (notify = false) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    setSession(null);
    if (notify) alert("La sesión expiró. Iniciá sesión nuevamente.");
  };


  useEffect(() => {
    if (session?.expiresAt) scheduleLogout(session.expiresAt);
    return () => { if (logoutTimer.current) clearTimeout(logoutTimer.current); };
  }, [session?.expiresAt]);


  return (
    <AuthContext.Provider value={{ session, user: session?.user || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
