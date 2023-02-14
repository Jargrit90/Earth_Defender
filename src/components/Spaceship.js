import React from "react";

import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

import './spaceship.css';
import './bullet.css';
import * as f from './functions.js';
import { enemy_bullet_collision_interval, enemy_bullet_interval, enemy_interval, enemy_bullet_remove_interval } from "./Enemy";
import { enemy_intervals } from "./Enemy";
import { boss_intervals } from "./Boss";




let gun_interval;
let delete_bullet_interval;
let rocket_interval;
let razor_interval;

let laser_collision_interval;
let razor_collision_interval;
let rocket_collision_interval;
let gun_collision_interval;
let healing_interval;

export function clear_intervals(){
    f.cl_Int(gun_interval);
    f.cl_Int(delete_bullet_interval);
    f.cl_Int(razor_interval);
    f.cl_Int(rocket_interval);
    f.cl_Int(enemy_interval);
    f.cl_Int(gun_collision_interval);
    f.cl_Int(laser_collision_interval);
    f.cl_Int(razor_collision_interval);
    f.cl_Int(rocket_collision_interval);
    f.cl_Int(enemy_bullet_interval);
    f.cl_Int(enemy_bullet_remove_interval);
}


function Spaceship(){
    let game_stats = useSelector(state => state.game_stats);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let enemy = f.g(".enemy_box");
        let enemy_hp = f.g(".enemy_hp");
        let damage_wall = f.g(".damage_wall");
        window.addEventListener('mousemove', (event)=>{
            let x = event.clientX;
            let y = event.clientY;
            let spaceship_box = f.g(".spaceship_box");
            f.change_element(spaceship_box, 0, ["style", "left", (x - spaceship_box[0].offsetWidth/2) + "px", "top", (y - spaceship_box[0].offsetHeight/2) + "px"]);
        });
        if(game_stats.skillTree === false){
            let boss_active = game_stats.boss_active;
            
            gun_interval = setInterval(()=>{
                let spaceship_box = f.g(".spaceship_center");
                let spaceship_bc = spaceship_box[0].getBoundingClientRect();
                let spaceship_center_x = spaceship_bc.left;
                let spaceship_center_y = spaceship_bc.top;
                let body = f.g("body");
                f.new_element("div", body[0], "", ["bullet"], ["left", spaceship_center_x + "px", "top", spaceship_center_y + "px"]);
                let bullet = f.g(".bullet");
                f.change_element(bullet, bullet.length - 1, 
                    ["set_property", "--bullet_left", spaceship_center_x + "px", "--bullet_top", spaceship_center_y + "px"], 
                    ["add_class", "bullet_center"]);
                if(game_stats.gun_three_shoot === true){
                    f.new_element("div", body[0], "", ["bullet", "bullet_3_left"], ["left", spaceship_center_x + "px", "top", spaceship_center_y + "px"]);
                    f.new_element("div", body[0], "", ["bullet", "bullet_3_right"], ["left", spaceship_center_x + "px", "top", spaceship_center_y + "px"]);
                    let bullet_3_left = f.g(".bullet_3_left");
                    let bullet_3_right = f.g(".bullet_3_right");
                    f.change_element(bullet_3_left, bullet_3_left.length - 1, 
                        ["set_property", "--bullet_left", spaceship_center_x + "px", "--bullet_top", spaceship_center_y + "px", "--bullet_left_end", (spaceship_center_x - 200) + "px"], 
                        ["add_class", "bullet_3_left"]);
                    f.change_element(bullet_3_right, bullet_3_right.length - 1, 
                        ["set_property", "--bullet_left", spaceship_center_x + "px", "--bullet_top", spaceship_center_y + "px", "--bullet_right_end", (spaceship_center_x + 200) + "px"], 
                        ["add_class", "bullet_3_right"]);
                }
                if(game_stats.gun_five_shoot === true){
                    f.new_element("div", body[0], "", ["bullet", "bullet_5_left"], ["left", spaceship_center_x + "px", "top", spaceship_center_y + "px"]);
                    f.new_element("div", body[0], "", ["bullet", "bullet_5_right"], ["left", spaceship_center_x + "px", "top", spaceship_center_y + "px"]);
                    let bullet_5_left = f.g(".bullet_5_left");
                    let bullet_5_right = f.g(".bullet_5_right");
                    f.change_element(bullet_5_left, bullet_5_left.length - 1, 
                        ["set_property", "--bullet_left", spaceship_center_x + "px", "--bullet_top", spaceship_center_y + "px", "--bullet_left_end", (spaceship_center_x - 400) + "px"], 
                        ["add_class", "bullet_5_left"]);
                    f.change_element(bullet_5_right, bullet_5_right.length - 1, 
                        ["set_property", "--bullet_left", spaceship_center_x + "px", "--bullet_top", spaceship_center_y + "px", "--bullet_right_end", (spaceship_center_x + 400) + "px"], 
                        ["add_class", "bullet_5_right"]);
                }
            },500 / game_stats.actual_attack_speed);
            gun_collision_interval = setInterval(()=>{
                let bullet = f.g(".bullet");
                for(let i = 0; i < enemy.length; i++){
                    let enemy_data = enemy[i].getBoundingClientRect();
                    let enemy_left = enemy_data.left;
                    let enemy_right = enemy_data.right;
                    let enemy_top = enemy_data.top;
                    let enemy_bottom = enemy_data.bottom;
                    for(let j = 0; j < bullet.length; j++){
                        let bullet_data = bullet[j].getBoundingClientRect();
                        let bullet_left = bullet_data.left;
                        let bullet_top = bullet_data.top;
                        if(bullet_left >= enemy_left && bullet_left <= enemy_right && bullet_top >= enemy_top && bullet_top <= enemy_bottom){
                            enemy_hp[i].innerText -= game_stats.gun_actual_damage;
                            
                            bullet[j].remove();
                            if(enemy_hp[i].innerText <= 0 && damage_wall.length > 0){
                                dispatch({type: 'addExp', payload: 100});
                                dispatch({type: 'add_kill_count'});
                                boss_intervals();
                                dispatch({type: 'enemy_active'});
                                dispatch({type: 'boss_active'});
                            }
                            if(enemy_hp[i].innerText <= 0 && damage_wall.length === 0){
                                dispatch({type: 'addExp', payload: 5});
                                dispatch({type: 'add_kill_count'});
                                enemy[i].remove();
                            }
                        }
                    }
                }
                
            },20);
            if(game_stats.skill_tree_main_level >= 35){
                let laser = f.g(".laser_light");
                laser_collision_interval = setInterval(()=>{
                    let ls = game_stats.laser_actual_damage;
                    let laser_data_1 = laser[0].getBoundingClientRect();
                    let laser_left_1 = laser_data_1.left;
                    let laser_right_1 = laser_data_1.right;
                    let laser_data_2 = laser[1].getBoundingClientRect();
                    let laser_left_2 = laser_data_2.left;
                    let laser_right_2 = laser_data_2.right;
                    for(let i = 0; i < enemy.length; i++){
                        let enemy_data = enemy[i].getBoundingClientRect();
                        let enemy_left = enemy_data.left;
                        let enemy_right = enemy_data.right;
                        if((laser_left_1 > enemy_left && laser_left_1 < enemy_right) || (laser_right_1 > enemy_left && laser_right_1 < enemy_right)
                        || (laser_left_2 > enemy_left && laser_left_2 < enemy_right) || (laser_right_2 > enemy_left && laser_right_2 < enemy_right)){
                            console.log(game_stats.laser_actual_damage);
                            enemy_hp[i].innerText -= game_stats.laser_actual_damage;
                            if(enemy_hp[i].innerText <= 0 && damage_wall.length > 0){
                                dispatch({type: 'addExp', payload: 100});
                                dispatch({type: 'add_kill_count'});
                                boss_intervals();
                                dispatch({type: 'enemy_active'});
                                dispatch({type: 'boss_active'});
                            }
                            if(enemy_hp[i].innerText <= 0 && damage_wall.length === 0){
                                dispatch({type: 'addExp', payload: 5});
                                dispatch({type: 'add_kill_count'});
                                enemy[i].remove();
                            }
                        }
                    }
                },100 / game_stats.actual_attack_speed);
            }
            if(game_stats.skill_tree_main_level >= 60){
                let razor = f.g(".razor_box");
                razor_collision_interval = setInterval(()=>{
                    for(let j = 0; j < razor.length; j++){
                        let razor_data =  razor[j].getBoundingClientRect();
                        let razor_center_left = razor_data.left + razor[j].offsetWidth/2;
                        let razor_center_top = razor_data.top + razor[j].offsetHeight/2;
                        for(let i = 0; i < enemy.length; i++){
                            let enemy_x_center = enemy[i].offsetLeft + enemy[i].offsetWidth/2;
                            let enemy_y_center = enemy[i].offsetTop + enemy[i].offsetHeight/2;
                            
                            let y = enemy_x_center - razor_center_left;
                            let x = enemy_y_center - razor_center_top;
                            if(Math.sqrt(x*x + y*y) - enemy[i].offsetWidth/2 < razor[j].offsetWidth/2){
                                enemy_hp[i].innerText = enemy_hp[i].innerText - game_stats.razor_actual_damage;
                            }
                            if(enemy_hp[i].innerText <= 0 && damage_wall.length > 0){
                                dispatch({type: 'addExp', payload: 100});
                                dispatch({type: 'add_kill_count'});
                                boss_intervals();
                                dispatch({type: 'enemy_active'});
                                dispatch({type: 'boss_active'});
                            }
                            if(enemy_hp[i].innerText <= 0 && damage_wall.length === 0){
                                dispatch({type: 'addExp', payload: 5});
                                dispatch({type: 'add_kill_count'});
                                enemy[i].remove();
                            }
                        }
                    }
                },50 / game_stats.actual_attack_speed);
            }
            if(game_stats.skill_tree_main_level >= 10){
                let rocket = f.g(".rocket");
                let explosion = f.g(".explosion");
                f.change_element(explosion, 0, ["add_class", "explosionAnimation"]);
                rocket_interval = setInterval((event)=>{
                    let left = f.rand(30, 70);
                    let top = f.rand(10, 40);
                    f.change_element(rocket, 0, ["style", "left", left + "%", "top", top + "%"]);
                },5000);
                
                rocket_collision_interval = setInterval(()=>{
                    let explosion_data =  explosion[0].getBoundingClientRect();
                    let explosion_center_left = explosion_data.left + explosion[0].offsetWidth/2;
                    let explosion_center_top = explosion_data.top + explosion[0].offsetHeight/2;
                    for(let i = 0; i < enemy.length; i++){
                        let enemy_x_center = enemy[i].offsetLeft + enemy[i].offsetWidth/2;
                        let enemy_y_center = enemy[i].offsetTop + enemy[i].offsetHeight/2;
                        
                        let y = enemy_x_center - explosion_center_left;
                        let x = enemy_y_center - explosion_center_top;
                        if(Math.sqrt(x*x + y*y) - enemy[i].offsetWidth/2 < explosion[0].offsetWidth/2){
                            enemy_hp[i].innerText = enemy_hp[i].innerText - game_stats.rocket_actual_damage;
                        }
                        if(enemy_hp[i].innerText <= 0 && damage_wall.length > 0){
                            dispatch({type: 'addExp', payload: 100});
                            dispatch({type: 'add_kill_count'});
                            boss_intervals();
                            dispatch({type: 'enemy_active'});
                            dispatch({type: 'boss_active'});
                        }
                        if(enemy_hp[i].innerText <= 0 && damage_wall.length === 0){
                            dispatch({type: 'addExp', payload: 5});
                            dispatch({type: 'add_kill_count'});
                            enemy[i].remove();
                        }
                    }
                },200 / game_stats.actual_attack_speed);
            }
        }
        else {
            console.log(game_stats.skillTree);
            clear_intervals();
            let explosion = f.g(".explosion");
            if(game_stats.skill_tree_main_level >= 10){
                f.change_element(explosion, 0, ["remove_class", "explosionAnimation"]);
            }
        }
        
        delete_bullet_interval = setInterval(()=>{
            let bullet = f.g(".bullet");
            for(let i = 0; i < bullet.length; i++){
                if(bullet[i].offsetTop < -10){
                    bullet[i].remove();
                }
            }
        },50);

        
    }, [game_stats.skillTree, game_stats.gun_actual_damage, game_stats.laser_actual_damage, 
        game_stats.rocket_actual_damage, game_stats.skill_tree_main_level, game_stats.razor_actual_damage, 
        game_stats.actual_attack_speed]);
    useEffect(() => {
        let laser_light = f.g(".laser_light");
        for(let i = 0; i < laser_light.length; i++){
            f.change_element(laser_light, i, ["set_property", "--laser_height", game_stats.laser_actual_width + "px"]);
        }
    }, [game_stats.laser_actual_width]);
    useEffect(() => {
        if(game_stats.kill_count > game_stats.max_kill_count){
            dispatch({type: 'max_kill_count'});
        }
    }, [game_stats.kill_count, game_stats.max_kill_count]);
    useEffect(() => {
        if(game_stats.kill_count % 50 === 0 && game_stats.kill_count > 0){
            dispatch({type: 'enemy_active'});
            dispatch({type: 'boss_active'});
            enemy_intervals();
        }
    }, [game_stats.kill_count]);

    useEffect(() => {
        let st = localStorage.getItem("kills");
        dispatch({type: 'max_kill_save', payload: st});
        let hp = localStorage.getItem("hp");
        dispatch({type: 'max_hp', payload: hp});
    }, []);

    useEffect(() => {
        console.log(game_stats.actual_hp + " " + game_stats.max_hp_in_game);
        let actual_hp = game_stats.actual_hp;
        let max_hp = game_stats.max_hp_in_game;
        if(actual_hp < max_hp){
            dispatch({type: 'change_healing', payload: true});
        }
        if(actual_hp >= max_hp){
            dispatch({type: 'change_healing', payload: false});
        }
    }, [game_stats.max_hp_in_game, game_stats.actual_hp]);

    useEffect(() => {
        if(game_stats.healing === true && game_stats.skillTree === false){
            healing_interval = setInterval(()=>{
                dispatch({type: 'healing'});
            },1000);
        }
        if(game_stats.healing === false || game_stats.skillTree === true){
            f.cl_Int(healing_interval);
        }
    }, [game_stats.healing, game_stats.skillTree]);
    return (
        <>
            <div className="spaceship_box flexCC">
                <div className="laser laser_left">
                    <div className="laser_layer l_layer_1"></div>
                    <div className="laser_layer l_layer_2"></div>
                    {game_stats.skill_tree_main_level >= 35 ? <LaserLight/> : null}
                </div>
                <div className="laser laser_right">
                    <div className="laser_layer l_layer_1"></div>
                    <div className="laser_layer l_layer_2"></div>
                    {game_stats.skill_tree_main_level >= 35 ? <LaserLight/> : null}
                </div>
                <div className="spaceship_center"></div>
                <div className="spaceship_layer layer_1"></div>
                <div className="spaceship_layer layer_2"></div>
                {game_stats.skill_tree_main_level >= 10 ? <Rocket /> : null}
                {game_stats.skill_tree_main_level >= 60 ? <Razor /> : null}
                <div className="spaceship_hp">
                    {game_stats.actual_hp}
                </div>
            </div>
        </>
    )
}
export default Spaceship;

