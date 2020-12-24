import { DataTypes, Model } from 'sequelize';
import db from '../sequelize/models';

class Comment extends Model {
  public id!: number;
  public text!: string;
  public user_id!: number;
  public article_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'comments',
    sequelize: db.sequelize,
  }
);


export default Comment;
