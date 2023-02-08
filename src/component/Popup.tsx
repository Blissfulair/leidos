import './css/popup.scss'

type Props = {
    children?:React.ReactNode
    visible:boolean,
    innerStyle?:React.CSSProperties,
    onClose:()=>void,
    onOpen:()=>void
}
const Popup = ({children,visible,onClose,innerStyle}:Props)=>{

    return (
        <div className={`popup ${visible?'':'hidden'}`} onClick={onClose}>
            <div 
            className="inner" 
            onClick={e=>e.stopPropagation()}
            style={{
                ...innerStyle,
                animation:"onOpen 0.5s ease-in-out"
            }}
            >
                {children}
            </div>
        </div>
    )
}
export default Popup