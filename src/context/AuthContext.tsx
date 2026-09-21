"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_USERS, DemoUser, DEFAULT_CITIZEN_USER, DEFAULT_OFFICER_USER } from "@/data/gis/demoUsers";

interface AuthContextType {
  currentUser: DemoUser;
  currentRole: "citizen" | "officer" | "admin";
  activeParcelId: string;
  switchUser: (userId: string) => void;
  switchRole: (role: "citizen" | "officer" | "admin") => void;
  setActiveParcelId: (parcelId: string) => void;
  switchParcel: (parcelId: string) => void;
  allUsers: DemoUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEFAULT_CITIZEN_USER);
  const [activeParcelId, setActiveParcelId] = useState<string>(DEFAULT_CITIZEN_USER.primaryParcelId);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedUserId = localStorage.getItem("bhoomi_auth_user");
      const savedRole = localStorage.getItem("bhoomi_auth_role");

      if (savedUserId && DEMO_USERS[savedUserId]) {
        const user = DEMO_USERS[savedUserId];
        setCurrentUser(user);
        setActiveParcelId(user.primaryParcelId);
      } else if (savedRole === "officer") {
        setCurrentUser(DEFAULT_OFFICER_USER);
        setActiveParcelId(DEFAULT_OFFICER_USER.primaryParcelId);
      } else {
        setCurrentUser(DEFAULT_CITIZEN_USER);
        setActiveParcelId(DEFAULT_CITIZEN_USER.primaryParcelId);
      }
    } catch {
      // Fallback
    }
  }, []);

  const switchUser = (userId: string) => {
    const user = DEMO_USERS[userId];
    if (user) {
      setCurrentUser(user);
      setActiveParcelId(user.primaryParcelId);
      localStorage.setItem("bhoomi_auth_user", user.id);
      localStorage.setItem("bhoomi_auth_role", user.role);
    }
  };

  const switchRole = (role: "citizen" | "officer" | "admin") => {
    if (role === "officer") {
      switchUser("officer");
    } else if (role === "admin") {
      switchUser("admin");
    } else {
      switchUser("ravi");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        activeParcelId,
        switchUser,
        switchRole,
        setActiveParcelId,
        switchParcel: setActiveParcelId,
        allUsers: Object.values(DEMO_USERS),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
