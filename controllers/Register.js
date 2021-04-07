

function validateEmail(email){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
        return (true)
    }
    return (false)
}

const handleRegister = (req, res, database, bcrypt) => {
    const {email, name, password} = req.body;
    if(!validateEmail(email) || !name || !password) return res.status(404).json("please, give correct credentials");
    const hash = async () => {
        return await bcrypt.hash(password, rounds)    
    }

    database.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],  //array will be returned, thats why  
                    name: name,
                    joined: new Date(),
                })
                .then(user => {
                    res.json(user[0]);
                })     
       })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch( err => console.log("could not register!!"));
};

module.exports = {
    handleRegister: handleRegister
}