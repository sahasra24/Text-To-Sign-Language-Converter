const router = require('express').Router();

const User = require("../models/user");

router.post('/signUp', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        })
    
        await newUser.save();
        res.send({success: true})
    } catch (error){
        console.log(error);
        res.send({success: true})
    }

})

router.get('/signIn/:username', async (req, res) => {
    try {
        const docs = await User.find({username: req.params.username}).exec()
        res.send(docs);
    } catch (error) {
        console.log('Error in signIn route')
        console.log(error);
    }

})

module.exports = router;