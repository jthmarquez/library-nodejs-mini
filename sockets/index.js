// sockets/index.js
let io = null;

function init(server) {
  const { Server } = require('socket.io');
  io = new Server(server, {
    cors: { origin: '*' } // en producción restringir orígenes
  });

  io.on('connection', (socket) => {
    console.log('Cliente socket conectado:', socket.id);
    socket.on('disconnect', () => {
      console.log('Cliente socket desconectado:', socket.id);
    });
  });

  return io;
}

function getIo() {
  if (!io) throw new Error('Socket.io no inicializado. Llamar a init(server) primero.');
  return io;
}

module.exports = { init, getIo };

//Qué hace: mantiene una referencia global a io para poder emitir eventos desde
//cualquier parte del backend (controllers). init(server) la llamamos una vez tras iniciar el servidor.