import { SET_NEWS_ITEM } from '../constants';

export default function runtime(state = {}, action) {
  switch (action.type) {
    case SET_NEWS_ITEM:
      return {
        ...state,
        [action.payload.id]: action.payload.data,
      };
    default:
      return state;
  }
}
