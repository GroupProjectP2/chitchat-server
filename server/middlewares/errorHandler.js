module.exports = errHandler = (err, req, res, next) => {
  let status;
  let message;

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;

    case "ValidationError":
      status = 400;
      message = "Invalid username or password";
      break;

    case "UnauthorizedError":
      status = 401;
      message = "Invalid token";
      break;

    default:
      status = 500;
      message = "Internal server error";
      break;
  }

  res.status(status).json({ message });
};
