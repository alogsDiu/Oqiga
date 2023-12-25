import { Request, Response, Router } from "express";
import { Message } from "../../domains/message";

export class ChatController {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post("/sent-message", this.sentMessage);
    this.router.post("/get-message", this.getMessage);
  }

  public async sentMessage(req: Request, res: Response): Promise<void> {
    const result = await Message.messageSent(req.body);

    res.status(200).send(result);
  }

  public async getMessage(req: Request, res: Response): Promise<void> {
    const result = await Message.messagesGet(req.body);
    res.status(200).send(result);
  }
}
