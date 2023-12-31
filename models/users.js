const helper = require("../services/helper");

module.exports = function model(sequelize, types) {
  const Users = sequelize.define(
    "users",
    {
      user_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      first_name: {
        type: types.STRING,
        defaultValue: "",
      },
      last_name: {
        type: types.STRING,
        defaultValue: "",
      },
      user_name: {
        type: types.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: types.STRING,
        allowNull: false,
      },
      user_password: {
        type: types.STRING,
        allowNull: false,
      },
      phone_no: {
        type: types.STRING,
        defaultValue: "",
      },
      token: {
        type: types.TEXT,
        defaultValue: "",
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          try {
            if (user.user_password) {
              user.user_password = await helper.hashPassword(
                user.user_password
              );
            }
          } catch (error) {
            console.log("\n save password hash error...", error);
          }
        },
        beforeUpdate: async (user) => {
          try {
            if (user.changed("user_password") && user.user_password) {
              user.user_password = await helper.hashPassword(
                user.user_password
              );
            }
          } catch (error) {
            console.log("\n update password hash error...", error);
          }
        },
      },
    },
    {
      tableName: "users",
    }
  );
  Users.associate = function (models) {
    Users.hasMany(models.movies, {
      as: "addedBy", // Alias for the association
      foreignKey: "user_id", // Foreign key in the movies table referencing user_id in users table
      sourceKey: "user_id",
    });
  };
  Users.associate = function (models) {
    Users.hasMany(models.ratings, {
      as: "userRating", // Alias for the association
      foreignKey: "user_id", // Foreign key in the movies table referencing user_id in users table
      sourceKey: "user_id",
    });
  };
  return Users;
};
