import passport from 'passport';
import { HttpResponse } from '../response/http.response';
import { NextFunction, Request, Response } from 'express';
import { UserEntity } from '../../user/models/entities/user.entity';
import { validationResult } from 'express-validator';
import { RoleType } from '../../user/models/enums/role-type.enum';

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  passAuth(type: string) {
    return passport.authenticate(type, { session: false });
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;

    if (!user.role || user.role !== RoleType.ADMIN) {
      return this.httpResponse.Forbidden(
        res,
        "You're not authorized to access this endpoint.",
      );
    }

    return next();
  }

  async handleValidationErrors(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log('VALIDATION ERRORS', errors.array());

      return this.httpResponse.BadRequest(res, errors.array());
    }

    next();
  }
}
