import { SET_NEWS_ITEM } from '../constants';

export function setHackerNewsItem({ id, data }) {
  return {
    type: SET_NEWS_ITEM,
    payload: {
      id,
      data,
    },
  };
}
