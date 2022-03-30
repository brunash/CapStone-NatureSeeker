import "./SearchPark.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

export default function SearchPark() {
  // let history = useHistory();

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

  const [parkName, setParkName] = useState("");
  const [allSearchedPark, setAllSearchedPark] = useState(null);
  const [randomParks, setRandomParks] = useState([]);

  const getParks = (e) => {
    e.preventDefault();
    service.getNationalPark(parkName).then((response) => {
      //console.log(response.data.data.find(each=>each.fullName.toLowerCase().includes(parkName.toLowerCase())))
      let searchedPark = response.data.data.find((each) =>
        each.fullName.toLowerCase().includes(parkName.toLowerCase())
      );
      setAllSearchedPark(searchedPark);
    });
  };

  const showParkResults = () => {
    return (
      <div className="searched" key={allSearchedPark.id}>
        <div>
          <h2 className="searched__title">{allSearchedPark.fullName}</h2>
          <section className="searched__info">
            <div className="searched__info--location">
              <h3>Location: </h3>
              <p>
                {allSearchedPark.addresses[0].city},{" "}
                {allSearchedPark.addresses[0].stateCode}
              </p>
            </div>

            <div className="searched__info--description">
              <p>{allSearchedPark.description}</p>
              <p className="searched__contact--hours-description">
                {allSearchedPark.operatingHours[0].description}
              </p>
              <div className="searched__info--weather">
                <p>{allSearchedPark.weatherInfo}</p>
              </div>
            </div>
            <p className="searched__info--visit">
              <a href={allSearchedPark.url}>Plan your visit</a>
            </p>
          </section>
          <div className="searched__gallery">
            {allSearchedPark.images.map((eachImage) => {
              console.log(allSearchedPark);
              return (
                <div className="searched__gallery--wrap">
                  <img
                    src={eachImage.url}
                    className="searched__gallery--image"
                  />
                  <p className="searched__gallery--caption">
                    {eachImage.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // const showRandomPark = () => {
  //   return randomParks.map((eachPark) => {
  //     return (
  //         <>
  //       </>
  //     );
  //   });
  // };

  return (
    <div>
      <div>
        {
          randomParks
          // && showRandomPark()
        }
      </div>
      <form className="search">
        <div className="search__input">
          <input
            onChange={(e) => setParkName(e.target.value)}
            name="park-name"
            placeholder="Search by park name"
            type="text"
            value={parkName}
            className="search__input--text"
            autocomplete="off"
          />
          <button
            onClick={(e) => {
              getParks(e);
            }}
            className="search__input--button"
          >
            Search
          </button>
        </div>
      </form>
      {allSearchedPark && showParkResults()}
    </div>
  );
}
