import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from '../Header'
import Home from '../../pages/Home'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;