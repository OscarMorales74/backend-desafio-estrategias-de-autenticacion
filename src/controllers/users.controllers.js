//con * importamos todos los servicios desde services
import * as service from "../services/users.services.js";
import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
const userDao = new UserDaoMongoDB();

export const getByEmailUserCtll = async (req, res, next) => {
  try {
    const { email } = req.params;
    const doc = await service.getByEmailUserServ(email);
    if (!doc) {
      throw new Error("User not found!")
    }else {
      res.json(doc);
    };
  } catch (error) {
    next(error);
  }
};

export const registerResponse = (req, res, next)=>{
  try {
      res.json({
          msg: 'Register OK',
          session: req.session    // --> passport.user: id mongo
      })
  } catch (error) {
      next(error);
  }
};

// export const createUserCtll = async (req, res, next) => {
// try {
//     const user = { ...req.body };
//     const newUser = await service.createUserServ(user);
//     if (!newUser) {
//       res.redirect('/views/error-register');
//     } else {
//       res.redirect('/views')
//     }
// } catch (error) {
//     next(error);
// }
// };

//createUserCtll para views no funciona
// export const createUserCtll = async (req, res, next) => {
//   try {
//     const user = { ...req.body };
//     const newUser = await service.createUserServ(user);
//     if (!newUser) {
//       res.status(404).json({ error: "User not created" });
//     } else {
//       res.status(201).json(newUser);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

//createUserCtll para views gena no funciona
// export const createUserCtll = async (req, res, next) =>{
//   try {
//       const session = req.session
//       if(!session){
//           res.status(404).redirect('/views/error-register')
//       } else{
//           res.status(304).redirect('/views/login');
//       };
//   } catch (error) {
//       next()
//   };
// };

// export const loginUserCtll = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await service.loginUserServ(email, password);
//     if (!user) {
//       res.redirect('/views/error-login');
//     } else {
//       req.session.email = email;
//       req.session.password = password;
//       res.redirect('/views/profile')
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const loginResponse = async(req, res, next)=>{
  try {
      const user = await userDao.getUserById(req.session.passport.user);
      const { first_name, last_name, email, age, role } = user;
      res.json({
          msg: 'Login OK',
          session: req.session,
          userData: {
              first_name,
              last_name,
              email,
              age,
              role
          }
      })
  } catch (error) {
      next(error);
  }
}

export const updateUserCtll = async (req, res, next) => {
try {
    const { id } = req.params;
    const { first_name, last_name, email, age, password, role } = req.body;

    let doc = await service.getByIdUserServ(id);

    if (!doc) throw new Error("User not found!");

    const userUpdated = await service.updateUserServ(id, {
    first_name,
    last_name,
    email,
    age,
    password,
    role
    });

    res.json({
    msg: "User updated",
    data: userUpdated,
    });
} catch (error) {
    next(error);
}
};

export const deleteUserCtll = async (req, res, next) => {
try {
    const { id } = req.params;

    await service.deleteUserServ(id);

    res.json({
    msg: "User deleted",
    });
} catch (error) {
    next(error);
}
};

export const updateManyUsersCtll = async (req, res, next) => {
  try {
    const response = await service.updateManyUsersServ()
    res.json(response)    
  } catch (error) {
    next(error)
  }
}