import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*' 
  },
})export class CounterGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {

    if(socket.handshake.query.code!=null &&socket.handshake.query.code.length>0){
      this.connectedSockets.set(socket.handshake.query.code.toString(),socket);

    }

    
    console.log('Socket connected:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    
    if(socket.handshake.query.code!=null &&socket.handshake.query.code.length>0){
      this.connectedSockets.delete(socket.handshake.query.code.toString());

    }
    console.log('Socket disconnected:', socket.id);
  }

  connectedSockets: Map<String,Socket> = new Map<string,Socket>();

  @SubscribeMessage('counter')
  sendToSocket(client: any, payload: any) {
    console.log(payload);
    
      const teacherSocket = this.connectedSockets.get(payload)
      teacherSocket.emit("incement",1);
  }

}
