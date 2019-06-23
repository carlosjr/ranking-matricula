import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt';

export default (app) => {
    const Users = app.datasource.models.Users;

    const opts = {}
    opts.secretOrKey = app.config.jwtSecret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    const strategy = new Strategy(opts, (playload, done) => {
        Users.findById(playload.id).then((user) => {
            if (user) {
                done(null, {
                    id: user.id,
                    email: user.email
                });
            }else {
                done(null, false);
            }
        }).catch(error => done(error, null));
    });

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', app.config.jwtSecret)
    }
}