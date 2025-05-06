'use client';

import { SearchFormData } from '@/types/common/CommonTypes';
import React, { useState, FormEvent } from 'react';

interface SearchFormProps {
    onSearch: (searchData: SearchFormData) => void;
    onReset: () => void;
}

const SearchBar: React.FC<SearchFormProps> = ({ onSearch, onReset }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [active, setActive] = useState<boolean | ''>(''); 


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const searchData: SearchFormData = {
            id: id || undefined,
            name: name || undefined,
            email: email || undefined,
            active: active, 
        };
        onSearch(searchData);
    };


    const handleReset = () => {
        setId('');
        setName('');
        setEmail('');
        setActive('');
        onReset();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
       
            <div>
                <label htmlFor="search-id" className="block text-sm font-medium text-gray-700 mb-1">
                    사용자 ID
                </label>
                <input
                    type="text"
                    id="search-id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID 검색"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

        
            <div>
                <label htmlFor="search-name" className="block text-sm font-medium text-gray-700 mb-1">
                    사용자명
                </label>
                <input
                    type="text"
                    id="search-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름 검색 "
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

    
            <div>
                <label htmlFor="search-email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                </label>
                <input
                    type="email"
                    id="search-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 검색"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="search-active" className="block text-sm font-medium text-gray-700 mb-1">
                    활성상태
                </label>
                <select
                    id="search-active"
                    value={String(active)}
                    onChange={(e) => {
                        const value = e.target.value;
                        setActive(value === 'true' ? true : value === 'false' ? false : '');
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                >
                    <option value="">전체</option>
                    <option value="true">활성</option>
                    <option value="false">비활성</option>
                </select>
            </div>


             <div className="md:col-span-2 lg:col-span-4 flex justify-end space-x-3 pt-4">
                 <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                >
                    초기화
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                >
                    조회
                </button>
            </div>
        </form>
    );
};

export default SearchBar;

