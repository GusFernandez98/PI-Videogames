const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, //Genera un codigo random con letras y numeros.
      defaultValue: DataTypes.UUIDV4,  //genera automaticamente.
      unique: true,
      primaryKey: true,
      allowNull: false,     //allowNull(permite un vacio) --> FALSO.
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,    //Permite un null.
    },

    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {timestamps: false} 
  );
};
