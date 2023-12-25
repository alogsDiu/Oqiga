import { AuthController } from "./controllers/auth";
import { ChatController } from "./controllers/chat";
import { initDatabase } from "./db/init-db";
import { Config } from "./domains/config";
import { ServerApp } from "./domains/server";
import { EventController } from "./controllers/event"

const app = new ServerApp(
  [new AuthController(), new ChatController(), new EventController()],
  Config.clientApiPort
);

const init = async (): Promise<void> => {
  app.init();
};

initDatabase().then(init);
