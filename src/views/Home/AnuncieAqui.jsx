import Aside from "@components/Aside";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header";
import { useEffect } from "react";
import { Helmet } from "react-helmet";


const AnuncieAqui = ({loadingTvPosts, tvPosts}) => {
  useEffect(()=>{
    scrollTo(0,0)
  },[])
  return (
    <>
    <Helmet>
        <title>Anuncie aqui | É Notícia Abaetetuba</title>
    </Helmet>
      <Header />
      <div
        className="container-width"
        style={{
          minHeight: "200vh",
        }}
      >
        <section className="mt-[4rem]">
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/anuncie-aqui.svg"
              className="lg:w-[30%] mb-[1.2rem]"
              alt=""
            />
            <h1 className="text-[3.6rem] lg:text-[5rem] font-semibold  uppercase text-red-700">
              Quem Divulga Cresce!
            </h1>
            <p className="text-[1.6rem] lg:text-[2rem] max-w-[60ch] text-center mt-[.8rem] leading-[1.4]">
              Coloque sua marca em destaque em um dos portais de notícias mais
              influentes do norte do Brasil. Aproveite a chance de alcançar um
              público amplo e qualificado. Entre em contato agora mesmo através
              do Whatsapp
              <span className="font-semibold"> (91) 982240561</span> ou através
              do email:{" "}
              <span className="font-semibold">contato@enoticiapara.com.br</span>
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=5591982240561&text=Quero+anunciar+no+É+Notícia+Abaetetuba&type=phone_number&app_absent=0"
              className="bg-slate-900 p-[1.5rem] px-[2rem] font-medium rounded-md text-white text-[2rem] mt-[1.22rem]"
            >
              Quero anunciar!
            </a>
          </div>
        </section>
        {/* {!loadingTvPosts && (
          <Aside tvPosts={tvPosts} uniqueNews={false} />
        )} */}
      </div>
      <Footer />
    </>
  );
};

export default AnuncieAqui;
