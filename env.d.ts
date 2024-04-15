declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_URI: string;
        JWT_SECRET: string;
        BCRYPT_SALT_ROUNDS: string;
        // Add other environment variables here if needed
    }
}
