// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Themes/Catalog';
// import { themeService } from './services/themeService';

import { serviceFactory } from './services/serviceFactory';

function App() {
    // const themeService = themeService();
    const themeService =  serviceFactory('theme');
    const [themes, setThemes] = useState([]);

    const topicService = serviceFactory('topic');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        topicService.getAll()
        .then(res => {
            setTopics(res);
        });
    }, []);

    useEffect(() => {
        themeService.getAll()
            .then(res => {
                setThemes(res)
            });
    }, []);

    return (
        <>
            <div className="App">
                <Header />
                <div className="main">
                    <Routes>
                        <Route path='*' element={<h1>404</h1>} />
                        <Route path='/' element={<Home topics={topics} />}></Route>
                        <Route path='/register' element={<RegisterUser />}></Route>
                        <Route path='/login' element={<LoginUser />}></Route>
                        <Route path='/catalog' element={<Catalog themes={themes} />}></Route>
                    </Routes>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default App;
