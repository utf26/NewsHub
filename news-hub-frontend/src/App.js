import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Logout";
import RegisterPage from "./pages/RegisterPage";
import ArticleList from "./pages/ArticleList";
import HomePage from "./pages/HomePage";
import PreferencesPage from "./pages/PreferencesPage";
import Layout from "./components/Layout";

function App() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    console.log({isAuthenticated})

    function ProtectedRoutes() {
        return <>
            <Route path="/dashboard" element={<HomePage/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/articles" element={<ArticleList/>}/>
            <Route path="/preferences" element={<PreferencesPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </>;
    }

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    {!isAuthenticated ? (
                        <Route path="*" element={<Navigate to="/login" />} />
                    ) : ProtectedRoutes()}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
