const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hgetall(user.username,(err,res) => {
      if(err) return callback (err,null)
      if(!res) {
        db.hmset(user.username, userObj, (err, res) => {
          if (err) return callback(err, null)
          callback(null, res) // Return callback
        })
      } else {
        callback(new Error("User already exist"), null)
      }
    })
  },
  get: (username, callback) => {
    db.hgetall(user.username,userObj,(err, res) => {
      if (err) return callback(err, null)
      if (!res) return callback(new Error("User does not exist"), null)
      else {
        return user.firstname +" "+ user.lastname
      }
    })
  }
}
