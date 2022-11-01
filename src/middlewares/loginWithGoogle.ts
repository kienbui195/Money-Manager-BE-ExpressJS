import googleStrategy from 'passport-google-oauth2';
import passport from 'passport';
import { UserModel } from '../schemas/user.model';

const GoogleStrategy = googleStrategy.Strategy;

passport.use(new GoogleStrategy({
    clientID: '617276136155-o6ah09mkvrfhnh2iecv5sj46bpp7i51v.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3001/auth/google/callback'

},
    async function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        const user = await UserModel.findOne({ google_id: profile._json.sub });
        if (user) {
            cb(null, user)
        } else {
            const nameGoogle = profile._json.name;
            const google_id = profile._json.sub;
            const email = profile._json.email;
            let data = {
                username: nameGoogle,
                email: email,
                google_id: google_id,
                isVerify: true,
                password: '',
            }
            await UserModel.create(data);
            cb(null, data)
        }
    }

));

passport.serializeUser((user: any, cb) => {
    cb(null, user)
});
passport.deserializeUser((user: any, cb) => {
    cb(null, user);
})

export default passport;
