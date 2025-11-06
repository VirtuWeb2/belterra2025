import Ad from "@components/ad/ad";
import Aside from "@components/Aside";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import GridNews from "@components/Home/GridNews/GridNews";
import propTypes from "prop-types";
import { Helmet } from "react-helmet";
const Foco = ({ news, loadingNews, tvPosts, loadingTvPosts }) => {
  if (!loadingNews)
    return (
      <>
      <Helmet>
        <title>Foco | É Notícia Abaetetuba</title>
      </Helmet>
        <Header />
        <Ad/>
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
            <div>
              <h1 className="text-[3.6rem] lg:text-[5rem] font-semibold text-neutral-800">
                Foco
              </h1>
              <GridNews news={news.filter((n) => n.cat === "foco")} cols={3} />
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

Foco.propTypes = {
  news: propTypes.array,
  loadingNews: propTypes.bool,
};

export default Foco;
