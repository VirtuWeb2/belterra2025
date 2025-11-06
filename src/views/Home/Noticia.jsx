import Aside from "@components/Aside";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import dayjs from "@utils/dayjs";
import Loader from "@components/Loader";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import gsap from "gsap/all";
import Header from "@components/Header";
import Footer from "@components/Footer/Footer";
import propTypes from "prop-types"
import { Helmet } from "react-helmet";
const Noticia = ({ tvPosts, loadingPosts }) => {
  const { newsId } = useParams();
  const { data: noticia, isFetching: loadingNews } = useQuery(
    "news-by-id",
    async () => {
      return await (
        await axios.get(`https://api-sites-en.vercel.app/news/${newsId}`)
      ).data[0];
    }
  );

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loadingNews) {
      gsap.fromTo(
        "[data-animate='noticia']",
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.1 }
      );
    }
  }, [loadingNews]);

  function shareNewsWhatsapp(url, width, height) {
    const screenWidth = window.screen.width / 2;
    const screenHeight = window.screen.height / 2;
    const left = screenWidth / 2 - width / 2;
    const top = screenHeight / 2 - height / 2;
    window.open(
      url,
      "_blank",
      `
        width=${width},
         height=${height},
         left=${left},
         top=${top},
         `
    );
  }

  if (loadingNews) return <Loader />;
  if (!loadingNews)
    return (
      <>
        <Helmet>
          <title>{noticia?.title.slice(0, 10) + "..."} | É Notícia Abaetetuba</title>
        </Helmet>
        <div className="root" style={{ minHeight: "200vh" }}>
          <Header />
          <section className="mt-[8rem]">
            <div className="container-width noticia-container">
              <div className="mb-[12rem]">
                <h1
                  className="text-[3rem] lg:text-[4rem] 2xl:text-[5rem] font-semibold text-neutral-800 leading-[1.215] mb-[.5rem]"
                  data-animate="noticia"
                >
                  {noticia.title}
                </h1>
                <div className="flex flex-col gap-[.5rem] mb-[1.2rem]">
                  {/* <div className="flex gap-[.5rem]"> */}
                  <h2
                    className="capitalize mb-[1rem]  text-[2rem] font-medium text-red-600"
                    data-animate="noticia"
                  >
                    {noticia.muni} | {noticia.cat}
                  </h2>
                  {/*  <p
                    className="capitalize text-[1.7rem] text-neutral-600"
                    data-animate="noticia"
                  >
                    {dayjs(noticia.date, { format: "YYYY-MM-DD" }).format(
                      "dddd, D [de] MMMM [de] YYYY"
                    )}
                  </p> */}
                  <div
                    className="flex flex-wrap items-center gap-[1rem] mt-[1.2rem]"
                    data-animate="noticia"
                  >
                    <button
                      onClick={() =>
                        shareNewsWhatsapp(
                          `https://api.whatsapp.com/send?text=%0A%0Ahttps://enoticiapara.com.br/noticia/${noticia.id}`,
                          800,
                          600
                        )
                      }
                      className="bg-gradient-to-tr from-green-800 to-green-500 flex gap-[1rem] text-[1.35rem] md:text-[1.6rem] font-semibold p-[1rem] px-[1.5rem] rounded-md items-center text-white shadow-md leading-[1.215]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                        />
                      </svg>
                      Compartilhar
                    </button>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                      target="_blank"
                      className="bg-blue-800 flex gap-[1rem] text-[1.35rem] md:text-[1.6rem] font-semibold p-[1rem] px-[1.5rem] rounded-md items-center text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                        />
                      </svg>
                      Compartilhar
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        location.href
                      )}`}
                      target="_blank"
                      className="bg-neutral-900 flex gap-[1rem] text-[1.35rem] md:text-[1.6rem] font-semibold p-[1rem] px-[1.5rem] rounded-md items-center text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"
                        />
                      </svg>
                      Compartilhar
                    </a>
                  </div>
                </div>
                <img
                  src={noticia.cover}
                  alt=""
                  className="max-h-[60vh] w-full object-cover rounded-md shadow-md mb-[2rem]"
                  data-animate="noticia"
                />
                <div
                  data-animate="noticia"
                  className="noticia-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(noticia.desc),
                  }}
                ></div>
              </div>
              {!loadingPosts && <Aside tvPosts={tvPosts} uniqueNews={true} />}
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
};

Noticia.propTypes = {
  tvPosts: propTypes.array,
  loadingPosts: propTypes.bool
}

export default Noticia;
