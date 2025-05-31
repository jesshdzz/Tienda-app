"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ElementoCarrito } from "./ElementoCarrito";
import { ProductoCarrito } from "./ItemInterface";


export default function CarritoUsuario() {
    const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

    useEffect(() => {
        const clienteId = localStorage.getItem("id");
        if (!clienteId) return;

        const fetchCarrito = async () => {
            try {
                const res = await fetch(`http://localhost:8001/carrito/cliente/${clienteId}`);
                if (!res.ok) throw new Error("Error al cargar el carrito");
                const data = await res.json();
                setCarrito(data);
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
                setCarrito([]);
            }
        };
        fetchCarrito();
    }, []);

    const actualizarProducto = (productoId: number, nuevaCantidad: number) => {
        setCarrito((prevCarrito) =>
            prevCarrito.map((producto) =>
                producto.id === productoId
                    ? { ...producto, cantidad: nuevaCantidad, total: nuevaCantidad * producto.precio_unidad }
                    : producto
            )
        );
    };

    const eliminarProducto = (productoId: number) => {
        setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== productoId));
    };

    const total: number = carrito.reduce((acc, producto) => acc + producto.total, 0);
    const totalEnvio = 10.50;

    if (carrito.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
                <Link href="/productos" className="mt-4 text-blue-600 underline">
                    Agregar productos
                </Link>
            </div>
        );
    }



    return (
        <div className="flex flex-col md:flex-row px-14 py-7 mb-[116px]">
            <div className="w-full flex flex-col h-fit gap-4 p-4 ">
                <p className="text-blue-900 text-xl font-extrabold">Mi carrito</p>
                <div className="grid divide-y divide-gray-300 p-4 text-lg font-semibold shadow-md border rounded-sm">
                    {carrito.map((producto) => (
                        <ElementoCarrito key={producto.id} {...producto}
                            onActualizarCantidad={actualizarProducto}
                            onEliminarProducto={eliminarProducto} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full md:w-2/3 h-fit gap-4 p-4">
                <p className="text-blue-900 text-xl font-extrabold">Resumen de compra</p>
                <div className="flex flex-col p-4 gap-4 text-lg font-semibold shadow-md border rounded-sm">
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Subtotal ({carrito.length} Items)</p>
                        <p className="text-end font-bold">${total.toFixed(2)}</p>
                    </div>
                    <hr className="bg-gray-200 h-0.5" />
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Envio</p>
                        <div>
                            <p className="text-end font-bold">${totalEnvio}</p>
                        </div>
                    </div>
                    <hr className="bg-gray-200 h-0.5" />
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Cupon de descuento</p>
                        <a className="text-gray-500 text-base underline" href="#">Agregar</a>
                    </div>
                    <hr className="bg-gray-200 h-0.5" />
                    <div className="flex flex-row justify-between">
                        <p className="text-gray-600">Total</p>
                        <div>
                            <p className="text-end font-bold">${(total + totalEnvio).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                            Comprar carrito
                        </button>
                        <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                            <Link href="/productos">
                                Agregar más productos
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
