'use client';

import { useState } from "react";
import Image from "next/image";
import { Detalles, ProductoResponse } from "@/app/components";

interface ProductoClienteProps {
    producto: ProductoResponse;
}

export default function ProductoCliente({ producto }: ProductoClienteProps) {
    const [cantidad, setCantidad] = useState(1);
    const clienteId = typeof window !== "undefined" ? localStorage.getItem("id") : null;

    const agregarAlCarrito = async () => {
        if (!clienteId) {
            console.error("No se encontró el ID del cliente en localStorage");
            return;
        }
        if (cantidad < 1) {
            alert("La cantidad debe ser al menos 1");
            return;
        }
        if (cantidad > producto.stock) {
            alert("No hay suficiente stock disponible");
            return;
        }
        if (producto.stock === 0) {
            alert("No hay stock disponible");
            return;
        }
        

        try {
            const res = await fetch(`http://localhost:8001/carrito/agregar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cliente_id: clienteId,
                    producto_id: producto.id,
                    cantidad,
                }),
            });

            if (res.ok) {
                alert("Producto agregado al carrito correctamente");
            } else {
                console.error("Error al agregar producto al carrito");
            }
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
        }
    };

    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <a href="/dashboard" className="hover:underline hover:text-gray-600">Inicio</a>
                    <span>
                        <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                    <a href="/productos" className="hover:underline hover:text-gray-600">Productos</a>
                    <span>
                        <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                    <span>{producto.nombre}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div className="h-64 md:h-80 rounded-lg bg-white mb-4 flex items-center justify-center">
                                <Image
                                    src={producto.imagen}
                                    className="max-w-full object-scale-down lg:max-h-full rounded-2xl"
                                    alt="Imagen del producto"
                                    width={300}
                                    height={300}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{producto.nombre}</h2>
                        <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">{producto.marca}</a></p>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="text-indigo-400 mr-1 mt-1">$</span>
                                    <span className="font-bold text-indigo-600 text-3xl">{producto.precio_unidad}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-green-500 text-xl font-semibold">Ahorra 12%</p>
                                <p className="text-gray-400 text-sm">IVA incluido</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 my-4">
                            <div className="flex-1">
                                <p className="text-gray-500">codigo: {producto.codigo}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500">Tipo: {producto.tipo}</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-500">Peso: {producto.peso} kg</p>
                            </div>
                        </div>
                        <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-3 text-gray-500">
                            <Detalles nombre="Detalles" descripcion={producto.grupo} />
                        </div>

                        <div className="flex flex-auto items-center my-4 space-x-4">
                            <div className="flex-col">
                                <div className="text-xs uppercase text-gray-400 font-semibold">Cantidad: </div>
                                <div className="w-[150px] max-w-xs mt-1">
                                    <div className="relative">
                                        <button className="absolute h-8 w-8 right-10 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200" type="button" onClick={() => setCantidad((prev) => Math.max(1, prev - 1))} >
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
                                            value={cantidad}
                                            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                                        />
                                        <button className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded hover:bg-slate-200" type="button" onClick={() => setCantidad((prev) => prev + 1)}>
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
                            </div>
                            <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white" onClick={agregarAlCarrito}>
                                Agregar al carrito
                            </button>
                            <div className="flex-col">
                                <div className="text-xs uppercase text-gray-400 font-semibold">En stock: </div>
                                <p className="text-gray-700">{producto.stock} unidades </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}