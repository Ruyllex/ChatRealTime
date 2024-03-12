package com.example.chatRealTime;

import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
public class WebSocketController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    @CrossOrigin(origins = "http://localhost:5173")
    public Message handleMessage(Message message) {
        // Procesar el mensaje aquí
        String contenidoMensaje = message.toString(); // Suponiendo que tienes un método getContenido() en tu clase Message
        System.out.println("Mensaje recibido: " + contenidoMensaje);

        return message;
    }
}
