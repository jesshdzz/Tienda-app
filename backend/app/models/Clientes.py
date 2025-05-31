from pydantic import BaseModel

class Cliente(BaseModel):
    id: int
    nombre: str
    apellido: str
    tipo_doc: str
    nro_doc: str
    nro_tel_princ: str
    nro_tel_sec: str
    email: str

class LoginRequest(BaseModel):
    email: str
    password: str
