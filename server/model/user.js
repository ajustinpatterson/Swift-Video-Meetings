module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      required: true
    },
    bio: {
      type: DataTypes.STRING,
      required: false
    },
    avatar: {
      type: DataTypes.STRING,
      required: false
    }
  });

  User.associate = db => {
    db.User.hasMany(db.Data);
  };

  return User;
};