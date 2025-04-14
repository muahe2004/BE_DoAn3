class AuthController {
    home(req, res) {
        res.send("<a href='/auth/google/callback'>Login with Google</a>");
    }

    loginSuccess(req, res) {
        res.redirect("http://localhost:5173");
    }

    profile(req, res) {
        if (!req.user) {
            return res.redirect("/");
        }
        res.redirect("http://localhost:5173");
    }
    
    logout(req, res) {
        req.logout(() => {
            req.session.destroy(() => {
                res.redirect("/");
            });
        });
    }
}

module.exports = new AuthController();
