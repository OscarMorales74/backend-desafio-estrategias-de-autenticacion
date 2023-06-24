//con * importamos todos los servicios desde services
import * as service from "../services/users.services.js";
  
export const createFileUsersCtll = async (req, res, next) => {
  try {
    const newUsers = await service.createFileUserServ();
    if (!newUsers) throw new Error("Validation Error!");
    else res.json(newUsers);
  } catch (error) {
    next(error);
  }
};

export const getByNameUserCtll = async (req, res, next) => {
  try {
    const { first_name } = req.query;
    const doc = await service.getByNameUserServ(first_name);
    if (!doc) {
      throw new Error("User not found!")
    } else {
      res.json(doc);
    };

  } catch (error) {
    next(error);
  }
};

//busqueda por parametro
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

export const getAllUsersCtll = async (req, res, next) => {
try {
    const docs = await service.getAllUsersServ();
    res.json(docs);
} catch (error) {
    next(error);
}
};

export const aggregation1 = async (req, res, next) => {
  try {
    // const { gender } = req.query
    const response = await service.aggregation1();
    res.json(response);
  } catch (error) {
      next(error);
  }
};

export const createUserCtll = async (req, res, next) => {
try {
    const user = { ...req.body };
    const newUser = await service.createUserServ(user);
    if (!newUser) {
      res.redirect('/views/error-register');
    } else {
      res.redirect('/views')
    }
} catch (error) {
    next(error);
}
};

export const loginUserCtll = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await service.loginUserServ(email, password);
    if (!user) {
      res.redirect('/views/error-login');
    } else {
      req.session.email = email;
      req.session.password = password;
      // req.session.firstName = userData.first_name;
      // req.session.lastName = userData.last_name;

      res.redirect('/views/profile')
    }
  } catch (error) {
    next(error);
  }
};


export const updateUserCtll = async (req, res, next) => {
try {
    const { id } = req.params;
    const { first_name, last_name, email, gender, age, password, role } = req.body;

    let doc = await service.getByIdUserServ(id);

    if (!doc) throw new Error("User not found!");

    const userUpdated = await service.updateUserServ(id, {
    first_name,
    last_name,
    email,
    gender,
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