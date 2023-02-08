import React, {useState,useEffect} from 'react'

interface Props{
    onDetected:(code:string)=>void,
    ref:React.RefObject<HTMLInputElement>
}

const BarcodeReader : React.FC<Props> = ({onDetected,ref})=>{
    const [barcode, setBarcode] = useState<string>('')
    const [time, setTime] = useState<number>(0)
    const [enterings, setEnterings] = useState<string>('')
    // useEffect(()=>{
    //     console.log('blur')
    //     // setTimeout(()=>{
    //             ref.current?.blur()
    //         // },500) 
    // },[enterings])

    useEffect(()=>{
        let timeoutId:NodeJS.Timeout

        const handleKeyDown = (e:KeyboardEvent)=>{
     
        
            if(document.activeElement !== ref.current)
            {
                if(ref.current)
                {
                    ref.current.setAttribute('disabled','disabled')
                }
            if(e.target){
                if(Object.keys(e.target).length<1){
                   
                    if(e.key === 'Shift' || e.key  === 'Backspace' || e.key === 'Ctrl') return
                    const t = new Date().getTime()
                    setEnterings(enterings+e.key)
                    if(enterings.length<1){
                        setBarcode(barcode+e.key.toUpperCase())
                        setTime(t)
                     }
                    else if((t - time)<50)
                    {
                        setBarcode(barcode+e.key)
                        setTime(t)
                    }
                    else if(enterings.length>0){
                        setBarcode('')
                        setEnterings('')
                        setTime(0)  
                    }
                    
                    if(e.key ==='Enter'){
                        onDetected(barcode)
                        setBarcode('')
                        setEnterings('')
                        setTime(0)
                        
                    }
                }
            }
            }
            else{
                console.log('here')
            // clearTimeout(timeoutId)
            // timeoutId = setTimeout(()=>{

            // })
                // ref.current?.blur()
                // document.body.blur()
            }

        }

            document.addEventListener('keydown',handleKeyDown)

        return ()=>{
            document.removeEventListener('keydown',handleKeyDown)
            
        }
    },[onDetected])
    return<></>
}
export default BarcodeReader