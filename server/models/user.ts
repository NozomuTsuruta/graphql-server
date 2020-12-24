import { Model, DataTypes, Association } from 'sequelize';
import bcrypt from 'bcrypt';
import Article from './article';
import Comment from './comment';
import db from '../sequelize/models';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly articles?: Article[];
  public readonly comments?: Comment[];

  public static find_by_email: (email: string) => Promise<User | null>;
  public validate_password!: (password: string) => Promise<boolean>;

  public static associations: {
    articles: Association<User, Article>;
    comments: Association<User, Comment>;
  };
}

/** パスワードの暗号化 */
const generate_password_hash = async (user: User) => {
  const salt_rounds = 10;
  return await bcrypt.hash(user.password, salt_rounds);
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 50],
      },
    },
  },
  {
    tableName: 'users',
    sequelize: db.sequelize,
    // ユーザーのイベント発生時に自動で実行される
    hooks: {
      // ユーザーの生成時に呼び出される
      beforeCreate: async (user) => {
        user.set('password', await generate_password_hash(user));
      },
    },
  }
);

// 記事と紐付け
User.hasMany(Article, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'articles',
});

// コメントと紐付け
User.hasMany(Comment, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'comments',
});

// メールアドレスからユーザーを取得
User.find_by_email = async (email: string) => User.findOne({ where: { email } });
// ユーザーのパスワードと入力されたパスワードを比較
User.prototype.validate_password = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default User;
