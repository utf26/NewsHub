import React from 'react';
import {Link} from 'react-router-dom';
const HomePage = () => {
    return (
        <div className="bg-gray-100 h-screen flex flex-col">
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <h2 className="text-3xl font-bold leading-tight text-gray-900">Welcome to News Hub</h2>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500">
                            Get the latest news from around the world.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <Link to="/articles"
                                  className="px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700">
                                View All Articles
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
