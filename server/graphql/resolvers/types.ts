import { Models } from '../../models';
import User from '../../models/user';

export type ResolverContext = {
  models: Models;
  jwt: {
    secret: string;
    expiresIn: string;
  };
  current_user: User | null;
};
