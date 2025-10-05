import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id, name, role: 'user' | 'admin'}


  const login = (name, role) => setUser({ id: 1, name, role });
  const logout = () => setUser(null);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
