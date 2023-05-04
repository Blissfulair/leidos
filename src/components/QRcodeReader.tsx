import { useEffect, useState } from "react"
interface Props{
    onDetect:(barcode:string)=>void
}
const QRcodeReader=({onDetect}:Props)=>{
    const [barcode,setBarcode]=useState<string>("")
    useEffect(()=>{
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
        document.addEventListener("keydown",handlekeydown)
        return ()=>{
            document.removeEventListener("keydown",handlekeydown)
        }

    },[onDetect,barcode])
    return <></>
}
export default QRcodeReader