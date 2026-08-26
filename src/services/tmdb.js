const API_URL = "https://api.themoviedb.org/3";

const token = import.meta.env.VITE_TMDB_TOKEN;

async function fetchTMDB(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao acessar a API do TMDB.");
  }

  return response.json();
}

export async function getPopularMovies(page = 1) {
  return fetchTMDB(`/movie/popular?language=pt-BR&page=${page}`);
}

export async function getPopularSeries(page = 1) {
  return fetchTMDB(`/tv/popular?language=pt-BR&page=${page}`);
}

export async function searchMovies(query, page = 1) {
  return fetchTMDB(
    `/search/movie?query=${encodeURIComponent(
      query,
    )}&language=pt-BR&include_adult=false&page=${page}`,
  );
}

export async function searchSeries(query, page = 1) {
  return fetchTMDB(
    `/search/tv?query=${encodeURIComponent(query)}&language=pt-BR&page=${page}`,
  );
}

export async function getMovieVideos(movieId) {
  const data = await fetchTMDB(`/movie/${movieId}/videos?language=pt-BR`);

  return data.results;
}

export async function getMovieDetails(movieId) {
  return fetchTMDB(`/movie/${movieId}?language=pt-BR`);
}

export async function getSeriesDetails(seriesId) {
  return fetchTMDB(`/tv/${seriesId}?language=pt-BR`);
}

export async function getSeriesVideos(seriesId) {
  const data = await fetchTMDB(`/tv/${seriesId}/videos?language=pt-BR`);

  return data.results;
}
