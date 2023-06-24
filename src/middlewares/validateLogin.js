export const validateLogin = (req, res, next) => {
    console.log(req.session);
    if (req.session.info && req.session.loggedIn) next();
    else res.status(404).json({ msg: 'Invalid login' })
}