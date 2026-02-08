import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import askJijiRoute from './routes/askJiji.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api', askJijiRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});