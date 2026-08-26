import MovieCard from "./MovieCard";

function MovieSection({
  movies,
  title,
  onMovieClick,
  onLoadMore,
  loadingMore,
  hasMore,
  onToggleWatchlist,
  watchlist,
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.media_type || "movie"}-${movie.id}`}
            movie={{ ...movie, cardIndex: index % 8 }}
            onMovieClick={onMovieClick}
            onToggleWatchlist={onToggleWatchlist}
            isInWatchlist={watchlist.some(
              (item) =>
                item.id === movie.id && item.media_type === movie.media_type,
            )}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="rounded-lg bg-slate-800 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lg hover:shadow-black/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingMore ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
    </section>
  );
}

export default MovieSection;
