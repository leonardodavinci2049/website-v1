"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import brazilianNames from "../mock/brazilian-names.json";

const HomePage = () => {
  const [availableSpots, setAvailableSpots] = useState<number>(0);
  const [currentNotification, setCurrentNotification] = useState<{
    name: string;
    visible: boolean;
  }>({ name: "", visible: false });

  useEffect(() => {
    // Gera número inicial aleatório entre 20-30
    const initialSpots = Math.floor(Math.random() * 11) + 20;
    setAvailableSpots(initialSpots);

    // Configura o contador decrescente
    const spotsInterval = setInterval(() => {
      setAvailableSpots((prev) => {
        if (prev <= 1) {
          return 1; // Para em 1 para manter urgência
        }
        // Decresce entre 1-3 vagas aleatoriamente a cada intervalo
        const decrease = Math.floor(Math.random() * 3) + 1;
        return Math.max(1, prev - decrease); // Garante que nunca fique menor que 1
      });
    }, 5000); // 5 segundos entre cada decremento

    return () => clearInterval(spotsInterval);
  }, []);

  // Controla as notificações de novos membros no Telegram
  useEffect(() => {
    const showNotification = () => {
      const randomIndex = Math.floor(
        Math.random() * brazilianNames.names.length,
      );
      const selectedName = brazilianNames.names[randomIndex].name;
      setCurrentNotification({ name: selectedName, visible: true });
      setTimeout(() => {
        setCurrentNotification((prev) => ({ ...prev, visible: false }));
      }, 1500);
    };
    const initialTimeout = setTimeout(showNotification, 3000);
    const notificationInterval = setInterval(() => {
      showNotification();
    }, 10000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);
  return (
    <div className="safe-area-inset-x safe-area-inset-y flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-purple-300 to-rose-200 px-4 py-8 sm:px-6">
      <div className="xs:max-w-sm w-full max-w-xs space-y-4 text-center sm:max-w-md sm:space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo-promosdamih.jpeg"
            alt="Promos da Mih"
            width={100}
            height={100}
            className="rounded-full shadow-lg sm:h-[140px] sm:w-[140px]"
          />
        </div>

        {/* Título com efeito de pulsação */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="animate-grow-shrink mobile-small-title text-3xl leading-tight font-bold text-gray-900 sm:text-5xl">
            A Black Friday
            <br />
            está chegando!
          </h1>

          <p className="mobile-small xs:px-2 xs:text-base px-1 text-sm leading-relaxed text-gray-600 sm:px-0 sm:text-lg">
            Prepare-se para receber as melhores
            <br />
            promoções do maior evento do ano.
          </p>
        </div>

        {/* Botões de contato */}
        <div className="space-y-3">
          {/* Botão do Telegram */}
          <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xl transition-shadow duration-300 active:shadow-lg sm:rounded-3xl sm:p-4 sm:hover:shadow-2xl">
            <a
              href="https://t.me/promosdamih"
              target="_blank"
              rel="noopener noreferrer"
              className="group touch-target flex w-full items-center justify-between rounded-xl p-2 text-left transition-all duration-200 select-none active:bg-gray-100 sm:rounded-2xl sm:hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0088cc] shadow-lg sm:h-10 sm:w-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-white sm:h-5 sm:w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 2.1 11.75c-1.21-.35-1.22-1.22.26-1.81L21.26 2.2c1.01-.4 1.9.24 1.48 1.86L20.18 17.9c-.18.97-.72 1.21-1.47.75L14.51 16.5 11.9 19c-.39.39-.71.71-1.44.71-.94 0-.78-.35-.78-.78z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-900 sm:text-base">
                    Entre no grupo do Telegram
                  </div>
                  <div className="text-xs font-bold text-[#0088cc] uppercase">
                    GRUPO VIP Vagas limitadas!
                  </div>
                </div>
              </div>
              <svg
                className="h-4 w-4 text-gray-400 transition-colors duration-200 group-active:text-blue-500 sm:h-5 sm:w-5 sm:group-hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Seção de Escassez */}
        <div
          className={`space-y-2 rounded-2xl p-3 text-center sm:p-5 ${
            availableSpots <= 50 ? "animate-pulse" : ""
          }`}
        >
          <div className="text-xs font-bold tracking-widest text-red-600 uppercase sm:text-sm">
            DISPONÍVEL
          </div>
          <div
            className={`font-black ${
              availableSpots <= 50
                ? "animate-bounce text-3xl text-red-800 sm:text-4xl"
                : "text-2xl text-red-700 sm:text-3xl"
            }`}
          >
            {availableSpots} {availableSpots === 1 ? "VAGA" : "VAGAS"}
          </div>
          <div className="text-sm font-semibold text-gray-700 sm:text-base">
            Já somos + 20 mil membros.
          </div>
          {availableSpots <= 20 && (
            <div className="animate-pulse text-xs font-bold text-red-800 uppercase">
              ⚠️ ÚLTIMAS VAGAS!
            </div>
          )}
        </div>

        {/* Texto e imagem dos merchants */}
        <div className="space-y-2 sm:space-y-2">
          <p className="text-base font-semibold text-gray-700 sm:text-lg">
            Conexões diretas com:
          </p>

          <div className="flex justify-center rounded-xl bg-white p-3 shadow-lg sm:rounded-2xl sm:p-4">
            <Image
              src="/merchant.png"
              alt="Merchants parceiros"
              width={260}
              height={60}
              className="h-auto w-full max-w-[260px] object-contain sm:max-w-[300px]"
            />
          </div>
        </div>
      </div>

      {/* Notificação de Novo Membro Telegram */}
      <div
        className={`fixed right-4 bottom-4 z-50 transform transition-all duration-700 ease-in-out ${
          currentNotification.visible
            ? "translate-x-0 scale-100 opacity-100"
            : "translate-x-full scale-95 opacity-0"
        }`}
      >
        <div className="flex max-w-sm items-center space-x-3 rounded-lg border-l-4 border-[#0088cc] bg-white px-4 py-3 shadow-xl">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc]">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 2.1 11.75c-1.21-.35-1.22-1.22.26-1.81L21.26 2.2c1.01-.4 1.9.24 1.48 1.86L20.18 17.9c-.18.97-.72 1.21-1.47.75L14.51 16.5 11.9 19c-.39.39-.71.71-1.44.71-.94 0-.78-.35-.78-.78z" />
              </svg>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-[#0088cc]">
              Telegram Promos da Mih
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-bold text-gray-900">
                {currentNotification.name}
              </span>{" "}
              entrou no grupo
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#0088cc]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
