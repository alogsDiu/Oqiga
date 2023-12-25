import { sign, SignOptions } from "jsonwebtoken";
import { Config } from "../config";

export type TokenType = {
  accessToken: string;
};

export type SignTokenForUserType = {
  id: string | number;
};

export class Token {
  public static signTokenForUser(
    data: SignTokenForUserType,
    options?: SignOptions
  ): TokenType {
    const payload = data;

    const accessToken = sign(
      payload,
      Config.clientAuthSecretOrPrivateKey,
      options
    );

    return {
      accessToken,
    };
  }
}
