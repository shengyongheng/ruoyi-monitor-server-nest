import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.SERVER_PORT as string, 10) || 3000,
}));
