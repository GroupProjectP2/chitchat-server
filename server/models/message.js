"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: "SenderId" });
      Message.belongsTo(models.User, { foreignKey: "ReceiverId" });
    }
  }
  Message.init(
    {
      SenderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "SenderId is required" },
          notEmpty: { msg: "SenderId is required" },
        },
      },
      ReceiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "ReceiverId is required" },
          notEmpty: { msg: "ReceiverId is required" },
        },
      },
      messages: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Messages is required" },
          notEmpty: { msg: "Messages is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
