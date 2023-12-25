import { LoginDto } from "../../controllers/auth/dto/auth.dto";
import { SignupDto } from "../../controllers/auth/dto/signup.dto";
import { UserData, UserModel } from "../../data/user";
import { BadRequestException } from "../exception";
import { Token, TokenType } from "../token";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export type AuthResultType = {
  token: TokenType;
  user: String;
};

export class Auth {
  public static async login(data: LoginDto): Promise<AuthResultType> {
    const user = await UserData.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException("Неверные учетные данные");
    }

    if (!this.comparePasswords(user.password, data.password)) {
      throw new BadRequestException("Неверные учетные данные");
    }

    const token = Token.signTokenForUser(
      {
        id: user._id,
      },
      {
        expiresIn: data.rememberMe ? "1h" : "6h",
      }
    );

    return {
      token,
      user : user.userName,
    };
  }

  public static async signup(data: SignupDto): Promise<AuthResultType> {
    const userByEmail = await UserData.getUserByEmail(data.email);
    if (userByEmail) {
      throw new BadRequestException(
        "Пользователь с таким email уже существует"
      );
    }

    const hashPassword = this.hashPassword(data.password);

    const newUser = new UserModel({
      email: data.email,
      password: hashPassword,
      userName: data.userName
    });

    await newUser.save();

    const token = Token.signTokenForUser(
      {
        id: newUser._id,
      },
      {
        expiresIn: "1h",
      }
    );
    return {
      token,
      user : newUser.userName,
    };
  }

  private static comparePasswords(
    hashPassword: string,
    password: string
  ): boolean {
    return compareSync(password, hashPassword);
  }

  private static hashPassword(password: string): string {
    const salt = genSaltSync(10);

    return hashSync(password, salt);
  }
}
