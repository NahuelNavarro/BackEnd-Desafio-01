import Swal from "sweetalert2";

const socket = io();
let user;
let chatBox = document.getElementById('chatBox');
let log = document.getElementById('messageLogs');
let data;

socket.on('message', msg =>{
    data = msg;
})

socket.on('messageLogs', msg =>{
    renderizar(msg)
})

const renderizar = (msg) =>{
    let messages = '';
    msg.forEach(message => {
        const isCurrentUser = message.user == user;
        const messageClass = isCurrentUser? 'my-message' : 'other-message'
        messages = messages + `<div class="${messageClass}">${message.user}: ${message.message}</div>`
    });

    log.innerHTML = messages;
    chatBox.scrollIntoView(false)
}

document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title: "Identifícate",
        input: "email",
        text: "Ingresa tu correo",
        inputValidator: (value) => {
          if (!value)
            return 'Necesitas ingresar un correo';

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value))
            return 'Ingresa correctamente';

          return null;
        },
        allowOutsideClick: false
    }).then(result => {
        if (result.isConfirmed) {
            const userEmail = result.value;
            user = userEmail; // Asignar el correo electrónico ingresado a la variable user
            renderizar(data); // Renderizar con la data existente
        }
    });
});




  chatBox.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            const message = chatBox.value;
            socket.emit('message',{user, message});
            chatBox.value = ''
        }
    }
  })

 socket.on('nuevo_user',() =>{
    Swal.fire({
        text:'Nuevo usuario conectado',
        toast: true,
        position: 'top-right'
    })
 })

 