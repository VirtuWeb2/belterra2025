import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import GridNews from "@components/Home/GridNews/GridNews";
import propTypes from "prop-types";
import { useState } from "react";
import {Search} from "lucide-react"
import Aside from "@components/Aside";
import { useRef } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
const Pesquisar = ({ news, loadingNews, tvPosts, loadingTvPosts }) => {
  const [searchedNews, setSearchedNews] = useState(null);
  const [titleNews, setTitleNews] = useState("")
  const searchInput = useRef()
  useEffect(()=>{
    searchInput.current.focus()
  },[])
  if (!loadingNews)
    return (
      <>
        <Helmet>
          <title>Pesquisar | É Notícia Abaetetuba</title>
        </Helmet>
        <Header />
        <div
          className="container-width"
          style={{
            minHeight: "200vh",
            display: "grid",
            gridTemplateColumns: "1fr .3fr",
            gap: "4rem",
          }}
        >
          <section id="esportes" className="mt-[4rem]">
            <div className="">
              <h1 className="text-[3.6rem] lg:text-[5rem] font-semibold text-neutral-800">
                Pesquisar notícia
              </h1>
              <div className="relative mt-[.8rem]">
                <input
                  ref={searchInput}
                  type="text"
                  value={titleNews}
                  onChange={({ target }) => {
                    setTitleNews(target.value);
                    if (target.value.length > 0) {
                      setSearchedNews(
                        news.filter((n) =>
                          n.title
                            .toLowerCase()
                            .includes(titleNews.toLowerCase())
                        )
                      );
                    } else {
                      setSearchedNews(null);
                    }
                  }}
                  className="lg:w-[80%] p-[1.4rem] border border-neutral-700 border-opacity-50 rounded-md placeholder:text-neutral-500 text-[1.8rem] outline-none pl-[4rem]"
                  placeholder="Título da notícia"
                />
                <Search className="text-neutral-500 absolute left-4 top-2/4 -translate-y-2/4" />
              </div>
              {searchedNews && (
                <span className="text-[2rem] font-semibold text-neutral-700 mt-[2rem] block">
                  {searchedNews.length} notícias encontradas
                </span>
              )}
              {searchedNews && <GridNews news={searchedNews} cols={3} />}
            </div>
          </section>
          {!loadingTvPosts && !loadingNews && (
            <Aside tvPosts={tvPosts} uniqueNews={false} />
          )}
        </div>
        <Footer />
      </>
    );
};

export default Pesquisar;
