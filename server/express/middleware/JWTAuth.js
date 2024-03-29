import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export default class JWTAuth {
    async verifyJWT(req, res, next) {
        try {
            let token = req.cookies?.token;
            if (!token) {
                return res.status(401).json({ message: "Unauthorized" })
            } else {
                let verified = jwt.verify(token, JWT_SECRET);
                req.userId = typeof verified === "string" ? verified : "";
                next();
            }
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Token expired!" })
            } else if (err instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: "Invalid token!" })
            } 
            return res.status(401).json({ message: "Unauthorized" })
        }
    }

    /**
     * Parses token value
     * @param {string} token 
     * @returns 
     */
    async parseToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET, {}, (err, data) => {
                if (err) throw err;
                resolve(data);
            })
            reject('no token')
        });
    }

    verify(token, onComplete) {
        jwt.verify(token, JWT_SECRET, {}, onComplete)
    }

    signJWT(arg, exp) {
        if (exp) {
            return jwt.sign({
                exp: exp,
                data: arg
            }, JWT_SECRET)
        }
        return jwt.sign(arg, JWT_SECRET);
    }
}