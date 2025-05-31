from routers import Clientes, Productos, Carrito
from fastapi import FastAPI
from database import get_connection
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3040"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
async def startup_event():
    app.db_connection = get_connection()
    print("Se ha establecido la conexión a la base de datos")

@app.on_event("shutdown")
async def shutdown_event():
    app.db_connection.close()
    print("Se ha cerrado la conexión a la base de datos")

@app.get("/")
def read_root():
    return {"message": "FastAPI esta corriendo!"}

# Cargar routers
app.include_router(Clientes.router, prefix="/clientes", tags=["Clientes"])
app.include_router(Productos.router, prefix="/productos", tags=["Productos"])
app.include_router(Carrito.router, prefix="/carrito", tags=["Carrito"])
