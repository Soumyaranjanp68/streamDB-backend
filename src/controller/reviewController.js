const reviewModel = require("../model/reviewModel");
const movieModel = require("../model/movieModel");




const reviewMovies = async function (req, res){
    try{
      let data = req.body;
      let movie = req.params.movie
      let {review, rating, reviewedBy} = data;
      
      if (!movie) {
        return res.status(400).send({ status: false, message: "please provide movie name" });
    }
    movie = movie.toLowerCase();
    data.movie = movie

    const checkMovie = await movieModel.findOne({ title: movie });
    
    if (!checkMovie) {
        return res.status(404).send({ status: false, message: "Movie does not exist " });
    }
     
      rating = parseFloat(rating);
      const reviewedMovies = await reviewModel.create(data)
      return res.status(201).send({status:true, message:"Success", data:reviewedMovies})
    }
    catch(error){
        return res.status(500).send({ status:false, message:error.message})
    }
}

module.exports = {reviewMovies};