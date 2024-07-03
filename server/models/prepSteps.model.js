import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";
import { Recipe } from "./recipes.model.js";

export const PrepSteps = sequelize.define('prepSteps',
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

PrepSteps.belongsTo(Recipe)

// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
PrepSteps.sync({ alter: true })
    .then()
    .catch(error => console.log('PrepSteps table sync error'))

