import { useState } from "react";
import actions from "../../components/Utils/Utils";
import './addPost.scss'

function AddPost(props) {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");

  const handleFileUpload = (e) => {
    console.log(e);
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    actions.handleUpload(uploadData).then((res) => {
      console.log(res.secure_url);
      setImage(res.secure_url);
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPost = {
      title,
      description,
      image,
    };

    actions.addPost(newPost);
    props.history.push("/profile");
  };

  return (
    <div className="addpost">
      {console.log(title, description, image)}
      <h4 className="addpost__title">Add Experience</h4>
      <form className="addpost__form" onSubmit={(e) => handleSubmit(e)}>
        <div className="addpost__title-wrap">
          <label htmlFor="title" className="addpost__label">
            Give title to your post
          </label>
          <input
            className="addpost__form--title"
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="title"
            name="title"
          />
        </div>
        <div className="addpost__description-wrap">
          <label htmlFor="description" className="addpost__label">
            Give description to your post
          </label>
          <textarea
            className="addpost__form--description"
            rows="4"
            cols="50"
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="description"
            name="description"
          />
        </div>

        <div>
          <input
            className="addpost__form--upload"
            type="file"
            onChange={(e) => handleFileUpload(e)}
            placeholder="image"
          />
          <br />
          <button className="addpost__form--button">Upload</button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
