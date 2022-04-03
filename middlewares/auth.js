const secretKeys = (process.env.SECRET_KEYS || "").split("_");

function auth(req, res, next) {
  try {
    if (secretKeys.indexOf(req.headers.secret) === -1) {
      return res.status(401).send("Invalid credential");
    }
    next();
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

module.exports = auth;
