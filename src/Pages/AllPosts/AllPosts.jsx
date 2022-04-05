import { useContext, useEffect, useState } from "react";
import TheContext from "../../components/TheContext/TheContext";
import actions from "../../components/Utils/Utils";
import { Link } from "react-router-dom";
import "./AllPosts.scss";

function AllPosts(props) {
  let { user, setUser } = useContext(TheContext);
  const [allPosts, setAllPosts] = useState([]);
  const [value, setValue] = useState("");

  useEffect(async () => {
    let res = await actions.getAllPosts();
    setAllPosts(res.data);
  }, []);

  const search = (e) => {
    e.preventDefault();
    let filteredPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(value.toLowerCase())
    );
    setAllPosts(filteredPosts);
    setValue("");
  };

  const ShowPosts = () => {
    return allPosts.map((eachPost) => {
      return (
        <div className="exp-wrap" key={eachPost._id}>
          <div>
            <img src={eachPost.image} className="exp-wrap__image" />
          </div>
          <h4 className="exp-wrap__title">
            <Link to={`/post/${eachPost._id}`}>{eachPost.title}</Link>
          </h4>
          <p className="exp-wrap__by">by {eachPost.userId?.name}</p>
          <p className="exp-wrap__comments">
            {eachPost.comments.length}{" "}
            {(eachPost.comments.length <= 1 && "person") || "people"} commented
            on this post
          </p>
        </div>
      );
    });
  };

  return (
    <div className="experiences">
      <div className="experiences__title">
        {(user?.name && <h4>Welcome, {user?.name}</h4>) || (
          <h4>Find your next adventure! </h4>
        )}
      </div>
      <form className="exp-search" onSubmit={search}>
        <input
          className="exp-search__input"
          onChange={(e) => setValue(e.target.value)}
          name="search"
          placeholder="Search posts"
          type="text"
          value={value}
        />
        <button className="exp-search__button">Search</button>
      </form>
      <div className="all__posts-container">{ShowPosts()}</div>
    </div>
  );
}

export default AllPosts;
