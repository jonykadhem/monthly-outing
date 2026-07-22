const dns = require("node:dns");

// DNS workaround for MongoDB Atlas.
// Remove these two lines if your regular DNS works correctly.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();


const passUserToView = require("./middleware/pass-user-to-view.js");
const methodOverride = require("method-override");
const { MongoStore } = require("connect-mongo");
const upload = require("./config/multer");
const session = require("express-session");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000; // For me, this is best practice. Usually, the port is placed in .env; if not, 3000 will be used
// controlerss and methods 
const authCtrl = require("./controllers/auth.js");
const isSignedIn = require("./middleware/is-signed-in.js");
const isAdmin = require('./middleware/is-admin.js')

const restaurantCtrl = require('./controllers/restaurant.js')
const reviewCtrl = require('./controllers/reviewer.js')



app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);
app.use(passUserToView);


app.get("/", authCtrl.home);
app.get("/auth/sign-up", authCtrl.showSignUpForm);
app.post("/auth/sign-up", authCtrl.signUp);
app.get("/auth/sign-in", authCtrl.showSignInForm);
app.post("/auth/sign-in", authCtrl.signIn);
app.delete("/auth/sign-out", authCtrl.signOut);
app.get('/admin',isSignedIn,isAdmin,authCtrl.showAdmin)
app.post('/admin/users/:id', authCtrl.updateUser)


app.get("/dashboard", isSignedIn, authCtrl.dashboard);

// new seggestion restaurants
app.get('/restaurant/new',isSignedIn, restaurantCtrl.showNewRestaurantForm)
app.post('/restaurants', isSignedIn, restaurantCtrl.creatSuggestion)
app.get('/suggestions', restaurantCtrl.showAllSuggestions)
app.get('/restaurant/:restaurantId', restaurantCtrl.showDetails)
app.delete('/restaurant/:restaurantId',isSignedIn, restaurantCtrl.deleteSuggestion)
app.get("/restaurant/:restaurantId/edit", isSignedIn, restaurantCtrl.showEditForm)
app.put("/restaurant/:restaurantId", isSignedIn, restaurantCtrl.editRestaurant)

// reviews routers
app.get("/restaurant/:restaurantId/review", isSignedIn, reviewCtrl.showReviewForm)
app.put("/restaurant/:restaurantId/review", isSignedIn, reviewCtrl.createReview)
app.get('/reviews', reviewCtrl.showAllReviews)
app.get("/restaurant/:restaurantId/review/:reviewId/edit", isSignedIn, reviewCtrl.showEditReviewForm)
app.put("/restaurant/:restaurantId/review/:reviewId", isSignedIn, reviewCtrl.editReview)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};

startServer();
