import * as SQlite from "expo-sqlite";

let db ;

const initDB = async ()=>{
  try {
    db = SQlite.openDatabaseAsync("TaskManagerDB");
    (await db).execAsync(`
            PRAGMA foreign_keys = ON;
            CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT ,
            user_name VARCHAR(35) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            refrech_token VARCHAR(255) NOT NILL,
            image VARCHAR(255) DEFAULT "../../../TaskManagerApp/assets/images/welcome1.png",
            );
            CREATE TABLE IF NOT EXISTS categories (
            id INT PRIMARY KEY AUTO_INCREMENT ,
            name VARCHAR(255) NOR NULL ,
            icon VARCHAR(255) NOR NULL 
            );
            CREATE TABLE IF NOT EXISTS projects (
                id INT PRIMARY KEY AUTO_INCREMENT ,
                title VARCHAR(255) NOT NULL ,
                category_id INT ,
                start_date TEMPTIME NOT NULL ,
                finish_date DATE NOT NULL ,
                user_id INT NOT NULL ,
                description VARCHAR(255) DEFAULT "" ,
                image VARCHAR(255) DEFAULT "" ,
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            CREATE TABLE IF NOT EXISTS tasks (
                id INT PRIMARY KEY AUTO_INCTREMENT ,
                title VARCHAR(255) NOT NULL ,
                time TIME NOT NULL ,
                date DATE NOT NULL , 
                state ENUM("To-do","In Progress","Missed","Done") DEFAULT "To-do" ,
                category_id INT NOT NULL ,
                project_id INT DEFAULT -1 ,
                FORIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FORIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
            );
            CREATE TABLE IF NOT EXISTS userTasks (
                user_id INT NOT NULL ,
                task_id INT NOT NULL ,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ,
                FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE ,
                PRIMARY KEY (user_id,task_id)
            )
      `);
    console.log('Database initialized');
    return db;
  } catch (error) {
    console.error('DB initialization error:', error);
  }
}


export default {
  initDB ,
}