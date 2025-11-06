import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoBox = ({ link, title }) => {
  // Extrai o ID do vídeo do YouTube
  const match = link?.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]+)/);
  const videoId = match ? match[1] : null;

  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        border: "2px solid #000",
        overflow: "hidden",
        borderRadius: "8px",
        margin: "2rem auto"
      }}
    >
      {videoId ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "Vídeo"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ textAlign: "center", paddingTop: "40%" }}>
          Nenhum vídeo válido
        </p>
      )}
    </div>
  );
};

export default function TvPage() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get("https://api-sites-en.vercel.app/tv")
      .then(res => {
        if (res.data.length > 0) {
          // pega o último vídeo cadastrado
          setVideo(res.data[res.data.length - 1]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!video) return <p style={{textAlign:"center"}}>Carregando vídeo...</p>;

  return (
    <div>
      
      <VideoBox link={video.link} title={video.title} />
    </div>
  );
}