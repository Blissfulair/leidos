import './table.css'
import Input from "./Input"

export type DataProps={
    tag:string,
    quantity:number,
    date:string
}
type Props={
    data:DataProps[],
    getTag?:(tag:string)=>void
    allTag?:(input:HTMLInputElement)=>void,
    select?:string[]
}
const Table=({data,getTag,allTag,select}:Props)=>{

    return (
        <table>
            <thead>
                <tr>
                    {(allTag&&select)&&<th><input checked={(data.length === select.length && data.length >0)} type="checkbox" onChange={(e)=>allTag(e.target)} />   </th>}
                    <th>
                        tag
                    </th>
                    <th>
                        quantity
                    </th>
                    <th>
                        date
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item)=>{
                        return(
                            <tr key={item.tag}>
                                
                                {(getTag&&select)&&<td><input checked={select.includes(item.tag)} type="checkbox" onChange={()=>getTag(item.tag)} />   </td>}
                             
                                <td>{item.tag}</td>
                                <td>
                                    {
                                    getTag?
                                    <Input item={item}/>
                                    :
                                    item.quantity
                                    }
                                    
                                </td>
                                <td>{item.date}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default Table