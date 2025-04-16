import { useFireworks } from "../hooks/useFireworks";

export const UI = () => {
  const addFirework = useFireworks((state) => state.addFirework);

  return (
    <section className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute top-4 left-4 md:top-8 md:left-14 opacity-0 animate-fade-in-down animation-delay-200">
        <a href="/" target="_blank">
          <img
            src="/images/logo.svg"
            alt="Sky Adventure logo"
            className="w-20 h-20 object-contain"
          />
        </a>
      </div>
      <div className="absolute left-4 md:left-15 -translate-x-1/2 -rotate-90 flex items-center gap-4 animation-delay-1500 animate-fade-in-down opacity-0">
        <div className="w-20 h-px bg-white/60"></div>
        <p className="text-white/60 text-xs">Make your dreams come true</p>
      </div>
      <div
        className={`p-4 flex flex-col items-center gap-2 md:gap-4 mt-[50vh] animate-fade-in-up opacity-0 animation-delay-1000`}
      >
        <h1 className="bold text-white/80 text-4xl md:text-5xl font-extrabold text-center">
          Sky Adventure
        </h1>
        <p className="text-white/70 text-sm">
          Discover our amazing fireworks collection
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => addFirework({ theme: "classic" })}
            className="bg-white rounded-full px-8 py-2 grayscale hover:filter-none hover:bg-white/20 hover:text-white transition-colors duration-400 cursor-pointer"
          >
            🎆 Classic
          </button>
          <button
            onClick={() => addFirework({ theme: "love" })}
            className="bg-white rounded-full px-8 py-2 grayscale hover:filter-none hover:bg-white/20 hover:text-white transition-colors duration-400 cursor-pointer"
          >
            💖 Love
          </button>
          <button
            onClick={() => addFirework({ theme: "sea" })}
            className="bg-white rounded-full px-8 py-2 grayscale hover:filter-none hover:bg-white/20 hover:text-white transition-colors duration-400 cursor-pointer"
          >
            🌊 Sea
          </button>
        </div>
        <p className="text-white/70 text-sm text-center">
          Press on the button of your choice to start the <b>fireworks show</b>
        </p>
      </div>
    </section>
  );
};
