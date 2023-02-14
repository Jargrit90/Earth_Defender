import React from "react";

import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";

import Spaceship from "./Spaceship";
import Enemy from "./Enemy";
import Boss from "./Boss";

import '../index.css';
import './game.css';
import './levelDataBox.css';


import './skillTree.css';



function Gameboard() {
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    let enemies = useSelector(state => state.enemies);
    useEffect(() => {
        window.addEventListener("keydown", (event)=>{
            if(event.key === " "){
                dispatch({type: 'toggleSkillTree'})
            }
        });
        
    }, []);
    return (
        <>
            <div className={game_stats.skillTree ? "gameboard cursor_on" : "gameboard"}>
                <LevelDataBox />
                <Spaceship />
                {game_stats.enemies_active ?<Enemy /> : null}
                {game_stats.skillTree ? <SkillTree /> : null}
                {game_stats.boss_active ? <Boss /> : null}
            </div>
        </>
    )
}

export default Gameboard;


function LevelDataBox(){
    let game_stats = useSelector(state => state.game_stats);
    const dispatch = useDispatch();
    useEffect(() => {
        
      }, []);
    let style = {
        background: "linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) "+game_stats.percent_bar+ "%, rgba(255,255,255,0.3) "+game_stats.percent_bar+ "%, rgba(255,255,255,0.3) 100%)"
    }
    return (
        <>
            <div className="levelDataBox">
                <div className="level">
                    Lv. {game_stats.level}
                </div>
                <div className="level_bar" style={style}></div>
                <div className="exp_data level_2nd_data">Exp. {game_stats.exp}/{game_stats.exp_breakpoint}</div>
                <div className="skill_points level_2nd_data">SP: {game_stats.skill_points}</div>
                <div className="kill_count level_2nd_data"><i className="fa-solid fa-skull"></i>: {game_stats.kill_count}</div>
                <div className="kill_count level_2nd_data">Max. <i className="fa-solid fa-skull"></i>: <span className="max_kill">{game_stats.max_kill_count}</span></div>
                <div className="kill_count level_2nd_data">Max. <i className="fa-solid fa-heart"></i>: <span className="max_hp">{game_stats.max_hp_in_game}</span></div>
            </div>
        </>
    )
}

function SkillTree(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    
    return (
        <>
            <div className="skillTree">
                <div className="skill_points_box">
                   Liczba dostępnych punktów umiejętności: {game_stats.skill_points}
                </div>
                <div className="main_skill_tree_level">
                    Poziom drzewka umiejętności: {game_stats.skill_tree_main_level} <div className="add_main_skill_tree_level" title="Kliknij by dodać poziom drzewka umiejętności" onClick={()=>dispatch({type: 'add_main_skill_tree_level'})}><i className="fa-solid fa-plus"></i></div>
                </div>
                <div className="skill_tree_buttons_box flexCC">
                    <div className="skill_tree_button active_button" onClick={()=>dispatch({type: 'active_skill_tree', payload: 'BasicStatsInfo'})}>
                        Statystyki statku
                    </div>
                    <div className="skill_tree_button active_button" onClick={()=>dispatch({type: 'active_skill_tree', payload: 'BasicStats'})}>
                        Podstawowe statystyki
                    </div>
                    <div className="skill_tree_button active_button" onClick={()=>dispatch({type: 'active_skill_tree', payload: 'MainWeapon'})}>
                        Działko pokładowe
                    </div>
                    <div className={game_stats.skill_tree_main_level >= 10 ? "skill_tree_button active_button" : "skill_tree_button not_active_button"} onClick={game_stats.skill_tree_main_level >= 10 ? ()=>dispatch({type: 'active_skill_tree', payload: 'RocketWeapon'}) : null}>
                        Broń rakietowa
                    </div>
                    <div className={game_stats.skill_tree_main_level >= 35 ? "skill_tree_button active_button" : "skill_tree_button not_active_button"} onClick={game_stats.skill_tree_main_level >= 35 ? ()=>dispatch({type: 'active_skill_tree', payload: 'LaserWeapon'}) : null}>
                        Broń laserowa
                    </div>
                    <div className={game_stats.skill_tree_main_level >= 60 ? "skill_tree_button active_button" : "skill_tree_button not_active_button"} onClick={game_stats.skill_tree_main_level >= 60 ? ()=>dispatch({type: 'active_skill_tree', payload: 'RazorWeapon'}) : null}>
                        Ostrza zagłady
                    </div>
                </div>
                <div className="skill_trees_box">
                    {game_stats.active_skill_tree === "BasicStatsInfo" ? <BasicStatsInfo /> : null}
                    {game_stats.active_skill_tree === "BasicStats" ? <BasicStats /> : null}
                    {game_stats.active_skill_tree === "MainWeapon" ? <MainWeapon /> : null}
                    {game_stats.active_skill_tree === "RocketWeapon" ? <RocketWeapon /> : null}
                    {game_stats.active_skill_tree === "LaserWeapon" ? <LaserWeapon /> : null}
                    {game_stats.active_skill_tree === "RazorWeapon" ? <RazorWeapon /> : null}
                </div>
            </div>
        </>
    )
}

