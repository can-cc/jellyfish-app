

export function signin(username: string, password: string) {
    return {
        type: 'SIGNIN',
        payload: {
            username,
            password
        }
    }
}