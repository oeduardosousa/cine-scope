function Header({ onHomeClick, onMoviesClick, onSeriesClick, onMyListClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-5">
        <button
          type="button"
          onClick={onHomeClick}
          className="self-start text-2xl font-bold tracking-tight sm:self-auto"
        >
          Cine<span className="text-red-500">Scope</span>
        </button>

        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-slate-300 sm:gap-6">
          <button
            type="button"
            onClick={onHomeClick}
            className="transition hover:text-white"
          >
            Home
          </button>

          <button
            type="button"
            onClick={onMoviesClick}
            className="transition hover:text-white"
          >
            Filmes
          </button>

          <button
            type="button"
            onClick={onSeriesClick}
            className="transition hover:text-white"
          >
            Séries
          </button>

          <button
            type="button"
            onClick={onMyListClick}
            className="transition hover:text-white"
          >
            Minha Lista
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
