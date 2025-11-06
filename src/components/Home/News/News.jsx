import "./news.css";
import dayjs from "@utils/dayjs";
import propTypes from "prop-types";
import { MessageCircle } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Share2 } from "lucide-react";
const News = ({ news, isLoading, title, flex }) => {
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
  function shareNewsFacebook(url, width, height) {
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false },);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  if (!isLoading)
    return (
      <section className={`mb-[8rem] overflow-hidden`}>
        <div className="overflow-hidden">
          <h1 className="text-[3rem] lg:text-[6rem] font-bold mb-[1.2rem] text-neutral-800">
            {title}
          </h1>
          <div className="embla" ref={emblaRef}>
            <div className="embla-container">
              {news.map((n) => {
                return (
                  <Link
                    className={`slide-item flex flex-col h-full min-h-[380px]`}
                    key={n.id}
                    style={{ flex: `0 0 calc(${flex} - 2rem)` }}
                    to={`/noticia/${n.id}`}
                  >
                    <img
                      src={n.cover}
                      alt={n.title}
                      title={n.title}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="min-h-[200px] max-h-[200px] w-full object-cover mb-[1.2rem] rounded-md shadow-md"
                    />
                    <div className="flex gap-[.5rem] capitalize text-red-600 text-[1.6rem] font-semibold mb-[.8rem]">
                      <span className="">{n.muni}</span>
                      <span>|</span>
                      <span>{n.cat}</span>
                    </div>
                    <h1 className="text-[2rem] font-semibold leading-[1.2] text-neutral-800">
                      {n.title}
                    </h1>
                {/*  <span className="text-[1.5rem] font-medium mt-[.8rem] block first-letter:capitalize text-neutral-600">
                      {dayjs(n.date, { format: "YYYY-MM-DD" }).format(
                        "dddd, D [de] MMMM [de] YYYY"
                      )}
                    </span> */}
                    <div className="mt-auto flex gap-[.5rem] justify-end items-center">
                      <button
                        aria-label="Compartilhar notícia no facebook"
                        title="Compartilhar notícia no facebook"
                        onClick={(e) => {
                          e.preventDefault();
                          shareNewsFacebook(
                            `https://www.facebook.com/sharer/sharer.php?u=enoticiapara.com.br/noticia/${n.id}`,
                            800,
                            600
                          );
                        }}
                      >
                        <img
                          src="/icons/facebook.svg"
                          width={24}
                          height={24}
                          alt=""
                        />
                      </button>
                      <button
                        aria-label="Compartilhar notícia no whatsapp"
                        title="Compartilhar notícia no whatsapp"
                        onClick={(e) => {
                          e.preventDefault();
                          shareNewsWhatsapp(
                            `https://api.whatsapp.com/send?text=%0A%0Ahttps://enoticiapara.com.br/noticia/${n.id}`,
                            800,
                            600
                          );
                        }}
                      >
                        <img
                          src="/icons/whatsapp.svg"
                          width={24}
                          height={24}
                          alt=""
                        />
                      </button>
                      {/* <button
                        className="text-neutral-600"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Comentar notícia"
                        title="Comentar notícia"
                      >
                        <MessageCircle />
                      </button> */}
                      <button
                        className="text-neutral-600"
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.share({
                            url: `https://enoticiapara.com.br/noticia/${n.id}`,
                            title: n.title,
                          });
                        }}
                        aria-label="Compartilhar notícia"
                        title="Compartilhar notícia"
                      >
                        <Share2 height={24} width={24} />
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
            <button
              className="absolute left-0 top-[20%] p-[1rem] bg-neutral-900 bg-opacity-60 rounded-full flex items-center justify-center"
              aria-label="Voltar slide"
            >
              <ChevronLeft color="#fff" onClick={scrollPrev} />
            </button>
            <button
              className="absolute right-0 top-[20%] p-[1rem] bg-neutral-900 bg-opacity-60 rounded-full flex items-center justify-center"
              aria-label="Avançar slide"
            >
              <ChevronRight color="#fff" onClick={scrollNext} />
            </button>
          </div>
        </div>
      </section>
    );
};

News.propTypes = {
  news: propTypes.array,
  isLoading: propTypes.bool,
  title: propTypes.string,
};

export default News;
