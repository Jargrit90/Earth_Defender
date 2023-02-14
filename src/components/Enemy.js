import React from "react";

import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

import './enemy.css';
import * as f from './functions.js';
import { clear_intervals } from "./Spaceship";

export let enemy_interval;
export let enemy_bullet_interval;
export let enemy_bullet_remove_interval;
export let enemy_bullet_collision_interval;


export function enemy_intervals(){
    f.cl_Int(enemy_interval);
    f.cl_Int(enemy_bullet_interval);
    f.cl_Int(enemy_bullet_remove_interval);
    f.cl_Int(enemy_bullet_collision_interval);
}

function Enemy(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    let kill_achievement = useSelector(state => state.mainpage.kills_achievements);
    let hp_achievement = useSelector(state => state.mainpage.hp_achievements);
    let weapon_achievement = useSelector(state => state.mainpage.weapon_achievements);
    useEffect(() => {
        if(game_stats.skillTree === false){
            enemy_interval = setInterval(()=>{
                let body = f.g(".enemy_container");
                f.new_element("div", body[0], "", ["enemy", "enemy_box"], []);
                let enemy = f.g(".enemy");
                f.new_element("div", enemy[enemy.length - 1], "", ["enemy_layer", "e_layer_1"], []);
                f.new_element("div", enemy[enemy.length - 1], "", ["enemy_layer", "e_layer_2"], []);
                f.new_element("div", enemy[enemy.length - 1], "", ["enemy_hp"], []);
                let rand_left = f.rand(5, 95);
                let rand_top = f.rand(5, 40);
                let rand_left_1 = f.rand(5, 95);
                let rand_top_1 = f.rand(5, 40);
                let rand_left_2 = f.rand(5, 95);
                let rand_top_2 = f.rand(5, 40);
                f.change_element(enemy, enemy.length - 1, ["style", "left", rand_left + "%", "top", rand_top + "%"],
                ["set_property", 
                "--enemy_left", rand_left + "%", "--enemy_top", rand_top + "%", 
                "--enemy_left_1", rand_left_1 + "%", "--enemy_top_1", rand_top_1 + "%",
                "--enemy_left_2", rand_left_2 + "%", "--enemy_top_2", rand_top_2 + "%"]);
                let enemy_hp = f.g(".enemy_hp");
                enemy_hp[enemy.length - 1].innerText = game_stats.enemy_hp;
            },2000);
            let enemy = f.g(".enemy");
            let body = f.g(".enemy_container");
            enemy_bullet_interval = setInterval(()=>{
                if(enemy.length >= 1){
                    for(let i = 0; i < enemy.length; i++){
                        let enemy_data = enemy[i].getBoundingClientRect();
                        let enemy_x = enemy_data.left + enemy[i].offsetWidth/2;
                        let enemy_y = enemy_data.top + enemy[i].offsetHeight/2;
                        f.new_element("div", body[0], "", ["enemy_bullet"], []);
                        let enemy_bullet = f.g(".enemy_bullet");
                        f.change_element(enemy_bullet, enemy_bullet.length -1, ["set_property", "--enemy_bullet_left", enemy_x + "px", "--enemy_bullet_top", enemy_y + "px"], 
                        ["add_class", "enemy_bullet_animation"]);
                    }
                }
            }, 1000);
            enemy_bullet_remove_interval = setInterval(()=>{
                let enemy_bullet = f.g(".enemy_bullet");
                for(let i = 0; i < enemy_bullet.length; i++){
                    if(enemy_bullet[i].offsetTop > window.innerHeight){
                        enemy_bullet[i].remove();
                    }
                }
            },50);
            enemy_bullet_collision_interval = setInterval(()=>{
                let spaceship = f.g(".spaceship_box");
                let actual_hp = f.g(".spaceship_hp");
                let enemy_bullet = f.g(".enemy_bullet");
                let max_kill = f.g(".max_kill");
                let max_hp = f.g(".max_hp");
                let spaceship_data = spaceship[0].getBoundingClientRect();
                let spaceship_center_x = spaceship_data.left + spaceship[0].offsetWidth/2;
                let spaceship_center_y = spaceship_data.top + spaceship[0].offsetHeight/2;
                for(let i = 0; i < enemy_bullet.length; i++){
                    let eb_data = enemy_bullet[i].getBoundingClientRect();
                    let eb_center_x = eb_data.left + enemy_bullet[i].offsetWidth/2;
                    let eb_center_y = eb_data.top + enemy_bullet[i].offsetHeight/2;
                    let x = Math.abs(eb_center_x - spaceship_center_x);
                    let y = Math.abs(eb_center_y - spaceship_center_y);
                    if(Math.sqrt(x*x + y*y) <= spaceship[0].offsetWidth/2 + enemy_bullet[i].offsetWidth/2){
                        actual_hp[0].innerText = actual_hp[0].innerText - game_stats.enemy_damage;
                        dispatch({type: 'actual_hp', payload: actual_hp[0].innerText});
                        enemy_bullet[i].remove();
                        if(actual_hp[0].innerText <= 0){
                            
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
                        
                            window.location.href = "/";
                        }
                    }
                }
            },20);
        }
    }, [game_stats.skillTree]);
    return (
        <>
            <div className="enemy_container">
                
            </div>
        </>
    )
}
export default Enemy;