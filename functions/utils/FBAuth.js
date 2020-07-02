const { admin, db } = require("./admin");

exports.FBAuth = (req, res, next) => {
  // validat token
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("Token unvalid");
    return res.status(403).json({ error: "Unauthorized" });
  }

  // verify token
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      // return token and handle
      req.user = decodedToken;
      let user = db
        .collection("users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();

      return user;
    })
    .then((data) => {
      req.user.handle = data.docs[0].data().handle;
      req.user.imageUrl = data.docs[0].data().imageUrl;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token", err);
      if (err.code === "auth/id-token-expired")
        return res.status(401).json({ message: "token has expired" });
      if (err.code === "auth/argument-error")
        return res.status(401).json({ message: "unvalid token" });
      return res.status(403).json(err);
    });
};
