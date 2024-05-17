import { Router } from "express";
import { UsuarioManager } from "../dao/usuarioManager.js";
import { generaHash } from "../utils.js";

export const router = Router();
const usuariosManager = new UsuarioManager();

router.post('/registro', async (req, res) => {

    let { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Complete nombre, mail y password" });
    }

    if (!email.trim()) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "El correo electrónico no puede estar vacío" });
    }

    try {
        // Verificar si ya existe un usuario con el mismo correo electrónico
        let existe = await usuariosManager.getBy({ email });
        console.log(existe)
        console.log(email)
        if (existe) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya existe un usuario con el email ${email}` });
        }

        // Generar el hash de la contraseña
        password = generaHash(password);

        // Crear un nuevo usuario
        let nuevoUsuario = await usuariosManager.create({ nombre, email, password });

        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ mensaje: `Registro correcto`, usuario: nuevoUsuario });

    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            { error: `Error inesperado detalle: ${error.message}` });
    }
});


router.post('/login', async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Complete email y password" });
    }

    let usuario = await usuariosManager.getBy({ email, password: generaHash(password) })

    if (!usuario) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: "Credenciales invalidas" })
    }

    usuario = {...usuario}
    delete usuario.password
    req.session.usuario = usuario

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: " login correcto", usuario })

})

router.get('/logout',(req , res) => {
    req.session.destroy(e=>{
        if(e){
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json(
                {
                    error:`Error inesperado en el servidor -Intente mas tarde`,
                    detalle: `${error.message}`
                }
            )
        }
    })
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({payload:"Logout existoso"})
})