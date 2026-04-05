import app from './src/app.ts';

import { connectDB } from './src/config/database.ts';

 connectDB().then(() => {
  console.log('Database connected successfully');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});

