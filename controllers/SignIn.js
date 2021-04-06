
const handleSignIn = (database, bcrypt) =>(req, res) =>{
    const {email, password} = req.body;
        if(!email || !password) return res.status(404).json("nice try!!");
        database.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(data => {
           const isValid = bcrypt.compareSync(password, data[0].hash);
           if(isValid){
               return database.select('*')
               .from('users')
               .where('email', '=', email)
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(404).json("user not found"))  
           }else{
                res.status(404).json("wrong credentials");
           }
       })
       .catch(err => res.status(404).json("wrong credentials"))
};

module.exports = {
    handleSignIn:handleSignIn
} 