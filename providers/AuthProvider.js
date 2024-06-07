import React,{ createContext, useState  } from "react"


const AuthContext = createContext({})

function AuthProvider({children}){
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  async function login(username, password){
    const _user = await authService(username, password)
    if (_user.ok)
      setUser(_user.data)
    
  }
  return (
    <AuthContext.Provider value={{user, loading, login}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}