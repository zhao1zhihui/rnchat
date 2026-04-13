import app from './src/app.ts';

import { connectDB } from './src/config/database.ts';

import { createServer} from 'http';
  
const httpServer = createServer(app);

 connectDB().then(() => {
  console.log('Database connected successfully');
  httpServer.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
  process.exit(1); // Exit the process with failure
});

