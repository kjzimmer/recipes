import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";
import { Recipe } from "./recipes.model.js";

export const Ingredients = sequelize.define('ingredients',
    {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        }
    }
)

Ingredients.belongsTo(Recipe)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
Ingredients.sync({ alter: true })
    .then()
    .catch(error => console.log('Ingredients table sync error'))

