import React, {useState,useEffect} from 'react'

interface Props{
    onDetected:(code:string)=>void,
    ref:React.RefObject<HTMLInputElement>
}

const BarcodeReader : React.FC<Props> = ({onDetected,ref})=>{
    const [barcode, setBarcode] = useState('')

    useEffect(()=>{
        const handleKeyUp =(e:KeyboardEventInit)=>{
            console.log(e)
        }
        const handleKeyDown = (e:KeyboardEvent)=>{
           
            console.log('keydown')
            if(e.target){
                if(Object.keys(e.target).length<1){
                    if(e.key === 'Shift' || e.key  === 'Backspace' || e.key === 'Ctrl') return
                    setBarcode(barcode+e.key)
                    
                    if(e.key ==='Enter'){
                        onDetected(barcode)
                        setBarcode('')
                    }
                }
            }

        }
        if(document.activeElement !== ref.current)
        {
            document.addEventListener('keydown',handleKeyDown)
            document.addEventListener('keyup',handleKeyUp)
        }
        return ()=>{
            document.removeEventListener('keydown',handleKeyDown)
            document.removeEventListener('keyup',handleKeyUp)
        }
    },[onDetected])
    return<></>
}
export default BarcodeReader