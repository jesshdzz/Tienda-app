from models.Productos import Producto
from fastapi import APIRouter, Depends, HTTPException
from database import get_connection, get_db
from psycopg2 import OperationalError

router = APIRouter()

@router.on_event("startup")
def set_connection():
    router.db_connection = get_connection()

@router.get("/get")
async def obtener_productos(limite: str = 'all', cursor = Depends(get_db)):
    try:
        if limite != "all":
            limite = int(limite)
            query = "SELECT to_json(result) FROM (SELECT * FROM productos LIMIT %s ) result"
            cursor.execute(query, (limite,))
        else:
            query = "SELECT to_json(result) FROM (SELECT * FROM productos) result"
            cursor.execute(query)
        productos = cursor.fetchall()
        if not productos:
            raise HTTPException(status_code=404, detail="No se encontraron productos")
        return [producto[0] for producto in productos]
    except OperationalError as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos") from e
    except ValueError as e:
        raise HTTPException(status_code=400, detail="El límite debe ser un número entero positivo") from e

@router.get("/{id}")
async def obtenerProducto(id: int, cursor = Depends(get_db)):
    try:
        query = "SELECT to_json(result) FROM (SELECT * FROM productos WHERE id = %s) result"
        cursor.execute(query, (id,))
        producto = cursor.fetchone()
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        return producto[0]
    except OperationalError as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos") from e
    except ValueError as e:
        raise HTTPException(status_code=400, detail="El ID debe ser un número entero positivo") from e
