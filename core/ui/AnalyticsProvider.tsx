"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { isUserIdentified, getUserIdentity, clearUserIdentity } from "@/core/analytics/localStorage";
import { findUserByName } from "@/core/analytics/userDirectory";
import UserIdentificationModal from "./UserIdentificationModal";
import UserBadge from "./UserBadge";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

interface UserContextType {
  userName: string;
  userRole: string;
  userClient: string;
  isAdmin: boolean;
  isMasterAdmin: boolean;
  onChangeUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userClient, setUserClient] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if user is already identified
    const identity = getUserIdentity();
    if (identity) {
      setUserName(identity.userName);
      setUserRole(identity.userRole);
      setUserClient(identity.userClient);
    } else {
      // Show modal after a brief delay for better UX
      setTimeout(() => setShowModal(true), 500);
    }
  }, []);

  const handleUserIdentified = (
    userId: string,
    name: string,
    role: string,
    client: string
  ) => {
    setUserName(name);
    setUserRole(role);
    setUserClient(client);
    setShowModal(false);
  };

  const handleChangeUser = () => {
    clearUserIdentity();
    setUserName("");
    setUserRole("");
    setUserClient("");
    setShowModal(true);
  };

  // Only render on client to avoid hydration issues
  if (!isClient) {
    return <>{children}</>;
  }

  const userContextValue: UserContextType | null = userName
    ? {
        userName,
        userRole,
        userClient,
        isAdmin: findUserByName(userName)?.isAdmin || false,
        isMasterAdmin: findUserByName(userName)?.isMasterAdmin || false,
        onChangeUser: handleChangeUser,
      }
    : null;

  return (
    <UserContext.Provider value={userContextValue}>
      {children}

      {/* User Identification Modal */}
      <UserIdentificationModal
        isOpen={showModal}
        onIdentified={handleUserIdentified}
      />
    </UserContext.Provider>
  );
}
