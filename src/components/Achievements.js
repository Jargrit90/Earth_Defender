import React, { useEffect } from "react";
import '../index.css';
import './achiev.css';


import {useSelector, useDispatch} from 'react-redux';

function Osiagniecia() {
    const dispatch = useDispatch();

    let pre_texts = useSelector(state => state.mainpage.pre_texts);

    let kill_achievement = useSelector(state => state.mainpage.kills_achievements);
    let hp_achievement = useSelector(state => state.mainpage.hp_achievements);

    let achievements_index = 0;
    let kill_achv = kill_achievement.map(achiev => <Achievement key={achievements_index++} active={achiev.active} pre={pre_texts[0]} achievement_count={localStorage.getItem("kills")} amount={achiev.amount} image={achiev.image} text={achiev.text}/>);
    let hp_achv = hp_achievement.map(achiev => <Achievement key={achievements_index++} pre={pre_texts[1]} achievement_count={localStorage.getItem("hp")} amount={achiev.amount} image={achiev.image} text={achiev.text}/>);
    return (
        <>
            <div className="osiagniecia">
                <div className="close flexCC" onClick={()=>dispatch({type: 'toggleInfo', payload: null})}>X</div>
                <div className="main_title flexCC">
                    Osiagniecia
                </div>
                <div className="achievements_container">
                    <div className="subtitle">
                        Zabójstwa
                    </div>
                    <div className="achievements flexCC">
                        {kill_achv}
                    </div>
                </div>
                <div className="achievements_container">
                    <div className="subtitle">
                        Czas gry
                    </div>
                    <div className="achievements flexCC">
                        {hp_achv}
                    </div>
                </div>
            </div>
        </>
    )
}

const Achievement = (props)=>{
    let style = {
        backgroundImage: props.image
    }
    return (
        <div className={((props.achievement_count > props.amount) || (props.active === true))  ? "achievement" : "achievement achievement_locked"} title={props.pre + props.amount}>
            <div className="achievement_image" style={style}></div>
            <div className="achievement_text flexCC">{props.text}</div>
        </div>
    )
}

export default Osiagniecia;