const jwt = require("jsonwebtoken");

exports.sessionJwtAuth = (req, res, next) => {
    //console.log(req.header.authorization)
    //console.log(!req.header.authorization)
    if (!req.headers.authorization) {
        return res.status(402).json({ error: 'No credentials sent!' });
    }

    const header = req.headers.authorization;
    const token = header.substring(7);
    //console.log(token);
    try {
        const member = jwt.verify(token, process.env.MY_SECRET);
        req.member = member;
        //console.log(member)
        next();
    } catch (err) {
        //console.log(err);
        return res.status(403).json({ error: 'Invalid token' });
    }
}