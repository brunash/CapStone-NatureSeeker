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
      <div className="search-park-images">
        <p
          className="back-button"
          style={{ marginTop: "63px" }}
          onClick={() => props.history.push("/explore")}
        >
          &#11148; Back 
        </p>

        <div
          className="park-info"
          style={{ width: "100%", marginBottom: "60px", marginTop: "45px" }}
        >
          <h2 style={{ padding: "10px" }}>{parkDetails.fullName}</h2>
          <p>
            {parkDetails.addresses[0].city},{" "}
            {parkDetails.addresses[0].stateCode}
          </p>
          <p style={{ padding: "10px" }}>{parkDetails.description}</p>
        </div>

        {parkDetails?.images.map((eachImage) => {
          return (
            <div
              className="images"
              style={{ backgroundImage: `url(${eachImage.url})` }}
            >
              <p>{eachImage.caption}</p>
              {/* <img src={eachImage.url} width="300px" /> */}
            </div>
          );
        })}
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
