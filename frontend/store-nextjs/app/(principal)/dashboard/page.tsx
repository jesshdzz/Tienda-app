import Link from "next/link";
import { ProductoItem, BlockQuote, ProductoResponse } from "../../components";

const getProductos = async (limit: number): Promise<ProductoResponse[]> => {
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


export default async function DashboardPage() {
    const productos = await getProductos(7);

    return (
        <>
            <section className="container mx-auto">
                <div className="mb-12 md:mb-20">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-current [text-wrap:_balance] max-w-3xl mx-auto mb-6 text-center !leading-tight">Encuentra tus productos favoritos y recíbelos directo en tu hogar.</h1>
                    <p className="text-base md:text-lg text-stone-600 mb-12 mx-auto text-center max-w-xl">Explora nuestras categorías y vive la experiencia de comprar en línea con comodidad y seguridad.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/productos" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-lg px-6 py-3 text-sm shadow-md transition duration-200">Ver Productos</Link>
                        <Link href="/login" className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg px-6 py-3 text-sm shadow-md transition duration-200">Inicia sesión</Link>
                    </div>
                </div>
                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
                    <div className="mx-auto max-w-2xl lg:max-w-none">
                        <h2 id="testimonial-heading" className="text-2xl font-bold tracking-tight text-gray-900"> Que dicen nuestros clientes?</h2>

                        <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                            <BlockQuote cita="Me encanta la variedad de productos que ofrecen. Siempre encuentro lo que necesito y más." autor="Pepe Pecas, Atizapan" />
                            <BlockQuote cita="La calidad de los productos es excepcional. Nunca me he decepcionado con mis compras." autor="Juanito, Chalco" />
                            <BlockQuote cita="Mi pedido llegó super rápido. El producto incluso es mejor de lo que esperaba. Un muy feliz cliente por aquí!." autor="Maria, Naucalpan" />
                        </div>
                    </div>
                </section>
            </section>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Productos destacados</h2>
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