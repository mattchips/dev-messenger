import { useState } from "react"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmpassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(false)

    console.log(username);
    console.log(password);

    const handleSubmit = () => {
        console.log('submitted!')
        if (password !== confirmpassword) {
            setError(true)
            return
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <div className="auth-container-from">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && <input
                        type="text"
                        id="password-check"
                        name="password-check"
                        placeholder="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    {error && <p>* Make sure passwords match</p>}
                    <button onClick={handleSubmit}>GO!</button>
                </div>
            </div>
        </div>
    )
}

export default Auth