import React from "react";

import linksEn from "@components/Footer/enMunicipais.js";

const CarouselLinks = () => {
  // Duplicamos a lista para criar o efeito contínuo
  const doubledList = [...linksEn, ...linksEn,...linksEn,...linksEn];

  return (
    <div className="relative overflow-hidden bg-gray-100 py-4 carousel">
      <div className="flex animate-scroll gap-8 carousel ">
        {doubledList.map((linken, index) => (
          <a
            key={index}
            href={linken.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold hover:underline whitespace-nowrap"
          >
            {linken.name}
          </a>
        ))}
      </div>
    </div>
  );
};
export default CarouselLinks;