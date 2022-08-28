export interface IUserModel {
    id: number;
    password: string;
    email: string;
    phone: string;
    token: string;
    fullname: string;
    role: string;
    forgetPasswordToken: string;

}