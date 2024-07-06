import { sequelize } from "../config/config.sequelize.js";
import { DataTypes } from "sequelize";

export const Ingredient = sequelize.define('ingredients',
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


// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
// Ingredient.sync({alter:true})
//     .then()
//     .catch(error => console.log('Ingredients table sync error'))

