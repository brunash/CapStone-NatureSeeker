import axios from "axios";

console.log(process.env);

const serverUrl = 'http://localhost:5000/api';
console.log(serverUrl);
const createHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

const actions = {
  getUser: async () => {
    return await axios.get(`${serverUrl}/get-the-user`, createHeaders());
  },

  handleUpload: async (theFile) => {
    let res = await axios.post(`${serverUrl}/upload`, theFile, createHeaders());
    console.log(res.data);
    return res.data;
  },

  addPost: async (post) => {
    let res = await axios.post(`${serverUrl}/add-post`, post, createHeaders());
    console.log(res);
    return res;
  },

  getAllPosts: async (post) => {
    return await axios.get(`${serverUrl}/all-the-posts`, createHeaders());
  },

  getPostsDetails: async (id) => {
    return await axios.get(`${serverUrl}/all-the-posts/${id}`, createHeaders());
  },

  deletePost: async (id) => {
    return await axios.delete(
      `${serverUrl}/all-the-posts/${id}`,
      createHeaders()
    );
  },

  updatePost: async (id, post) => {
    return await axios.put(
      `${serverUrl}/all-the-posts/${id}`,
      post,
      createHeaders()
    );
  },

  addComment: async (description, postId) => {
    return await axios.post(
      `${serverUrl}/comments`,
      { description, postId },
      createHeaders()
    );
  },

  authenticate: async (profileObj) => {
    console.log(profileObj, "profileObj");
    let res = await axios.post(
      `${serverUrl}/authenticate`,
      profileObj,
      createHeaders()
    );
    console.log(res);
    localStorage.setItem("token", res.data.token);

    return res;
  },
};

export default actions;
