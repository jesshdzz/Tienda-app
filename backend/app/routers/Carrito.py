import re
from models.Carrito import CarritoBase, CarritoEliminar
from fastapi import APIRouter, Depends, HTTPException
from database import get_connection, get_db
from psycopg2 import OperationalError

router = APIRouter()

@router.on_event("startup")
def set_connection():
    router.db_connection = get_connection()

@router.get("/")
def listar_carrito(cursor = Depends(get_db)):
    try:
        cursor.execute("""
        SELECT to_json(result) FROM ( SELECT c.id, cl.nombre as cliente, p.nombre, c.cantidad
        FROM carrito c
        JOIN clientes cl ON c.cliente_id = cl.id
        JOIN productos p ON c.producto_id = p.id ) result
        """)
        resultado = cursor.fetchall()
        if not resultado:
            raise HTTPException(status_code=404, detail="No se encontraron productos en el carrito")
        return [item[0] for item in resultado]
    except OperationalError as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos") from e

@router.get("/cliente/{cliente_id}")
def obtener_carrito(cliente_id: int, cursor = Depends(get_db)):
    try:
        cursor.execute("""
        SELECT to_json(result) FROM ( SELECT p.id, p.nombre as producto, c.cantidad, p.precio_unidad, p.precio_unidad * c.cantidad as total, p.imagen, p.codigo, p.tipo, p.stock
        FROM carrito c
        JOIN productos p ON c.producto_id = p.id WHERE c.cliente_id = %s ) result
        """, (cliente_id,))
        resultado = cursor.fetchall()
        if not resultado:
            return []
        return [item[0] for item in resultado]
    except OperationalError as e:
        raise HTTPException(status_code=500, detail="Error al conectar con la base de datos") from e

@router.post("/agregar")
async def agregar_producto(carrito: CarritoBase, db_connection = Depends(get_connection)):
    cursor = db_connection.cursor()
    try:
        query = "INSERT INTO carrito (cliente_id, producto_id, cantidad) VALUES (%s, %s, %s) ON CONFLICT (cliente_id, producto_id) DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad RETURNING cliente_id, producto_id, cantidad;"
        cursor.execute(query, (carrito.cliente_id, carrito.producto_id, carrito.cantidad,))
        salida = cursor.fetchone()
        if salida is None:
            db_connection.rollback()
            raise HTTPException(status_code=400, detail="No se insertó ni actualizó ningún producto")
        db_connection.commit()
        return {"message": "Producto agregado al carrito", "carrito": salida}
    except Exception as e:
        db_connection.rollback()
        raise HTTPException(status_code=500, detail="Error al agregar producto al carrito") from e
    finally:
        cursor.close()

@router.put("/actualizar/")
def actualizar_cantidad(carrito: CarritoBase, cursor = Depends(get_db)):
    query = "UPDATE carrito SET cantidad = %s WHERE cliente_id = %s AND producto_id = %s RETURNING id"
    cursor.execute(query, (carrito.cantidad, carrito.cliente_id, carrito.producto_id))
    if cursor.fetchone():
        router.db_connection.commit()
        return {"message": "Cantidad actualizada"}
    else:
        router.db_connection.rollback()
        raise HTTPException(status_code=404, detail="Elemento no encontrado")

@router.delete("/eliminar/")
def eliminar_elemento(carrito: CarritoEliminar, cursor = Depends(get_db)):
    cursor.execute("DELETE FROM carrito WHERE cliente_id = %s AND producto_id = %s RETURNING id", (carrito.cliente_id, carrito.producto_id))
    if cursor.fetchone():
        router.db_connection.commit()
        return {"message": "Elemento eliminado del carrito"}
    else:
        router.db_connection.rollback()
        raise HTTPException(status_code=404, detail="Elemento no encontrado")