function BasicStatsInfo(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    useEffect(() => {
        dispatch({type: 'setStats'});
    }, []);
    return (
        <>
            <div className="basic_info flexCC">
                <div className="stats_info flexCC">
                    <div className="stats_title">Podstawowe statystyki</div>
                    <div className="stats">Obrażenia podstawowe: {game_stats.actual_damage}</div>
                    <div className="stats">Żywotność: {game_stats.actual_hp}</div>
                    <div className="stats">Prędkosć ataku: {game_stats.actual_attack_speed}</div>
                </div>
                <div className="stats_info flexCC">
                    <div className="stats_title">Statystyki broni</div>
                    <div className="stats">Obrażenia broni podstawowej: {game_stats.gun_actual_damage}</div>
                    <div className="stats">Obrażenia broni rakietowej: {game_stats.rocket_actual_damage}</div>
                    <div className="stats">Szerokość eksplozji: {game_stats.rocket_actual_width}</div>
                    <div className="stats">Obrażenia broni laserowej: {game_stats.laser_actual_damage}</div>
                    <div className="stats">Szerokość wiązki lasera: {game_stats.laser_actual_width}</div>
                    <div className="stats">Obrażenia ostrzy zagłady: {game_stats.razor_actual_damage}</div>
                    <div className="stats">Rozmiar ostrza: {game_stats.razor_actual_width}</div>
                </div>
            </div>
        </>
    )
}

