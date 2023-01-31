import React,{ useContext, useEffect, useState,useRef } from 'react'
import AppContext from '../state/context'
import './css/table.scss'
export interface Data{
    tag:string
    stock_num:string
    item_desc:string
    qty:number
    icn:string
    serial_num:string
    date_captured:string
    qr_id:string
    status:string
}
type Props={
    columns?:string[],
    data:Data[],
    select?:boolean,
    selected?:string[],
    refs?:React.RefObject<HTMLInputElement>,
    onSelect:(e:string,isChecked:boolean)=>void
}

type InputProps={
    onChange:(value:string)=>void,
    defaultValue:string
}
const Input = ({onChange,defaultValue}:InputProps)=>{
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        const input = ref.current
        if(!input) return

        let timeoutId:NodeJS.Timeout
        const handleInput=()=>{
            clearTimeout(timeoutId)
            timeoutId = setTimeout(()=>input.blur(),1000)
        }
        input.addEventListener('input',handleInput)
        return ()=>{
            input.removeEventListener('input',handleInput)
            clearTimeout(timeoutId)
        }
    }, [ref])

    return(
        <>
            
            <input ref={ref} className='qty' type={'text'} value={defaultValue} onChange={e=>onChange(e.target.value)} />
        </>
    )
}

const Table=({columns,data,select,onSelect,refs}:Props)=>{
    const {dispatch,state} = useContext(AppContext)
    const [isChecked,setIsChecked] = useState<boolean>(false)
    const selectAll = (isChecked:boolean)=>{
        
        if(isChecked){
            dispatch({type:'selectAll', payload:''})
            setIsChecked(true)
        }
        else{
            dispatch({type:'unSelectAll', payload:''})
            setIsChecked(false)
        }
    }

    const setQty=(val:string,tag:string)=>{
        const qty = val.length<1?0:Number(val)
        dispatch({ type:'qty',payload:{tag,qty} as Data })
    }
    useEffect(()=>{
        if(state.selected.length<1)
        setIsChecked(false)
    },[state.selected])
    return(
        <table className="d_tables">
            {
                columns&&
                <thead>
                    <tr>
                        {
                        select&&
                        <th>
                            <input  checked={isChecked} onChange={(e)=>selectAll(e.target.checked)} type='checkbox'/>
                        </th>
                        }
                        {
                        columns.map((title,i)=>{
                            return <th key={i}>{title}</th>
                        })
                        }
                    </tr>
                </thead>
            }
            <tbody>
                {
                    data.map((item)=>{
                        const checked = state.selected?.includes(item.tag)
                        return(
                            <tr key={item.tag}>
                                {
                                select&&
                                <td>
                                    <input checked={checked} onChange={(e)=>onSelect(item.tag,e.target.checked)} id={item.stock_num} type='checkbox'/>
                                </td>
                                }
                                <td>{item.tag}</td>
                                <td>{item.stock_num}</td>
                                <td>{item.item_desc}</td>
                                {/* <td><input className='qty' ref={refs} onChange={(e)=>setQty(e.target.value,item.tag)} maxLength={4} type={'text'}  value={item.qty} /></td> */}
                                <td>
                                    <Input defaultValue={item.qty.toString()} onChange={(qty)=>setQty(qty,item.tag)}/>
                                </td>

                                <td>{item.icn}</td>
                                <td>{item.serial_num}</td>
                                <td>{item.date_captured}</td>
                                <td>{item.qr_id}</td>
                                <td>{item.status}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default Table