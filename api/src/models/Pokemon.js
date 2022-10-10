const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,  //problema resuelto, anterior codigo: DataTypes.UUIDV4  !!!!
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    life: {
      type: DataTypes.STRING,
      allowNull: false
    },

    attack: {
      type: DataTypes.STRING,
      allowNull: false
    },
    defense: {
      type: DataTypes.STRING,
      allowNull: false
    },
    speed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.TEXT,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

    createdBy: {
      type: DataTypes.STRING,
      defaultValue: "nehuen"
    }

    


  });
};
