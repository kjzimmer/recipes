import { sequelize } from "../config/config.sequelize.js";
import { DataTypes } from "sequelize";

import { Ingredient } from "./ingredient.model.js";
import { PrepStep } from "./prepStep.model.js";
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
            allowNull: true,
            validate: {
                min: 1
            }
        },
        prepTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1
            }
        },
        cookTime: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 0
            }
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2]
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

Ingredient.belongsTo(Recipe, {
    foreignKey: {
        name: 'recipeId',
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Recipe.hasMany(Ingredient)

PrepStep.belongsTo(Recipe, {
    foreignKey: {
        name: 'recipeId',
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Recipe.hasMany(PrepStep)

Rating.belongsTo(Recipe, {
    foreignKey: {
        name: 'recipeId',
        allowNull: false
    },
    onDelete: 'CASCADE'
})
Recipe.hasMany(Rating)

