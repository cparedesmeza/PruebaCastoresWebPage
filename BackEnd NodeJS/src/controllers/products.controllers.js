import {getConecction} from '../database/connection.js'   
import sql from 'mssql';

/* TABLA DE USUARIOS */
export const Login = async (req,res) =>{
    
    console.log(req.body.correo);
    console.log(req.body.usuario);
    console.log(req.body.password);
    const pool = await getConecction();
    const result = await pool.request()
    .input('usuario',sql.VarChar,req.body.usuario)
    .input('correo',sql.VarChar,req.body.correo)
    .input('password',sql.VarChar,req.body.password)
    .query("SELECT * FROM usuarios WHERE usuario= @usuario and password = @password or correo=@correo ;SELECT SCOPE_IDENTITY() AS id;");
   
    if(result.rowsAffected[0] === 0){
        return res.json({message: 'usuario inexistente'});
    }else{
        if(result.recordset[0].usuario === req.body.usuario || result.recordset[0].correo === req.body.correo){
            if(result.recordset[0].contraseña === req.body.contraseña){
                res.json({
                    message:'success',
                    results : result.recordset
                })
            }
        }else{
            res.json({message:'usuario o contraseña incorrectos'})
        }
    }
   
}
export const newUser = async (req,res) =>{
    console.log(req.body);
    const pool = await getConecction();
    const result = await pool.request()
    .input('nombre',sql.VarChar,req.body.nombre)
    .input('apellido',sql.VarChar,req.body.apellido)
    .input('usuario',sql.VarChar,req.body.usuario)
    .input('correo',sql.VarChar,req.body.correo)
    .input('password',sql.VarChar,req.body.password)
    .input('newpassword',sql.VarChar,req.body.newpassword)
    .input('estatus',sql.VarChar, 'Activo')
    .query("INSERT INTO usuarios(nombre,apellido,usuario,correo,password,newpassword,estatus) VALUES (@nombre,@apellido,@usuario,@correo,@password,@newpassword,@estatus); SELECT SCOPE_IDENTITY() AS id_producto;");
    console.log(result);
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






