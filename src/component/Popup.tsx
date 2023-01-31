import QRCode from "react-qr-code"
import { Data } from "./Table"
import './css/popup.scss'

type Props = {
    data:Data[],
    visible:boolean,
    onClose:()=>void,
    onOpen:()=>void
}
const Popup = ({data,visible,onClose}:Props)=>{

    return (
        <div className={`popup ${visible?'':'hidden'}`} onClick={onClose}>
            <div 
            className="inner" 
            onClick={e=>e.stopPropagation()}
            style={{
                animation:"onOpen 0.5s ease-in-out"
            }}
            >
                <QRCode value={JSON.stringify(data)}/>
            </div>
        </div>
    )
}
export default Popup