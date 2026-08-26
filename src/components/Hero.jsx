import { useEffect, useState } from "react";

import { getMovieDetails, getSeriesDetails } from "../services/tmdb";

function Hero({ featured, contentType, onMovieClick }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!featured || featured.media_type !== contentType) {
      setDetails(null);
      return;
    }

    setDetails(null);

    async function loadFeaturedDetails() {
      try {
        const data =
          contentType === "tv"
            ? await getSeriesDetails(featured.id)
            : await getMovieDetails(featured.id);

        setDetails(data);
      } catch (error) {
        console.error("Erro ao carregar detalhes do destaque:", error);
      }
    }

    loadFeaturedDetails();
  }, [featured, contentType]);

  if (!featured || featured.media_type !== contentType) {
    return null;
  }

  const media = details || featured;

  const title = media.title || media.name || "Título indisponível";

  const releaseDate = media.release_date || media.first_air_date;

  const year = releaseDate ? releaseDate.slice(0, 4) : null;

  const isSeries = contentType === "tv";

  return (
    <section className="relative overflow-hidden">
      {media.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
          alt=""
          className="hero-image absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-slate-950/80" />

      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <div className="hero-content max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
            Em destaque
          </p>

          <h2 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            {title}
          </h2>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
            {year && <span>📅 {year}</span>}

            <span>⭐ {media.vote_average?.toFixed(1)}</span>

            {!isSeries && media.runtime && <span>⏱️ {media.runtime} min</span>}

            {isSeries && media.number_of_seasons && (
              <span>
                📺 {media.number_of_seasons}{" "}
                {media.number_of_seasons === 1 ? "temporada" : "temporadas"}
              </span>
            )}
          </div>

          <p className="mt-6 max-w-xl leading-relaxed text-slate-300">
            {media.overview || "Descubra mais sobre este título no CineScope."}
          </p>

          <button
            type="button"
            onClick={() => onMovieClick(featured)}
            className="mt-8 rounded-lg bg-red-500 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg hover:shadow-red-950/40"
          >
            Ver detalhes
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
