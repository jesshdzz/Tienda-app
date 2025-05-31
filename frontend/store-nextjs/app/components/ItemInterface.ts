export interface ProductoResponse {
    id: number;
    id_provedor: number;
    codigo: string;
    imagen: string;
    nombre: string;
    marca: string;
    tipo: string;
    grupo: string;
    peso: number;
    precio_unidad: number;
    stock: number;
}

export interface SimpleItem {
    id: number;
    codigo: string;
}


export interface ProductoCarrito {
    id: number;
    producto: string;
    cantidad: number;
    precio_unidad: number;
    total: number;
    imagen: string;
    codigo: string;
    tipo: string;
    stock: number;
}