import React, { createContext } from "react";
import { Data } from "../component/Table";

export interface PayloadProps{
    tag?:string
    stock_num:string
    item_desc?:string
    qty?:number
    icn?:string
    serial_num?:string
    date_captured?:string
    qr_id?:string
    status?:string
}
type Action1 = {
    type:'add' | 'remove' |'updateQty' | 'qty' | 'clear',
    payload:Data
}
type Action2 = {
    type:'select' | 'unselect' | 'selectAll' |'unSelectAll',
    payload:string
}
type Action = Action1 | Action2
type State = {
    items:Data[],
    selected:string[]
}
export const initialState:State = {
    items:[],
    selected:[]
}
export const reducer = (state:State,action:Action)=>{
    switch(action.type){
        case 'add':
            return {
                ...state,
                items:[action.payload, ...state.items]
            }
        case 'updateQty':
            const items = state.items.filter((item)=>{
                if(item.tag === action.payload.tag){
                    item.qty =action.payload.qty
                    return item;
                }
                return item
            })
            return{
                ...state,
                items:items
            }
        case 'qty':
            const items_new = state.items.filter((item)=>{
                if(item.tag === action.payload.tag){
                    item.qty =action.payload.qty
                    return item;
                }
                return item
            })
            return{
                ...state,
                items:items_new
            }  
        case 'remove':
            const all = state.items;
            state.selected.forEach(tag=>{
                const remeveItems =all.findIndex(item=>item.tag ===tag)
                
                all.splice(remeveItems,1)
                state.selected.pop()
            })
            
            return{
                ...state,
                items:state.items,
                selected: []
            }
        case 'clear':
            return{
                ...state,
                items:[],
                selected: []
            }
        case 'select':
           
            if(!state.selected.includes(action.payload))
            state.selected.push(action.payload)
            return {
                ...state,
                selected:state.selected
            }
        case 'unselect':
            const item =state.selected.filter(tag=>tag !==action.payload)
            return{
                ...state,
                selected:item
            }
        case 'selectAll':
            const all_tags:string[] = []
            state.items.forEach((item)=>{
                all_tags.push(item.tag)
            })
            return {
                ...state,
                selected:all_tags
            }
        case 'unSelectAll':
            return{
                ...state,
                selected:[]
            }
        default:
            return state
    }
}
export interface ContextProps {
    state:State;
    dispatch:React.Dispatch<Action>
}
const AppContext = createContext<ContextProps>({
    state:initialState,
    dispatch:()=>{}
})
export const Provider = AppContext.Provider
export default AppContext