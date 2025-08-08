// Mock Firebase Auth for development without API keys
const mockUser = {
  uid: "mock-user-123",
  email: "demo@backwoods.com",
  displayName: "Demo User",
  photoURL: "https://via.placeholder.com/150"
}

class MockAuth {
  constructor() {
    this.currentUser = mockUser
    this.onAuthStateChangedCallbacks = []
  }

  signInWithPopup(provider) {
    return Promise.resolve({
      user: mockUser,
      credential: null
    })
  }

  signOut() {
    this.currentUser = null
    this.onAuthStateChangedCallbacks.forEach(callback => callback(null))
    return Promise.resolve()
  }

  onAuthStateChanged(callback) {
    this.onAuthStateChangedCallbacks.push(callback)
    // Simulate async auth state
    setTimeout(() => callback(this.currentUser), 100)
    return () => {
      const index = this.onAuthStateChangedCallbacks.indexOf(callback)
      if (index > -1) {
        this.onAuthStateChangedCallbacks.splice(index, 1)
      }
    }
  }
}

class MockGoogleAuthProvider {
  constructor() {
    this.providerId = "google.com"
  }
}

export const authRef = new MockAuth()
export const provider = new MockGoogleAuthProvider()
