import { useState } from "react";
import AuthContext from "./AuthContextValue";

const STORAGE_KEY = "clientflow_auth";

const DEMO_USER = {
  id: "user-001",
  name: "Alex Smith",
  email: "alex@example.com",
  role: "Administrator",
};

function getStoredUser() {
  try {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 650));

    if (
      email.trim().toLowerCase() === "alex@example.com" &&
      password === "admin123"
    ) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
      setUser(DEMO_USER);
      return { success: true, user: DEMO_USER };
    }

    return {
      success: false,
      message: "Invalid email or password.",
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