function BasicStats(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    return (
        <>
            <div className="skill_tree">
                <div className="button_box flexCC">
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć podstawowe obrażenia statku." onClick={()=>{dispatch({type: 'add_skill_level', payload: 'basic_damage_level'}); dispatch({type: 'setStats'})}}>
                        <i className="fa-solid fa-gun"></i>
                        <div className="skill_button_level">{game_stats.basic_damage_level}</div>
                    </div>
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć żywotność statku." onClick={()=>{dispatch({type: 'add_skill_level', payload: 'basic_hp_level'}); dispatch({type: 'setStats'})}}>
                        <i className="fa-solid fa-heart"></i>
                        <div className="skill_button_level">{game_stats.basic_hp_level}</div>
                    </div>
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć szybkość ataku statku." onClick={()=>{dispatch({type: 'add_skill_level', payload: 'basic_speed_level'}); dispatch({type: 'setStats'})}}>
                        <i className="fa-solid fa-gauge"></i>
                        <div className="skill_button_level">{game_stats.basic_speed_level}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MainWeapon(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    let weapon_achievement = useSelector(state => state.mainpage.weapon_achievements);
    return (
        <>
            <div className="skill_tree">
                <div className="button_box flexCC">
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć obrażenia broni podstawowej." onClick={()=>{dispatch({type: 'add_skill_level', payload: 'gun_damage_level'}); dispatch({type: 'setStats'})}}>
                        <i className="fa-solid fa-gun"></i>
                        <div className="skill_button_level">{game_stats.gun_damage_level}</div>
                    </div>
                    <div className={game_stats.gun_three_shoot ? "skill_button active_skill flexCC"  : "skill_button flexCC"} 
                        title="Kliknij by zwiększyć ilość pocisków wystrzeliwanych do 3." 
                        onClick={(game_stats.gun_damage_level >= 20 && game_stats.gun_three_shoot === false) ? ()=>{dispatch({type: 'active_skill_level', payload: 'gun_three_shoot'})} : game_stats.gun_three_shoot ? ()=>alert("Odblokowałeś już tą umiejętność.") : ()=>alert("Musisz wydać 20 punktów umiejętnosci by odblokować tą umiejętność.")}>
                        <i className="fa-solid fa-3"></i>
                    </div>
                    <div className={game_stats.gun_five_shoot ? "skill_button active_skill flexCC"  : "skill_button flexCC"} 
                        title="Kliknij by zwiększyć ilość pocisków wystrzeliwanych do 5." 
                        onClick={(game_stats.gun_damage_level >= 40 && game_stats.gun_five_shoot === false) ? ()=>{dispatch({type: 'active_skill_level', payload: 'gun_five_shoot'})} : game_stats.gun_five_shoot ? ()=>alert("Odblokowałeś już tą umiejętność.") : ()=>alert("Musisz wydać 40 punktów umiejętnosci by odblokować tą umiejętność.")}>
                        <i className="fa-solid fa-5"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

function RocketWeapon(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    return (
        <>
            <div className="skill_tree">
                <div className="button_box flexCC">
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć obrażenia broni rakietowej." onClick={game_stats.rocket_damage_level <= 19 ? ()=>{dispatch({type: 'add_skill_level', payload: 'rocket_damage_level'}); dispatch({type: 'setStats'})} : ()=>alert("Osiągnięto maksymalny poziom umiejętności")}>
                        <i className="fa-solid fa-gun"></i>
                        <div className="skill_button_level">{game_stats.rocket_damage_level}</div>
                    </div>
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć rozmiar eksplozji rakiety." onClick={game_stats.rocket_width_level <= 19 ? ()=>{dispatch({type: 'add_skill_level', payload: 'rocket_width_level'}); dispatch({type: 'setStats'})} : ()=>alert("Osiągnięto maksymalny poziom umiejętności")}>
                        <i className="fa-solid fa-arrows-left-right-to-line"></i>
                        <div className="skill_button_level">{game_stats.rocket_width_level}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

function LaserWeapon(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    return (
        <>
            <div className="skill_tree">
                <div className="button_box flexCC">
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć obrażenia broni laserowej." onClick={game_stats.laser_damage_level <= 19 ? ()=>{dispatch({type: 'add_skill_level', payload: 'laser_damage_level'}); dispatch({type: 'setStats'})} : ()=>alert("Osiągnięto maksymalny poziom umiejętności")}>
                        <i className="fa-solid fa-gun"></i>
                        <div className="skill_button_level">{game_stats.laser_damage_level}</div>
                    </div>
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć szerokość lasera." onClick={game_stats.laser_width_level <= 19 ? ()=>{dispatch({type: 'add_skill_level', payload: 'laser_width_level'}); dispatch({type: 'setStats'})} : ()=>alert("Osiągnięto maksymalny poziom umiejętności")}>
                        <i className="fa-solid fa-arrows-left-right-to-line"></i>
                        <div className="skill_button_level">{game_stats.laser_width_level}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
function RazorWeapon(){
    const dispatch = useDispatch();
    let game_stats = useSelector(state => state.game_stats);
    return (
        <>
            <div className="skill_tree">
                <div className="button_box flexCC">
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć obrażenia ostrza zagłady." onClick={game_stats.razor_damage_level <= 19 ? ()=>{dispatch({type: 'add_skill_level', payload: 'razor_damage_level'}); dispatch({type: 'setStats'})} : ()=>alert("Osiągnięto maksymalny poziom umiejętności")}>
                        <i className="fa-solid fa-gun"></i>
                        <div className="skill_button_level">{game_stats.razor_damage_level}</div>
                    </div>
                    <div className="skill_button flexCC" title="Kliknij by zwiększyć rozmiar ostrza." onClick={game_stats.razor_width_level <= 19 ? ()=>{dispatch({type: 'add_skill_level', payload: 'razor_width_level'}); dispatch({type: 'setStats'})}: ()=>alert("Osiągnięto maksymalny poziom umiejętności")}>
                        <i className="fa-solid fa-arrows-left-right-to-line"></i>
                        <div className="skill_button_level">{game_stats.razor_width_level}</div>
                    </div>
                    <div className={game_stats.razor_second ? "skill_button active_skill flexCC"  : "skill_button flexCC"} 
                        title="Kliknij by zwiększyć ilość ostrz zagłady do 2." 
                        onClick={(game_stats.razor_damage_level + game_stats.razor_width_level >= 20 && game_stats.razor_second === false) ? ()=>{dispatch({type: 'active_skill_level', payload: 'razor_second'})} : game_stats.razor_second ? ()=>alert("Odblokowałeś już tą umiejętność.") : ()=>alert("Musisz wydać 20 punktów umiejętnosci by odblokować tą umiejętność.")}>
                        <i className="fa-solid fa-2"></i>
                    </div>
                </div>
            </div>
        </>
    )
}