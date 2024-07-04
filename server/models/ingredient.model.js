import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";

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
// Ingredient.sync({alter:true, force:true})
//     .then()
//     .catch(error => console.log('Ingredients table sync error'))

