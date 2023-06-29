import UserDaoMongoDB from "../daos/mongodb/users.dao.js";
const userDao = new UserDaoMongoDB();
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';

const strategyOptions = {
    clientID: '5bf3050451ada204',
    clientSecret: '48e7fd3fea5f8f2a13d5c45335038418b22bd966',
    callbackURL: 'http://localhost:8080/users/profile-github'
};

//funcion para verificar si hay usuarios buscando por email
const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    console.log('profile:::', profile)
}

//inicializamos
passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));