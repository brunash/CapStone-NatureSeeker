import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import SearchPark from './components/SearchPark';
import Video from './components/Video';
import ExplorePage from './Pages/ExplorePage';
import ParkDetails from './Pages/ParkDetails';
import { useState } from 'react';

function App() {

  return (
    <>
      {" "}
      <BrowserRouter>
        <div className="main">
          <NavBar />
          {/* <video loop autoPlay src={HomePath} className="main__video" /> */}
          {/* <RandomPark /> */}
        </div>
        <Switch>
          <Route path="/" exact component={Video} />
          <Route path="/explore" exact component={ExplorePage} />
          <Route
            path="/explore/:id"
            render={(props) => <ParkDetails {...props} />}
          />
          <Route path="/search" exact component={SearchPark} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
