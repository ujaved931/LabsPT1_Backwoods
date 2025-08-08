import config from "./config"

// Mock database connection for development
export const connect = () => {
  console.log("MOCK DB CONNECTED")
  console.log(`Mock connection with config ${config.db.url}`)
  
  // Mock mongoose for development - this allows the server to start without MongoDB
  if (config.db.url.startsWith('mock://')) {
    // Create a mock mongoose object structure
    global.mongoose = {
      Schema: class MockSchema {
        constructor(definition) {
          this.definition = definition
          this.methods = {}
        }
        pre() { return this }
      },
      model: (name, schema) => {
        // Return a mock model class
        return class MockModel {
          constructor(data) {
            Object.assign(this, data)
            this._id = Date.now().toString()
          }
          
          save() {
            return Promise.resolve(this)
          }
          
          static find() {
            return Promise.resolve([])
          }
          
          static findOne() {
            return Promise.resolve(null)
          }
          
          static findOneAndUpdate() {
            return Promise.resolve({})
          }
          
          static findByIdAndUpdate() {
            return Promise.resolve({})
          }
          
          static findOneAndDelete() {
            return Promise.resolve({})
          }
          
          static deleteMany() {
            return Promise.resolve({})
          }
          
          static populate() {
            return {
              exec: () => Promise.resolve({})
            }
          }
        }
      },
      Promise: global.Promise
    }
    
    return Promise.resolve()
  }
  
  // Original mongoose connection for production
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise
  
  return mongoose
    .connect(
      config.db.url,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("MONGO DB CONNECTED")
    })
    .catch(err => {
      console.log(err)
      console.log(`Connection failed with config ${config.db.url}`)
    })
}
