const express = require('express');
const app=express();
const PORT = 3000;

app.use(express.json());
const registrarPeticion = (req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

app.use(registrarPeticion);

app.get("/inicio", (req, res)=>{
    res.status(200).json({
        mensaje: "Bienvenida a la API de solicitudes"
    });
});

app.get("/informacion", (req, res)=>{
    res.status(200).json({
        servicio: "Registro de las personas interesadas"
    });
});

app.post("/solicitudes", (req, res)=>{
    const {nombre,apellido, correo}= req.body || {};
    if (
        typeof nombre !=="string" || !nombre.trim() ||
        typeof apellido !=="string" || !apellido.trim() ||
        typeof correo !=="string" || !correo.trim()
    ) {
        return res.status(400).json({
            error: "Debes completar todos los campos del nombre, apellido y correo"
        });
    }

    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoCorreo.test(correo.trim())) {
        return res.status(400).json({
            error:"El correo electronico no tiene un formato valido"
        });
    }

    return res.status(201).json({
        mensaje: "Solicitud recibida correctamente",
        solicitud:{
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo.trim()
        }
    });
});

app.get('/error-prueba', (req, res, next) => {
  next(new Error('Fallo simulado'));
});

app.use((req, res)=>{
    res.status(404).json({
        error: "La ruta solicitada no existe"
    });
});

app.use((err, req, res, next)=>{
    if(err.type === "entity.parse.failed"){
        return res.status(400).json({
            error: "El json enviado tiene un formato incorrecto"
        });
    }
    console.error(err);

    return res.status(500).json({
        error:"Ocurrio un error interno del servidor"
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})