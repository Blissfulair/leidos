import './css/bottom.scss'
type Props = {
    onFinish:()=>void,
    onCancel?:()=>void
}
const Bottom = ({onFinish,onCancel}:Props)=>{
    return (
        <div className="bottom">
            <div className="inner">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={()=>onFinish()}>Finish</button>
            </div>
        </div>
    )
}
export default Bottom