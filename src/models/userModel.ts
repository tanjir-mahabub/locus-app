/**
 * User interface definition
 */
export interface IUser {
    username: string;
    password: string;
    role: string;
}

/**
 * Pre defined users
 */
export const users: IUser[] = [
    {
        username: 'admin',
        password: 'admin_password',
        role: 'admin',
    },
    {
        username: 'normal',
        password: 'normal_password',
        role: 'normal',
    },
    {
        username: 'limited',
        password: 'limited_password',
        role: 'limited',
    },
];
