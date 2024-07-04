import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";

import { Ingredient } from "./ingredient.model.js";
import { PrepStep } from "./prepStep.model.js";
import { User } from "./user.model.js";
import { Rating } from "./rating.model.js";

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

Ingredient.belongsTo(Recipe)
Recipe.hasMany(Ingredient)

PrepStep.belongsTo(Recipe)
Recipe.hasMany(PrepStep)

Rating.belongsTo(Recipe)
Recipe.hasMany(Rating)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
Recipe.sync({ alter: true, force: true })
    .then(() => {
        Ingredient.sync({ alter: true, force: true })
            .then()
            .catch(error => console.log('Ingredients table sync error'))

        PrepStep.sync({ alter: true, force: true })
            .then()
            .catch(error => console.log('PrepSteps table sync error'))

        Rating.sync({ alter: true, force: true })
            .then()
            .catch(error => console.log('Rating table sync error'))
    })
    .catch(error => console.log('Recipes table sync error'))

