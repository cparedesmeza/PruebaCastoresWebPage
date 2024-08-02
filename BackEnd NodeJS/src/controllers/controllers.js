import { getConecction } from '../database/connection.js'
import sql from 'mssql';
import nodemailer from 'nodemailer';

/* TABLA DE USUARIOS */
export const Login = async (req, res) => {

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

    if (req.body.recaptchaToken) {
        let secretKey = '6LeTlB0qAAAAACpdts6I2kQVEID1KMszaCWBxajk'
        let url = 'https://www.google.com/recaptcha/api/siteverify';

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: req.body.recaptchaToken,
            })
        })
        let result = await response.json();
        if (result.success === true && result.score > 0.7) {
            const pool = await getConecction();
            const result = await pool.request()
                .input('nombre', sql.VarChar, req.body.nombre)
                .input('apellido', sql.VarChar, req.body.apellido)
                .input('usuario', sql.VarChar, req.body.usuario)
                .input('correo', sql.VarChar, req.body.correo)
                .input('password', sql.VarChar, req.body.password)
                .input('newpassword', sql.VarChar, req.body.newpassword)
                .input('estatus', sql.VarChar, 'Activo')
                .query("INSERT INTO usuarios(nombre,apellido,usuario,correo,password,newpassword,estatus) VALUES (@nombre,@apellido,@usuario,@correo,@password,@newpassword,@estatus); SELECT SCOPE_IDENTITY() AS id_usuario;");
            res.json({
                message: 'success',
                results: {
                    id: result.recordset[0].id_usuario,
                    usuario: req.body.usuario,
                    correo: req.body.correo,
                    password: req.body.password
                }
            });
        }
    }
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
export const getUserByMail = async (req, res) => {
    console.log(req.params.correo);
    const pool = await getConecction();
    const result = await pool.request()
        .input('correo', sql.VarChar, req.params.correo)
        .query("SELECT * FROM usuarios WHERE correo = @correo")
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
export const newRegister = async (req, res) => {

    const pool = await getConecction();
    const result = await pool.request()
        .input('title', sql.VarChar, req.body.title)
        .input('description', sql.VarChar, req.body.description)
        .input('date', sql.VarChar, req.body.date)
        .input('url', sql.VarChar, req.body.url)
        .input('correo',sql.VarChar,req.body.correo)
        .query("INSERT INTO videosFavoritos(title,description,date,url,correo) VALUES (@title,@description,@date,@url,@correo); SELECT SCOPE_IDENTITY() AS id;");
    res.json({
        message: 'success',
        results: {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            url: req.body.url,
            correo: req.body.correo
        }
    })

}
export const getRegister = async (req, res) => {

    const pool = await getConecction();
    const result = await pool.request()
    .input('correo',sql.VarChar, req.body.correo)
    .query('SELECT * FROM videosFavoritos WHERE correo=@correo')
    console.log(result)
    if (result.rowsAffected[0] === 0) {
        return res.json({ message: 'Error en la busqueda' });
    } else {
        res.json({
            message: 'success',
            results: result.recordset
        })
    }
}
export const deleteRegister = async (req, res) => {
    console.log(req.params)
    const pool = await getConecction();
    const result = await pool.request()
        .input('url', sql.VarChar, req.params.id)
        .query("DELETE FROM videosFavoritos WHERE url=@url");
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Video inexistente' });
    } else {
        res.status(202).json({ message: 'Video eliminado de favoritos' });
    }
}

/* TABLA DE HISTORIAL */
export const newHistory = async (req, res) => {
    console.log(req.body.nombre)
    const date = ObterFechayHora();
    const pool = await getConecction();
    const result = await pool.request()
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('usuario', sql.VarChar, req.body.usuario)
        .input('fecha_hora', sql.VarChar, date)
        .input('correo', sql.VarChar, req.body.correo)
        .input('actividad',sql.VarChar,'Login')
        .query("INSERT INTO historialLogin(nombre,usuario,fecha_hora,correo,actividad) VALUES (@nombre,@usuario,@fecha_hora,@correo,@actividad); SELECT SCOPE_IDENTITY() AS id_historial;");
    res.json({
        message: 'success',
        results: {
            id_historial: result.recordset[0].id_historial
        }
    })

}
export const getHistory = async (req, res) => {
    const pool = await getConecction();
    const result = await pool.request()
        .query('SELECT * FROM historialLogin')
    if (result.rowsAffected[0] === 0) {
        return res.json({ message: 'Error en la busqueda' });
    } else {
        res.json({
            message: 'success',
            results: result.recordset
        })
    }
}

/* Uso de funciones */
const ObterFechayHora = () =>{
    const fechaHoraActual = new Date();
    const anio = fechaHoraActual.getFullYear();
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = fechaHoraActual.getDate().toString().padStart(2, '0');
    const horas = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
    return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
}

/* Mail */
export const sendMail = async(req,res)=>{
    console.log(req.body);
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          clientId: "96581623928-uoodc3acujvonm6lp599h91gt0vsiks4.apps.googleusercontent.com",
          clientSecret: "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",
        },
      });

    var mailOptions = {
        from: 'Carlos Paredes Meza',
        to: req.body.correo,
        subject: 'Recuperación de contraseña InnovaTube',
        text: 'Hola ' + req.body.nombre + ' ' + ', este correo es con la finalidad de enviar tu contraseña para el usuario' + ' ' + req.body.usuario + ' ' +', la contraseña es' + ' ' + req.body.password + '               ' + 'Gracias por el uso de nuestra plataforma',
        auth: {
            user: "pruebaslocales51@gmail.com",
            refreshToken: "1//04BNjf-fV0wieCgYIARAAGAQSNwF-L9Ir-4rB4gwsYAwkhgIwgvZoe2-x96Zg0aVIo3cTTev7_obZchg9zRkJeo5WBrq0eRurM-o",
            accessToken: "ya29.a0AcM612wnXyJeFYce4VpxTN7qdfwjdahlT944oRN9Mm2fH5zFyzhcXdJ2DSTWVG0LEmfUwrhfc_9nxnEVWcdjbRnb0MJAY3YbUzz2CO4Ta9t7_ik53wYPEEMuHepTzbuuobjKo3tw-MgCpvTttbUeUYj0THiPqPOhA33paCgYKAe4SARASFQHGX2MiymBseqC4QsJImDVKQGriQg0171",
          },
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
            res.status(500).send({
                status: 'error',
                message: 'Ha habido un error' + error
            });  
        } else {
            console.log('email eviado')
          res.status(200).send({
            status: 'success',
            message: 'El correo ya fue enviado' +info.response,
        });  
        }
      });
    
    
    
    
    
    
    
    
    res.json({
        message: 'success',
        results:{}
    })
}