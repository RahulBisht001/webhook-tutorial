require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const secret = req.headers["x-secret"];

    // actually we use process.env.secret key variable
    // but that is not available here right now. hence
    // we are doing simple matching
    // console.log(secret, process.env.WEBHOOK_SECRET);

    console.log("============");
    console.log(process.env.WEBHOOK_SECRET);
    console.log(secret !== process.env.WEBHOOK_SECRET);

    if (secret !== process.env.WEBHOOK_SECRET) {
        return res.status(401).json({message: "Unauthorized Request"});
    }

    console.log("Authorized");
    next();
};

module.exports = authMiddleware;
