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
    const initialTimeout = setTimeout(showNotification, 800);
    const notificationInterval = setInterval(() => {
      showNotification();
    }, 10000);
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(notificationInterval);
    };
  }, []);
  return (
    <div className="safe-area-inset-x safe-area-inset-y flex min-h-screen flex-col items-center justify-center bg-black px-4 py-8 sm:px-6">
      <div className="xs:max-w-sm w-full max-w-xs space-y-4 text-center sm:max-w-md sm:space-y-4">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 animate-pulse">
              <div className="h-full w-full rounded-full bg-black"></div>
            </div>
            <div className="relative p-1">
              <Image
                src="/logo-elly-v2.png"
                alt="Elly Indica"
                width={150}
                height={150}
                className="rounded-full shadow-2xl sm:h-[180px] sm:w-[180px]"
              />
            </div>
          </div>
        </div>

        {/* Título com efeito de pulsação */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="animate-grow-shrink mobile-small-title text-3xl leading-tight font-bold text-white sm:text-5xl">
            A Black Friday
            <br />
            está chegando!
          </h1>

          <p className="mobile-small xs:px-2 xs:text-base px-1 text-sm leading-relaxed text-gray-300 sm:px-0 sm:text-lg">
            Prepare-se para receber as melhores
            <br />
            promoções do maior evento do ano.
          </p>
        </div>

        {/* Botão de Call to Action */}
        <div className="space-y-3">
          {/* Botão Principal do WhatsApp */}
          <div className="relative">
            {/* Efeito de brilho animado no fundo */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#25D366] via-[#1EBE62] to-[#25D366] opacity-75 blur-lg animate-pulse"></div>

            <a
              href="https://chat.whatsapp.com/KFFvxdGfCb02HAH4dR1JNS"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] px-3 py-2.5 text-white shadow-2xl transition-all duration-300 transform select-none active:scale-[0.98] sm:px-6 sm:py-3.5 sm:gap-3 sm:hover:scale-[1.02] sm:hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.6)] overflow-hidden"
            >
              {/* Efeito de shine que passa pelo botão */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

              {/* Ícone do WhatsApp */}
              <div className="relative flex h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-[#25D366]"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.55 4.094 1.515 5.816L0 24l6.377-1.48A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0Zm0 21.6a9.57 9.57 0 0 1-4.89-1.33l-.351-.21-3.79 1.14 1.056-3.9-.229-.36A9.565 9.565 0 0 1 2.4 12c0-5.29 4.31-9.6 9.6-9.6 5.29 0 9.6 4.31 9.6 9.6 0 5.29-4.31 9.6-9.6 9.6Zm5.28-7.148c-.288-.144-1.706-.84-1.971-.936-.264-.096-.456-.144-.648.144-.192.288-.744.936-.912 1.128-.168.192-.336.216-.624.072-.288-.144-1.221-.45-2.332-1.432-.861-.738-1.431-1.65-1.599-1.938-.168-.288-.018-.45.126-.606.129-.129.288-.336.432-.504.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.569-.888-2.148-.234-.562-.468-.486-.648-.495-.168-.009-.36-.018-.552-.018-.192 0-.504.072-.768.36-.264.288-1.011.99-1.011 2.409 0 1.419 1.035 2.787 1.179 2.979.144.192 2.037 3.276 4.941 4.449 2.904 1.173 2.904.783 3.426.738.522-.045 1.71-.693 1.953-1.362.243-.669.243-1.242.18-1.362-.063-.12-.228-.192-.516-.336Z" />
                </svg>
              </div>

              {/* Texto do botão */}
              <div className="relative flex-1 text-left">
                <div className="text-sm font-black tracking-wide sm:text-base sm:text-lg">
                  ENTRAR NO GRUPO VIP
                </div>
                <div className="text-xs font-semibold text-white/90 sm:text-sm">
                  🔥 Vagas Limitadas • Acesso Exclusivo
                </div>
              </div>

              {/* Ícone de seta */}
              <svg
                className="relative h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform duration-300 group-active:translate-x-1 sm:group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          {/* Badge de prova social */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <svg
              className="h-5 w-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="img"
              aria-label="Verificado"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">
              Mais de 1.200 pessoas entraram hoje
            </span>
          </div>
        </div>

        {/* Seção de Escassez */}
        <div
          className={`space-y-2 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-500/20 p-3 text-center sm:p-5 ${
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

        {/* Texto e imagem dos merchants */}
        <div className="space-y-2 sm:space-y-2">
          <p className="text-base font-semibold text-gray-300 sm:text-lg">
            Conexões diretas com:
          </p>

          <div className="flex justify-center rounded-xl bg-white backdrop-blur-sm border border-gray-700/50 p-3 shadow-lg sm:rounded-2xl sm:p-4">
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
        <div className="flex max-w-sm items-center space-x-3 rounded-lg border-l-4 border-[#25D366] bg-gray-800/90 backdrop-blur-sm px-4 py-3 shadow-xl ring-1 ring-white/10">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-700 ring-2 ring-[#25D366]/50">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-gray-300"
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
          <div className="flex-shrink-0">
            <div className="h-2 w-2 animate-pulse rounded-full bg-[#25D366]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
