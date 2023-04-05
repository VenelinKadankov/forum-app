export const apiLinks = (requestFor) => {
    switch (requestFor) {
        case 'theme':
            return {
                baseUrl: 'http://localhost:5108/api/theme/all',
                secondaryUrl: 'https://localhost:44350/api/theme/all',
            }
        case 'topic':
            return {
                baseUrl: 'http://localhost:5108/api/topic/all',
                secondaryUrl: 'https://localhost:44350/api/topic/all',
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