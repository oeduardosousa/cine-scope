import { useEffect, useState } from "react";

function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search.trim()) {
      return undefined;
    }

    const timer = setTimeout(() => {
      onSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, onSearch]);

  function handleSubmit(event) {
    event.preventDefault();

    onSearch(search);
  }

  function handleClear() {
    setSearch("");
    onSearch("");
  }

  return (
    <section className="border-b border-slate-800 bg-slate-900 px-6 py-8">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Digite o nome de um filme..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none placeholder:text-slate-500 focus:border-red-500"
            />

            {search && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-red-500 px-6 py-3 font-semibold transition hover:bg-red-600"
          >
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Search;
