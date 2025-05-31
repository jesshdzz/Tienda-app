import psycopg2
import psycopg2.extras
from config import settings

DATABASE_CONFIG = {
    "host": settings.db_host,
    "port": settings.db_port,
    "user": settings.db_user,
    "password": settings.db_pass,
    "dbname": settings.db_name,
}

def get_connection():
    conn = psycopg2.connect(**DATABASE_CONFIG)
    return conn

def get_db():
    conn = get_connection()
    db = conn.cursor()
    try:
        yield db
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"BOLAS: {e}")
        raise e
    finally:
        db.close()
        conn.close()
        print("Conexión cerrada")
