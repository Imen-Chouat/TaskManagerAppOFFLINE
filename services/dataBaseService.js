import * as SQLite from "expo-sqlite";

let db;
const defaultProjectImage = "";

const initDB = async () => {
  try {
    db = await SQLite.openDatabaseAsync("TaskManagerDB");
    await db.execAsync(`DROP TABLE IF EXISTS projects ;`);
      await db.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATE('now')) ,
        image INTEGER DEFAULT 0 
      );

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        icon TEXT NOT NULL ,
        user_id INTEGER NOT NULL ,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category_id INTEGER,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        description TEXT DEFAULT '',
        icon TEXT DEFAULT '',
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        time TEXT NOT NULL,
        date TEXT NOT NULL,
        state TEXT DEFAULT 'To-do',
        category_id INTEGER NOT NULL,
        project_id INTEGER DEFAULT -1,
        icon TEXT DEFAULT '' ,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE ON UPDATE CASCADE
      );

      CREATE TABLE IF NOT EXISTS userTasks (
        user_id INTEGER NOT NULL,
        task_id INTEGER NOT NULL,
        PRIMARY KEY (user_id, task_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
      );
    `);

    console.log("✅ Database initialized successfully");
    return db;
  } catch (error) {
    console.error("❌ DB initialization error:", error);
  }
};

const checkBdInitialization = async () => {
  try {
    if(!db){
      db = await SQLite.openDatabaseAsync("TaskManagerDB");
    }
  } catch (error) {
    console.error("Error ensuring that the db is opened.");
  }
}

const getUserByEmail = async (email) => {
  try {
    await checkBdInitialization();
    const result = db.getFirstAsync(`SELECT * FROM users WHERE email = ? LIMIT 1`,[email]);
    return result || null ;
  } catch (error) {
    console.error("Error in finding the email's user :",error);
  }
}

const createUser = async (user_name,email,password_hash)=>{
  try {
    await checkBdInitialization();
    const { lastInsertRowId } = await db.runAsync(`INSERT INTO users (user_name,email,password) VALUES (?,?,?)`,[user_name,email,password_hash]);
    return lastInsertRowId ;
  } catch (error) {
    console.error("Error creating a user : ",error);
  }
}

const deleteAccount = async (id)=> {
  try {
    await checkBdInitialization();
    const {rowAffected} = await db.runAsync(`DELETE FROM users WHERE id = ?`,[id]);
    return rowAffected ;
  } catch (error) {
    console.error("Error deleting the account :",error);
  }
}

const modifyProfile = async (id,{user_name,email,password,image}) => {
  try {
    await checkBdInitialization();
    let rowAffected = 0 ;
    if(user_name){
      ({rowAffected} = await db.runAsync(`UPDATE users SET user_name = ? WHERE id = ?`,[user_name,id]) );
    }
    if(email){
      ({rowAffected} = await db.runAsync(`UPDATE users SET email = ? WHERE id = ?`,[email,id]) );
    }
    if(password){
      ({rowAffected} = await db.runAsync(`UPDATE users SET password = ? WHERE id = ?`,[password,id]) );
    }
    if(image){
      ({rowAffected} = await db.runAsync(`UPDATE users SET image = ? WHERE id = ?`,[image,id]) );
    }
  } catch (error) {
    console.error("Error modifying the profile : ",error);
  }
}

const checkPassword = async (id, password) => {
  try {
    await checkBdInitialization();
    const passwordDB = await db.getFirstAsync(`SELECT password FROM users WHERE id = ?`,[id]);
    console.log(password == passwordDB.password );
    return password == passwordDB.password ;
  } catch (error) {
    console.error("Error checking the password : ",error);
  }
}

const getUserByID = async (id) => {
  try {
    await checkBdInitialization();
    const result = await db.getFirstAsync(`SELECT * FROM users WHERE id = ?`,[id]);
    return result || null ;
  } catch (error) {
    console.error("Error getting the user by id : ",error);
  }
}

const getCategoryByid =  async ( id )=>{
  try {
    await checkBdInitialization();
    const result = await db.getFirstAsync(`SELECT * FROM categories WHERE id = ?`,[id]);
    return result || null ;
  } catch (error) {
    console.error("Error finding this category : ",id,error);
  }
}

const createCategory = async (user_id,name,icon) => {
  try {
    await checkBdInitialization();
    const {lastInsertRowId} = await db.runAsync(`INSERT INTO categories (user_id,name,icon) VALUES (?,?,?)`,[user_id,name,icon]);
    return lastInsertRowId ;
  } catch (error) {
    console.error("Error creating a new category : ",error);
  }
}

const modifyCategory = async (id , {name,icon}) => {
  try {
    await checkBdInitialization();
    let rowAffected = 0 ;
    if(name){
      ({rowAffected} = await db.runAsync(`UPDATE categories SET name = ? WHERE id = ?`,[name,id]) );
    }
    if(icon){
      ({rowAffected} = await db.runAsync(`UPDATE categories SET icon = ? WHERE id = ?`,[icon,id]) );
    }
    return rowAffected ;
  } catch (error) {
    console.error("Error modifying the category : ",error);
  }
}

const deleteCategory = async (id) => {
  try {
    await checkBdInitialization();
    const {rowAffected} = await db.runAsync(`DELETE FROM categories WHERE id = ?`,[id]);
    return rowAffected ;
  } catch (error) {
    console.error("Error deleting the category : ",error);
  }
}

const getUserCategories = async (id) => {
  try {
    await checkBdInitialization();
    const categories = await db.getAllAsync(`SELECT * FROM categories WHERE user_id = ?`,[id]);
    return categories ;
  } catch (error) {
    console.error("Error getting the user categories :",error);
  }
}

const createTask = async (user_id,title,project_id,date,time,state,category_id,icon)=>{
  try {
    await checkBdInitialization();
    const {lastInsertRowId} = await db.runAsync(`INSERT INTO tasks (title,state,time,date,project_id,category_id,icon) VALUES(?,?,?,?,?,?,?) `,[title,state,time,date,project_id,category_id,icon]);
    if(project_id == -1 ){
      const result = await db.runAsync(`INSERT INTO userTasks (user_id,task_id) VALUES (?,?)`,[user_id,lastInsertRowId]);
    }
    return lastInsertRowId ;
  } catch (error) {
    console.error(`Error creating task `,error);
  }
}

const deleteTask = async (task_id) => {
  try {
    await checkBdInitialization();
    const {rowAffected} = await db.runAsync(`DELETE FROM tasks WHERE id = ?`,[task_id]);
    return rowAffected ;
  } catch (error) {
    console.error("Error deleting a task :",error);
  }
}

const updateTask = async (task_id, {title,state, time, date, category_id,icon}) => {
  try {
    await checkBdInitialization();
    let rowAffected = 0;
    if (title) {
      ({rowAffected} = await db.runAsync(`UPDATE tasks SET title = ? WHERE id = ?`, [title, task_id]));
    }
    if (state) {
      ({rowAffected} = await db.runAsync(`UPDATE tasks SET state = ? WHERE id = ?`, [state, task_id]));
    }
    if (time) {
      ({rowAffected} = await db.runAsync(`UPDATE tasks SET time = ? WHERE id = ?`, [time, task_id]));
    }
    if (date) {
      ({rowAffected} = await db.runAsync(`UPDATE tasks SET date = ? WHERE id = ?`, [date, task_id]));
    }
    if (category_id) {
      ({rowAffected} = await db.runAsync(`UPDATE tasks SET category_id = ? WHERE id = ?`, [category_id, task_id]));
    }
    if(icon) {
      ({rowAffected} = await db.runAsync(`UPDATE tasks SET icon = ? WHERE id = ?`, [icon, task_id]));
    }
    
    return rowAffected || -1;
  } catch (error) {
    console.error("Error updating the task:", error);
    throw error; // It's good practice to re-throw the error after logging
  }
}

const getTaskByID = async (task_id) => {
  try {
    await checkBdInitialization();
    const result = await db.getFirstAsync(`SELECT * FROM tasks WHERE id = ?`,[task_id]);
    let category = await getCategoryByid(result.category_id);
    return {
          title: result.title ,
          state: result.state ,
          time: result.time ,
          date: result.date ,
          icon: task.icon ,
          category
    } || null;
  } catch (error) {
    console.error("Error getting the task by its id : ",error);
  }
}

const getUserTasksOnDate = async (id ,date)=> {
  try {
    await checkBdInitialization();
    const tasks = await db.getAllAsync(`SELECT tasks.* FROM tasks JOIN userTasks ON tasks.id = userTasks.task_id WHERE userTasks.user_id = ? AND tasks.date = ?`,[id,date]);
    const result = await Promise.all(
      tasks.map( async (task)=>{
        const category = await getCategoryByid(task.category_id);
        return {
          title: task.title ,
          state: task.state ,
          time: task.time ,
          date: task.date ,
          icon: task.icon ,
          category
        };
      })
    );
    return result || [] ;
  } catch (error) {
    console.error("Error finding the tasks of this user : ",error);
  }
} 

const getDoneTasksStatics = async (user_id, date) => {
  try {
    await checkBdInitialization();
    const result = await db.getAllAsync(`
      SELECT 
        date,
        COUNT(*) AS totalTasks,
        SUM(CASE WHEN t.state = 'Done' THEN 1 ELSE 0 END) AS completedTasks,
        ROUND((SUM(CASE WHEN t.state = 'Done' THEN 1 ELSE 0 END) * 1.0 / COUNT(*)), 2) AS completionRatio
      FROM tasks t 
      JOIN userTasks ut ON t.id = ut.task_id 
      WHERE t.date = ? AND ut.user_id = ?`,
      [date, user_id]
    );

    if (result && result.length > 0) {
      return result[0] || {}; 
    }
    return {}; 
  } catch (error) {
    console.error("Error counting the task percentage: ", error);
    return 0; 
  }
};

const getStateCount = async (id,state) => {
  try {
    await checkBdInitialization();
    const result = await db.getAllAsync(`SELECT COUNT(*) AS tasksDone FROM tasks t JOIN userTasks ut ON t.id == ut.task_id WHERE ut.user_id = ? AND t.state = ?`,[id,state]);
    return result[0].tasksDone || 0 ;
  } catch (error) {
    console.error("Error counting the user level in the database server:",error);
  }
}

const projectPersentage = async (projectID) => {
  try {
    await checkBdInitialization();
    const tasks = await getProjectTasks(projectID);
    let completed = 0 ;
    tasks.forEach((task)=>{if(task.state == "Done") completed++ ;});
    return Math.round( ( completed / tasks.length ) * 100 );
  } catch (error) {
    console.error("Error getting the projects persentage :",error);
  }
}

const getOngoingProjects = async (id)=>{
  try {
    await checkBdInitialization();
    const today = new Date().toISOString().split("T")[0];
    console.log("we are getting project currently going on : ",today);
    const projects = await db.getAllAsync(`SELECT * FROM projects WHERE user_id = ? 
      AND DATE("now") BETWEEN start_date AND end_date`,[id]);
    const result = await Promise.all(
      projects.map(async (project)=>{
        const category = await getCategoryByid(project.category_id);
        const persentage = await projectPersentage(project.id);
        return {
        id : project.id,
        title : project.title,
        start_date : project.start_date,
        finish_date : project.end_date,
        description : project.description,
        image : project.image,
        category ,
        persentage
        };
      })
    );
    return result || [] ;
  } catch (error) {
    console.error("Error getting on going Projects :",error);
  }
}

const getProjects = async (id)=>{
  try {
    await checkBdInitialization();
    const projects = await db.getAllAsync(`SELECT * FROM projects WHERE user_id = ?`,[id]);
    const result = Promise.all(
      projects.map( async (project) => {
        const persentage = await projectPersentage(project.id);
        const category = await getCategoryByid(project.category_id);
        return {
        id : project.id,
        title : project.title,
        start_date : project.start_date,
        finish_date : project.end_date,
        description : project.description,
        image : project.image,
        category ,
        persentage
        };
      })
    );
    return result || [] ;
  } catch (error) {
    console.error("Error getting the projects list :",error);
  }
}

const getProjectTasks = async (projectID) => {
  try {
    await checkBdInitialization();
    const tasks = await db.getAllAsync(`SELECT * FROM tasks WHERE project_id = ?`,[projectID]);
    const result = await Promise.all(
      tasks.map( async (task)=>{
        const category = await getCategoryByid(task.category_id);
        return {
          title: task.title ,
          state: task.state ,
          time: task.time ,
          date: task.date ,
          icon: task.icon ,
          project_id: task.project_id ,
          category
        };
      })
    );
    return result || []  ;
  } catch (error) {
    console.error("Error getting project Tasks : ",error);
  }
}

const createProject = async (user_id,title , start_date , end_date , category_id , description ,image)=>{
  try {
    await checkBdInitialization();
    const {lastInsertRowId} = await db.runAsync(`INSERT INTO projects (title,start_date,end_date,user_id,category_id,image,description) VALUES (?,?,?,?,?,?,?)`,[title,start_date,end_date,user_id,category_id,image,description]);
    return lastInsertRowId ;
  } catch (error) {
    console.error("Error creating a project : ",error);
  }
}

const updateProject = async (project_id,{title,start_date,end_date,category_id,image}) => {
  try {
    await checkBdInitialization();
    let rowAffected = 0 ;
    if(title){
      ({rowAffected} = await db.runAsync(`UPDATE projects SET title = ? WHERE id = ?`,[title,project_id]) );
    }
    if(start_date){
      ({rowAffected} = await db.runAsync(`UPDATE projects SET start_date = ? WHERE id = ?`,[start_date,project_id]) );
    }
    if(end_date){
      ({rowAffected} = await db.runAsync(`UPDATE projects SET end_date = ? WHERE id = ?`,[end_date,project_id]) );
    }
    if(category_id){
      ({rowAffected} = await db.runAsync(`UPDATE projects SET category_id = ? WHERE id = ?`,[category_id,project_id]) );
    }
    if(image){
      ({rowAffected} = await db.runAsync(`UPDATE projects SET image = ? WHERE id = ?`,[image,project_id]) );
    }
    return rowAffected ;
  } catch (error) {
    console.error("Error updating the project's info : ",error);
  }
}


const deleteProject = async (id) => {
  try {
    await checkBdInitialization();
    const {rowAffected} = await db.runAsync(`DELETE  FROM projects WHERE id = ?`,[id]);
    return rowAffected
  } catch (error) {
    console.error("Error deleting the project : ",error);
  }
}

const getProjectByID = async (project_id) => {
  try {
    await checkBdInitialization();
    const result = await db.getFirstAsync(`SELECT * FROM projects WHERE id = ?`,[project_id]);
    const persentage = await projectPersentage(project_id);
    const category = await getCategoryByid(result.category_id);
    return {
        id : result.id,
        title : result.title,
        start_date : result.start_date,
        finish_date : result.end_date,
        description : result.description,
        image : result.image,
        category ,
        persentage
        };
  } catch (error) {
    console.error("Error in getting this project : ",error);
  }
}


export default {
  initDB ,
  createUser ,
  deleteAccount ,
  getUserByEmail ,
  modifyProfile ,
  checkPassword ,
  getUserByID ,
  getCategoryByid ,
  modifyCategory ,
  deleteCategory ,
  getUserCategories ,
  createCategory ,
  getOngoingProjects ,
  getProjectTasks ,
  getProjects ,
  projectPersentage ,
  createProject ,
  updateProject ,
  deleteProject ,
  getProjectByID ,
  getCategoryByid ,
  getUserTasksOnDate ,
  createTask ,
  deleteTask , 
  updateTask ,
  getTaskByID ,
  getDoneTasksStatics ,
  getStateCount ,
}