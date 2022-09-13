import Purchase from "./Purchase"
import Home from "./Home"
import About from "./About"
import Billing from "./Billing"
import Coins from "./Coins"
import { Route, Routes } from "react-router-dom"

export default function Routing() {

    return (
        <>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/coins" element={<Coins />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    )

}