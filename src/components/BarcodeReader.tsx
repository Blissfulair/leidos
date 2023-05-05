import { RefObject,useEffect, useState } from "react"
interface Props{
    onDetect:(barcode:string)=>void,
    ref? :RefObject<HTMLInputElement>
}
interface KeyData {
    key: string;
    time: number;
  }
  let previousKeyData: KeyData | null = null;
  let count =0;
const BarcodeReader=({onDetect,ref}:Props)=>{
    const [barcode,setBarcode]=useState<string>("")
    const [error, setError] = useState(false)
    

    useEffect(()=>{
        
        const handlekeydown=(event:KeyboardEvent)=>{

           
            const currentTime = Date.now();
            const keyData: KeyData = { key: event.key, time: currentTime };
            
            if (previousKeyData !== null) {
                const timeDiff  = keyData.time - previousKeyData.time;
                if(timeDiff>30 && previousKeyData.key !== 'Enter'){
                    setBarcode(keyData.key)
                    setError(true)
                    count++
                }


                if(document.activeElement)
                {
                    
                    if(document.activeElement.localName === 'input' && timeDiff < 30){
                        event.preventDefault()
                    }
                }
                if(event.key==="Shift" )
                return
                if(event.key === 'Backspace')
                return
            }
            if(event.key !== 'Enter')
            setBarcode(barcode+event.key)
            if(event.key==="Enter" && error === false) {
                if(barcode.length>3)
                onDetect(barcode)
                setBarcode("")
            }
            else if(error && previousKeyData?.key !== 'Enter'){
                setError(false)
                if(count === 1)
                setBarcode(previousKeyData?.key+keyData.key)
                else
                setBarcode(keyData.key)
                count =0;
            }
            previousKeyData = keyData;
            

            
        }
        // timerId = setTimeout(()=>{
        //     setBarcode('')
        // },2000)
        
        document.addEventListener("keydown",handlekeydown)
        return ()=>{
            //clearTimeout(timerId)
            document.removeEventListener("keydown",handlekeydown)
        }

    },[onDetect,barcode,error,ref])
    return <></>
}
export default BarcodeReader