export default () => {
  return {
    port: parseInt(process.env.SERVER_PORT as string, 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST as string,
      port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    },
  };
};
