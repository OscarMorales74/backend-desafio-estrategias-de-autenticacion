import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
const userDao = new UserDaoMongoDB();
import fs  from 'fs';
import {__dirname} from '../path.js';
const usersFile = JSON.parse(fs.readFileSync(__dirname+'/data/users.json', 'utf-8'));

//createFileUser llama al array de usuarios 
export const createFileUserServ = async () => {
    try {
        const newUser = await userDao.createUser(usersFile);
        console.log('¡Users saved!');
        if (!newUser) throw new Error("Validation Error!");
        else return { message: 'Users saved!' };
    } catch (error) {
        console.log(error);
    }
};

export const getAllUsersServ = async () => {
  try {
    const doc = await userDao.getAllUsers();
    if (!doc) throw new Error("User not found!");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const aggregation1 = async () => {
  try {
    const doc = await userDao.aggregation1();
    return doc
  } catch (error) {
    console.log(error);    
  }
};


export const getByNameUserServ = async (name) => {
  try {
    const doc = await userDao.getUserByName(name);
    if (!doc) throw new Error("User not found!");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const getByEmailUserServ = async (email) => {
  try {
    const doc = await userDao.getUserByEmail(email);
    if (!doc) throw new Error("User not found!");
    else return doc;
  } catch (error) {
    console.log(error);
  }
};

export const createUserServ = async (user) => {
  try {
    const newUser = await userDao.createUser(user);
    if (!newUser) throw new Error("Validation Error!");
    else return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const loginUserServ = async (email, password) => {
  try {
    const user = await userDao.loginUser({ email, password });
    return user;
  } catch (error) {
    throw new Error('Login failed');
  }
};


export const updateUserServ = async (id, obj) => {
  try {
    let item = await userDao.getUserById(id);
    if (!item) {
      throw new Error("User not found!");
    } else {
      const userUpdated = await userDao.updateUser(id, obj);
      return userUpdated;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserServ = async (id) => {
  try {
    const userDeleted = await userDao.deleteUser(id);
    return userDeleted;
  } catch (error) {
    console.log(error);
  }
};

export const updateManyUsersServ = async ()=> {
  try {
    const response = await userDao.updateManyUsers()
    return response
  } catch (error) {
    console.log(error);    
  }
}