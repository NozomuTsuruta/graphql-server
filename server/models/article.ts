import { Association, DataTypes, Model } from 'sequelize';
import db from '../sequelize/models';
import Comment from './comment';

class Article extends Model {
  public id!: number;
  public title!: string;
  public text!: string;
  public tags!: string;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly comments?: Comment[];

  public static associations: {
    comments: Association<Article, Comment>;
  };
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'articles',
    sequelize: db.sequelize,
  }
);

// コメントと紐付け
Article.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'article_id',
  onDelete: 'cascade',
  hooks: true,
  as: 'comments',
});

export default Article;
