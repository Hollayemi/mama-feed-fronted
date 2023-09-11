export const jsonHeader = () => {
    const config = {
        headers: {
            'content-type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('user_token'),
        },
    };
    return config;
};

export const isLoggedIn = () => {
    return Boolean(typeof window !== 'undefined' && localStorage.getItem('user_token'))
}