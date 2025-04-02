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
    res.send(`
        <h1>Welcome ${req.user.displayName}</h1>
        <img src="${req.user.photos[0].value}" alt="Profile Picture">
        <br><a href="/logout">Logout</a>
    `);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
};
  