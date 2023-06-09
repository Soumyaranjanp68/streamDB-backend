const movieModel = require("../model/movieModel");



const createMovie = async function (req,res){
    try{
        let data = req.body
        // console.log(data);
        // console.log(typeof(data.rating));

        let {title,source,genres,price,rating} = data

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Request can't be empty" });
        }
        
        
        if(source.price!=0){
            source.isSubscribed = true;
        }
    //    console.log(source.price);
        const existMovie = await movieModel.findOne({title:title})
        if(existMovie) {
            return res.status(400).send({ status: false, message: "This movie already exists"});
        }
        if(!title){
            return res.status(400).send({ status: false, message: "Title can't be empty" });
        }

        data.title = title.toLowerCase();

        if(genres){
        data.genres = genres.toLowerCase()
        };

        rating = parseFloat(rating);

        const movieDetails = await movieModel.create(data)

            return res.status(201).send({status:true, data:movieDetails})


    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


//====================== GET API ======================


const getMovies = async function(req,res){
    try{
        let data = req.query;
        let { title, genres, rating } = data;
        console.log(req.body);

        if(title){
        data.title = title.toLowerCase()
        };
        if(genres){
        data.genres = genres.toLowerCase()
        };
        
        rating = parseFloat(rating);


        let movieDetails = await movieModel.find(data);

        if (movieDetails.length == 0) {
            return res.status(404).send({ status: false, message: "movie not found " });
        }

        return res.status(200).send({ status: true, message: "Movie List.", data: movieDetails }); 
    }
    catch(error){
        return res.status(500).send({status:false, message: error.message})
    }
}
 





//====================== UPDATE API ======================


const updateMovie = async function(req,res){
    try{
        
      let title = req.params.movie;
      let source = req.body.source
      if(!source){
          return res.status(400).send({ status: false, message: "Request can't be empty" });
      }
       title = title.toLowerCase();
      source = source.toLowerCase();
      
      const checkMovie = await movieModel.findOne({title: title})
      if(!checkMovie){
         return res.status(404).send({ status: false, message: "Movie not found" });
      }
      let sourceArr = checkMovie.source;
      if(sourceArr.includes(source)){
           return res.status(400).send({ status: false, message: "This source already exists"})
        }

        const updatedData = await movieModel.findOneAndUpdate({title: title},{$push:{source:source}},{new:true})
        return res.status(200).send({ status: true, message: "updated successfully",data:updatedData})
  
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {createMovie , getMovies , updateMovie };