import { DataTypes } from "sequelize";
import { sequelize } from "../config/config.sequelize.js";

export const Rating = sequelize.define('rating',
    {
        comment: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 4
            }
        },
        recommended: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    }
)


// the following sync should be removed from production to 
// ensure the database is not accidentally modified by production
// Rating.sync({alter:true, force:true})
//     .then()
//     .catch(error => console.log('Rating table sync error'))

