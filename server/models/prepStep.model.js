import { sequelize } from "../config/config.sequelize.js";
import { DataTypes } from "sequelize";

export const PrepStep = sequelize.define('prepSteps',
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
// PrepStep.sync({alter:true})
//     .then()
//     .catch(error => console.log('PrepSteps table sync error'))

