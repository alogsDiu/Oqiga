import { AuthMiddleware } from "../../domains/middleweres/auth";
import { Request, Response, Router } from "express";
import { Auth } from "../../domains/auth";

export class AuthController {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post("/auth/login", AuthMiddleware.verifyLoginData, this.login);
    this.router.post(
      "/auth/signup",
      AuthMiddleware.verifySignupData,
      this.registration
    );
  }

  public async login(req: Request, res: Response): Promise<void> {
    const result = await Auth.login(req.body);

    res.status(200).send(result);
  } 

  public async registration(req: Request, res: Response): Promise<void> {
    const result = await Auth.signup(req.body);

    res.status(200).send(result);
  }
}
