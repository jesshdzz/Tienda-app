from pydantic import BaseModel

class Producto(BaseModel):
    id: int
    id_provedor: int
    codigo: str
    imagen: str
    nombre: str
    marca: str
    tipo: str
    grupo: str
    peso: int
    precio: int
    stock: int
