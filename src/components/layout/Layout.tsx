import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (

    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-white shadow-md hidden md:flex md:flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/users" className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-md font-medium">
            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6m-6-3h6m-6-3h6m-6-3h6m-6-3h6"></path></svg>
            <span>Users</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} Danal </p>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">

        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
          </div>
          <div>
            <span className="text-sm text-gray-600">안녕 하세요!</span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default Layout;