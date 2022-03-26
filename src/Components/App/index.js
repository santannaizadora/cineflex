import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from '../Header'
import Home from '../../pages/Home'
import Movie from '../../pages/Movie'
import Session from '../../pages/Session'
import Success from "../../pages/Success";


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filme/:idMovie" element={<Movie/>} />
                    <Route path="/sessao/:idSession" element={<Session/>} />
                    <Route path="/sucesso" element={<Success/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;