import {useContext, useState, useRef} from 'react';
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
import QRCode from 'react-qr-code';


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


    /**
     * 
     * onAddItem takes the barcode from BarcodeReader onDetected method and construct the item object and store it 
     */
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

        //This if statement adds item that is found on the database
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
        //The else statement adds item that is not found on the database
        else{
            const edit =state.items.filter(e=>e.tag === `N${code}`); 
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

//Keeps track of selected items when a checkbox is checked
const onSelect =(item:string,isChecked:boolean)=>{
    
    
    if(isChecked) 
    {
        dispatch({type:'select', payload:item})
    }
    else{
        dispatch({type:'unselect', payload:item})
    }
    
}

//Deletes selected Items
const onDelete=()=>{
        dispatch({ type:'remove',payload:{} as Data })
}

//closePopup closes the modal
const closePopup=()=>{
    setPopup(false)
}


//This function opens the QRCode Modal when the finish button is pressed
const onFinish =()=>{
    setPopup(false)
    if(state.items.length<1)return
        setPopup(true)

}

//This function deletes all scanned items when the cancel button is pressed
const onCancel = ()=>{
   return dispatch({ type:'clear',payload:{} as Data })
}
//barcode scanner
BarcodeReader({
    onDetected:(code)=>{
        onAddItem(code)
    },
    ref:ref
})


    return (
        <>
            <Popup onOpen={onFinish} onClose={closePopup} visible={popup}>
                <QRCode value={JSON.stringify(state.items)} />
            </Popup>
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
                    <Table ref={ref} onSelect={onSelect} columns={tableColumns} data={state.items} select/>
                   
                </div>
                
            </div>
            <Bottom onCancel={onCancel} onFinish={()=>onFinish()}/>
        </>
    )
}

export default Home;