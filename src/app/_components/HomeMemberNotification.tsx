"use client";

import { useEffect, useState } from "react";

import brazilianNames from "@/mock/brazilian-names.json";

type NotificationState = {
  name: string;
  visible: boolean;
};

export default function HomeMemberNotification() {
  const [currentNotification, setCurrentNotification] =
    useState<NotificationState>({
      name: "",
      visible: false,
    });

  useEffect(() => {
    let hideTimeout: number | undefined;

    const showNotification = () => {
      const randomIndex = Math.floor(
        Math.random() * brazilianNames.names.length,
      );
      const selectedName = brazilianNames.names[randomIndex].name;

      setCurrentNotification({ name: selectedName, visible: true });

      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
      }

      hideTimeout = window.setTimeout(() => {
        setCurrentNotification((previousNotification) => ({
          ...previousNotification,
          visible: false,
        }));
      }, 1500);
    };

    const initialTimeout = window.setTimeout(showNotification, 800);
    const notificationInterval = window.setInterval(showNotification, 10000);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(notificationInterval);

      if (hideTimeout) {
        window.clearTimeout(hideTimeout);
      }
    };
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 transform transition-all duration-700 ease-in-out ${
        currentNotification.visible
          ? "translate-x-0 scale-100 opacity-100"
          : "translate-x-full scale-95 opacity-0"
      }`}
    >
      <div className="flex max-w-sm items-center space-x-3 rounded-lg border-l-4 border-[#25D366] bg-gray-800/90 backdrop-blur-sm px-4 py-3 shadow-xl ring-1 ring-white/10">
        <div className="shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-gray-600 to-gray-700 ring-2 ring-[#25D366]/50">
            <svg
              viewBox="0 0 24 24"
              className="h-9 w-9 text-gray-300"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-[#25D366]">
            WhatsApp Elly Indica
          </div>
          <div className="text-sm text-gray-300">
            <span className="font-bold text-white">
              {currentNotification.name}
            </span>{" "}
            entrou no grupo
          </div>
        </div>
        <div className="shrink-0">
          <div className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]"></div>
        </div>
      </div>
    </div>
  );
}
