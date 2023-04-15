export const themeReducer = (state, action) => {

    switch (action.type) {
        case 'THEME_FETCH':
            return { ...action.payload };
        case 'ANSWER_ADD':
            return {
                ...state,
                answers: [...action.payload],
            }
        case 'COMMENT_ADD':
            return {
                ...state,
                answers: [...state.answers],
                comments: [...action.payload],
            }
        default:
            return state;
    }
};