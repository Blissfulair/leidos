import React from 'react'
import './css/delete_button.scss'
type Props = {
    children:React.ReactNode,
    onClick?:()=>void,
    disabled?:boolean
}
const DeleteButton = ({children,onClick,disabled}:Props)=>{
    return (
        <>
        {
            disabled?
            <button className="delete_button disable">{children}</button>
            :
            <button onClick={onClick} className="delete_button">{children}</button>
        }
        </>
    )
}
export default DeleteButton