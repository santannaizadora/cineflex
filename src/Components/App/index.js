import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from '../Header'
import Home from '../../pages/Home'
import Dates from "../Dates";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filme/:idMovie" element={<Dates/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;