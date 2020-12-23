import { user_resolvers } from './user';
import { article_resolvers } from './article';
import { comment_resolvers } from './comments';

// resolversとしてindex.tsxでインポート
export default [user_resolvers, article_resolvers, comment_resolvers];
