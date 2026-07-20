const User = require("../models/user");
const bcrypt = require("bcrypt");

const home = (req, res) => {
    res.render("home.ejs", {
        user: req.session.user,
    });
};

const showSignUpForm = (req, res) => {
    res.render("auth/sign-up.ejs", {
        user: req.session.user,
    });
};

const signUp = async (req, res) => {
    const userInDatabase = await User.findOne({
        username: req.body.username,
    });

    if (userInDatabase) {
        return res.send("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    };

    const user = await User.create(userData);

    req.session.user = {
        username: user.username,
        id: user.id,
    };

    req.session.save(() => {
        res.redirect("/");
    });
};

const showSignInForm = (req, res) => {
    res.render("auth/sign-in.ejs", {
        user: req.session.user,
    });
};

const signIn = async (req, res) => {
    const userInDatabase = await User.findOne({
        username: req.body.username,
    });

    if (!userInDatabase) {
        return res.send("User does not exist");
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        userInDatabase.password
    );

    if (!validPassword) {
        return res.send("Login failed");
    }

    req.session.user = {
        username: userInDatabase.username,
        id: userInDatabase.id,
        role: userInDatabase.role,
    };


    req.session.save(() => {
        res.redirect("/");
    });
};

const signOut = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

const dashboard = (req, res) => {
    res.render("dashboard.ejs", {
        user: req.session.user,
    });
};

const showAdmin = async(req,res) => {
    console.log(req.session)
    const users = await User.find()
    res.render('auth/users.ejs', {
        users,
    })
}

const updateUser = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        role: req.body.role
    })
    res.redirect('/admin')
}


module.exports = {
    home,
    showSignUpForm,
    signUp,
    showSignInForm,
    signIn,
    signOut,
    dashboard,
    showAdmin,
    updateUser,
};
