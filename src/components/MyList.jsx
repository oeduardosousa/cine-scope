import { useState } from "react";
import { Film, Heart, Tv } from "lucide-react";

import MovieCard from "./MovieCard";

function MyList({ watchlist, onMovieClick, onToggleWatchlist }) {
  const [filter, setFilter] = useState("all");

  const movies = watchlist.filter((item) => item.media_type === "movie");

  const series = watchlist.filter((item) => item.media_type === "tv");

  const filteredMovies = filter === "series" ? [] : movies;

  const filteredSeries = filter === "movies" ? [] : series;

  const hasResults = filteredMovies.length > 0 || filteredSeries.length > 0;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center gap-3">
        <Heart size={28} fill="currentColor" className="text-red-500" />

        <h2 className="text-3xl font-bold">Minha Lista</h2>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
            filter === "all"
              ? "bg-red-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Todos
        </button>

        <button
          type="button"
          onClick={() => setFilter("movies")}
          className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
            filter === "movies"
              ? "bg-red-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <Film size={17} />
          Filmes
        </button>

        <button
          type="button"
          onClick={() => setFilter("series")}
          className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
            filter === "series"
              ? "bg-red-500 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          <Tv size={17} />
          Séries
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
          <Heart size={42} className="mx-auto text-slate-600" />

          <h3 className="mt-4 text-xl font-semibold">Sua lista está vazia</h3>

          <p className="mt-2 text-slate-400">
            Clique no coração de um filme ou série para adicioná-lo à sua lista.
          </p>
        </div>
      ) : !hasResults ? (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
          {filter === "movies" ? (
            <Film size={42} className="mx-auto text-slate-600" />
          ) : (
            <Tv size={42} className="mx-auto text-slate-600" />
          )}

          <h3 className="mt-4 text-xl font-semibold">
            Nenhum {filter === "movies" ? "filme" : "série"} salvo
          </h3>

          <p className="mt-2 text-slate-400">
            Adicione alguns títulos à sua lista para vê-los aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {filteredMovies.length > 0 && (
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Film size={22} className="text-red-500" />

                <h3 className="text-2xl font-bold">Filmes</h3>

                <span className="text-sm text-slate-500">
                  ({filteredMovies.length})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredMovies.map((movie, index) => (
                  <MovieCard
                    key={`${movie.media_type}-${movie.id}`}
                    movie={{ ...movie, cardIndex: index % 8 }}
                    onMovieClick={onMovieClick}
                    onToggleWatchlist={onToggleWatchlist}
                    isInWatchlist={true}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredSeries.length > 0 && (
            <div>
              <div className="mb-6 flex items-center gap-2">
                <Tv size={22} className="text-red-500" />

                <h3 className="text-2xl font-bold">Séries</h3>

                <span className="text-sm text-slate-500">
                  ({filteredSeries.length})
                </span>
              </div>

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredSeries.map((movie, index) => (
                  <MovieCard
                    key={`${movie.media_type}-${movie.id}`}
                    movie={{ ...movie, cardIndex: index % 8 }}
                    onMovieClick={onMovieClick}
                    onToggleWatchlist={onToggleWatchlist}
                    isInWatchlist={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default MyList;
