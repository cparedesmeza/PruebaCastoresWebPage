import { getConecction } from '../database/connection.js'
import sql from 'mssql';

/* TABLA DE USUARIOS */
export const Login = async (req, res) => {

    console.log(req.body.correo);
    console.log(req.body.usuario);
    console.log(req.body.password);
    const pool = await getConecction();
    const result = await pool.request()
        .input('usuario', sql.VarChar, req.body.usuario)
        .input('correo', sql.VarChar, req.body.correo)
        .input('password', sql.VarChar, req.body.password)
        .query("SELECT * FROM usuarios WHERE usuario= @usuario and password = @password or correo=@correo ;SELECT SCOPE_IDENTITY() AS id;");

    if (result.rowsAffected[0] === 0) {
        return res.json({ message: 'usuario inexistente' });
    } else {
        if (result.recordset[0].usuario === req.body.usuario || result.recordset[0].correo === req.body.correo) {
            if (result.recordset[0].contraseña === req.body.contraseña) {
                res.json({
                    message: 'success',
                    results: result.recordset
                })
            }
        } else {
            res.json({ message: 'usuario o contraseña incorrectos' })
        }
    }

}
export const newUser = async (req, res) => {
    console.log(req.body);
    const pool = await getConecction();
    const result = await pool.request()
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('apellido', sql.VarChar, req.body.apellido)
        .input('usuario', sql.VarChar, req.body.usuario)
        .input('correo', sql.VarChar, req.body.correo)
        .input('password', sql.VarChar, req.body.password)
        .input('newpassword', sql.VarChar, req.body.newpassword)
        .input('estatus', sql.VarChar, 'Activo')
        .query("INSERT INTO usuarios(nombre,apellido,usuario,correo,password,newpassword,estatus) VALUES (@nombre,@apellido,@usuario,@correo,@password,@newpassword,@estatus); SELECT SCOPE_IDENTITY() AS id_producto;");
    res.json({
        message: 'success',
        results: {
            id: result.recordset[0].id_producto,
            usuario: req.body.usuario,
            correo: req.body.correo,
            password: req.body.password
        }
    });
}
export const getUser = async (req, res) => {
    console.log(req.params);
    const pool = await getConecction();
    const result = await pool.request()
        .input('id_usuario', sql.VarChar, req.params.id)
        .query("SELECT * FROM usuarios WHERE id_usuario = @id_usuario")
    console.log(result)
    if (result.rowsAffected[0] === 0) {
        return res.json({ message: 'Usuario Inexistente' });
    } else {
        res.json({
            message: 'success',
            results: result.recordset
        })
    }
}
/* TABLA DE VIDEOS */
export const newRegister = async (req,res) =>{
    console.log(req.body)
    const pool = await getConecction();
    const result = await pool.request()
    .input('title', sql.VarChar, req.body.title)
    .input('description', sql.VarChar, req.body.description)
    .input('date', sql.VarChar, req.body.date)
    .input('url', sql.VarChar, req.body.url)
    .query("INSERT INTO videosFavoritos(title,description,date,url) VALUES (@title,@description,@date,@url); SELECT SCOPE_IDENTITY() AS id;");
    res.json({
        message: 'success',
        results: {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            url: req.body.url,
        }
        })
}






