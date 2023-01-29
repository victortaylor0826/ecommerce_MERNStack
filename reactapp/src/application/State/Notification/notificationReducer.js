import * as actionTypes from "../actionTypes";

const initialState = [];

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATION_ADD:
      console.log("this is called from add notification");
      return [action.payload, ...state];
    case actionTypes.NOTIFICATION_CLEAR:
      return [];
    case actionTypes.NOTIFICATION_SEEN:
      const newState = state.map((item) => {
        if (item._id == action.payload) {
          return { ...item, seen: !item.seen };
        }
        return item;
      });
      return newState;
    default:
      return state;
  }
};
