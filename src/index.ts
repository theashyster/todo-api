import cors from 'cors';
import express from 'express';
import http from 'http';
import 'reflect-metadata';
import { Server } from 'socket.io';
import todos from './routes/todos';
import { AppDataSource } from './source';

const { APP_PORT } = process.env;

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*'
      }
    });
    const port = Number(APP_PORT) || 3100;

    app.use(cors());
    app.use(express.json());

    app.use('/api', todos);

    io.on('connection', (socket) => {
      console.log('User connected');

      socket.on('add-item', () => {
        socket.emit('item-added');
        socket.broadcast.emit('item-added');
      });

      socket.on('update-item', () => {
        socket.emit('item-updated');
        socket.broadcast.emit('item-updated');
      });

      socket.on('delete-item', () => {
        socket.emit('item-deleted');
        socket.broadcast.emit('item-deleted');
      });
    });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
