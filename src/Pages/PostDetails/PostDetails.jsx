import React, { useContext, useState, useEffect } from "react";
import TheContext from "../../components/TheContext/TheContext";
import AddComments from "../../components/AddComments/AddComments";
import actions from "../../components/Utils/Utils";
import "./PostDetails.scss";

function PostDetails(props) {
  let { user, setUser } = useContext(TheContext);
  const [post, setPost] = useState(null);
  let postId = props.match?.params.postId;
  console.log(props);

  const getSinglePost = () => {
    actions.getPostsDetails(postId).then((response) => {
      console.log(response.data);
      setPost(response.data);
    });
  };

  useEffect(() => {
    getSinglePost();
  }, [postId]);

  const showPostDetails = () => {
    return (
      <div className="exp-details">
        <img src={post.image} width="350px" className="exp-details__image" />
        <h3 className="exp-details__title">{post.title}</h3>
        <h5 className="exp-details__name">By: {post.userId?.name}</h5>
        <p className="exp-details__description">{post.description}</p>
        {(post.comments.length === 0 && (
          <p className="exp-details__no-comments">This post doesn't have any comments yet.</p>
        )) ||
          post.comments.map((eachComment) => {
            return (
              <li className="exp-details__no-comments">
                {eachComment.userId.name} - {eachComment.description}
              </li>
            );
          })}
      </div>
    );
  };

  return (
    <div className="all__posts">
      {(post && showPostDetails()) || <h2>Loading ...</h2>}{" "}
      <AddComments postId={postId} getSinglePost={getSinglePost} user={user} />
    </div>
  );
}

export default PostDetails;
