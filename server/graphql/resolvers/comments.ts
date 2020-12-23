import { ForbiddenError, IResolvers } from 'apollo-server-express';
import Comment from '../../models/comment';
import { ResolverContext } from './types';

export const comment_resolvers: IResolvers<Comment, ResolverContext> = {
  Query: {
    /** 全てのコメントを返す */
    comments: async (parent, args, { models }) => models.Comment.findAll(),
    /** 特定のコメントを返す */
    comment: async (parent, { id }, { models }) => models.Comment.findByPk(id),
  },

  Mutation: {
    /** コメント作成 */
    create_comment: async (
      parent,
      { text, article_id },
      { models, current_user }
    ) => {
      if (!current_user) {
        return new ForbiddenError('Not authenticated as user.');
      }
      return models.Comment.create({
        text,
        article_id,
        user_id: current_user!.id,
      });
    },
    /** コメント削除 */
    delete_comment: async (parent, { id }, { models, current_user }) => {
      if (!current_user) {
        return new ForbiddenError('Not authenticated as user.');
      }
      return models.Comment.destroy({ where: { id } });
    },
    /** コメント更新 */
    update_comment: async (parent, { id, text }, { models, current_user }) => {
      if (!current_user) {
        return new ForbiddenError('Not authenticated as user.');
      }
      models.Comment.update({ text }, { where: { id } });
      return models.Comment.findByPk(id);
    },
  },

  Comment: {
    /** コメントからユーザーにアクセス */
    user: async (comment, args, { models }) =>
      models.User.findByPk(comment.user_id),
    /** コメントから記事にアクセス */
    article: async (comment, args, { models }) =>
      models.Article.findByPk(comment.article_id),
  },
};
