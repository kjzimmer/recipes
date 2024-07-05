import jwt, { decode } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

// TODO: need to add token refresh so expiration time is extended

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    if(!token) return res.status(401).json({msg:'must be loged in'})

    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(403).json({msg:'session expired'});
        } else {
            // QUESTION: good to add code to check if the uid is valid (a second form of authentication)?
            // TODO: need to generqate a refresh token with a new expiration each time the authenticated user makes a call
            // https://codedamn.com/news/nodejs/use-json-web-token-jwt-in-nodejs#handling_token_expiration
            // QUESTION: in an SPA how does the token get refreshed as API calls are made?
            // QUESTION: is this a good way to pass uid to the controller?  is userId enough info?

            req.body.userId = payload.id

            next();
        }
    });
}

