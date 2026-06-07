import { Response } from 'express';
import { UserService } from '../application/user.service.impl';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    register: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    login: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=user.controller.d.ts.map