import {useContext } from "react"
import BarcodeReader from "./BarcodeReader"
import Table from "./Table"
import AppContext from "../state/context"

const Receiving=()=>{
    const {state,dispatch} = useContext(AppContext)
    BarcodeReader({
        onDetect:(qrcode)=>{
            
            try{
                dispatch({type:'scan', payload:JSON.parse(qrcode)})
            }
            catch(e){
                const items=state.data.filter((value)=>{
                    if(value.tag === qrcode && value.quantity === 1){
                        return
                    }
                    else if(value.tag === qrcode && value.quantity > 1){
                        value.quantity--;
                        return value
                    }
                    else{
                        return value
                    }
                })
                dispatch({type:'scan', payload:items})
            }
            
            
        }
    })
    return(
        <Table data={state.data}/>
    )
}
export default Receiving