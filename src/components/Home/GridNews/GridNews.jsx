import dayjs from "@utils/dayjs";
import gsap from "gsap";
import { Share2 } from "lucide-react";
// import { MessageCircle } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ScrollTrigger from "gsap/ScrollTrigger";
import propTypes from "prop-types";
import "./gridNews.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * props:
 * - news: array de notícias [{id, title, cover, date}]
 * - title: título do bloco
 * - isLoading: boolean
 * - cols: número de colunas do grid
 * - children: nó opcional
 * - mode: "infinite" | "paged"  (default: "paged")
 * - pageSize: itens por página (default: 12)
 */
const GridNews = ({ news = [], title, isLoading, cols = 3, children, mode = "paged", pageSize = 12 }) => {
  // ---------- estado de paginação ----------
  const [page, setPage] = useState(1);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(news.length / pageSize)), [news.length, pageSize]);

  // ---------- estado de infinite scroll (se usar) ----------
  const [limitNews, setLimitNews] = useState(pageSize);

  function sharePopup(url, width, height) {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const left = Math.max(0, (screenWidth - width) / 2);
    const top = Math.max(0, (screenHeight - height) / 2);

    window.open(
      url,
      "_blank",
      `popup=1,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`
    );
  }

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        "[data-animate='grid-noticias']",
        { opacity: 0, x: -12 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".grid-noticias-container",
            start: "-30% 50%",
            end: "-30% 50%",
          },
        }
      );
    }
  }, [isLoading, page, limitNews]);

  // ---------- infinite scroll handler (só ativa se mode === "infinite") ----------
  useEffect(() => {
    if (mode !== "infinite") return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 200 && limitNews < news.length) {
        setLimitNews((prev) => prev + pageSize);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode, limitNews, news.length, pageSize]);

  // ---------- dados a renderizar ----------
  const items = useMemo(() => {
    if (mode === "infinite") {
      return news.slice(0, limitNews);
    }
    // paged
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return news.slice(start, end);
  }, [mode, news, page, pageSize, limitNews]);

  if (isLoading) return null;

  return (
    <section className="mb-[8rem] grid-noticias-container">
      <div>
        <h1
          className="text-[3rem] leading-[1.215] lg:text-[6rem] font-bold mb-[1.2rem] text-neutral-800 col-span-full"
          data-animate="grid-noticias"
        >
          {title}
        </h1>

        <div
          className="grid-noticias grid gap-[2rem]"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {items.map((n) => (
            <Link
              to={`/noticia/${n.id}`}
              key={n.id}
              className="min-h-[360px] flex flex-col"
              data-animate="grid-noticias"
            >
              <img
                src={n.cover}
                className="max-h-[200px] min-h-[200px] w-full rounded-md shadow-md mb-[.8rem] object-cover"
                alt={n.title}
                title={n.title}
                width={200}
                height={200}
                loading="lazy"
              />

              <h2 className="text-[2rem] font-semibold leading-[1.215]">{n.title}</h2>

              {/* Se quiser a data: 
              <span className="text-[1.5rem] font-medium mt-[.8rem] block first-letter:capitalize text-neutral-600">
                {dayjs(n.date, { format: "YYYY-MM-DD" }).format("dddd, D [de] MMMM [de] YYYY")}
              </span> 
              */}

              <div className="mt-auto flex gap-[.5rem] justify-end items-center">
                <button
                  aria-label="Compartilhar notícia no Facebook"
                  title="Compartilhar notícia no Facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `${location.origin}/noticia/${n.id}`
                    )}`;
                    sharePopup(shareUrl, 800, 600);
                  }}
                >
                  <img src="/icons/facebook.svg" width={24} height={24} alt="Facebook" />
                </button>

                <button
                  aria-label="Compartilhar notícia no WhatsApp"
                  title="Compartilhar notícia no WhatsApp"
                  onClick={(e) => {
                    e.preventDefault();
                    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `${n.title}\n\n${location.origin}/noticia/${n.id}`
                    )}`;
                    sharePopup(shareUrl, 800, 600);
                  }}
                >
                  <img src="/icons/whatsapp.svg" width={24} height={24} alt="WhatsApp" />
                </button>

                <button
                  className="text-neutral-600"
                  aria-label="Compartilhar notícia"
                  title="Compartilhar notícia"
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigator.share) {
                      navigator
                        .share({
                          url: `${location.origin}/noticia/${n.id}`,
                          title: n.title,
                        })
                        .catch(() => {});
                    } else {
                      // fallback: abre WhatsApp
                      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `${n.title}\n\n${location.origin}/noticia/${n.id}`
                      )}`;
                      sharePopup(shareUrl, 800, 600);
                    }
                  }}
                >
                  <Share2 width={24} height={24} />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Controles de paginação (só aparecem no modo paged) */}
        {mode === "paged" && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              className="px-3 py-2 rounded-md border"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              « Primeiro
            </button>
            <button
              className="px-3 py-2 rounded-md border"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              ‹ Anterior
            </button>

            <span className="px-4 select-none">
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>

            <button
              className="px-3 py-2 rounded-md border"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Próxima ›
            </button>
            <button
              className="px-3 py-2 rounded-md border"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              Última »
            </button>
          </div>
        )}

        {children}
      </div>
    </section>
  );
};

GridNews.propTypes = {
  news: propTypes.array,
  title: propTypes.string,
  isLoading: propTypes.bool,
  cols: propTypes.number,
  children: propTypes.element,
  mode: propTypes.oneOf(["infinite", "paged"]),
  pageSize: propTypes.number,
};

export default GridNews;