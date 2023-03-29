import React from 'react';
import Navbar from './Navbar';
import {Link} from "react-router-dom";

const Layout = ({children}) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex flex-col h-screen">
                <header className="bg-white p-4 border-b flex flex-wrap justify-between">
                    <Link to="/" className="flex-shrink-0 mr-10 mb-2 md:mb-0 flex items-center">
                        <img className="h-8 w-8"
                             src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                             alt="Workflow"/>
                        <span className="ml-2 font-bold text-xl text-gray-800">News Hub</span>
                    </Link>
                    <Navbar/>
                </header>
                <main className="container mx-auto p-4">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
