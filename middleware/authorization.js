const jwt = require('jsonwebtoken');
async function authorization(req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access denied kindly provide a valid token');
    try {
        const decode = await jwt.verify(token, 'jwtHotelBooking');
        req.user = decode;
        next();
    } catch (error) {
    }
    
}


module.exports = authorization