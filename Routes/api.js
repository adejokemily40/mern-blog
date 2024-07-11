
import express from 'express';
import Post from '../models/Post.js'   // load post model

const router = express.Router();

// GET post all the post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
         res.status(201).json(posts)

    }catch(err) { 
        res.status(404).json({ message: err.message});
    }
});

//GET a specific post by id
router.get('/:id', async (req, res)  => {
    try{
    const postBlog= await Post.findById(req.params.id)
    res.status(201).json(postBlog)
}catch(err){ 
    res.status(404).json({message: err.message});
}
});

//POST add and save
router.post('/', async (req, res) => {
    //create a new post
   const user = new Post({ 
    title: req.body.title,
    content: req.body.content,
    author: req.body.author, 
 
})
   // save the post into the DB
  try{
    const newUser = await user.save()
    res. status(201).json(newUser);
}
    catch(err){
    res.status(404).json({ message: err.message});

}
});
//Delete Post
router.delete('/:id', async(req, res)  =>{

    try{
    const removePost = await Post.findByIdAndDelete({_id:req.params.id})
    res.status(201).json(removePost)
    }catch(err) {
        res.status(404).json({message: err.message})
    } 
});
// Update a Post
router.patch('/:id', async(req, res)  =>{
    const updates = req.body
    try{
    const updatePost = await Post.updateOne({_id:req.params.id}, 
        { $set: updates }
        );
    res.status(201).json(updatePost)
    }catch(err) {
        res.status(404).json({message: err.message})
    } 
});


export default router;