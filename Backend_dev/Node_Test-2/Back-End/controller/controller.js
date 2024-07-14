const Review=require('../models/review')


module.exports.getReview=(req,res,next)=>{
    const search=req.params.search;

    Review.findAll({
        where: {
            name: search
        }
    })
    .then(reviews => {
        if (reviews.length > 0) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ message: 'No reviews found with the given name' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    });
    
}
module.exports.postReview=(req,res,next)=>{

    const {name,pros,cons,rating}=req.body;
    const review={
        name:name,
        pros:pros,
        cons:cons,
        rating:rating
    }

    Review.create(review)
    .then(r=>{
        res.status(201).json({review});
    })
    .catch(e=>console.log(e))
}