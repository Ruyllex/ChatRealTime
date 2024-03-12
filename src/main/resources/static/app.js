const webSocket = new SockJS('/websocket-endpoint');
const stompClient = Stomp.over(webSocket);

var chatMessages = [];

var storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

stompClient.connect({}, function (frame) {
    console.log('Conectado: ' + frame);
    stompClient.subscribe('/topic/messages', function (message) {
        var parsedMessage = JSON.parse(message.body);
        var decodedPayload = atob(parsedMessage.payload);
        var decodedPayloadText = decodeURIComponent(escape(decodedPayload));
        var payloadObject = JSON.parse(decodedPayloadText);


        chatMessages.push({ userName: payloadObject.userName, content: payloadObject.content });

        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));

        showMessage(payloadObject.userName, payloadObject.content);
    });

    storedMessages.forEach(function (msg) {
        showMessage(msg.userName, msg.content);
    });
});


var usuariosColores = {};

function showMessage(userName, content) {
    const chatOutput = document.getElementById('chatOutput');
    chatOutput.innerHTML += '<p><span style="color: ' + changeUserNameColor(userName) + '">' + userName + '</span>: ' + content + '</p>';
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const userNameInput = document.getElementById('userName');

    const message = messageInput.value;
    const userName = userNameInput.value;

    stompClient.send("/app/chat", {}, JSON.stringify({ 'content': message, 'userName': userName }));
    messageInput.value = '';
}

function changeUserNameColor(userName) {
    if (!usuariosColores[userName]) {
      usuariosColores[userName] = generateColor();
    }
    return usuariosColores[userName];
  }
  function generateColor() {
    var letras = '89ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 8)]; 
    }
    return color;
}

