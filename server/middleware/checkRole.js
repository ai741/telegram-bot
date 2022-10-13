import UserModel from "../models/User.js";

// middleware for doing role-based permissions
export default function checkRole(...permittedRoles) {
  // return a middleware
  return (req, response, next) => {
    UserModel.findById(req.userId, (err, doc) => {
      if (permittedRoles.includes(doc.roles)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        response.status(403).json({ message: "Нет прав доступа" }); // user is forbidden
      }
    });
  };
}
