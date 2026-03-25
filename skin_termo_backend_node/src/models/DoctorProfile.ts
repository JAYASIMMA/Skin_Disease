import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class DoctorProfile extends Model {
  public id!: number;
  public userId!: number;
  public fullName!: string;
  public medicalDegree!: string;
  public specialization!: string;
  public yearsOfExperience!: number;
  public hospitalAffiliation!: string;
  public latitude!: number;
  public longitude!: number;
  public currentAddress!: string;
  public biography!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DoctorProfile.init(
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
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medicalDegree: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hospitalAffiliation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    currentAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'DoctorProfile',
    tableName: 'doctor_profiles',
  }
);

// Define associations
User.hasOne(DoctorProfile, { foreignKey: 'userId', as: 'profile' });
DoctorProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default DoctorProfile;
