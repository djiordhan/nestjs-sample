import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import Redis from 'ioredis';
import * as passport from 'passport';

@Module({
  imports: [PassportModule.register({ session: true })],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    const redisClient = new Redis({
      host: '127.0.0.1',
      port: 6379,
    });

    const sessionStore = new RedisStore({ client: redisClient });
    const sessionMiddleware = session({
      store: sessionStore,
      secret: 'your-secret',
      key: 'key-in-redis',
      saveUninitialized: false,
      resave: true,
      cookie: {},
    } as any);

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    consumer
      .apply(sessionMiddleware, passport.initialize(), passport.session())
      .forRoutes('*');
  }
}
