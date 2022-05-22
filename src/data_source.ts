import { DataSource } from "typeorm";
import User from "./core/entity/User";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "project_type1",
    synchronize: true,
    logging: true,
    entities: [User],
})