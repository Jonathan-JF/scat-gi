import { AppError } from '../../../shared/error/app.error';
export declare class UserError extends AppError {
    constructor(code: string, statusCode: number, message: string);
}
export declare const UserErrors: {
    USER_NOT_FOUND: UserError;
    EMAIL_ALREADY_EXISTS: UserError;
    INVALID_CREDENTIALS: UserError;
    UNAUTHORIZED: UserError;
};
//# sourceMappingURL=user.errors.d.ts.map