import './App.css';
import {useSelector, useDispatch} from 'react-redux';
import {
  Route,
  Routes
} from "react-router-dom";
import Mainpage from './components/Mainpage';
import Gameboard from './components/Game';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Mainpage/>} exact />
        <Route path="/game" element={<Gameboard />} exact />
      </Routes>
    </div>
  );
}

export default App;
