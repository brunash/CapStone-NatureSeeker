import { useContext, useEffect, useState } from "react";
import TheContext from "../TheContext/TheContext";
import { useHistory } from "react-router-dom";
import actions from "../Utils/Utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './AddComments.scss';

function AddComments(props) {
  const [description, setDescription] = useState("");
  let { user, setUser } = useContext(TheContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDescription(value);
  };

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const postId = props.postId;

    actions
      .addComment(description, postId)
      .then(() => {
        props.getSinglePost();
        setDescription("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="add-comment">
      <form className="add-comment__form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          cols="30"
          rows="9"
          placeholder="Write a comment"
          name="description"
          value={description}
          className="add-comment__input"
        />
        <button className="add-comment__button">Add Comment</button>
      </form>
      <p className="add-comment__button--back">
        <Link to="/allposts">Back</Link>
      </p>
    </div>
  );
}

export default AddComments;