function LaserLight(){
    return (
        <>
            <div className="laser_light"></div>
        </>
    )
}
function Rocket(){
    let game_stats = useSelector(state => state.game_stats);
    const dispatch = useDispatch();

    useEffect(() => {
        let explosion = f.g(".explosion");
        f.change_element(explosion, 0, ["set_property", "--explosion_size", game_stats.rocket_actual_width + "px"]);
    }, [game_stats.rocket_actual_width]);

    return (
        <>
            <div className="rocket flexCC">
                <i className="fa-solid fa-crosshairs"></i>
                <div className="explosion"></div>
            </div>
        </>
    )
}

function Razor(){
    let game_stats = useSelector(state => state.game_stats);
    useEffect(() => {
        let razor_box = f.g(".razor_box");
        f.change_element(razor_box, 0, 
            ["set_property", "--razor_size", game_stats.razor_actual_width + "px", "--top", (window.innerHeight * 0.1) + "px", "--left_start", "0px", "--left_end", "100%"]
        );
        if(game_stats.razor_second === true){
            f.change_element(razor_box, 1, 
                ["set_property", "--razor_size", game_stats.razor_actual_width + "px", "--top", ((window.innerHeight * 0.3) + game_stats.razor_actual_width) + "px", "--left_start", "100%", "--left_end", "0px"]
            );
        }
    }, [game_stats.razor_actual_width, game_stats.razor_second]);
    return (
        <>
            <div className="razor_box razor_box_0 flexCC">
                <div className="razor_edge edge_1"></div>
                <div className="razor_edge edge_2"></div>
            </div>
            {game_stats.razor_second ? 
            <div className="razor_box razor_box_1 flexCC">
                <div className="razor_edge edge_1"></div>
                <div className="razor_edge edge_2"></div>
            </div> : null }
        </>
    )
}