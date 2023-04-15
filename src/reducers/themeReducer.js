export const themeReducer = (state, action) => {
    // console.log(action.type + '    -    -     - -  - -  - - -     ' + action.payload);

    switch (action.type) {
        case 'THEME_FETCH':
            return { ...action.payload };
        case 'ANSWER_ADD':
            console.log(action.payload);
            return {
                ...state,
                answers: [
                    ...state.answers,
                    {
                        ...action.payload,
                        // creator: {
                        //     id: action.id,
                        //     username: action.username,
                        // }
                    }
                ],
            }
            // TODO: needs work
            case 'COMMENT_ADD':
                return {
                    ...state,
                    answers: [...state.answers],
                    comments: [
                        {
                            ...action.payload,
                            // creator: {
                            //     id: action.id,
                            //     username: action.username,
                            // }
                        }
                    ],
                }
        default:
            return state;
    }
};