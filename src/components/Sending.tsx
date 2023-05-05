import {  useState, useRef, useEffect,useContext } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import BarcodeReader from "./BarcodeReader";
import Table, { DataProps } from "./Table";
import AppContext from "../state/context";

const Sending=()=>{
    const [data,setData]=useState([] as DataProps[])
    const [tags,setTags]=useState([] as string[])
    const [finish,setFinish]=useState(false)
    const {state,dispatch} = useContext(AppContext)
    const ref=useRef(null)
    BarcodeReader({
        onDetect:(barcode)=>{
            if(barcode.length>3 && barcode !== 'Enter' && !barcode.includes('/') && !barcode.includes(']') && !barcode.includes(']'))
            try{
                JSON.parse(barcode);
            }
            catch(e){
                const items  = state.items;
                const item=items.filter((value)=>value.tag===barcode)
                if(item.length>0){
                    item[0].quantity++
                }
                else{
                    const newItem = {
                        tag:barcode,
                        quantity:1,
                        date:new Date().toLocaleString()
                    }
                    
                    
                    dispatch({type:'add',payload:newItem})
                }
            }

        },
        //ref:input
    })
    const getTag=(tag:string)=>{
        if (tags.length<1){
            tags.push(tag)
        }
        else {
            const id=tags.findIndex((t)=>t===tag)
            if(id ===-1){
                tags.push(tag)
            }
            else{
                tags.splice(id,1)
            }

            

        }
        dispatch({type:'select', payload:tags})
        
    }
    const allTags=(input:HTMLInputElement)=>{
        if (input.checked){
            for(let item of state.items)
            tags.push(item.tag)
        }
        else {

            setTags([]);

        }
        dispatch({type:'select', payload:tags})
        
    }
    const onDelete=()=>{
        dispatch({ type:'remove',payload:{} as DataProps })
        setTags([])
    }
    const onFinish=()=>{
        setFinish(true)
    }

    const onPrint=useReactToPrint({
        content: ()=>ref.current
    })

    useEffect(()=>{
        setData(state.items)
    },[state.items])
    return(
        <div id="Send" className="tabcontent">
        {
            tags.length>0 ?
            <button id="delete" onClick={onDelete}>Delete</button> : <button id="delete" disabled>Delete</button>
        }
        {
            data.length>0 && !finish?
            <button id="finish" onClick={onFinish}>Finish</button>:<button id="finish" disabled>Finish</button>
        }
        {finish && data.length>0?
            (
                <>
            <QRCode ref={ref} value={JSON.stringify(data)}/>
            <button onClick={onPrint}>Print</button>
            </>
            ):null
        }
        <Table  allTag={allTags} getTag={getTag} select={tags} data={data }/>
    </div>
    )
}
export default Sending