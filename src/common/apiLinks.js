export const apiLinks = (requestFor) => {
    switch (requestFor) {
        case 'theme':
            return {
                baseUrl: 'https://localhost:44350/api/theme/all',
                secondaryUrl: 'http://localhost:5108/api/theme/all',
            }
        case 'topic':
            return {
                baseUrl: 'https://localhost:44350/api/topic/all',
                secondaryUrl: 'http://localhost:5108/api/topic/all',
            }
        default:
            break;
    }
}