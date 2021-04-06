const Clarifai = require('clarifai');

/**
* Api Key
* */
const app = new Clarifai.App({
    apiKey:'b11e90c19d67426e86ce298ea968f69e'
});
 
const handleApiCall = (req, res) => {
    console.log("input " + req.body.input);
    //
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(err => res.status(400).json("Api call failed"))
}  
    

const handleEntries = (req, res, database) => {
    const {id} = req.body;
    database('users').where({
        id: id
    })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries);
    })
    .catch(err => console.log("No image submitted!"));
};

module.exports = {
    handleEntries:handleEntries,
    handleApiCall:handleApiCall
}