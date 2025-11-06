import axios from "axios";
import './ad.css'
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Ad = () => {
   const [ad, setAd] = useState([]);
    const baseUrl = "https://api-sites-en.vercel.app";
      const getAd = async () =>{
        try {
          const res = await axios.get(`${baseUrl}/ad`);
          setAd(res.data);
           } catch (err) {
         console.log("Erro ao buscar anúncios:", err);
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
      
        const filteredBanner = filterBannerPosition("banner header");
      return(
             <div className="anuncio flex justify-center gap-x-8 mt-118 ">
             {filteredBanner.map((item, index) => (
               <div key={index} className="ad">
             <Link to={item.link} target="_blank" rel="noopener noreferrer">
                            <img src={item.cover} alt="Banner publicitário" />
                          </Link>
                                </div>
                      ))}
                      </div>

      )


    }
    export default Ad