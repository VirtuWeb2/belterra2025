import { Search } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import './header.css'


const Header = () => {
  const [menuActive, setMenuActive] = useState(false)
  const location = useLocation().pathname  
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

  useEffect(()=>{
    if(innerWidth >= 1024){
      setMenuActive(true)
    }
  }, [location])

  function resize(){
    if(innerWidth < 1025){
      setMenuActive(false)
    }
    else if(innerWidth >= 1024){
      setMenuActive(true)
    }
  }

  useEffect(()=>{
    window.addEventListener("resize", resize)
    return ()=> window.removeEventListener("resize", resize)
  },[])

  return (
    <header className="cabecalho">
      <img src="/images/ABAETETUBA.png"  alt="" />
      <div className="bg-red-700 py-[1rem] relative header ">
        <nav className="flex container-width items-center">
          <button
            className="lg:hidden"
            onClick={() => setMenuActive(!menuActive)}
          >
            <Menu className="text-white w-[3.6rem] h-[3.6rem]" />
          </button>
          {menuActive && (
            <div
              className="nav-routes max-lg:absolute max-lg:flex-col max-lg:top-[100%] max-lg:left-2/4 max-lg:-translate-x-2/4 z-[3] max-lg:bg-red-700 max-lg:w-full flex lg:gap-[4rem] text-neutral-50 text-[2rem] font-semibold justify-center items-center max-lg:py-[2rem]  textoCabecalho"
              onClick={() => innerWidth < 1024 && setMenuActive(false)}
            >
              <NavLink to={"/"}>Início</NavLink>
              <NavLink to={"/politica"}>Política</NavLink>
              <NavLink to={"/seguranca"}>Segurança</NavLink>
              <NavLink to={"/esportes"}>Esportes</NavLink>
              <NavLink to={"/foco"}>Foco</NavLink>
            </div> 

          )}
            <section>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            </section>
          <Link to={"/pesquisar"} className="ml-auto text-white pesquisar">
            <Search />
          </Link>
          {/* </div> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;