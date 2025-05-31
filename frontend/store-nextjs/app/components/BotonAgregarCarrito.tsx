"use client";

import { useState, useEffect } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import Toast from "./ToastMensaje";

interface AgregarProps {
    productoId: number;
}

export default function BotonAgregarCarrito({ productoId }: AgregarProps) {
    const [mensaje, setMensaje] = useState("");

    const agregarCarrito = async () => {
        const clienteId = localStorage.getItem("id");

        if (!clienteId) {
            setMensaje("Debes iniciar sesión.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8001/carrito/agregar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cliente_id: parseInt(clienteId),
                    producto_id: productoId,
                    cantidad: 1,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Error al agregar");

            setMensaje("Producto agregado ✅");
        } catch (error) {
            console.error(error);
            setMensaje("Error al agregar al carrito ❌");
        }

    };

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => setMensaje(""), 3500); // se borra en 3 segundos
            return () => clearTimeout(timer);
        }
    }, [mensaje]);

    return (
        <>
            <button className="mb-2 md:mb-0 bg-white px-4 py-2 shadow-sm tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 inline-flex items-center space-x-2"
                onClick={agregarCarrito}>
                <span className="text-green-400 hover:text-green-500">
                    <BsCartPlusFill size={28} />
                </span>
                <span> Agregar al carrito </span>
                {mensaje && (<Toast mensaje={mensaje} />)}
            </button>
        </>
    );
}
