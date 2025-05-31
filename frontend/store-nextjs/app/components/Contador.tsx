'use client';

import { useState } from 'react';

interface Props {
    value?: number;
}

export const Contador = ({ value = 1 }: Props) => {
    const [count, setCount] = useState(value);

    return (

        <div className="w-[150px] max-w-xs mt-1">
            <div className="relative">
                <button className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200" type="button" onClick={() => count > 1 ? setCount(count - 1) : setCount(1)} >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </button>
                <input
                    type="number"
                    className="w-full pl-4 h-10 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="1"
                    value={count}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < 0) {
                            setCount(1);
                        } else {
                            setCount(value);
                        }
                    }}
                />
                <button className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200" type="button" onClick={() => setCount(count + 1)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
        </div>
    );
}