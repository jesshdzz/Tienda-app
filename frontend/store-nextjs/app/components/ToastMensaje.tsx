"use client";

import { useEffect, useState } from "react";

export default function Toast({ mensaje }: { mensaje: string }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (!mensaje) return;

        const hideTimer = setTimeout(() => {
            setVisible(false); // activa animación de salida
        }, 3000);

        const clearTimer = setTimeout(() => {
            setVisible(true); // resetea si llega nuevo mensaje
        }, 4000); // borra realmente tras animación

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(clearTimer);
        };
    }, [mensaje]);

    if (!mensaje || visible === null) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-md border text-sm font-medium
        ${visible
                    ? "bg-green-100 text-green-800 border-green-300 animate-fade-in"
                    : "bg-green-100 text-green-800 border-green-300 animate-fade-out"
                }`}
        >
            {mensaje}
        </div>
    );
}
