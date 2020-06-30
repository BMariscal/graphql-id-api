module.exports = (sequelize, DataTypes) => {
  const MedicalRec = sequelize.define(
    "medicalRec",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: DataTypes.STRING,
      issuer: DataTypes.STRING,
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

  MedicalRec.associate = (models) => {
    MedicalRec.belongsTo(models.user);
  };

  return MedicalRec;
};
