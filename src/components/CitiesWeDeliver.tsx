import React from "react";
import "./CitiesWeDeliver.css"; // keep the CSS if you want animations

// const cities = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Mtito Andei", "Voi"];

export const CitiesWeDeliver: React.FC = () => {
  return (
    <div className="cities-delivery-section py-10 text-center">
      <h2 className="delivery-title text-3xl  font-bold mb-6">We Deliver To this towns </h2>
      {/* <div className="cities-row flex justify-center gap-8 flex-wrap">
        {cities.map((city, index) => (
          <div
            key={index}
            className="city-name px-2 py-2 text-black text-sm rounded-lg shadow-md"
          >
            {city}
          </div> */}
        {/* ))} */}
      {/* </div> */}
    </div>
  );
};

export default CitiesWeDeliver;
