import { Link } from "react-router-dom";
import "./hero.css"
import dayjs from "@utils/dayjs"
import gsap from "gsap"
import { useEffect } from "react";
import { Share2 } from "lucide-react";
const Hero = ({ news, isLoading }) => {

  useEffect(()=>{
    if (!isLoading) {
      gsap.fromTo('[data-animate="noticias-hero"]', {opacity:0, x: -12}, {opacity: 1, x: 0, stagger: .1});
    }
  },[isLoading])
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
  if (!isLoading)
    return (
      <main className="mt-[2rem] mb-[8rem]">
        <div className="grid-1">
          {news.slice(0, 5).map((n, index) => {
            return (
              <Link
                to={`/noticia/${n.id}`}
                key={n.id}
                className="h-fit max-lg:mb-[1rem] max-lg:block"
                data-animate="noticias-hero"
              >
                <img
                  src={n.cover}
                  className={` w-full object-cover rounded-md max-lg:min-h-[200px] max-lg:mb-[1rem] ${
                    index != 0
                      ? " lg:max-w-[200px] lg:min-w-[200px] lg:min-h-[140px] lg:max-h-[140px]"
                      : "md:min-h-[400px] md:max-h-[400px] mb-[1rem] lg:max-h-[300px] lg:min-h-[300px]"
                  }`}
                  alt={n.title}
                  title={n.title}
                  height={200}
                  width={200}
                />
                <div>
                  <div
                    className={`text-[1.4rem] md:text-[2rem] flex gap-[.5rem] capitalize font-semibold text-red-700 mb-[.4rem] ${
                      index != 0 ? "lg:text-[1.5rem]" : "lg:text-[2rem]"
                    }`}
                  >
                    <span>{n.muni}</span>
                    <span>|</span>
                    <span>{n.cat}</span>
                  </div>
                  <h1 className="text-neutral-800">{n.title}</h1>
                  {index === 0 && (
                    <p
                      className="text-[2rem] leading-9"
                      dangerouslySetInnerHTML={{
                        __html: n.desc.substring(0, 160) + "...",
                      }}
                    ></p>
                  )}
                  {/* <span className="text-[1.2rem] lg:text-[1.5rem] max-md:text-[2rem] font-medium mt-[.8rem] block first-letter:capitalize text-neutral-600">
                    {dayjs(n.date, { format: "YYYY-MM-DD" }).format(
                      "dddd, D [de] MMMM [de] YYYY"
                    )}
                  </span> */}
                  <div className="mt-[1.2rem] flex gap-[.5rem] justify-end items-center">
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
                </div>
              </Link>
            );
          })}
        </div>
        {/* <div className="grid-2 ">
          {news.slice(4, 7).map((n, index) => {
            return (
              <div key={n.id}>
                <img
                  src={n.cover}
                  className={`w-full object-cover mb-[1rem] rounded-md max-h-[260px] min-h-[260px]`}
                />
                <div>
                  <span
                    className={`capitalize font-semibold text-red-700 text-[1.6rem]`}
                  >
                    {n.cat}
                  </span>
                  <h1 className="text-neutral-800 text-[2.4rem] font-semibold">{n.title}</h1>
                </div>
              </div>
            );
          })}
        </div> */}
      </main>
    );
};

export default Hero;
