import {useContext } from "react"
import Table from "./Table"
import AppContext from "../state/context"
import QRcodeReader from "./QRcodeReader"

const Receiving=()=>{
    const {state,dispatch} = useContext(AppContext)
    QRcodeReader({
        onDetect:(qrcode)=>{
            
            try{
                dispatch({type:'scan', payload:JSON.parse(qrcode)})
            }
            catch(e){
                const items=state.data.filter((value)=>{
                    if(value.tag === qrcode && value.quantity === 1){
                        return false
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