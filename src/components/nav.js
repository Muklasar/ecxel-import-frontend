import { Link } from "react-router-dom"

const Nav = () =>{
    return(
        <nav>
            <ul className="nav flex-column">
                {/* <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/dashboard/grad-master" className="nav-link">Grad Master</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/tray-master" className="nav-link">Tray Master</Link>
                </li>
                {/* <li className="nav-item">
                    <Link to="/dashboard/import-excel" className="nav-link">Import Excel</Link>
                </li> */}
                <li className="nav-item">
                    <Link to="/dashboard/order" className="nav-link">Order</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dashboard/scan-uic" className="nav-link">Scan UIC</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav