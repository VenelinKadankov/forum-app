// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Themes/Catalog';
import { themeService } from './services/themeService';
import { useEffect, useState } from 'react';

function App() {
    const service = themeService();
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        service.getAll()
            .then(res => {
                setThemes(res)
            });
    }, []);

    return (
        <>
            <div className="App">
                <Header />
                <Routes>
                    <Route path='*' element={<h1>404</h1>} />
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/register' element={<RegisterUser />}></Route>
                    <Route path='/login' element={<LoginUser />}></Route>
                    <Route path='/catalog' element={<Catalog themes={themes} />}></Route>
                </Routes>
                <Footer />
            </div>
        </>
    );
}

export default App;
