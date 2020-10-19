import { Sequelize, ModelDefined, DataTypes, Optional, Model, UUID } from "sequelize";

export interface FileAttributes {
  _id: string
  filename: string,
  mimetype: string,
  path: string,
}

interface FileCreationAttributes extends Optional<FileAttributes, "_id"| "filename" | "mimetype" | "path"> {}

export default function (sequelize: Sequelize) {
  const file: ModelDefined <FileAttributes, FileCreationAttributes> = sequelize.define('File', {
      _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  );
  return file;
}
