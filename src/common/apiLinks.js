export const apiLinks = (requestFor) => {
    switch (requestFor) {
        case 'theme':
            return {
                baseUrl: 'http://localhost:5108/api/theme',
                secondaryUrl: 'https://localhost:44350/api/theme',
            }
        case 'topic':
            return {
                baseUrl: 'http://localhost:5108/api/topic',
                secondaryUrl: 'https://localhost:44350/api/topic',
            }
        case 'answer':
            return {
                baseUrl: 'http://localhost:5108/api/answer',
                secondaryUrl: 'https://localhost:44350/api/answer',
            }
        case 'auth':
            return {
                baseUrl: 'http://localhost:5108/api/user',
                secondaryUrl: 'https://localhost:44350/api/user',
            }
        default:
            break;
    }
}