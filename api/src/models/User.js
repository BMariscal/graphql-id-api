module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      dob: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    },
  );

  User.associate = (models) => {
    User.hasOne(models.identification);
    User.hasOne(models.medicalRec);
  };

  return User;
};
