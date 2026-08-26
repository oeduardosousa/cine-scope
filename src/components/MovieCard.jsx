import { Heart } from "lucide-react";

function MovieCard({ movie, onMovieClick, onToggleWatchlist, isInWatchlist }) {
  const title = movie.title || movie.name;

  const releaseDate = movie.release_date || movie.first_air_date;

  return (
    <article
      onClick={() => onMovieClick(movie)}
      style={{ "--card-index": movie.cardIndex || 0 }}
      className="movie-card cursor-pointer overflow-hidden rounded-xl border border-transparent bg-slate-900 transition hover:-translate-y-1 hover:border-slate-700"
    >
      <div className="relative">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster de ${title}`}
            className="aspect-2/3 w-full object-cover"
          />
        ) : (
          <div className="flex aspect-2/3 w-full items-center justify-center bg-slate-800 text-slate-500">
            Sem poster
          </div>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleWatchlist(movie);
          }}
          className="absolute right-3 top-3 rounded-full bg-slate-950/80 p-2 text-white backdrop-blur transition hover:scale-110 hover:bg-red-500"
          aria-label={
            isInWatchlist
              ? `Remover ${title} da minha lista`
              : `Adicionar ${title} à minha lista`
          }
        >
          <Heart size={20} fill={isInWatchlist ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold">{title}</h3>

        <div className="mt-1 flex items-center justify-between text-sm text-slate-400">
          <span>{releaseDate ? releaseDate.slice(0, 4) : "N/A"}</span>

          <span>
            ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
