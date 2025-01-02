const { expressjwt } = require('express-jwt'); // Named export
const secret = process.env.SECRET_KEY || "2d97f5d64a1a0b8948d9e8fa412ad2c5f1ea63b8c0b7adbcf1a6d8b2047b6aaf";

function authJwt() {
    return expressjwt({
        secret: secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: "/", methods: ["GET"] }, // Public route
            { url: "/api/v1/users/login", methods: ["POST"] }, // Public login route
            { url: "/api/v1/users/register", methods: ["POST"] } // Public register route
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        return done(null, true);
    }
    done()
}

module.exports = authJwt;
