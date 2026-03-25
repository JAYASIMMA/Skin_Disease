import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class ChatSession extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ChatSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'ChatSession',
    tableName: 'chat_sessions',
  }
);

User.hasMany(ChatSession, { foreignKey: 'userId', as: 'sessions' });
ChatSession.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default ChatSession;
