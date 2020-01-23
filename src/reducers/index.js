import app from './app';
import github from './github';
import user from './user';
import search from './search';

export default {
  ...app,
  ...github,
  ...user,
  ...search,
};
