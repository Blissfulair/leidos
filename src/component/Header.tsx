import './css/header.scss'
const Header = ()=>{
    return (
        <header>
            <ul>
                <li>
                    <a href="/items">Capture Items</a>
                </li>
                <li>
                    <a href="/list">Verify List</a>
                </li>
            </ul>
        </header>
    )
}
export default Header;