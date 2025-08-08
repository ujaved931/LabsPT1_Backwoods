import config from "./config"

// Mock database connection for development
export const connect = () => {
  console.log("MOCK DB CONNECTED")
  console.log(`Mock connection with config ${config.db.url}`)
  
  // Mock mongoose for development - this allows the server to start without MongoDB
  if (config.db.url.startsWith('mock://')) {
    // Create mock users store
    const mockUsers = [
      {
        _id: "demo-user-123",
        email: "demo@backwoods.com",
        password: "$2a$10$N9qo8uLOickgx2ZMRZoMye1/LZcPOyHjgqrZHOTqpGqGYwPnzCKjO", // "demo123" hashed
        displayName: "Demo User",
        lastLogin: new Date(),
        loginCount: 1,
        subscribed: false,
        trips: [],
        type: "email",
        createdAt: new Date(),
        updatedAt: new Date(),
        // Mock bcrypt comparison method
        comparePassword: function(candidatePassword, cb) {
          // For demo purposes, accept "demo123" as password
          const isMatch = candidatePassword === "demo123"
          cb(null, isMatch)
        }
      }
    ]

    // Create a mock mongoose object structure
    global.mongoose = {
      Schema: class MockSchema {
        constructor(definition) {
          this.definition = definition
          this.methods = {}
        }
        pre() { return this }
        set() { return this }
      },
      model: (name, schema) => {
        if (name === 'User') {
          // Return specific mock for User model
          return class MockUserModel {
            constructor(data) {
              Object.assign(this, data)
              this._id = Date.now().toString()
              this.comparePassword = function(candidatePassword, cb) {
                const isMatch = candidatePassword === "demo123"
                cb(null, isMatch)
              }
            }
            
            save() {
              return Promise.resolve(this)
            }
            
            static findOne(query) {
              if (query && query.email) {
                const user = mockUsers.find(u => u.email === query.email)
                return Promise.resolve(user || null)
              }
              return Promise.resolve(null)
            }
            
            static findOneAndUpdate(query, update, options) {
              if (query && query.email) {
                const user = mockUsers.find(u => u.email === query.email)
                if (user) {
                  // Update lastLogin and loginCount for demo purposes
                  const updatedUser = Object.assign({}, user, update)
                  if (update.$inc && update.$inc.loginCount) {
                    updatedUser.loginCount = (user.loginCount || 0) + 1
                  }
                  return {
                    populate: () => ({
                      exec: () => Promise.resolve(updatedUser)
                    })
                  }
                }
              }
              return {
                populate: () => ({
                  exec: () => Promise.resolve(null)
                })
              }
            }
            
            static find() {
              return Promise.resolve([])
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
        }
        
        // Return generic mock model for other models
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
      Promise: global.Promise,
      set: () => {},
      Types: {
        ObjectId: String
      }
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
