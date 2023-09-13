// import { useEffect, useState } from "react"
// import AdminNav from "../../components/nav/AdminNav"
// import { getProductByCount } from "../../functions/product"
// import AdminProductCard from "../../components/card/AdminProductCard"
import Nav from "../components/nav"

const Dashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 pt-5 border">
                    <Nav />
                </div>
                <div className="col">
                    Dashboard
                </div>
            </div>
        </div>
    )
}

export default Dashboard