import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: true,
});

export default sequelize;
