import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants";
import Title from "./Title/Title";
import style from "./style.module.css";
import Weather from "./Weather/Weather";
import Description from "./Description/Description";
import TabPanel from "./Tabs/Tabs";
import { useSelector } from "react-redux";
import CardRoutes from "../Cardlist/Card/Card";

function OneCard() {
  const { id } = useParams();

  const [one, setOne] = useState("");
  const cards = useSelector((state) => state.cards.cards);

  useEffect(() => {
    axios.post("/one", { id }).then((res) => setOne(res.data));
  }, [id]);

  const { url, title, difficulty, rating, address, length, lng, lat } = one;

  return (
    <div
      className={style.title}
      style={{
        borderRadius: "5px",
      }}
    >
      <Title card={one} img={`${server}${one.url}`} />
      <div className={style.blob}>
        <div className={style.blog}>
          <Description data={one} />
          <Weather lng={lng} lat={lat} title={title}></Weather>
          <TabPanel />
        </div>
        <div className={style.klop}>
          {cards.map((card, i) => (
            <div key={i} className={style.grob}>
              <CardRoutes
                style={{
                  paddingLeft: "205px",
                  marginRight: "auto",
                }}
                item={card}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default OneCard;
