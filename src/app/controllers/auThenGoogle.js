exports.home = (req, res) => {
    res.send("<a href='/auth/google/callback'>Login with Google</a>");
};
  
exports.loginSuccess = (req, res) => {
    res.redirect("http://localhost:5173");
};

exports.profile = (req, res) => {
    if (!req.user) {
        return res.redirect("/");
    }
    res.redirect("http://localhost:5173"); 
};


exports.logout = (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
};
