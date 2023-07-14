import 'dotenv/config';

export = {
    secret: process.env.AUTH_SECRET || 'secret',
    expiresIn: process.env.AUTH_EXPIRATION_IN || '1d',
    rounds: process.env.AUTH_ROUNDS || 10
}