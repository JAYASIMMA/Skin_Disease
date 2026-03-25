import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class AnalysisHistory extends Model {
  public id!: number;
  public userId!: number;
  public imageUrl!: string;
  public diseaseName!: string;
  public confidence!: string;
  public severity!: string;
  public description!: string;
  public symptoms!: string; // Stored as JSON string
  public recommendations!: string; // Stored as JSON string
  public seekMedicalAttention!: boolean;
  public timestamp!: Date;
}

AnalysisHistory.init(
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    confidence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    severity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    symptoms: {
      type: DataTypes.JSON, // Works with SQLite as JSON text
      allowNull: true,
    },
    recommendations: {
      type: DataTypes.JSON, // Works with SQLite as JSON text
      allowNull: true,
    },
    seekMedicalAttention: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AnalysisHistory',
    tableName: 'analysis_history',
    timestamps: false,
  }
);

User.hasMany(AnalysisHistory, { foreignKey: 'userId', as: 'analyses' });
AnalysisHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default AnalysisHistory;
