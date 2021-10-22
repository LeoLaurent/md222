const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('Prenoms', {
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // Other model options go here
    });

}
