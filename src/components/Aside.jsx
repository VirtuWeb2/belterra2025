import { RadioTower, SeparatorVerticalIcon } from "lucide-react";
import React from "react";
import { Fragment } from "react";
import { Play } from "lucide-react";
import { useEffect ,useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import './aside.css'

import TvPage from "./TvPage";



const Aside = ({ tvPosts, uniqueNews }) => {
  const [indexVideo, setIndexVideo] = useState(null);
  const [ad, setAd] = useState([]);
  const baseUrl ="https://api-sites-en.vercel.app";
    const { pathname } = useLocation();

 const getAd = async () => {
    try {
      const res = await axios.get(`${baseUrl}/ad`);
      setAd(res.data);
    } catch (err) {
      console.log(err);
    }
  };
   useEffect(() => {
    getAd();
  }, [setAd]);
   const filterBannerPosition = (position) => {
    if (!Array.isArray(ad) || ad.length === 0) {
      return [];
    }
    return ad.filter((item) => item.position === position);
  };

  const filteredBanner = filterBannerPosition("banner side");


  return (
    <aside className="mt-[2rem] flex flex-col asideCard" >
      {/* {tvPosts.length > 0 && (
        <div
          className="flex flex-col gap-[1rem]"
          style={{
            order: uniqueNews ? "2" : "1",
            marginBottom: uniqueNews ? "4rem" : "",
          }}
        >
          <h3 className="text-neutral-800 text-[3rem] font-semibold mb-[1.2rem]">
            TV É Notícia Belém
          </h3>
          {tvPosts?.map((p, index) => {
            return (
              <Fragment key={p.id}>
                {indexVideo != index && (
                  <div
                    className="relative"
                    onClick={() => setIndexVideo(index)}
                  >
                    <img
                      src={p.cover}
                      className="max-h-[200px] min-h-[200px] md:max-h-[400px] md:min-h-[400px] lg:max-h-[200px] lg:min-h-[200px] w-full object-cover rounded-md"
                      alt={p.title}
                      title={p.title}
                      loading="lazy"
                    />
                    <button className="bg-red-700 p-[1rem] px-[2rem] absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4  rounded-[1rem] ">
                      <Play className="fill-white text-white" />
                    </button>
                  </div>
                )}
                 {indexVideo == index && (() => {
                  const src = String(p.link || "")
                    .replace("watch?v=", "embed/")
                    .replace("shorts", "embed");
                  console.log("TV post link:", p.link, " -> iframe src:", src);
                  return (
                    <iframe
                      key={p.id}
                      id="ytplayer"
                      width="100%"
                      height="400"
                      allowFullScreen
                      frameBorder="0"
                      title={p.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      src={src}
                      className="rounded-[1rem] max-md:h-[200px] md:h-[400px] lg:h-[200px]"
                    ></iframe>
                  );
                })()}
              </Fragment>
            );
          })}
        </div>
      )} */}
      <div
        style={{ order: uniqueNews ? "1" : "2" }}
        className={`${
          uniqueNews ? "mb-[4rem]" : "mt-[4rem]  lg:sticky"
        } top-8 max-lg:mb-[4rem]`}
      >
        <div className="flex gap-[1rem] items-center text-red-700">
          <RadioTower className="mb-[1rem]" />
          <h3 className="text-[3rem] font-semibold leading-[1.115]  mb-[1.2rem]">
            Mantenha-se conectado
          </h3>
        </div>
        
          <a
          href="https://www.facebook.com/profile.php?id=100095424219339"
          target="_blank"
          className="bg-blue-800 flex gap-[1rem] text-[1.6rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
            />
          </svg>
          Siga nossa página
        </a>
        <a
          href="https://www.instagram.com/enoticiapara/"
          target="_blank"
          className="bg-gradient-to-tr from-pink-500 to-orange-500 flex gap-[1rem] text-[1.6rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
            />
          </svg>
          Siga nosso instagram
        </a>
          <a
          href="https://www.facebook.com/profile.php?id=100095424219339&sk=groups"
          target="_blank"
          className="bg-blue-600 from-pink-500 to-orange-500 flex gap-[1rem] text-[1.3rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox facebook"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
          >
            <path
             fill="currentColor"
              d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
            />
          </svg>
          Participe dos nossos grupos
        </a>
          <a
          href="https://x.com/enoticiapara"
          target="_blank"
          className="bg-black  flex gap-[1rem] text-[1.3rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox twitter"
        >
<svg 
 xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 32 32" 
  fill="currentColor"
>
   <path d="m18.2342,14.1624l8.7424-10.1624h-2.0717l-7.591,8.8238-6.0629-8.8238h-6.9929l9.1684,13.3432-9.1684,10.6568h2.0718l8.0163-9.3183,6.4029,9.3183h6.9929l-9.5083-13.8376h.0005Zm-2.8376,3.2984l-.9289-1.3287L7.0763,5.5596h3.1822l5.9649,8.5323.9289,1.3287,7.7536,11.0907h-3.1822l-6.3272-9.05v-.0005Z"/>
</svg>

          Siga-nos no X 
        </a>
          <a
          href="https://www.whatsapp.com/channel/0029Vaz5nS6EquiGd2jMQS3w"
          target="_blank"
          className="bg-green-600 flex gap-[1rem] text-[1.3rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox whatsapp"
          >
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" fill="currentcolor"><g><path d="M17.6,6.32A7.85,7.85,0,0,0,12,4,7.94,7.94,0,0,0,5.12,15.89L4,20l4.2-1.1a7.93,7.93,0,0,0,3.79,1h0a8,8,0,0,0,8-7.93A8,8,0,0,0,17.6,6.32ZM12,18.53a6.58,6.58,0,0,1-3.36-.92l-.24-.15-2.49.66.66-2.43-.16-.25A6.6,6.6,0,0,1,16.66,7.27a6.65,6.65,0,0,1,2,4.66A6.66,6.66,0,0,1,12,18.53Zm3.61-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1a9,9,0,0,1-.63.77c-.11.14-.23.15-.43,0a5.33,5.33,0,0,1-2.69-2.35c-.21-.35.2-.33.58-1.08a.38.38,0,0,0,0-.35c0-.1-.45-1.08-.61-1.47s-.32-.33-.45-.34H9.19a.71.71,0,0,0-.53.25A2.19,2.19,0,0,0,8,10.17a3.82,3.82,0,0,0,.81,2.05,8.89,8.89,0,0,0,3.39,3,3.85,3.85,0,0,0,2.38.5,2,2,0,0,0,1.33-.94,1.62,1.62,0,0,0,.12-.94C15.94,13.74,15.81,13.69,15.61,13.59Z"/></g></svg>

          Entre no nosso canal do WhatsApp
        </a>
          <a
          href="https://www.tiktok.com/@enoticia_pa?_t=ZM-8yn8L61WyBE&_r=1"
          target="_blank"
          className="bg-black flex gap-[1rem] text-[1.3rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox whatsapp"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="32" fill="currentColor"><path d="M365.014.667C408.68 0 452.011.333 495.342 0c2.667 51 21 102.999 58.33 138.998 37.332 37 89.997 54 141.328 59.666v134.332c-47.998-1.667-96.33-11.667-139.994-32.333-19-8.667-36.665-19.667-53.998-31-.333 97.332.334 194.665-.666 291.663-2.667 46.666-18 93-44.998 131.332-43.665 64-119.328 105.665-196.992 106.999-47.664 2.666-95.329-10.334-135.994-34.333C55.028 725.658 7.696 652.992.697 574.993c-.667-16.667-1-33.333-.334-49.666 6-63.333 37.332-123.999 85.997-165.332 55.33-47.999 132.66-70.999 204.99-57.332.667 49.333-1.332 98.665-1.332 147.998-33-10.667-71.664-7.667-100.663 12.333-20.999 13.667-36.998 34.666-45.331 58.333-7 17-5 35.666-4.667 53.666 8 54.666 60.664 100.665 116.662 95.665 37.332-.333 72.997-22 92.33-53.666 6.332-11 13.332-22.333 13.665-35.333 3.334-59.666 2-118.998 2.334-178.664.333-134.332-.334-268.33.666-402.328" transform="translate(165 112)"/></svg>
          Siga-nos no TikTok
        </a>
          <a
          href="https://www.youtube.com/@enoticiapara"
          target="_blank"
          className="bg-red-600 flex gap-[1rem] text-[1.3rem] font-semibold p-[1rem] rounded-md items-center text-white mt-[1rem] socBox youtube"
          >
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 26" width="33" fill="#fff"><path d="M19.67,8.14a2,2,0,0,0-1.42-1.43A48.44,48.44,0,0,0,12,6.38a48.44,48.44,0,0,0-6.25.33A2,2,0,0,0,4.33,8.14,21.27,21.27,0,0,0,4,12a21.42,21.42,0,0,0,.33,3.88,2,2,0,0,0,1.42,1.4,48.44,48.44,0,0,0,6.25.33,48.44,48.44,0,0,0,6.25-.33,2,2,0,0,0,1.42-1.4A21.42,21.42,0,0,0,20,12,21.27,21.27,0,0,0,19.67,8.14Zm-9.31,6.25V9.63L14.55,12l-4.19,2.38Z"/></svg>
          Inscreva-se no nosso canal
        </a>
            <TvPage/>
        
        {/* Banners de divulgação */}

        <div
          style={{
            marginTop: "3rem",
            marginBottom: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
            {filteredBanner.map((item, index) => (
              <section key={index} className="banner">
          <Link to={item.link} target="_blank">
            <img src={item.cover} alt="" />
          </Link>  
             </section>
      ))}
        
  

       
    
        </div>
      </div>
    </aside>
  );
};

export default Aside;