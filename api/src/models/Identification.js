module.exports = (sequelize, DataTypes) => {
  const Identification = sequelize.define(
    "identification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: DataTypes.STRING,
      state: DataTypes.STRING,
      expiresAt: DataTypes.DATE,
      imageURL: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "CASCADE",
        unique: true,
        references: {
          model: "user",
          key: "id",
          as: "userId",
        },
      },
    },
    {
      freezeTableName: true,
    },
  );

  Identification.associate = (models) => {
    Identification.belongsTo(models.user);
  };

  return Identification;
};
