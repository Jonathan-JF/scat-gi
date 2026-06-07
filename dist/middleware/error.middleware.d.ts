import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/error/app.error';
export declare const errorMiddleware: (err: Error | AppError, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
//# sourceMappingURL=error.middleware.d.ts.map