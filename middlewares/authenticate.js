const jwt = require("jsonwebtoken");
const {HttpError} = require("../helpers");
const { User } = require("../models/users");

const { SECRET_KEY } = process.env;
const authenticate = async (req, res,next) => {
    const { authorization="" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(new HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = User.findById(id);
        if (!user) {
            next(new HttpError(401))
        }
        next();
    } catch (error) {
        next(new HttpError(401))
    }

}

module.exports = authenticate;