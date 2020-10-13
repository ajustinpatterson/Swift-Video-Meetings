import { Sequelize, ModelDefined, DataTypes, Optional, Model, UUID } from "sequelize";

interface UserAttributes {
  id: string
  name: string
  email: string
  bio? : string
  avatar?: string
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

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
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }
  );
  return user;
}

// import { Sequelize, Model, DataTypes, Optional } from "sequelize";
// import { sequelize } from './db';

// interface UserAttributes {
//   id: string
//   name: string
//   email: string
//   bio? : string
//   avatar?: string
// }

// interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// class User extends Model<UserAttributes, UserCreationAttributes>
//   implements UserAttributes {
//     public id!: string;
//     public name!: string;
//     public email!: string;
//     public bio: string;
//     public avatar: string;
// };

// User.init(
//   {
//     id: {
//       type: DataTypes.STRING,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING(128),
//       allowNull: false,
//     },
//     email: {
//       type: new DataTypes.STRING(128),
//       allowNull: false,
//     },
//     bio: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     avatar: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     }
//   },
//   {
//     tableName: "users",
//     sequelize,
//   }
// );

// export default User;
