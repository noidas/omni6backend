const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});

mongoose.connect('mongodb+srv://bigdata:bigdata@cluster0-k6myc.mongodb.net/omni6?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Midleware global que adiciona uma nova variável dentro de req
app.use((req, res) => {
  req.io = io;

  return next();
});
// Possibilita o server a entender o formato json
app.use(express.json());
// Possibilita o server a receber arquivos nas rotas
app.use(express.urlencoded({ extended: true }));
//
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));
// Adiciona o arquivo de rotas no servidor
app.use(require('./routes'));

server.listen(process.env.PORT || 3000);