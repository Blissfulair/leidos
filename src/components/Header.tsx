import "../css/Header.css"
type Props={
    
    setPage:(page:boolean)=>void
}
const Header=({setPage}:Props)=>{
return (
    <header>
        <ul>
            <li>
                <button onClick={()=>setPage(false)}>
                    Sending
                </button>
            </li>
            <li>
                <button onClick={()=>setPage(true)}>
                    Receiving
                </button>
            </li>
        </ul>
    </header>
)

}
export default Header