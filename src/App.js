import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { serviceFactory } from './services/serviceFactory';

import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Themes/Catalog';
import { Create } from './components/Themes/Create';
import { Edit } from './components/Themes/Edit';
import { Logout } from './components/User/Logout';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeDetails } from './components/Themes/ThemeDetails';
import { RouteGuard } from './components/Guards/RouteGuard';

function App() {
    const topicService = serviceFactory('topic');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        topicService.getAll()
            .then(res => {
                setTopics(res);
            });
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider>

                <div className="App">

                    <Header />

                    <div className="main">
                        <Routes>
                            <Route path='*' element={<h1>404</h1>} />
                            <Route path='/' element={<Home topics={topics} />}></Route>
                            <Route path='/register' element={<RegisterUser />}></Route>
                            <Route path='/login' element={<LoginUser />}></Route>
                            <Route path='/logout' element={<Logout />}></Route>
                            <Route path='/catalog' element={<Catalog />}></Route>
                            <Route path='/catalog/:themeId' element={<ThemeDetails />}></Route>
                            <Route element={<RouteGuard />}>
                                <Route path='/create' element={<Create />}></Route>
                                <Route path='/edit/:themeId' element={<Edit />} />
                            </Route>
                        </Routes>
                    </div>

                    <Footer />

                </div>

            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
