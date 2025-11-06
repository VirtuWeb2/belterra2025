import React from "react";
import linksEn from "./enMunicipais";
import "./footer.css"
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className=" mt-auto footer">
      <div className="h-[1px] bg-neutral-800"></div>
      <div className="container-width flex flex-col items-center py-[4rem] ">
        <img src="/images/logo.png" width={128} className="mb-[2rem]" alt="" />
        <div className="flex text-neutral-50 text-[2rem] font-semibold gap-[1.2rem] mb-[.8rem]">
          {/* <span>Termos de uso</span> */}
          <Link to={"/anuncie-aqui"}>Anuncie aqui</Link>
          {/* <span>Fale conosco</span> */}
        </div>
        <p className="text-neutral-300 text-[1.5rem]">
          {" "}
          &copy; É Notícia Pará 2025. Todos os direitos reservados para{" "}
          <span className="text-neutral-300">É Notícia Pará</span>
        </p>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
