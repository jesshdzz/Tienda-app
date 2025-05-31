import { ProductoItem, ProductoResponse } from "@/app/components";

const getProductos = async (limit: number = 30): Promise<ProductoResponse[]> => {
    try {
        const productos: ProductoResponse[] = await fetch(`http://backend:8000/productos/get?limite=${limit}`).then((respuesta) => {
            if (!respuesta) {
                throw new Error("Error al obtener los productos");
            }
            return respuesta.json();
        })
        return productos;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default async function ProductosPage() {
    const productos = await getProductos();
    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Todos nuestros productos </h2>
            <section className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-center justify-center mt-6">
                {
                    productos.map((producto) => (
                        <ProductoItem key={producto.id} {...producto} />
                    ))
                }
            </section>
        </>
    )
}