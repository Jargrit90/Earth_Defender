import React from "react";

import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import * as f from './functions.js';
import { clear_intervals } from "./Spaceship.js";

import './boss.css';

export let circle_interval;
export let wall_si;
export let wall_interval;

export function boss_intervals(){
    f.cl_Int(circle_interval);
    f.cl_Int(wall_si);
    f.cl_Int(wall_interval);
}

function Boss(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    let kill_achievement = useSelector(state => state.mainpage.kills_achievements);
    let hp_achievement = useSelector(state => state.mainpage.hp_achievements);
    useEffect(()=>{
        let max_kill = f.g(".max_kill");
        let max_hp = f.g(".max_hp");
        let makeCircles = ()=>{
            let line = f.g(".line");
            //console.log("func");
            for(let i = 0; i < line.length; i++){
                for(let j = 0; j < 8; j++){
                    let x = f.new_element("div", line[i], "", ["circle"], []);
                }
            }
        }
        let circleCollision = ()=>{
            let circle = f.g(".circle");
            let spaceship = f.g(".spaceship_box");
            let actual_hp = f.g(".spaceship_hp");
            circle_interval = setInterval(()=>{
                let spaceship_data = spaceship[0].getBoundingClientRect();
                let x1 = spaceship_data.left + spaceship[0].offsetWidth/2;
                let y1 = spaceship_data.top + spaceship[0].offsetHeight/2;
                for(let i = 0; i < circle.length; i++){
                    let circle_data = circle[i].getBoundingClientRect();
                    let x2 = circle_data.left + circle[i].offsetWidth/2;
                    let y2 = circle_data.top + circle[i].offsetHeight/2;
                    let x = Math.abs(x2 - x1);
                    let y = Math.abs(y2 - y1);
                    if(Math.sqrt(x*x + y*y) <= spaceship[0].offsetWidth/2){
                        actual_hp[0].innerText = actual_hp[0].innerText - game_stats.boss_damage;
                        dispatch({type: 'actual_hp', payload: actual_hp[0].innerText});
                        if(actual_hp[0].innerText <= 0){
                        alert("Zostałeś pokonany");
                            clear_intervals();
                            let kills = max_kill[0].innerText;
                            localStorage.setItem("kills", kills);
                            let hp = max_hp[0].innerText;
                            localStorage.setItem("hp", hp);

                            let st = localStorage.getItem("kills");
                            for(let i = 0; i < kill_achievement.length; i++){
                                if(st >= kill_achievement[i]){
                                    dispatch({type: 'setActive', payload: kill_achievement[i].active});
                                }
                            }
                            let hps = localStorage.getItem("hp");
                            for(let i = 0; i < hp_achievement.length; i++){
                                if(hps >= hp_achievement[i]){
                                    dispatch({type: 'setActive', payload: hp_achievement[i].active});
                                }
                            }
                        
                            window.location.href = "https://jargrit90.github.io/Earth_Defender/";
                        }
                    }
                }
            },50);
        }
        let wallAnimation = ()=>{
            let wall = f.g(".damage_wall");
            wall_si = setInterval(()=>{
                let rand_left = f.rand(20, 60);
                let rand_right = 100 - rand_left - 20;
                f.change_element(wall, 0, ["set_property", "--wall", rand_left + "%"]);
                f.change_element(wall, 1, ["set_property", "--wall", rand_right + "%"]);
            }, 5000);
        }
        let wallCollision = ()=>{
            let wall = f.g(".damage_wall");
            let spaceship = f.g(".spaceship_box");
            let actual_hp = f.g(".spaceship_hp");
            wall_interval = setInterval(()=>{
                let spaceship_data = spaceship[0].getBoundingClientRect();
                let ss_left = spaceship_data.left;
                let ss_right = spaceship_data.right;
                let ss_top = spaceship_data.top;
                for(let i = 0; i < wall.length; i++){
                    let wall_data = wall[i].getBoundingClientRect();
                    let wall_left = wall_data.left;
                    let wall_right = wall_data.right;
                    let wall_bottom = wall_data.bottom;
                    if((ss_left >= wall_left && ss_left <= wall_right && ss_top <= wall_bottom) || (ss_right >= wall_left && ss_right <= wall_right && ss_top <= wall_bottom)){
                        actual_hp[0].innerText = actual_hp[0].innerText - (game_stats.boss_damage/5);
                        dispatch({type: 'actual_hp', payload: actual_hp[0].innerText});
                        if(actual_hp[0].innerText <= 0){
                        alert("Zostałeś pokonany");
                            clear_intervals();
                            let kills = max_kill[0].innerText;
                            localStorage.setItem("kills", kills);
                            let hp = max_hp[0].innerText;
                            localStorage.setItem("hp", hp);

                            let st = localStorage.getItem("kills");
                            for(let i = 0; i < kill_achievement.length; i++){
                                if(st >= kill_achievement[i]){
                                    dispatch({type: 'setActive', payload: kill_achievement[i].active});
                                }
                            }
                            let hps = localStorage.getItem("hp");
                            for(let i = 0; i < hp_achievement.length; i++){
                                if(hps >= hp_achievement[i]){
                                    dispatch({type: 'setActive', payload: hp_achievement[i].active});
                                }
                            }
                        
                            window.location.href = "https://jargrit90.github.io/Earth_Defender/";
                        }
                    }
                }
            },50);
        }
        makeCircles();
        circleCollision();
        wallAnimation();
        wallCollision();
    }, []);
    return (
        <>
            <div className="boss_box flexCC enemy_box">
                <div className="boss_eye flexCC">
                    <div className="line_box flexCC">
                        <div className="line line_1 flexCC"></div>
                        <div className="line line_2 flexCC"></div>
                        <div className="line line_3 flexCC"></div>
                        <div className="line line_4 flexCC"></div>
                    </div>
                </div>
                <div className="enemy_hp boss_hp flexCC">
                    {game_stats.boss_hp}
                </div>
            </div>
            <div className="damage_wall left_wall"></div>
            <div className="damage_wall right_wall"></div>
        </>
    )
}
export default Boss;