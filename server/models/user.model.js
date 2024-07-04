import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";
import bcrypt from 'bcrypt'

import { Recipe } from "./recipe.model.js";
import { Rating } from "./rating.model.js";

export const User = sequelize.define('user',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/i,
                len: [8, 32]
            }
        }
    },
    {
        hooks: {
            afterValidate: (user) => {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, 10);
                }
            }
        }
    }
)

Recipe.belongsTo(User)
User.hasMany(Recipe)

Rating.belongsTo(User)
User.hasMany(Rating, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
User.sync({ alter: true, force: true })
    .then(() => {
        Recipe.sync({ alter: true, force: true })
            .then()
            .catch(error => console.log('Recipes table sync error: ', error))

        Rating.sync({ alter: true, force: true })
            .then()
            .catch(error => console.log('Ratings table sync error: ', error))
    })
    .catch(error => console.log('User table creation error: ', error))

