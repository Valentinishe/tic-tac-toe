
export interface IUserType {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    rating: number;
    botLevel?: 0 | 1 | 2; // bot complexity in the game: 0 - low, 1 - middle, 2 - high,
    password?:string;
}