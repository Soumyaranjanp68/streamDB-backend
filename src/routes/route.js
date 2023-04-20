const router = require("express").Router();

const {createUser, loginUser } = require("../controller/userController");
const {createMovie,getMovies, updateMovie } = require("../controller/movieController");
const {reviewMovies} = require("../controller/reviewController");
const {authentication} = require("../middleWare/commonMiddleWare");


router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/movies", authentication, createMovie);
router.post("/movies/:movie/reviews", authentication, reviewMovies);


router.get("/moviesList", getMovies);



router.put("/movies/:movie", updateMovie)
  


router.all('/*', (req , res) => {
    res.status(400).send({ status: false, message: " path invalid" });
});


module.exports = router;
