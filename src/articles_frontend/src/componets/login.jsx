import React from 'react'
import { useAuth } from './use-auth'

const AuthLoginOut = () => {
  const { isAuthenticated, login, principal, logout } = useAuth()
  return (
    <>
      {isAuthenticated ? (
        <button
        className="border rounded-md p-3"
        onClick={logout}
      >
        Log out
      </button>
      ) : (
        <button
          className="border rounded-md p-3"
          onClick={login}
        >
          Log in
        </button>
      )}
    </>
  )
}

export default AuthLoginOut;