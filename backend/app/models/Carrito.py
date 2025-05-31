from pydantic import BaseModel

class CarritoBase(BaseModel):
    cliente_id: int
    producto_id: int
    cantidad: int

class CarritoEliminar(BaseModel):
    cliente_id: int
    producto_id: int
