import ProductoCliente from "@/app/components/ProductoCliente";
import { ProductoResponse } from "@/app/components";

const obtenerProducto = async (id: number): Promise<ProductoResponse> => {
    try {
        const res = await fetch(`http://backend:8000/productos/${id}`);
        if (!res.ok) throw new Error("Error al obtener el producto");
        return res.json();
    } catch (error) {
        console.error(error);
        return {} as ProductoResponse;
    }
};

export default async function ProductoPage({ params }: { params: { producto: string } }) {
    const producto = await obtenerProducto(parseInt(params.producto));

    return (
        <div>
            <ProductoCliente producto={producto} />
        </div>
    );
}