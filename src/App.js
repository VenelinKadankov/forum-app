import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { RegisterUser } from './components/User/Register';
import { LoginUser } from './components/User/Login';
import { Footer } from './components/Footer/Footer';
import { Catalog } from './components/Themes/Catalog';
import { Create } from './components/Themes/Create';
import { Logout } from './components/User/Logout';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeDetails } from './components/Themes/ThemeDetails';

function App() {

    return (
        <AuthProvider>
            <ThemeProvider>

                <div className="App">

                    <Header />

                    <div className="main">
                        <Routes>
                            <Route path='*' element={<h1>404</h1>} />
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/register' element={<RegisterUser />}></Route>
                            <Route path='/login' element={<LoginUser />}></Route>
                            <Route path='/logout' element={<Logout />}></Route>
                            <Route path='/catalog' element={<Catalog />}></Route>
                            <Route path='/catalog/:themeId' element={<ThemeDetails />}></Route>
                            <Route path='/create' element={<Create />}></Route>
                        </Routes>
                    </div>

                    <Footer />

                </div>

            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
