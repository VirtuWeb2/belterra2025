import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useQuery } from "react-query";
import { lazy } from "react";
import { Suspense } from "react";
import axios from "axios";
import Home from "../views/Home/Home";
import Noticia from "../views/Home/Noticia";
const Esportes = lazy(() =>import("../views/Home/Esportes"));
const Politica = lazy(() =>import("../views/Home/Politica"));
const Foco = lazy(() =>import("../views/Home/Foco"));
const Seguranca = lazy(() =>import("../views/Home/Seguranca"));
import Loader from "@components/Loader";
import Pesquisar from "../views/Home/Pesquisar";
import AnuncieAqui from "../views/Home/AnuncieAqui";
import { Navigate } from "react-router-dom";

function App() {
  const {
    data: news,
    isLoading: loadingNews,
  } = useQuery(
    "news",
    async () => {
      return (
        await axios.get("https://api-sites-en.vercel.app/news")
      ).data.sort((a, b) => b.id - a.id).filter((n)=> n.muni === "abaetetuba" || n.muni === "pará");
    },
  );

  const { data: tvPosts, isLoading: loadingTvPosts } = useQuery(
    "tv-posts",
    async () => {
      return (await axios.get("https://api-sites-en.vercel.app/tv")).data.sort(
        (a, b) => b.id - a.id
      ).filter(t=> t.muni === "abaetetuba");
    }
  );
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                news={news}
                loadingNews={loadingNews}
                loadingTvPosts={loadingTvPosts}
                tvPosts={tvPosts}
              />
            }
          />
          <Route
            path="/noticia/:newsId"
            element={
              <Noticia tvPosts={tvPosts} loadingPosts={loadingTvPosts} />
            }
          />
          <Route
            path="/esportes"
            element={
              <Suspense fallback={<Loader />}>
                <Esportes
                  news={news}
                  loadingNews={loadingNews}
                  tvPosts={tvPosts}
                  loadingTvPosts={loadingNews}
                />
              </Suspense>
            }
          />
          <Route
            path="/politica"
            element={
              <Suspense fallback={<Loader />}>
                <Politica
                  news={news}
                  loadingNews={loadingNews}
                  tvPosts={tvPosts}
                  loadingTvPosts={loadingNews}
                />
              </Suspense>
            }
          />
          <Route
            path="/foco"
            element={
              <Suspense fallback={<Loader />}>
                <Foco
                  news={news}
                  loadingNews={loadingNews}
                  tvPosts={tvPosts}
                  loadingTvPosts={loadingNews}
                />
              </Suspense>
            }
          />
          <Route
            path="/seguranca"
            element={
              <Suspense fallback={<Loader />}>
                <Seguranca
                  news={news}
                  loadingNews={loadingNews}
                  tvPosts={tvPosts}
                  loadingTvPosts={loadingNews}
                />
              </Suspense>
            }
          />
          <Route
            path="/pesquisar"
            element={
              <Suspense fallback={<Loader />}>
                <Pesquisar
                  news={news}
                  loadingNews={loadingNews}
                  tvPosts={tvPosts}
                  loadingTvPosts={loadingNews}
                />
              </Suspense>
            }
          />
          <Route
            path="/anuncie-aqui"
            element={
              <AnuncieAqui loadingTvPosts={loadingTvPosts} tvPosts={tvPosts} />
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={"/"}/>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
