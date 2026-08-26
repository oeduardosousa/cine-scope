import { useCallback, useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieSection from "./components/MovieSection";
import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";
import Footer from "./components/Footer";
import MyList from "./components/MyList";

import {
  getPopularMovies,
  getPopularSeries,
  searchMovies,
  searchSeries,
} from "./services/tmdb";

function App() {
  const [movies, setMovies] = useState([]);
  const [homeMovies, setHomeMovies] = useState([]);
  const [homeSeries, setHomeSeries] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [contentType, setContentType] = useState("movie");

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const [showMyList, setShowMyList] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const popularRequestRef = useRef(0);

  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem("cinescope-watchlist");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erro ao carregar Minha Lista:", error);

      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cinescope-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const loadPopular = useCallback(async (type) => {
    const requestId = popularRequestRef.current + 1;

    popularRequestRef.current = requestId;

    try {
      setError("");

      const data =
        type === "movie"
          ? await getPopularMovies(1)
          : await getPopularSeries(1);

      if (requestId !== popularRequestRef.current) {
        return;
      }

      const results = data.results.map((item) => ({
        ...item,
        media_type: type,
      }));

      setMovies(results);
      setPage(data.page);
      setTotalPages(data.total_pages);

      const highlighted =
        results.find(
          (item) =>
            item.backdrop_path && item.overview && item.vote_average >= 7,
        ) || results[0];

      setFeatured(highlighted);
    } catch (error) {
      console.error(error);

      if (requestId === popularRequestRef.current) {
        setError("Não foi possível carregar os títulos.");
      }
    } finally {
      if (requestId === popularRequestRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const loadHome = useCallback(async () => {
    const requestId = popularRequestRef.current + 1;

    popularRequestRef.current = requestId;

    try {
      setError("");

      const [moviesData, seriesData] = await Promise.all([
        getPopularMovies(1),
        getPopularSeries(1),
      ]);

      if (requestId !== popularRequestRef.current) {
        return;
      }

      const popularMovies = moviesData.results.map((item) => ({
        ...item,
        media_type: "movie",
      }));

      const popularSeries = seriesData.results.map((item) => ({
        ...item,
        media_type: "tv",
      }));

      const allPopular = [...popularMovies, ...popularSeries];
      const highlighted =
        allPopular.find(
          (item) =>
            item.backdrop_path && item.overview && item.vote_average >= 7,
        ) || allPopular[0];

      setHomeMovies(popularMovies);
      setHomeSeries(popularSeries);
      setFeatured(highlighted);
    } catch (error) {
      console.error(error);

      if (requestId === popularRequestRef.current) {
        setError("Não foi possível carregar os títulos.");
      }
    } finally {
      if (requestId === popularRequestRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  const handleSearch = useCallback(
    async (search) => {
      const query = search.trim();

      if (!query) {
        setLoading(true);
        setSearchQuery("");

        if (isHome) {
          await loadHome();
        } else {
          await loadPopular(contentType);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          contentType === "movie"
            ? await searchMovies(query, 1)
            : await searchSeries(query, 1);

        const results = data.results.map((item) => ({
          ...item,
          media_type: contentType,
        }));

        setMovies(results);
        setPage(data.page);
        setTotalPages(data.total_pages);
        setSearchQuery(query);

        if (results.length === 0) {
          setError(
            `Nenhum ${
              contentType === "movie" ? "filme" : "série"
            } encontrado para "${query}".`,
          );
        }
      } catch (error) {
        console.error(error);

        setError("Não foi possível realizar a busca.");
      } finally {
        setLoading(false);
      }
    },
    [contentType, isHome, loadHome, loadPopular],
  );

  async function handleLoadMore() {
    if (page >= totalPages) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data = searchQuery
        ? contentType === "movie"
          ? await searchMovies(searchQuery, nextPage)
          : await searchSeries(searchQuery, nextPage)
        : contentType === "movie"
          ? await getPopularMovies(nextPage)
          : await getPopularSeries(nextPage);

      const results = data.results.map((item) => ({
        ...item,
        media_type: contentType,
      }));

      setMovies((currentMovies) => [...currentMovies, ...results]);

      setPage(data.page);
    } catch (error) {
      console.error(error);

      setError("Não foi possível carregar mais títulos.");
    } finally {
      setLoadingMore(false);
    }
  }

  function handleHomeClick() {
    setSelectedMovie(null);
    setShowMyList(false);
    setIsHome(true);
    setContentType("movie");
    setSearchQuery("");
    setLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    loadHome();
  }

  function handleMoviesClick() {
    setSelectedMovie(null);
    setShowMyList(false);
    setIsHome(false);
    setContentType("movie");
    setSearchQuery("");
    setLoading(true);

    loadPopular("movie");
  }

  function handleSeriesClick() {
    setSelectedMovie(null);
    setShowMyList(false);
    setIsHome(false);
    setContentType("tv");
    setSearchQuery("");
    setLoading(true);

    loadPopular("tv");
  }

  function handleMyListClick() {
    setSelectedMovie(null);
    setShowMyList(true);
    setSearchQuery("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleMovieClick(movie) {
    setSelectedMovie({
      ...movie,
      media_type: movie.media_type || contentType,
    });
  }

  function handleCloseDetails() {
    setSelectedMovie(null);
  }

  function handleToggleWatchlist(movie) {
    setWatchlist((currentWatchlist) => {
      const alreadySaved = currentWatchlist.some(
        (item) => item.id === movie.id && item.media_type === movie.media_type,
      );

      if (alreadySaved) {
        return currentWatchlist.filter(
          (item) =>
            !(item.id === movie.id && item.media_type === movie.media_type),
        );
      }

      return [...currentWatchlist, movie];
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header
        onHomeClick={handleHomeClick}
        onMoviesClick={handleMoviesClick}
        onSeriesClick={handleSeriesClick}
        onMyListClick={handleMyListClick}
      />

      {!showMyList && <Search key={contentType} onSearch={handleSearch} />}

      <main>
        {showMyList ? (
          <MyList
            watchlist={watchlist}
            onMovieClick={handleMovieClick}
            onToggleWatchlist={handleToggleWatchlist}
          />
        ) : (
          <>
            <Hero
              key={`${featured?.media_type || contentType}-${featured?.id || "empty"}`}
              featured={featured}
              contentType={featured?.media_type || contentType}
              onMovieClick={handleMovieClick}
            />

            {loading && (
              <p className="py-16 text-center text-slate-400">Carregando...</p>
            )}

            {error && !loading && (
              <p className="py-16 text-center text-red-400">{error}</p>
            )}

            {!loading && !error && isHome && !searchQuery && (
              <>
                <MovieSection
                  movies={homeMovies}
                  title="Filmes populares"
                  onMovieClick={handleMovieClick}
                  onToggleWatchlist={handleToggleWatchlist}
                  watchlist={watchlist}
                />

                <MovieSection
                  movies={homeSeries}
                  title="Séries populares"
                  onMovieClick={handleMovieClick}
                  onToggleWatchlist={handleToggleWatchlist}
                  watchlist={watchlist}
                />
              </>
            )}

            {!loading && !error && (!isHome || searchQuery) && (
              <MovieSection
                movies={movies}
                title={
                  searchQuery
                    ? `Resultados para "${searchQuery}"`
                    : contentType === "movie"
                      ? "Filmes populares"
                      : "Séries populares"
                }
                onMovieClick={handleMovieClick}
                onLoadMore={handleLoadMore}
                loadingMore={loadingMore}
                hasMore={page < totalPages}
                onToggleWatchlist={handleToggleWatchlist}
                watchlist={watchlist}
              />
            )}
          </>
        )}
      </main>

      <Footer />

      <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
    </div>
  );
}

export default App;
