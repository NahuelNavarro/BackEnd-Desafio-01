import { Router } from "express";
import { logOut, loginUsuario, registrarUsuario } from "../controllers/usuarios.js";

export const router = Router();

router.post('/registro', registrarUsuario);

router.post('/login', loginUsuario)

router.get('/logout', logOut)