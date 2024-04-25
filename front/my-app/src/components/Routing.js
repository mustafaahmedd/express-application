import Home from "./Home"
import Purchase from "./Purchase"
import About from "./About"
import Billing from "./Billing"
import Coin from "./Coin"
import Users from "./Users"
import { Route, Routes } from "react-router-dom"

export default function Routing() {

    return (
        <>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/coins" element={<Coin />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    )
}