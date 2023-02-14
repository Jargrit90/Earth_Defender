import React from "react";

import '../index.css';
import './mainpage.css';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";

import Opis from "./Description";
import Osiagniecia from "./Achievements";

function Mainpage(){
    let info = useSelector(state => state.mainpage.infoStatus);
    const dispatch = useDispatch();
    return (
        <>
            <div className="mainpage flexCC">
                <div className="main_title">
                    <div className="title flexCC">EARTH DEFENDER</div>
                    <div className="subtitle flexCC">Obroń ziemię przed armią kosmitów</div>
                </div>
                <div className="buttons_container">
                    <div className="mainpage_button"><Link to='/game'><span>Start</span></Link></div>
                    <div className="mainpage_button" onClick={()=>dispatch({type: 'toggleInfo', payload: 'opis'})}><span>Opis gry</span></div>
                    <div className="mainpage_button" onClick={()=>dispatch({type: 'toggleInfo', payload: 'osiagniecia'})}><span>Osiągnięcia</span></div>
                </div>
                {info === 'opis' ? 
                    <Opis />
                :
                null
                }
                {info === 'osiagniecia' ? 
                    <Osiagniecia />
                :
                null
                }
                
            </div>
        </>
    )
}
export default Mainpage;