import './css/bottom.scss'
import { FaCheck,FaTimesCircle } from "react-icons/fa";
type Props = {
    onFinish:()=>void,
    onCancel?:()=>void,
}
const Bottom = ({onFinish,onCancel}:Props)=>{
    return (
        <div className="bottom">
            <div className="inner">
                <button style={{ backgroundColor:'#fff',color:'#eb4a4a' }} onClick={onCancel}><FaTimesCircle color='#eb4a4a'/>  Cancel</button>
                <button style={{ backgroundColor:'#0169b9',color:'#fff',borderColor:'#0169b9' }} onClick={()=>onFinish()}><FaCheck color='#fff'/>Finish</button>
            </div>
        </div>
    )
}
export default Bottom