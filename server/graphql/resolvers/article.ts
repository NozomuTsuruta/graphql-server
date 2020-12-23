import { ForbiddenError, IResolvers } from 'apollo-server-express';
import Article from '../../models/article';
import { ResolverContext } from './types';

export const article_resolvers: IResolvers<Article, ResolverContext> = {
  Query: {
    /** 全ての記事を返す */
    articles: async (parent, args, { models }) => models.Article.findAll(),
    /** 特定の記事を返す */
    article: async (parent, { id }, { models }) => models.Article.findByPk(id),
  },

  Mutation: {
    /** 記事作成 */
    create_article: async (
      parent,
      { title, text, tags },
      { models, current_user }
    ) => {
      if (!current_user) {
        return new ForbiddenError('Not authenticated as user.');
      }
      return models.Article.create({
        title,
        text,
        tags,
        user_id: current_user!.id,
      });
    },
    /** 記事削除 */
    delete_article: async (parent, { id }, { models, current_user }) => {
      if (!current_user) {
        return new ForbiddenError('Not authenticated as user.');
      }
      return models.Article.destroy({ where: { id } });
    },
    /** 記事更新 */
    update_article: async (
      parent,
      { id, title, text, tags },
      { models, current_user }
    ) => {
      if (!current_user) {
        return new ForbiddenError('Not authenticated as user.');
      }
      models.Article.update({ title, text, tags }, { where: { id } });
      return models.Article.findByPk(id);
    },
  },

  Article: {
    /** 記事からユーザーにアクセス */
    user: async (article, args, { models }) =>
      models.User.findByPk(article.user_id),
    /** 記事からコメントにアクセス */
    comments: async (article, args, { models }) =>
      models.Comment.findAll({ where: { article_id: article.id } }),
  },
};
