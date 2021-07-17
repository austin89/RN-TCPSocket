const net = require('net');
//import TcpSocket from 'react-native-tcp-socket';
const PORT = 2222; //Number(9 + (Math.random() * 999).toFixed(0));
console.log('PORT: ', PORT);
console.log('net: ', net);

const client = new net.Socket();

function init() {
  //server.listen({port: PORT, host: '127.0.0.1', reuseAddress: true});

  console.log('in init() client socket');

  client.connect(
    // @ts-ignore
    {
      port: PORT,
      host: '127.0.0.1',
      localAddress: '127.0.0.1',
      reuseAddress: true,
      // localPort: 20000,
      // interface: "wifi",
      // tls: true
    },
    () => {
      client.write('Client connected to server!');
    },
  );

  //   client.on('data', () => {
  //     client.destroy(); // kill client after server's response
  //   });
}

module.exports = {init, client};
//module.exports = {init, server, client};
