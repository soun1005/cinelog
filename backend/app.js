import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './src/routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// api/v1 으로 scope해주면 앞에 계속 이 주소가 붙음(없애도 됨)
// 현재 search기능 api = /api/v1/search
app.use('/api/v1', routes);

const port = process.env.PORT || 4000;
const server = http.createServer(app);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log('MONGODB connected');
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
