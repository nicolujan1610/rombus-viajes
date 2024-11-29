import jwt from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import {conectarDB} from "./db.js";

export async function getToken(email, rol) {
  const payload = { email:email, rol:rol};
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
  return token
}

export async function authConfig() {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    };
    passport.use(
      new Strategy(jwtOptions, async (payload, next) => {
        next(null, payload);
      })
    );
  }
  
  export const validarJwt = passport.authenticate("jwt", {
    session: false,
  });
 