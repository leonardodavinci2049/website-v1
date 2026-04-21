"use client";

import { useEffect, useState } from "react";

const DEFAULT_AVAILABLE_SPOTS = 24;

function getRandomInitialSpots() {
  return Math.floor(Math.random() * 11) + 20;
}

export default function HomeAvailabilityCard() {
  const [availableSpots, setAvailableSpots] = useState<number>(
    DEFAULT_AVAILABLE_SPOTS,
  );

  useEffect(() => {
    setAvailableSpots(getRandomInitialSpots());

    const spotsInterval = window.setInterval(() => {
      setAvailableSpots((currentSpots) => {
        if (currentSpots <= 1) {
          return 1;
        }

        const decrease = Math.floor(Math.random() * 3) + 1;
        return Math.max(1, currentSpots - decrease);
      });
    }, 5000);

    return () => window.clearInterval(spotsInterval);
  }, []);

  return (
    <div
      className={`space-y-2 rounded-2xl bg-linear-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 p-3 text-center sm:p-5 ${
        availableSpots <= 50 ? "animate-pulse" : ""
      }`}
    >
      <div className="text-xs font-bold tracking-widest text-red-400 uppercase sm:text-sm">
        DISPONÍVEL
      </div>
      <div
        className={`font-black ${
          availableSpots <= 50
            ? "animate-bounce text-3xl text-red-300 sm:text-4xl"
            : "text-2xl text-red-400 sm:text-3xl"
        }`}
      >
        {availableSpots} {availableSpots === 1 ? "VAGA" : "VAGAS"}
      </div>
      <div className="text-sm font-semibold text-gray-300 sm:text-base">
        Já somos + 20 mil membros.
      </div>
      {availableSpots <= 20 && (
        <div className="animate-pulse text-xs font-bold text-red-300 uppercase">
          ⚠️ ÚLTIMAS VAGAS!
        </div>
      )}
    </div>
  );
}
