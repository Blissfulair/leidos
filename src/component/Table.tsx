import React,{ useContext, useEffect, useState,forwardRef } from 'react'
import AppContext from '../state/context'
import './css/table.scss'
import Popup from './Popup'
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
    
    onSelect:(e:string,isChecked:boolean)=>void
}

type InputProps={
    onChange:(value:string)=>void,
    defaultValue:string
}
const Input = ({onChange,defaultValue}:InputProps)=>{
    

    return(
        <>  
            <input autoFocus  className='qty' type={'number'} value={defaultValue} onChange={e=>onChange(e.target.value)} />
        </>
    )
}

const Table=({columns,data,select,onSelect}:Props,ref?:React.Ref<HTMLInputElement>)=>{
    const {dispatch,state} = useContext(AppContext)
    const [isChecked,setIsChecked] = useState<boolean>(false)
    const [editModal,setEditModal] = useState<boolean>(false)
    const [itemm,setItemm] = useState({} as Data)
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
        const qty = val.length<1?0:parseInt(val)
        dispatch({ type:'qty',payload:{tag,qty} as Data })
    }

    const closeEditModal = ()=>{
        setEditModal(false)
        setItemm({} as Data)
    }
    
    const openEditModal = ()=>{
        setEditModal(true)
    }
    useEffect(()=>{
        if(state.selected.length<1)
        setIsChecked(false)
    },[state.selected])
    return(
        <>
        <Popup
        onClose={closeEditModal}
        visible={editModal}
        onOpen={openEditModal}
        innerStyle={{
            minHeight:20,
            width:'80%'
        }}
        >
             <table className="d_table">
            <tbody>
                {

                    <tr>

                        <td>{itemm.tag}</td>
                        <td>{itemm.stock_num}</td>
                        <td>{itemm.item_desc}</td>
                        <td>
                            <Input defaultValue={itemm?(itemm.qty?itemm.qty.toString():'0'):'0'} onChange={(qty)=>setQty(qty,itemm.tag)}/>

                        </td>

                        <td>{itemm.icn}</td>
                        <td>{itemm.serial_num}</td>
                        <td>{itemm.date_captured}</td>
                        <td>{itemm.qr_id}</td>
                        <td>{itemm.status}</td>
                    </tr>

                }
            </tbody>
        </table>
        </Popup>
        <table className="d_tables">
            {
                columns&&
                <thead>
                    <tr>
                        {
                        select&&
                        <th>
                            <label className='form-control'>
                                <input   checked={isChecked} onChange={(e)=>selectAll(e.target.checked)} type='checkbox'/>
                            </label>
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
                                    <label className='form-control'>
                                        <input checked={checked} onChange={(e)=>onSelect(item.tag,e.target.checked)} id={item.stock_num} type='checkbox'/>
                                    </label>
                                </td>
                                }
                                <td>{item.tag}</td>
                                <td>{item.stock_num}</td>
                                <td>{item.item_desc}</td>
                                {/* <td><input className='qty' ref={refs} onChange={(e)=>setQty(e.target.value,item.tag)} maxLength={4} type={'text'}  value={item.qty} /></td> */}
                                <td>
                                    {/* <Input refs={ref} defaultValue={item.qty.toString()} onChange={(qty)=>setQty(qty,item.tag)}/> */}
                                    <button onClick={()=>{
                                        openEditModal()
                                        setItemm(item)
                                    }}>{itemm?(itemm.tag=== item.tag?itemm.qty:item.qty.toString()):item.qty.toString()}</button>
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
        </>
    )
}
export default forwardRef(Table)