import Hero from "../../components/Home/Hero/Hero";
import News from "../../components/Home/News/News";
import GridNews from "@components/Home/GridNews/GridNews";
// import Municipais from "@components/Home/Municipais/Municipais";
import Aside from "@components/Aside";
import Ad from "@components/ad/ad"; 
import Loader from "@components/Loader";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer/Footer";
import "/src/index.css";
import { Helmet } from "react-helmet";
import CarouselLinks from "./linksEn.jsx";
const Home = ({ news, loadingNews, loadingTvPosts, tvPosts }) => {
 // if (news && !loadingNews)
    return (
      <>
        <Helmet>
          <title>Início | É Notícia Abaetetuba</title>
          <link
            rel="preload"
            href={news && news[0].cover}
            as="image"
            fetchPriority="high"
          />
        </Helmet>
        <div className="root" style={{ minHeight: "300vh" }}>
          <Header />
          <Ad/>
          <div className="container-home container-width">
            <div className="overflow-hidden">
              <Hero news={news} isLoading={loadingNews} />
                <News 
                news={news?.sort((a, b) => b.id - a.id).slice(0, 20)}
                isLoading={loadingNews}
                title={<h1 className="news-title">Últimas Notícias</h1>}
                />
                
            
              <News
                news={news?.filter((n) => n.cat === "política").slice(0, 20)}
                 isLoading={loadingNews}
                title={<h1 className="news-title">Política</h1>}
              />
              <News
                news={news?.filter((n) => n.cat === "segurança").slice(0, 20)}
                isLoading={loadingNews}
                title={<h1 className="news-title">Segurança</h1>}
              />
              <News
                news={news?.filter((n) => n.cat === "esportes").slice(0, 20)}
                isLoading={loadingNews}
                title={<h1 className="news-title">Esportes</h1>}
              />
                <News
                  news={news?.filter((n) => n.cat === "foco").slice(0, 20)}
                  isLoading={loadingNews}
                  title={<h1 className="news-title">Foco</h1>}
                />

            
            </div>
            {!loadingTvPosts && !loadingNews && (
              <Aside tvPosts={tvPosts} uniqueNews={false} />
            )}
          </div>
          {loadingNews && <Loader />}
        </div>
        {/* <Municipais /> */}
            <CarouselLinks/>
        <Footer />
      </>
    );
};

Home.propTypes = {
  news: propTypes.array,
  loadingNews: propTypes.bool,
  loadingTvPosts: propTypes.bool,
  tvPosts: propTypes.array,
};

export default Home;