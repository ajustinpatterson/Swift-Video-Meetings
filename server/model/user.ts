import { Sequelize, ModelDefined, DataTypes, Optional, Model, UUID } from "sequelize";

export interface UserAttributes {
  id: string
  name: string
  bio? : string
  avatar?: string
  status?: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"| "name"> {}

export default function (sequelize: Sequelize) {
  const user: ModelDefined <UserAttributes, UserCreationAttributes> = sequelize.define('User', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }
  );
  return user;
}
