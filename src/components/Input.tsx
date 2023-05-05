import { useEffect, useState } from "react"
import { DataProps } from "./Table"
type Props ={
    item:DataProps,
}
const Input=({item}:Props)=>{
    const [quantity,setQuantity]=useState(item.quantity)
    useEffect(()=>{
        setQuantity(item.quantity)
    },[item.quantity])
    return(
        <input className="editQuant" id={item.tag+'input'} type="text" 
            onKeyDown={(e)=>{
                if(e.key === 'Enter')
                e.currentTarget.blur()
            }} value={quantity} 
            onChange={(e)=>{
            
                const qty = parseInt(e.target.value===''?'0':e.target.value)
                setQuantity(qty)
                return item.quantity = qty
            }}
         />
    )

}
export default Input