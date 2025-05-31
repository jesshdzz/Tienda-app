from fastapi import APIRouter, Depends, HTTPException
from models.Clientes import Cliente, LoginRequest
from database import get_connection, get_db
from psycopg2 import OperationalError

router = APIRouter()

@router.on_event("startup")
def set_connection():
    router.db_connection = get_connection()

@router.get("/get")
async def obtener_clientes(limite: str = "all", cursor = Depends(get_db)):
    try:
        if limite != "all":
            limite = int(limite)
            query = "SELECT to_json(result) FROM (SELECT * FROM clientes LIMIt %s ) result"
            cursor.execute(query, (limite,))
        else:
            query = "SELECT to_json(result) FROM (SELECT * FROM clientes) result"
            cursor.execute(query)
        clientes = cursor.fetchall()
        if not clientes:
            raise HTTPException(status_code=404, detail="No se encontraron clientes")
        return clientes
    except OperationalError as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos") from e
    except ValueError as e:
        raise HTTPException(status_code=400, detail="El límite debe ser un número entero positivo") from e

@router.post("/agregar")
async def agregar_cliente(cliente: Cliente, cursor = Depends(get_db)):
    try:
        query = "INSERT INTO clientes (nombre, correo) VALUES (%s, %s) RETURNING id"
        cursor.execute(query, (cliente.nombre, cliente.correo))
        result = cursor.fetchone()
        router.db_connection.commit()
        return {"id": result[0]}
    except Exception as e:
        router.db_connection.rollback()
        raise HTTPException(status_code=400, detail=str(e)) from e

@router.post("/login")
async def login(request: LoginRequest, cursor=Depends(get_db)):
    query = "SELECT * FROM clientes WHERE email = %s AND password = %s"
    cursor.execute(query, (request.email, request.password))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    return {"ok": True, "message": "Inicio de sesión exitoso", "user_id": user[0]}
