import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../../lib/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      if (!email) {
        return done(new Error("Email não encontrado no perfil do Google"));
      }
      try {
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (user) {
          return done(null, user);
        }
        const newUser = await prisma.user.create({
          data: { email: email },
        });
        done(null, newUser);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

export default passport;
