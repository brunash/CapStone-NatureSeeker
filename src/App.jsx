import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import RandomPark from './components/RandomPark';
import ImageList from '@mui/material/ImageList';

function App() {
  return (
    <>
      <NavBar/>
      <div className='main'>
        <RandomPark/>
        <Form/>
        <ImageList/>
      </div>
      {/* <Switch>

      </Switch> */}
    </>
  );
}

export default App;
