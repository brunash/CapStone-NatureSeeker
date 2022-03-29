import "./ParkDetails.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ParkDetails(props) {
    const [parkDetails, setParkDetails] = useState(null);
    const service = {
      getNationalPark: async (query) => {
        console.log(query);
        return await axios.get(
          `https://developer.nps.gov/api/v1/parks?q=${query}&api_key=mDB2nzLwrc9Ik9377kfeJwye8n38WzhcUO5TCqzh`
        );
      },

      getRandomNationalParks: async () => {
        return await axios.get(
          `https://developer.nps.gov/api/v1/parks?limit=467&api_key=mDB2nzLwrc9Ik9377kfeJwye8n38WzhcUO5TCqzh`
        );
      },
    };  
 
    const getParkDetails = () => {
    service.getRandomNationalParks().then((response) => {
        let park = response.data.data.find(
        (park) => park.id === props.match?.params.id
      );
      setParkDetails(park);
      console.log(park);
    });
  };

  useEffect(() => {
    getParkDetails();
  }, []);

console.log(parkDetails);

  const showParkDetails = () => {
    return (
      <div className="details">
        {/* <p
          className="details__back"
          style={{ marginTop: "63px" }}
          onClick={() => props.history.push("/explore")}
        >
          &#11148; Back
        </p> */}
        <h2 className="details__info--title">{parkDetails.fullName}</h2>
        <div
          className="details__info"
          // style={{ width: "100%", marginBottom: "60px", marginTop: "45px" }}
        >
          <p className="details__info--address">
            {parkDetails.addresses[0].city},{" "}
            {parkDetails.addresses[0].stateCode}
          </p>
          <p className="details__info--description">
            {parkDetails.description}
          </p>
        </div>
        <div className="images__container">
          {parkDetails?.images.map((eachImage) => {
            return (
              <section className="image-wrap">
                {/* <div
              className="details__image" */}
                {/* // style={{ backgroundImage: `url(${eachImage.url})` }} */}
                {/* > */}

                <img src={eachImage.url} className="details__image--photo" />

                {/* </div> */}
                <p className="details__image--caption">{eachImage.caption}</p>
              </section>
            );
          })}
        </div>
      </div>
    );
  };

  // console.log(parkDetails);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {parkDetails && showParkDetails()}
    </div>
  );
}
