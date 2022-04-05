import { useContext, useEffect, useState } from "react";
import TheContext from "../../components/TheContext/TheContext";
import actions from "../../components/Utils/Utils";
import "./ProfilePage.scss";

export default function Profile(props) {
  let { user, setUser } = useContext(TheContext);

  const [myPosts, setMyPosts] = useState([]);

  const [edit, setEdit] = useState(false);

  const [postId, setPostId] = useState("");

  let [image, setImage] = useState("");

  useEffect(async () => {
    let res = await actions.getAllPosts();
    let postOwnerId = user._id;

    let loggedUserPosts = res.data.filter(
      (eachPost) => eachPost.userId._id === postOwnerId
    );

    setMyPosts(loggedUserPosts);

    // console.log(res.data.map(each=>each.userId._id))
    // console.log(user._id)
    // setMyPosts(res.data)
  }, [user._id]);

  const deletePost = async (id) => {
    let res = await actions.deletePost(id);
    let res2 = await actions.getAllPosts();
    let postOwnerId = user._id;

    let loggedUserPosts = res2.data.filter(
      (eachPost) => eachPost.userId._id == postOwnerId
    );

    setMyPosts(loggedUserPosts);
  };

  const setAll = (id) => {
    setPostId(id);
    setEdit(!edit);
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    actions.handleUpload(uploadData).then((res) => {
      console.log(res.secure_url);
      setImage(res.secure_url);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await actions.updatePost(postId, { image });

    window.location.reload();
  };

  const showMyPosts = () => {
    return myPosts.map((eachPost) => {
      return (
        <div className="posts" key={eachPost._id}>
          <div className="posts__wrap">
            <img src={eachPost.image} className="posts__image" />

            <div className="posts__infowrap">
              <h4
                id="title"
                contentEditable={edit}
                className="posts__infowrap--title"
              >
                {eachPost.title}{" "}
              </h4>
              <p
                id="description"
                contentEditable={edit}
                className="posts__infowrap--description"
              >
                {eachPost.description}
              </p>
            </div>
          </div>
          <div className="posts__buttons">
            <button
              className="posts__buttons--delete"
              onClick={(e) => deletePost(eachPost._id)}
            >
              Delete
            </button>
            <br />
            <button
              className="posts__buttons--edit"
              onClick={(e) => setAll(eachPost._id)}
            >
              {(edit && "Finish edit") || "Start edit"}
            </button>

            {edit && (
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  className="choose-file"
                  style={{}}
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                />{" "}
                <br />
                <button className="posts__buttons--photo-edit">
                  Change photo
                </button>
              </form>
            )}
          </div>
        </div>
      );
    });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    props.history.push("/");
    window.location.reload();
  };

  return (
    <div className="main">
      <div className="profile">
        <div className="profile__logged">
          <h4>Welcome, {props.user?.name}</h4>
          <br />
          <button className="profile__button" onClick={logOut}>
            Log out
          </button>
        </div>
        <div className="profile__posts">
          {(myPosts.length > 0 && user && showMyPosts()) || (
            <p className="profile__posts--none">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
