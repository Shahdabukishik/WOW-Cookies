import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'


export default function Login() {
  const [email, setEmail] = useState('')
  const { loginWithEmail, loginWithGoogle, loading } = useAuth()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await loginWithEmail(email)

    if (error) alert(error.message)
    else alert('Check your email ✉️')
  }

  return (
    <div className="container d-flex vh-100 justify-content-center align-items-center">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            Login with Email
          </button>
        </form>

        <hr />

        <button
          className="btn btn-danger w-100"
          onClick={loginWithGoogle}
          disabled={loading}
        >
          Continue with Google
        </button>
      </div>
    </div>
  )
}