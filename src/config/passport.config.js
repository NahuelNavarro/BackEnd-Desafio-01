import passport from "passport";
import local from "passport-local";
import github from "passport-github2";
import { UsuarioManager } from "../dao/usuarioManager.js";
import { generaHash, validaPassword } from "../utils.js";

const usuariosManager = new UsuarioManager();

export const initPassport = () => {

    passport.use(
        "registro",
        new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: "email"
            },
            async (req, username, password, done) => {
                try {
                    let { nombre } = req.body;
                    if (!nombre) {
                        return done(null, false, { message: "Nombre es requerido" });
                    }
                    let existe = await usuariosManager.getBy({ email: username });
                    if (existe) {
                        return done(null, false, { message: "El usuario ya existe" });
                    }
                    password = generaHash(password);
                    let usuario = await usuariosManager.create({ nombre, email: username, password });
                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    let usuario = await usuariosManager.getBy({ email: username });
                    if (!usuario) {
                        return done(null, false, { message: "Usuario no encontrado" });
                    }

                    if (!validaPassword(password, usuario.password)) {
                        return done(null, false, { message: "Contraseña incorrecta" });
                    }

                    usuario = { ...usuario };
                    delete usuario.password; // Eliminar el password y otros datos sensibles

                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"Iv23libxVoqvqDrFUCtq",
                clientSecret:"b9330741740c058326045043ad1f0c8104ba9bc3",
                callbackURL:"http://localhost:8080/api/session/callbackGithub",
            },
            
            async (ta, tr, profile, done) => {
                try {
                    console.log(profile)
                    let email = profile._json.email
                    let nombre = profile._json.nombre

                    if(!email){
                        return done (null, false)
                    }

                    let usuario = usuariosManager.getBy({email})
                    if(!usuario){
                        usuario = await usuariosManager.create(
                            {
                            nombre, email, profile
                             }
                         )
                    }
                    return done (null, usuario)
                } catch (error) {
                    return done (error)
                }
            }
        )
    )

    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let usuario = await usuariosManager.getBy({ _id: id });
            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    });
};