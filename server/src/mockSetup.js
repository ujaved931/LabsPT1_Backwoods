import config from "./config"

// Set up mock mongoose before any models are imported
if (config.db.url.startsWith('mock://')) {
  console.log("Setting up mock mongoose...")
  
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
        // For demo purposes, accept "demo123456" as password
        const isMatch = candidatePassword === "demo123456"
        cb(null, isMatch)
      }
    }
  ]

  // Create a mock mongoose object structure
  const MockSchema = class MockSchema {
    constructor(definition) {
      this.definition = definition
      this.methods = {}
    }
    pre() { return this }
    set() { return this }
  }
  
  // Add static Types property to the Schema
  MockSchema.Types = {
    ObjectId: String
  }
  
  const mockMongoose = {
    Schema: MockSchema,
    model: (name, schema) => {
      if (name === 'User') {
        // Return specific mock for User model
        return class MockUserModel {
          constructor(data) {
            Object.assign(this, data)
            this._id = Date.now().toString()
            this.comparePassword = function(candidatePassword, cb) {
              const isMatch = candidatePassword === "demo123456"
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
  
  // Override the mongoose module
  require.cache[require.resolve('mongoose')] = {
    exports: mockMongoose
  }
  
  // Also set it on global for our db.js to use
  global.mongoose = mockMongoose
}