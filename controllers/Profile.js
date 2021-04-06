const handleProfile = (req, res, database) => {
    const { id } = req.params;
    database.select('*').from('users').where({
        id:id
    })
    .then(user => {
        if(user.length){
            res.json(user);
        }else{
            res.status(404).json("Sorry, no profiles found");
        }
    })
    .catch(err => console.log("Bad Submission! "));
};

module.exports = {
    handleProfile:handleProfile
}