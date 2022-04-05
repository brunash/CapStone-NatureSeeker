import { useState, useEffect } from 'react';
import './Video.scss';
import HomePath from "../../assets/videos/home-path.mp4";
import Nature from "../../assets/videos/Nature.mp4";
import Ocean from "../../assets/videos/Ocean.mp4";
import SearchPark from '../SearchPark';

let videoArray = [ Nature, HomePath ];

export default function Home() {

    const [videos, setVideos] = useState(videoArray);
    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentVideo((currentVideo) => (currentVideo + 1) % videos.length);
        let video = document.getElementById("player");
        video.src = videos[currentVideo];
        video.load();
        video.play();
      }, 12000);

      return () => clearInterval(interval);
    }, [currentVideo]);

    return (
      <>
        <div className="main">
          {/* <video className="main__video" autoPlay loop muted>
                <source src={HomePath} type="video/mp4" />
                
            </video> */}
          <video
            style={
              currentVideo === 0
                ? {
                    transform: "transformX(-100px)",
                    transition: "opacity 3s ease-in-out",
                  }
                : { transition: "opacity 3s ease-in-out" }
            }
            id="player"
            autoPlay
            loop
            muted
            className="main__video"
          >
            <source id="source1" src={videos[currentVideo]} type="video/mp4" />
          </video>

          <SearchPark className="main__search" />
        </div>
      </>
    );
}