'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const NavBar = () => {
    const pathname = usePathname();
    const [nombreProducto, setNombreProducto] = useState<string | null>(null);

    useEffect(() => {
        const match = pathname.match(/^\/productos\/(\d+)$/); // para rutas tipo /productos/5
        
        if (match) {
            const id = match[1];
            fetch(`http://localhost:8001/productos/${id}`)
                .then(res => res.json())
                .then(data => setNombreProducto(data.nombre))
                .catch(() => setNombreProducto(null));
        } else {
            setNombreProducto(null);
        }
    }, [pathname]);

    return (
        <header className='sticky top-0 z-50'>
            <nav className="flex justify-between bg-yellow-300 w-screen">
                <div className="px-5 xl:px-12 py-4 flex w-full items-center text-emerald-700">
                    <Link className="text-3xl font-bold font-heading flex flex-row items-center gap-5" href="/dashboard">
                        <Image
                            src="/logo2.png"
                            alt="Logo"
                            width={70}
                            height={70}
                        />
                        <span className="hover:text-lime-400">Supermercado</span>
                    </Link>
                    <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading text-xl space-x-32">
                        <Link href="/dashboard" className="hover:text-lime-400"> Inicio </Link>
                        <Link href="/productos" className="hover:text-lime-400"> Productos </Link>
                        {nombreProducto && (<Link href={`/productos/${pathname.split("/").at(-1)}` }className="hover:text-lime-400"> {nombreProducto} </Link>)}
                        <Link href="/about" className="hover:text-lime-400"> Acerca de </Link>
                    </ul>
                    <div className="hidden xl:flex items-center space-x-5">
                        <Link className="flex items-center hover:text-lime-400" href="/carrito">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="flex absolute -mt-5 ml-4">
                                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                            </span>
                        </Link>
                        <Link className="flex items-center hover:text-lime-400" href="/perfil">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>

    )
}