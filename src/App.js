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
        <Route path="/Earth_Defender/" element={<Mainpage/>} exact />
        <Route path="/Earth_Defender/game" element={<Gameboard />} />
      </Routes>
    </div>
  );
}

export default App;
