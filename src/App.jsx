import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import SearchPark from "./components/SearchPark";
import Video from "./components/Video";
import ExplorePage from "./Pages/ExplorePage";
import ParkDetails from "./Pages/ParkDetails";
import { useState, useEffect } from "react";
import TheContext from "./components/TheContext/TheContext";
import Profile from "./Pages/ProfilePage/ProfilePage";
import actions from "./components/Utils/Utils";
import AddComments from "./components/AddComments/AddComments";
import Auth from "./components/Auth";
import PostDetails from "./Pages/PostDetails/PostDetails";
import AddPost from "./Pages/AddPost/AddPost";
import AllPosts from "./Pages/AllPosts";

function App() {
  let [user, setUser] = useState({});

  const getTheUser = async () => {
    let res = await actions.getUser();
    setUser(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getTheUser();
  }, []);

  return (
    <>
      {" "}
      <TheContext.Provider value={{ user, setUser, getTheUser }}>
        <BrowserRouter>
          <div className="main">
            <NavBar />
          </div>
          <Switch>
            <Route path="/" exact component={Video} />
            <Route path="/explore" exact component={ExplorePage} />
            <Route
              path="/explore/:id"
              render={(props) => <ParkDetails {...props} />}
            />
            <Route path="/search" exact component={SearchPark} />
            <Route
              exact
              path="/comments"
              render={(props) => <AddComments {...props} user={user} />}
            />
            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} user={user} />}
            />
            <Route exact path="/auth" render={(props) => <Auth {...props} />} />
            <Route
              exact
              path="/post/:postId"
              render={(props) => <PostDetails {...props} />}
            />
            <Route
              exact
              path="/addPost"
              render={(props) => <AddPost {...props} />}
            />
            <Route
              exact
              path="/allposts"
              render={(props) => <AllPosts {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </TheContext.Provider>
    </>
  );
}

export default App;
