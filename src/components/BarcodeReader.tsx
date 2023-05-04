import { useEffect, useState } from "react"
interface Props{
    onDetect:(barcode:string)=>void
    onClear? :()=>void
}
const BarcodeReader=({onDetect}:Props)=>{
    const [barcode,setBarcode]=useState<string>("")
    useEffect(()=>{
        let timerId:NodeJS.Timeout
        const handlekeydown=(event:KeyboardEvent)=>{
            
            if(event.key==="Shift" )
            return
            if(event.key === 'Backspace')
            {
                setBarcode('')
                return
            }
            setBarcode(barcode+event.key)
            if(event.key==="Enter") {
                if(barcode.length>3)
                onDetect(barcode)
                setBarcode("")
            }

            
            
        }
        timerId = setTimeout(()=>{
            setBarcode('')
        },2000)
        document.addEventListener("keydown",handlekeydown)
        return ()=>{
            clearTimeout(timerId)
            document.removeEventListener("keydown",handlekeydown)
        }

    },[onDetect])
    return <></>
}
export default BarcodeReader