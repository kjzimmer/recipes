import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";
import { Ingredients } from "./ingredients.model.js";
import { PrepSteps } from "./prepSteps.model.js";

export const Recipe = sequelize.define('recipe',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                min: 1
            }
        },
        prepTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                min: 1
            }
        },
        cookTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            validate: {
                min: 1
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

Recipe.hasMany(Ingredients)
Recipe.hasMany(PrepSteps)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
Recipe.sync({ alter: true })
    .then()
    .catch(error => console.log('Recipes table sync error'))

