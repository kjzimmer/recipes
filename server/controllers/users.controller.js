import { User } from "../models/user.model.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export const userController = {
    // login
    login: async (req, res) => {
        console.log('in login controller', req.body.email)
        const user = await User.findOne({
            raw: true,
            where: {
                email: req.body.email
            }
        });

        if (user === null) {
            // email not found in users collection
            return res.status(400).json({ message: 'invalid credentials' });
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            return res.status(400).json({ message: 'invalid credentials' });
        }

        // if we made it this far, the password was correct
        const payload = {
            id: user.id
        }
        const options = {
            // expiresIn: '1d'
        }
        const userToken = jwt.sign(payload, SECRET_KEY, options)
        console.log('token:', userToken)
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("userToken", userToken, SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: 'success', token: userToken, userId: user.id });
    },

    // logout
    logout: (req, res) => {
        // QUESTION: after loging out how to prevent that token from being used again?
        // PROPOSAL: 
        // -save the token in the user table when logging in.  
        // -only accept the token in the db.
        // -delete it from the DB when loging out.
        // -would need to update the token if is refreshed while logged in
        // -might need to handle simultanious logins from different browsers/devices (more than one valid token)

        console.log('clear cookie')
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
    // create
    register: async (req, res) => {
        // register and log in user
        User.create(req.body)
            .then(user => {
                // this logs the newly registered user in immediately
                // might want redirect to a login page and force the user to manually login instead
                const userToken = jwt.sign({id: user.id}, SECRET_KEY)
                res.status(200).json({ msg: 'success', token: userToken })
            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            })
    },

    // read
    get: async (req, res) => {
        const { id } = req.params
        // refactored this using Promise, .then and .catch instead of try catch
        // just to experiment

        // req.body can be used to send parameters as well (but not with get or delete!!)
        // when we don't want to put params in the url address, use the req body
        // this if checks if there is an id specified in the request body
        // if there is, get that uer id.
        // if not, get all users
        if (id) {
            User.findByPk(id)
                .then(user => res.status(200).json(user))
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error)
                })
        } else {
            User.findAll()
                .then(users => res.status(200).json(users))
                .catch(error => {
                    console.log(error)
                    res.status(400).json(error)
                })
        }
    },
 
    // update
    update: async (req, res) => {
        // QUESTION: include the id in the req body then it's not needed in the address url
        const { id } = req.params
        try {
            const item = await User.update(req.body, { where: { id: id } })
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },
 
    // delete
    delete: async (req, res) => {
        // TODO: arrange a means to set the user as inactive instead of delete
        // delete of a user should be prevented so history (recipes and comments) are retained
        const { id } = req.params
        try {
            const item = await User.destroy({ where: { id: id } })
            res.status(200).json(item)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }
}
