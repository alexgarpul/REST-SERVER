const { response, request } = require("express");

const isRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.authenticatedUser) {
      return res.status(400).json({
        msg: "Se quiere verificar el rol sin primero validar el token",
      });
    }

    if (!roles.includes(req.authenticatedUser.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }
    next();
  };
};


module.exports = {
    isRole
}