// Importa los módulos necesarios
import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { dbConnection } from './database/config.js';
import { productModel } from './data/models/products.js';
import { messageModel } from './data/models/messages.js';
import { router as productosRouter } from './routes/products.router.js';
import { router as cartsRouter } from './routes/cart.router.js';
import { router as vistasRouter } from './routes/views.router.js';
import __dirname from './utils.js';
import session from 'express-session';
import { router as sessionRouter } from './routes/session.router.js';

// Crea una instancia de la aplicación Express
const app = express();

// Configura el motor de plantillas Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(session({
    secret:"CoderCoder123", resave: true, saveUninitialized: true
}))

// Configura el middleware para procesar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura el middleware para servir archivos estáticos
app.use(express.static(__dirname + '/public'));

// Rutas de las vistas
app.use('/', vistasRouter);
app.use('/api/session', sessionRouter)

// Rutas de la API
app.use("/api/productos", productosRouter);
app.use("/api/carts", cartsRouter);




// Conexión a la base de datos MongoDB
await dbConnection();

// Inicia el servidor Express en el puerto 8080
const expressServer = app.listen(8080, () => {
    console.log("Servidor 8080 iniciado");
});

// Inicializa Socket.io en el servidor Express
const io = new Server(expressServer);

// Maneja la conexión de nuevos clientes
io.on('connection', async (socket) => {
    // Envía los productos existentes al cliente recién conectado
    const productos = await productModel.find();
    socket.emit('productos', productos);

    // Envía los mensajes existentes al cliente recién conectado
    const messages = await messageModel.find();
    socket.emit('messageLogs', messages);

    // Maneja el evento 'agregarProducto'
    socket.on('agregarProducto', async (nuevoProducto) => {
        const newProduct = await productModel.create({...nuevoProducto});
        if(newProduct){
            productos.push(newProduct);
            // Emite los productos actualizados a todos los clientes
            io.emit('productos', productos);
        }
    });

    // Maneja el evento 'message'
    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({...data});
        if(newMessage){
            const messages = await messageModel.find();
            // Emite los mensajes actualizados a todos los clientes
            io.emit('messageLogs', messages);
        }
    });

    // Emitir evento 'nuevo_user' para notificar a todos los clientes cuando se conecta un nuevo usuario
    socket.broadcast.emit('nuevo_user');
});


