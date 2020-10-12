module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    avatar: DataTypes.STRING
  });

  return User;
};