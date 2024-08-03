import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();


const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    }
}

export const getConecction = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        console.log('Conexión a base de datos correcta')
        return pool;
    } catch (error) {
        console.error('Error de conexion a la base de datos:',error);
    }
}
