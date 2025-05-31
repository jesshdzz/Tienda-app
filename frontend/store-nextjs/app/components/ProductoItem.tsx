import { ProductoResponse } from "./ItemInterface"
import { CiBarcode } from "react-icons/ci";
import { MdOutlinePriceCheck } from "react-icons/md";
import BotonAgregarCarrito from "./BotonAgregarCarrito";

import Image from "next/image";
import Link from "next/link";

export const ProductoItem = ({ ...producto }: ProductoResponse) => {
    return (
        <div className="flex flex-col">
            <div className="bg-white shadow-md rounded-3xl p-4 max-h-60">
                <div className="flex-none lg:flex">
                    <div className=" h-full w-full lg:h-48 lg:w-48   lg:mb-0 mb-3">
                        <Image
                            src={producto.imagen}
                            className="max-w-40 object-scale-down lg:h-48 rounded-2xl"
                            alt="Imagen del producto"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="flex-auto ml-3 justify-evenly py-2">
                        <div className="flex flex-wrap">
                            <div className="w-full flex-none text-xs text-blue-700 font-medium ">
                                {producto.tipo}
                            </div>
                            <h2 className="inline-block text-lg font-medium max-h-7 max-w-72 truncate">{producto.nombre}</h2>
                        </div>
                        <p className="mt-3"></p>
                        <div className="flex py-4  text-sm text-gray-500">
                            <div className="flex-1 inline-flex items-center">
                                <CiBarcode />
                                <p className="ml-2">{producto.codigo}</p>
                            </div>
                            <div className="flex-1 inline-flex items-center">
                                <MdOutlinePriceCheck />
                                <p className="ml-2">{producto.precio_unidad}</p>
                            </div>
                        </div>
                        <div className="flex p-4 pb-2 border-t border-gray-200 "></div>
                        <div className="flex space-x-3 text-sm font-medium">
                            <div className="flex-auto flex space-x-3">
                                <BotonAgregarCarrito productoId={producto.id} />
                            </div>
                            <button className="mb-2 md:mb-0 bg-gray-900 px-5 py-2 shadow-sm tracking-wider text-white rounded-full hover:bg-gray-800" type="button">
                                <Link href={`/productos/${producto.id}`} className="flex items-center space-x-2">
                                    <span> Ver producto </span>
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}