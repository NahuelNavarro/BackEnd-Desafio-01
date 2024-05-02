import Swal from "sweetalert2";

const socket = io();
let user;
let chatbot = document.getElementById('chatBox');
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
    chatbot.scrollIntoView(false)
}


Swal.fire({
    title: "How old are you?",
    icon: "question",
    input: "range",
    inputLabel: "Your age",
    inputAttributes: {
      min: "8",
      max: "120",
      step: "1"
    },
    inputValue: 25
  });

 