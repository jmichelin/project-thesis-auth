/**
 * Created by jmichelin on 3/22/17.
 */
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));