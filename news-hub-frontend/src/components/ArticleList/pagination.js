import React from 'react';

const Pagination = ({data, handlePerPageChange, handlePageChange, currentPage}) => {
    return <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
        <div className="text-sm text-gray-700">
            Showing {data.from} to {data.to} of {data.total} articles
        </div>
        <div className="mt-3 sm:mt-0">
            <div className="flex items-center">
                <label htmlFor="perPageSelect" className="mr-2 text-gray-700">Per Page:</label>
                <select
                    id="perPageSelect"
                    name="perPageSelect"
                    className="block w-full sm:w-auto border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={data.perPage}
                    onChange={handlePerPageChange}
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {data.prev_page_url !== null && (
                    <button
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <span className="sr-only">Previous</span>
                        &laquo;
                    </button>
                )}
                {Array.from({length: data.last_page}, (_, i) => i + 1).map((page) => {
                    const isActive = currentPage === page;

                    return (
                        <button
                            key={page}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                isActive ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:bg-gray-50'
                            } focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50`}
                            aria-current={isActive ? 'page' : undefined}
                            disabled={isActive}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    );
                })}
                {data.next_page_url !== null && (
                    <button
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <span className="sr-only">Next</span>
                        &raquo;
                    </button>
                )}
            </nav>
        </div>
    </div>
};

export default Pagination;
