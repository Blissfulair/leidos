import React, {useContext, useEffect, useState, useRef} from 'react';
import BarcodeReader from '../component/BarcodeReader';
import Bottom from '../component/Bottom';
import DeleteButton from '../component/DeleteButton';
import Header from '../component/Header';
import Popup from '../component/Popup';
import Table, { Data } from '../component/Table';
import '../css/home.scss'
import { data as database } from '../data';
import { FaTrash } from "react-icons/fa";
import AppContext from '../state/context';


const Home = ()=>{
    const tableColumns = [
        'Tag',
        "Stock Number",
        "Item Description",
        "Quantity",
        "ICN",
        "Serial Number",
        "Date Captured",
        "QR Id",
        "Status"
    ]
    const {state,dispatch} = useContext(AppContext)
    const [popup,setPopup] = useState<boolean>(false)
    const ref = useRef<HTMLInputElement>(null)

    const onAddItem=(code:string)=>{
        const item = {
            tag:`N${code}`,
            stock_num:code,
            item_desc:'...',
            qty:1,
            icn:'...',
            serial_num:'...',
            date_captured:new Date().toLocaleDateString(),
            qr_id:'9267823-DJK7990-JHHHKS8789',
            status:'Item not found'
        }
        if(Object.keys(database).includes(code)){
            item.status = '...' //Change the defined status
            const edit =state.items.filter(e=>e.tag === `N${code}`); 
            
            if(edit.length>0){
                edit[0].qty +=1
                dispatch({type:'updateQty',payload:edit[0]})

            }
            else{

                dispatch({type:'add',payload:item})
             }
           
        }
        else{
            const edit =state.items.filter(e=>e.tag === `N${code}`); 
            console.log(edit,code, 'second')
            if(edit.length>0){
                edit[0].qty +=1
                dispatch({type:'updateQty',payload:edit[0]})

            }
            else{
                item.stock_num = '...'
                dispatch({type:'add',payload:item})
            }
        }
    }

const onSelect =(item:string,isChecked:boolean)=>{
    
    
    if(isChecked) 
    {
        dispatch({type:'select', payload:item})
    }
    else{
        dispatch({type:'unselect', payload:item})
    }
    
}
const onDelete=()=>{
        dispatch({ type:'remove',payload:{} as Data })
}
const closePopup=()=>{
    setPopup(false)
}

const onFinish =()=>{
    setPopup(false)
    if(state.items.length<1)return
        setPopup(true)

}

const onCancel = ()=>{
    dispatch({ type:'clear',payload:{} as Data })
}
//barcode scanner
BarcodeReader({
    onDetected:(code)=>{
        onAddItem(code)
    },
    ref:ref
})
// useEffect(()=>{
//     setTimeout(()=>{
//             ref.current?.blur()
//         },500) 
// },[state.items])

    return (
        <>
            <Popup onOpen={onFinish} onClose={closePopup} visible={popup} data={state.items} />
            <Header/>
            <div className="container">
                <div className='inner'>
                    <div className='top'>
                        <h3>Captured Items</h3>
                        <ul>
                            <li>
                                <div>
                                    <b>Total Scanned</b>
                                    <span>{state.items.length}</span>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <b>Items with Erros</b>
                                    <span>3</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='second'>
                        <DeleteButton onClick={()=>onDelete()} disabled={state.selected.length<1}> <FaTrash/> Delete</DeleteButton>
                    </div>
                    <Table refs={ref} onSelect={onSelect} columns={tableColumns} data={state.items} select/>
                   
                </div>
                
            </div>
            <Bottom onCancel={onCancel} onFinish={()=>onFinish()}/>
        </>
    )
}

export default Home;