import React, { createContext } from "react";
import { DataProps } from "../components/Table";

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
    payload:DataProps
}
type Action2 = {
    type:'select' | 'unselect' | 'selectAll' |'unSelectAll',
    payload: string[]
}
type Action3 = {
    type:'scan' ,
    payload: DataProps[]
}
type Action = Action1 | Action2 |Action3
type State = {
    items:DataProps[],
    selected:string[],
    data:DataProps[]
}
export const initialState:State = {
    items:[],
    selected:[],
    data:[]
}
export const reducer = (state:State,action:Action)=>{
    switch(action.type){
        case 'add':

            return {
                ...state,
                items:[action.payload, ...state.items]
            }
        case 'remove':
            const itemss=state.items.filter((value)=>!state.selected.includes(value.tag))
            
            return{
                ...state,
                items:itemss,
                selected: []
            }
        case 'clear':
            return{
                ...state,
                items:[],
                selected: []
            }
        case 'select':
            return {
                ...state,
                selected:action.payload
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
        case 'scan':
            return{
                ...state,
                data: action.payload
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