export const userResponseParser = (user: any) => {
    return {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username
    }
}