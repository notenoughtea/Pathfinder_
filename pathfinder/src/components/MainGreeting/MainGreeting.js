import React, { useEffect } from "react";
import { Link } from "react-scroll";
import Timelapse from "../video/timelapse.mp4";
import FindPath from "../OneCard/FindPath/FindPath";
import axios from "axios";

export default function SimpleTooltips() {
  useEffect(() => {
    axios.post("/background").then((res) => {
      setBg(res.data);
    });
  }, []);

  return (
    <div className="mainContainer">
      <div className="intro">
        <div className="intro__media">
          <video className="intro_media_video" autoPlay loop muted>
            <source src={Timelapse} type="video/mp4" />
          </video>
        </div>
        <div className="intro__content">
          <Link
            to="mapContainer"
            style={{ cursor: "pointer" }}
            smooth={true}
            duration={100}
          >
            <FindPath />
          </Link>
        </div>
      </div>
    </div>
  );
}
