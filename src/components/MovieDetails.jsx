import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  getMovieDetails,
  getMovieVideos,
  getSeriesDetails,
  getSeriesVideos,
} from "../services/tmdb";

function MovieDetails({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movie) {
      setDetails(null);
      setTrailer(null);
      return;
    }

    async function loadMediaData() {
      try {
        setLoading(true);

        const [mediaDetails, videos] = await Promise.all([
          movie.media_type === "tv"
            ? getSeriesDetails(movie.id)
            : getMovieDetails(movie.id),

          movie.media_type === "tv"
            ? getSeriesVideos(movie.id)
            : getMovieVideos(movie.id),
        ]);

        const foundTrailer =
          videos.find(
            (video) =>
              video.site === "YouTube" &&
              video.type === "Trailer" &&
              video.official,
          ) ||
          videos.find(
            (video) => video.site === "YouTube" && video.type === "Trailer",
          ) ||
          videos.find(
            (video) => video.site === "YouTube" && video.type === "Teaser",
          );

        setDetails(mediaDetails);
        setTrailer(foundTrailer || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMediaData();
  }, [movie]);

  if (!movie) {
    return null;
  }

  const title = details?.title || details?.name;

  const releaseDate = details?.release_date || details?.first_air_date;

  return (
    <div className="details-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
      <div className="details-panel relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-slate-900 shadow-2xl shadow-black/50">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition hover:rotate-90 hover:bg-red-500"
          aria-label="Fechar detalhes"
        >
          <X size={20} />
        </button>

        {loading && (
          <div className="p-16 text-center text-slate-400">
            Carregando informações...
          </div>
        )}

        {!loading && details && (
          <div>
            <div className="grid md:grid-cols-[280px_1fr]">
              <div>
                {details.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt={`Poster de ${title}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex min-h-100 items-center justify-center bg-slate-800 text-slate-500">
                    Sem poster
                  </div>
                )}
              </div>

              <div className="p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                  {movie.media_type === "tv" ? "Série" : "Filme"}
                </p>

                <h2 className="mt-3 text-4xl font-bold">{title}</h2>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                  {releaseDate && <span>📅 {releaseDate.slice(0, 4)}</span>}

                  <span>⭐ {details.vote_average?.toFixed(1)}</span>

                  {movie.media_type === "movie" && details.runtime && (
                    <span>⏱️ {details.runtime} min</span>
                  )}

                  {movie.media_type === "tv" && details.number_of_seasons && (
                    <span>
                      📺 {details.number_of_seasons}{" "}
                      {details.number_of_seasons === 1
                        ? "temporada"
                        : "temporadas"}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {details.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="mt-8 leading-relaxed text-slate-300">
                  {details.overview || "Sinopse não disponível."}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-800 p-8">
              <h3 className="mb-5 text-2xl font-bold">Trailer</h3>

              {trailer ? (
                <div>
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}?origin=http://localhost:5173`}
                      title={`Trailer de ${title}`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-lg bg-red-500 px-5 py-3 font-semibold transition hover:bg-red-600"
                  >
                    ▶ Assistir no YouTube
                  </a>
                </div>
              ) : (
                <p className="text-slate-500">Trailer não disponível.</p>
              )}
            </div>

            <div className="border-t border-slate-800 p-8">
              <h3 className="text-xl font-bold">Informações</h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {movie.media_type === "movie" && (
                  <>
                    <div>
                      <p className="text-sm text-slate-500">Orçamento</p>

                      <p className="mt-1">
                        {details.budget
                          ? `$${details.budget.toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">Bilheteria</p>

                      <p className="mt-1">
                        {details.revenue
                          ? `$${details.revenue.toLocaleString()}`
                          : "N/A"}
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-sm text-slate-500">Status</p>

                  <p className="mt-1">{details.status || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {movie.media_type === "tv" ? "Episódios" : "País de origem"}
                  </p>

                  <p className="mt-1">
                    {movie.media_type === "tv"
                      ? details.number_of_episodes || "N/A"
                      : details.origin_country?.join(", ") || "N/A"}
                  </p>
                </div>

                {movie.media_type === "tv" && (
                  <div>
                    <p className="text-sm text-slate-500">País de origem</p>

                    <p className="mt-1">
                      {details.origin_country?.join(", ") || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-slate-800 p-6 text-right">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-6 py-3 font-semibold transition hover:bg-slate-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
