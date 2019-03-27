import jwtSecret from './jwtConfig';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12

// i removed the sequelize portion of this but i wasnt sure what to replace it with for mongoose
const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use(
    'register',
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) => {
            try {
                User.findOne({
                    where: {
                        username: username
                    }
                }).then(user => {
                    if(user !== null) {
                        console.log('username already taken');
                        return done(null, false, { message: 'username already taken'});
                    } else {
                        bcyrpt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                            User.create({ username, password: hashedPassword }).then(user => {
                                console.log('user created');
                                return done(null, user)
                            })
                        })
                    }
                });
            } catch (err) {
                done(err);
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) => {
            try {
                User.findOne({
                    where: {
                        username: username
                    }
                }).then(user => {
                    if(user === null) {
                        return done(null, false, { message: 'bad username'});
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if(response !== true) {
                                console.log('passwords do not match');
                                return done(null, false, { message: 'passwords do not match'});
                            }
                            console.log('user found & authenticated');
                            return done(null, user);
                        })
                    }
                })
            } catch (err) {
                done(err);
            }
        }
    )
)

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({
                where: {
                    username: jwt_payload.id
                }
            }).then(user => {
                if(user) {
                    console.log('user found in db in passport');
                    done(null, user)
                } else {
                    console.log('user not found in db');
                    done(null, false)
                }
            })
        } catch (err) {
            done(err)
        }
    })
)