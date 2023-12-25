import { Request, Response, Router } from "express";
import { EventService } from "../../domains/events";

export class EventController {
  public router: Router;

  constructor() {
    this.router = Router();

    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post("/get-events", this.getEvents);
    this.router.post("/sent-events", this.createEvent);
    this.router.post("/delete-event", this.deleteEvent);
  }

  public async deleteEvent(req: Request, res: Response): Promise<void> {
    const result = await EventService.deleteEvent(req.body);
    res.status(200).send(result);
  }

  public async getEvents(req: Request, res: Response): Promise<void> {
    const result = await EventService.getEvents(req.body.accessToken);
    res.status(200).send(result);
  }

  public async createEvent(req: Request, res: Response): Promise<void> {
    const result = await EventService.createEvent(req.body, req.body.picture);
    res.status(200).send(result);
  }
}
