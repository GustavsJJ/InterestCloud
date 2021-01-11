import categoryReducer from "../../../store/reducers/categoryReducer";
import { IAction } from "../../../types/interfaces";
import {
  GET_CATEGORIES,
  ADD_POINTS,
  RESET_POINTS,
  NOT_IMPLEMENTED,
} from "../../../store/actions/types";

describe("Test categoryReducer", () => {
  const initialState = {
    categories: [],
  };

  const categories = [
    {
      _id: "category_1_id",
      name: "category_1",
      color: "blue",
      points: 1,
    },
    {
      _id: "category_2_id",
      name: "category_2",
      color: "red",
      points: 2,
    },
  ];

  it("Test categoryReducer without passing initialState", () => {
    const action: IAction = {
      type: GET_CATEGORIES,
      payload: categories,
    };
    const result = categoryReducer(undefined, action);
    expect(result).toEqual({ categories });
  });

  it("Test GET_CATEGORIES", () => {
    const action: IAction = {
      type: GET_CATEGORIES,
      payload: categories,
    };
    const result = categoryReducer(initialState, action);
    expect(result).toEqual({ categories });
  });

  it("Test ADD_POINTS set to 5 points", () => {
    const state = {
      categories: [...categories],
    };
    const action: IAction = {
      type: ADD_POINTS,
      payload: {
        categoryId: "category_1_id",
        points: 5,
      },
    };
    const result = categoryReducer(state, action);
    expect(result).toEqual({
      categories: [
        {
          ...categories[0],
          points: 5,
        },
        { ...categories[1] },
      ],
    });
  });

  it("Test ADD_POINTS set to -5 points", () => {
    const state = {
      categories: [
        {
          _id: "category_1_id",
          name: "category_1",
          color: "blue",
        },
      ],
    };

    const action: IAction = {
      type: ADD_POINTS,
      payload: {
        categoryId: "category_1_id",
        points: -5,
      },
    };
    const result = categoryReducer(state, action);
    expect(result).toEqual({
      categories: [{ ...state.categories[0], points: 0 }],
    });
  });

  it("Test ADD_POINTS if category can not be found ", () => {
    const state = {
      categories: [...categories],
    };
    const action: IAction = {
      type: ADD_POINTS,
      payload: {
        categoryId: "non-existant_category",
        points: 5,
      },
    };
    const result = categoryReducer(state, action);
    expect(result).toEqual({
      categories: categories,
    });
  });

  it("Test RESET_POINTS", () => {
    const state = {
      categories: [...categories],
    };
    const action: IAction = {
      type: RESET_POINTS,
      payload: categories,
    };
    const result = categoryReducer(state, action);
    expect(result).toEqual({
      categories: [
        { ...categories[0], points: 0 },
        { ...categories[1], points: 0 },
      ],
    });
  });

  it("Test default switch statement", () => {
    const action: IAction = {
      type: NOT_IMPLEMENTED,
    };
    const result = categoryReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
    });
  });
});
