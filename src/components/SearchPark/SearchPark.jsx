import "./SearchPark.scss";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from "../Button";
import { useHistory } from "react-router-dom";


export default function SearchPark() {

  let history = useHistory();

  const service = {
    getNationalPark: async (query) => {
      console.log(query);
      return await axios.get(
        `https://developer.nps.gov/api/v1/parks?q=${query}&api_key=mDB2nzLwrc9Ik9377kfeJwye8n38WzhcUO5TCqzh`
      );
    },

    getRandomNationalParks: async () => {
      // console.log(query);
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

//   const getRandomParks = () => {
//     service.getRandomNationalParks().then((response) => {
//       let tenRandomParks = response.data.data
//         .sort(() => Math.random() - Math.random())
//         .slice(0, 1);
//       console.log(tenRandomParks);

//       setRandomParks(tenRandomParks);
//     });
//   };

//   useEffect(() => {
//     getRandomParks();
//   }, []);

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
            {/* <div className="searched__info--contact">
              {" "} */}
              {/* <h3 className="searched__contact--title">Contact Info</h3> */}
              {/* <p className="searched__contact--email">
                E-mail:{" "}
                {allSearchedPark.contacts.emailAddresses[0].emailAddress}
              </p>
              <p className="searched__contact--phone">
                Phone number:{" "}
                {allSearchedPark.contacts.phoneNumbers[0].phoneNumber}
              </p> */}
              {/* <h3 className="searched__contact--hours">Operating Hours</h3> */}
              
            {/* </div> */}
            <div className="searched__info--description">
              {/* <h3>Description</h3> */}
              <p>{allSearchedPark.description}</p>
              <p className="searched__contact--hours-description">
                {allSearchedPark.operatingHours[0].description}
              </p>
              <div className="searched__info--weather">
                {/* <h3>Weather Info</h3> */}
                <p>{allSearchedPark.weatherInfo}</p>
              </div>
            </div>
          </section>
          <div className="searched__gallery">
            {allSearchedPark.images.map((eachImage) => {
              console.log(allSearchedPark);
              return (
                <div
                  className="searched__gallery--wrap"
                  // style={{ backgroundImage: `url(${eachImage.url})` }}
                >
                  <img
                    src={eachImage.url}
                    // width="300px"
                    className="searched__gallery--image"
                  />
                  <p className="searched__gallery--caption">
                    {eachImage.caption}
                  </p>
                </div>
              );
            })}
            {/* <ImageList variant="quilted" cols={3} gap={8}>
              {allSearchedPark.images.map((item) => (
                <ImageListItem key={item.url}>
                  <img
                    src={`${item.url}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.caption}
                    // title={item.title}
                    className="searched__gallery--caption"
                  />
                </ImageListItem>
              ))}
            </ImageList> */}
          </div>

          {/* <div>
            <h3>Fees:</h3>
            {allSearchedPark.entranceFees.map((eachFee) => {
              return (
                <ul>
                  <li>Title: {eachFee.title}</li>
                  <li>Cost: {eachFee.cost}</li>
                  <li>Description: {eachFee.description}</li>
                </ul>
              );
            })}
          </div> */}
        </div>
      </div>
    );
  };

  const showRandomPark = () => {
    return randomParks.map((eachPark) => {
      return (
          <>
        {/* <div className="random"> */}
          {/* <div
            className="post-img-div" */}
          {/* // style={{ backgroundImage: `url(${eachPark.images[0].url})` }} */}
          {/* > */}
          {/* <img
            src={eachPark.images[0].url}
            width="200px"
            className="random__image"
          /> */}
          {/* </div> */}
          {/* <div className="title-div"> */}
          {/* <Link to={`/explore/${eachPark.id}`}>
              <h2>{eachPark.fullName}</h2>
            </Link> */}
          {/* <p className="random__info">
            {eachPark.fullName} - {eachPark.addresses[0].stateCode}
          </p> */}
          {/* </div> */}
        {/* </div> */}
        </>
      );
    });
  };

  return (
    <div>
      {/* <h4>Get out and explore</h4> */}
      <div>{randomParks && showRandomPark()}</div>
      {/* this displays search element */}
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

          {/* <Button onClick={(e) => getParks(e)}/> */}
        </div>
      </form>
      {allSearchedPark && showParkResults()}
    </div>
  );
}