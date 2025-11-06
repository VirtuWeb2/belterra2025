import Ad from "@components/ad/ad";
import Aside from "@components/Aside";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header"
import GridNews from "@components/Home/GridNews/GridNews"
import propTypes from "prop-types"
import { Helmet } from "react-helmet";
const Esportes = ({news, loadingNews, loadingTvPosts, tvPosts}) => {

    if(!loadingNews)
  return (
    <>
    <Helmet>
      <title>Esportes | É Notícia Abaetetuba</title>
    </Helmet>
      <Header />
      <Ad/>
      <div
        className="container-width"
        style={{
          minHeight: "200vh",
          display: "grid",
          gridTemplateColumns: "1fr .3fr",
          gap: "4rem"
        }}
      >
        <section id="esportes" className="mt-[3rem]">
          <div className="">
            <h1 className="text-[3.6rem] lg:text-[5rem] font-semibold text-neutral-800">
              Esportes
            </h1>
            <GridNews
              news={news.filter((n) => n.cat === "esportes")}
              cols={3}
            />
          </div>
        </section>
        {!loadingTvPosts && !loadingNews && (
          <Aside tvPosts={tvPosts} uniqueNews={false} />
        )}
      </div>
        <Footer />
    </>
  );
}

Esportes.propTypes = {
  news: propTypes.array,
  loadingNews: propTypes.bool
} 

export default Esportes