"use client";

import React, { useEffect, useState } from "react";
import { isUserIdentified, getUserIdentity, clearUserIdentity } from "@/core/analytics/localStorage";
import UserIdentificationModal from "./UserIdentificationModal";
import UserBadge from "./UserBadge";

interface AnalyticsProviderProps {
  children: React.ReactNode;
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

  return (
    <>
      {children}

      {/* User Identification Modal */}
      <UserIdentificationModal
        isOpen={showModal}
        onIdentified={handleUserIdentified}
      />

      {/* User Badge (fixed position in top-right corner) */}
      {userName && !showModal && (
        <div className="fixed top-4 right-4 z-40">
          <UserBadge
            userName={userName}
            userRole={userRole}
            userClient={userClient}
            onChangeUser={handleChangeUser}
          />
        </div>
      )}
    </>
  );
}
