import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoBox from "./VideoBox/VideoBox";

export default function TvPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("https://api-sites-en.vercel.app/tv")
      .then(res => setVideos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center"}}>
      {videos.length> 0 &&(
        <VideoBox key={videos[0].id} link={videos[0].link}/>
      )}
    </div>
  );
}