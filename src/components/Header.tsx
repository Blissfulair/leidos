import "../css/Header.css"
type Props={
    
    setPage:(page:boolean)=>void
}
const Header=({setPage}:Props)=>{
return (
    // <header>
    //     <ul>
    //         <li>
    //             <button onClick={()=>setPage(false)}>
    //                 Sending
    //             </button>
    //         </li>
    //         <li>
    //             <button onClick={()=>setPage(true)}>
    //                 Receiving
    //             </button>
    //         </li>
    //     </ul>
    // </header>
    <>
        <header>
            <h1>Tuskegee Design Test #2</h1>
        </header>

        <div id="tabs">
            <button className="tablink" id="defaultTab" onClick={()=>setPage(false)}>Send</button>
            <button className="tablink" onClick={()=>setPage(true)}>Receive</button>
        </div>
    </>
)

}
export default Header