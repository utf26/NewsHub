import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Logout from "./components/Logout";
import RegisterPage from './pages/RegisterPage';
import ArticleList from './pages/ArticleList';
import PreferencesPage from './pages/PreferencesPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from "./components/PublicRoute";

function App() {
    const session = Cookies.get('session');

    return (
        <Router>
            <Layout>
                <Routes>
                    {/*Public Routes*/}
                    <Route path="/" element={<Navigate to={session ? "/dashboard" : "/login"}/>}/>
                    <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
                    <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>

                    {/*Authenticated Routes*/}
                    <Route path="/dashboard" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                    <Route path="/logout" element={<ProtectedRoute><Logout/></ProtectedRoute>}/>
                    <Route path="/articles" element={<ProtectedRoute><ArticleList/></ProtectedRoute>}/>
                    <Route path="/preferences" element={<ProtectedRoute><PreferencesPage/></ProtectedRoute>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
