"use client"

import Image from 'next/image';
import { ProductoCarrito } from './ItemInterface';
import { MdDeleteOutline } from "react-icons/md";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ElementoCarritoProps extends ProductoCarrito {
    onActualizarCantidad: (productoId: number, nuevaCantidad: number) => void;
    onEliminarProducto: (productoId: number) => void;
}

export const ElementoCarrito = ({ onActualizarCantidad, onEliminarProducto, ...producto }: ElementoCarritoProps) => {
    const [count, setCount] = useState(producto.cantidad);
    const id = localStorage.getItem("id");
    if (!id) {
        console.error("No se encontró el ID del cliente en localStorage");
        return null;
    }

    useEffect(() => {
        // Evita enviar si es igual a la original
        if (count === producto.cantidad) return;

        // Evita enviar si es mayor al stock
        if (count > producto.stock) {
            setCount(producto.stock);
            return;
        }
        // Evita enviar si es menor a 1
        if (count < 1) {
            setCount(1);
            return;
        }

        const actualizarCantidad = async () => {
            try {
                const res = await fetch(`http://localhost:8001/carrito/actualizar/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ cliente_id: parseInt(id), producto_id: producto.id, cantidad: count })
                });
                if (res.ok) {
                    onActualizarCantidad(producto.id, count);
                } else {
                    console.error("Error al actualizar cantidad en el servidor");
                }
            } catch (error) {
                console.error("Error al actualizar cantidad:", error);
            }
        };

        actualizarCantidad();
    }, [count]);

    const EliminarProducto = async () => {
        try {
            const res = await fetch(`http://localhost:8001/carrito/eliminar/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cliente_id: parseInt(id), producto_id: producto.id })
            });
            if (res.ok) {
                console.log("Producto eliminado del carrito");
                onEliminarProducto(producto.id);
            } else {
                const errorData = await res.json();
                console.error("Error al eliminar producto del carrito:", errorData);
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    return (
        <div className="flex flex-col px-5 py-3 w-full">
            <div className="flex gap-3 justify-between w-full">
                <div className="flex flex-auto flex-row gap-6 items-center w-3/5">
                    <div className="flex justify-center al items-center w-28 h-28 bg-white rounded-2xl shadow-md">
                        <Image
                            className="w-3/4 object-scale-down h-3/4"
                            src={producto.imagen}
                            alt="Imagen del producto"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link href={`/productos/${producto.id}`}>
                            <p className="text-lg text-gray-800 font-semibold">{producto.producto}</p>
                        </Link>
                        <p className="text-xs text-gray-600 font-semibold">Categoria: <span className="font-normal">{producto.tipo}</span></p>
                        <p className="text-xs text-gray-600 font-semibold">Codigo: <span className="font-normal">{producto.codigo}</span></p>
                    </div>
                </div>
                <div className="flex-auto self-center text-center">
                    <p className="text-xs uppercase text-gray-400 font-semibold">Precio unitario: </p>
                    <p className="text-gray-600 font-normal text-xl">$ {producto.precio_unidad.toFixed(2)}</p>
                </div>
                <div className="flex-auto self-center text-center">
                    <p className="text-xs uppercase text-gray-400 font-semibold">Subtotal: </p>
                    <p className="text-emerald-600 font-normal text-xl">$ {producto.total.toFixed(2)}</p>
                </div>
                <div className="flex-auto self-center text-center">
                    <button onClick={EliminarProducto} type='button'>
                        <MdDeleteOutline size={28} />
                    </button>
                </div>
            </div>
            <div className="flex flex-row self-center gap-1">
                <button className="w-5 h-5 self-center rounded-full border border-gray-300 hover:bg-gray-50" type='button' onClick={() => count > 1 ? setCount(count - 1) : setCount(1)} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                    </svg>
                </button>
                <input type="number" value={count > producto.stock ? producto.stock : count} className="w-8 h-8 text-center text-gray-900 text-sm outline-none border border-gray-300 rounded-sm"
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < 0) {
                            setCount(1);
                        } else if (value >= producto.stock) {
                            setCount(producto.stock);
                        } else {
                            setCount(value);
                        }
                    }} />
                <button className="w-5 h-5 self-center rounded-full border border-gray-300 hover:bg-gray-50" type='button' onClick={() => setCount(count + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                </button>
            </div>
        </div>
    )
}