import { getRandomDate, getRandomNumber } from '../../path.js';
import { UserModel } from "./models/users.model.js";
import { createHash, isValidPassword } from '../../bcrypt.js';

export default class UserDaoMongoDB {

  async getUserByName(name) {
    try {
      const response = await UserModel.find({first_name: name})//.explain();//explain es un metodo de mongoose para ver la info de esta consulta
      return response//.executionStats;        
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await UserModel.find({ email: email })//.explain()
      return response//.executionStats;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      const response = await UserModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * createUser crea un nuevo usuario en una base de datos.
   *1- Desestructuración del objeto user pasado como argumento de la función en las variables first_name, last_name, email, age y password.
   *2- Consulta de usuario existente: Se consulta a la base de datos usando el modelo UserModel para buscar usuarios con el mismo correo electrónico (email) proporcionado. Esta consulta se realiza de forma asíncrona utilizando la palabra clave await, lo que significa que la ejecución de la función se pausará hasta que se resuelva la promesa devuelta por UserModel.find({email}).
   *3- Comprobación de existencia de usuario: Se verifica si existUser.length es igual a 0, lo que significa que no hay usuarios existentes con el mismo correo electrónico. Si esta condición se cumple, se procede a la siguiente etapa.
   *4-Comprobación de credenciales de administrador: Se verifica si el correo electrónico (email) y la contraseña (password) son iguales a ciertos valores específicos. En este caso, si el correo electrónico es "adminCoder@coder.com" y la contraseña es "adminCoder", se crea un nuevo usuario con un rol de administrador. La función createHash(password) se utiliza para generar un hash de la contraseña antes de almacenarla en la base de datos.
   *5- Creación de nuevo usuario: Si el correo electrónico y la contraseña no coinciden con las credenciales de administrador, se crea un nuevo usuario normal en la base de datos utilizando UserModel.create({...user, password: createHash(password)}). Al igual que en el caso anterior, la función createHash(password) se utiliza para generar un hash de la contraseña.
   * @param {*} user 
   * @returns {*} newUser
   */
  async createUser(user) {
    try {
      const { first_name, last_name, email, age, password } = user;
      const existUser = await UserModel.find({email});
      if (existUser.length === 0){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder'){
          return await UserModel.create({ ...user, password: createHash(password), role: 'admin'});
        } else {
          const newUser = await UserModel.create({...user, password: createHash(password)});
          return newUser
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await UserModel.findOne({ email });
      if(userExist) {
        const passValid = isValidPassword(password, userExist);
        if(!passValid) return false
        else return userExist;
      } return false
      //! isValidPassword ? false : userExist
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
  
  async updateUser(id, obj) {
    try {
      await UserModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteUser(id) {
    try {
      const response = await UserModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateManyUsers() {
    try {
      const users = await UserModel.find({});
      users.forEach((user)=>{
        user.age = getRandomNumber()
        user.date = getRandomDate()
        user.save()
      })
      return { message: 'update ok' }
    } catch (error) {
      console.log(error);
    }
  }

  // async aggregation1() {
  //   try {
  //     const response = await UserModel.aggregate([
  //       //stage
  //       {
  //         $match: {
  //           // gender: `${ gender }`,
  //           age: { $gte: 18 }
  //         }
  //       },
  //       {
  //         $group: {
  //           _id: '$gender',
  //           average_age: { $avg: '$age'},
  //           count: { $sum: 1 },
  //           youngest: { $min: '$age' },
  //           oldest: { $max: '$age' }
  //         }
  //       },
  //       {
  //         $sort: {
  //           average_age: -1 //1 asc - -1 desc
  //         }
  //       }
  //     ])
  //       return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}