import User from './user';
import Article from './article';
import Comment from './comment';

export const models = {
  User,
  Article,
  Comment,
};

export type Models = typeof models;