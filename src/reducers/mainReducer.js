import { combineReducers } from "redux";
import {variables} from '../variables/variables';
import { game_stats } from "../variables/game_stats";


function mainpageReducer(state = variables, action){
    switch (action.type){
        case 'toggleInfo': {
            return {
                ...state,
                infoStatus: action.payload
            }
        }
        case 'setActive': {
            return {
                ...state,
                [action.payload]: true
            }
        }
        case 'weapon_achievement': {
            return {
                ...state,
                [action.payload[0][action.payload[1]]]: true
            }
        }
        default:
        return state
    }
}

function gameReducer(state = game_stats, action){
    switch (action.type){
        case 'addExp': {
            if(parseInt(state.exp) < state.exp_breakpoint){
                return {
                    ...state,
                    exp: parseInt(state.exp) + parseInt(action.payload),
                    percent_bar: ((parseInt(state.exp)/parseInt(state.exp_breakpoint))*100).toFixed(0)
                }
            }
            else if(state.exp >= state.exp_breakpoint){
                return {
                    ...state,
                    exp: parseInt(state.exp) - parseInt(state.exp_breakpoint),
                    level: parseInt(state.level) + 1,
                    exp_breakpoint: parseInt(state.exp_breakpoint) + 50,
                    skill_points: parseInt(state.skill_points) + 5,
                    enemy_hp: parseInt(state.enemy_hp) + 20,
                    enemy_damage: parseInt(state.enemy_damage) + 10,
                    boss_hp: parseInt(state.boss_hp) + 400,
                    boss_damage: parseInt(state.boss_damage) + 20,
                }
            }
            else {
                return {
                    ...state
                }
            }
        }
        case 'toggleSkillTree': {
            return {
                ...state,
                skillTree: !state.skillTree
            }
        }
        case 'add_main_skill_tree_level': {
            if(state.skill_points >= 1){
                return {
                    ...state,
                    skill_tree_main_level: state.skill_tree_main_level + 1,
                    skill_points: state.skill_points - 1
                }
            }
            else {
                return {
                    ...state
                }
            }
            
        }
        case 'active_skill_tree': {
            return {
                ...state,
                active_skill_tree: action.payload
            }
        }
        case 'add_skill_level': {
            if(state.skill_points >=1){
                if(action.payload){
                    return {
                        ...state,
                        [action.payload]: state[action.payload] + 1,
                        skill_points: state.skill_points - 1
                    }
                }
            }
            else {
                return {
                    ...state
                }
            }
            break;
        }
        case 'active_skill_level': {
            if(state.skill_points >=1){
                if(action.payload){
                    return {
                        ...state,
                        [action.payload]: true,
                        skill_points: state.skill_points - 1
                    }
                }
            }
            else {
                return {
                    ...state
                }
            }
            break;
        }
        case 'add_kill_count': {
            return {
                ...state,
                kill_count: state.kill_count + 1
            }
        }
        case 'max_kill_count': {
            return {
                ...state,
                max_kill_count: state.kill_count
            }
        }
        case 'max_kill_save': {
            return {
                ...state,
                max_kill_count: action.payload
            }
        }
        case 'actual_hp': {
            return {
                ...state,
                actual_hp: action.payload
            }
        }
        case 'max_hp': {
            return {
                ...state,
                max_hp_to_save: action.payload
            }
        }
        case 'boss_active': {
            return {
                ...state, 
                boss_active: !state.boss_active
            }
        }
        case 'enemy_active': {
            return {
                ...state, 
                enemies_active: !state.enemies_active
            }
        }
        case 'healing': {
            return {
                ...state, 
                actual_hp: parseInt(state.actual_hp) + parseInt((state.max_hp_in_game/100).toFixed(0))
            }
        }
        case 'change_healing': {
            return {
                ...state, 
                healing: action.payload
            }
        }
        case 'setStats': {
            return {
                ...state,
                actual_damage: state.basic_damage + state.basic_damage_level * 5,
                max_hp_in_game: state.basic_hp + state.basic_hp_level * 25,
                actual_attack_speed: (state.basic_attack_speed + state.basic_speed_level * 0.05).toFixed(2),

                gun_actual_damage: state.actual_damage + state.gun_basic_damage + state.gun_damage_level * 5,
                laser_actual_damage: state.basic_damage + state.laser_basic_damage + state.laser_damage_level * 2,
                laser_actual_width: state.laser_basic_width + state.laser_width_level * 1,
                rocket_actual_damage: state.actual_damage + state.rocket_basic_damage + state.rocket_damage_level * 25,
                rocket_actual_width: state.rocket_basic_width + state.rocket_width_level * 5,
                razor_actual_damage: state.actual_damage + state.razor_basic_damage + state.razor_damage_level * 10,
                razor_actual_width: state.razor_basic_width + state.razor_width_level * 2,
            }
        }
        default:
        return state
    }
}


export const rootReducer = combineReducers({
    mainpage: mainpageReducer,
    game_stats: gameReducer
});