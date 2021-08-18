import ReactWeather, { useOpenWeather } from "react-open-weather";
import style from "./style.module.css";

const customStyles = {
  FontFamily: "Helvetica",
  gradientStart: "#0181C2",
  gradientMid: "#04A7F9",
  gradientEnd: "#4BC4F7",
  locationFontColor: "#FFF",
  todayTempFontColor: "#FFF",
  borderRadius: "0px",
  forecastSeparatorColor: "#DDD",
};

export default function Weather({ lat, lng, title }) {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: "6fa81219c50bf4b0696f1255f2872a84",
    lat: lat,
    lon: lng,
    lang: "ru",
    unit: "metric",
  });

  return (
    <>
      <ReactWeather
        theme={customStyles}
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={title}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </>
  );
}
