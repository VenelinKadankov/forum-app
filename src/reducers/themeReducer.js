export const themeReducer = (state, action) => {

    switch (action.type) {
        case 'THEME_FETCH':
            return { ...action.payload };
        case 'ANSWER_ADD':
            return {
                ...state,
                answers: [...action.payload],
            }
        case 'ANSWER_REMOVE':
            return {
                ...state,
                answers: [...action.payload],
            }
        case 'COMMENT_ADD':
            let changedAnswersAfterAdd = [...action.payload];

            changedAnswersAfterAdd.forEach(ans => ans.id === action.answerId ?
                ans.answerComments = [...ans.answerComments] :
                ans.answerComments);

            return {
                ...state,
                answers: [...changedAnswersAfterAdd],
            }
        case 'COMMENT_REMOVE':
            let changedAnswers = [...action.payload];

            changedAnswers.forEach(ans => ans.id === action.answerContainingComment.id ?
                ans.answerComments = [...ans.answerComments] :
                ans.answerComments);

            return {
                ...state,
                answers: [...changedAnswers],
            }
        default:
            return state;
    }
};