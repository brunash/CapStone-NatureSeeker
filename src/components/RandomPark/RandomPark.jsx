import "./RandomPark.scss";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function RandomPark() {
  
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
      let searchedPark = response.data.data.find((each) =>
        each.fullName.toLowerCase().includes(parkName.toLowerCase())
      );
      setAllSearchedPark(searchedPark);
    });
  };

  const getRandomParks = () => {
    service.getRandomNationalParks().then((response) => {
      let tenRandomParks = response.data.data
        .sort(() => Math.random() - Math.random())
        .slice(0, 6);
      console.log(tenRandomParks);

      setRandomParks(tenRandomParks);
    });
  };

  useEffect(() => {
    getRandomParks();
  }, []);

  const showRandomPark = () => {
    return randomParks.map((eachPark) => {
      return (
        <div className="random" key={eachPark.images}>
          
          <img
            src={eachPark.images[0].url}
            width="200px"
            className="random__image"
          />
          <Link to={`/explore/${eachPark.id}`} className='link'>
              <h3 className="random__park-name">{eachPark.fullName}</h3>
            </Link>
          <p className="random__info">
            {eachPark.fullName} - {eachPark.addresses[0].stateCode}
          </p>
          
        </div>
      );
    });
  };

  return (
    <div className="explore">
      <h4 className="explore__title">Explore Parks</h4>
      <div className="explore__park">
        {randomParks && showRandomPark()}
      </div>
    </div>
  );
}

