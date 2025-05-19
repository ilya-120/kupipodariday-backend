export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'student',
    password: process.env.DB_PASSWORD || 'student',
    database: process.env.DB_NAME || 'kupipodariday',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: process.env.DB_SYNC === 'true' || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});
