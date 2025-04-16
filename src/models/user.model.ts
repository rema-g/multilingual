import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from 'sequelize';
  
  export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'super_admin' | 'admin' | 'user';
    refresh_token: string | null;
    created_at?: Date;
    updated_at?: Date;
  }
  
  export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'refresh_token' | 'created_at' | 'updated_at'> {}
  
  export class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: 'super_admin' | 'admin' | 'user';
    public refresh_token!: string | null;
  
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
  
    public static associate(models: any) {
      // add associations here if needed
    }
  }
  
  export const initUserModel = (sequelize: Sequelize): typeof User => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING(255), // longer for hashed passwords
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM('super_admin', 'admin', 'user'),
          allowNull: false,
          defaultValue: 'user',
        },
        refresh_token: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'users',
        modelName: 'User',
        underscored: true,
        timestamps: true,
      }
    );
  
    return User;
  };
  