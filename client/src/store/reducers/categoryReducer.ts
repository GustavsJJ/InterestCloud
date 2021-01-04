import { IAction, ICategory } from "../../types/interfaces";
import { GET_CATEGORIES, ADD_POINTS, RESET_POINTS } from "../actions/types";

const initialState = {
  categories: [],
};

export default function (state = initialState, action: IAction) {
  let categories: ICategory[];
  let category: ICategory | undefined;
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ADD_POINTS:
      categories = [...state.categories];
      category = categories.find(
        (cat: ICategory) => cat._id.toString() === action.payload.categoryId
      );
      if (category) category.points = action.payload.points;
      if (category && !category.points && action.payload.points < 0)
        category.points = 0;
      return {
        ...state,
        categories,
      };
    case RESET_POINTS:
      categories = [...state.categories];
      categories.map((cat: ICategory) => (cat.points = 0));
      return {
        ...state,
        categories,
      };
    default:
      return state;
  }
}
