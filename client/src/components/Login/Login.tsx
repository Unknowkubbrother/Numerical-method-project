/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react'
import { Link } from 'react-router-dom'


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

   
    const SubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(username, password)
    }
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

  return (
    <div className="w-full h-[calc(100vh-75px)] flex justify-center items-center">
        <div className="flex flex-col gap-5 scale-105">

            <header className="text-2xl font-semibold my-5 flex gap-2 justify-center items-center">
                <img src="logo.png" alt="logo" className="w-[60px] h-[60px] object-contain"/>
                <span>NC Developer</span>
            </header>
            <div>
                <form className="w-[370px] flex flex-col gap-2" onSubmit={SubmitLogin}>
                    <label className="text-md font-semibold">Username</label>
                    <input type="text" className="w-full h-[30px] rounded-lg outline-none px-2 focus:border-2 focus:border-primary" value={username} onInput={handleUsername}/>
                    <label className="text-md font-semibold">Password</label>
                    <input type="text" className="w-full h-[30px] rounded-lg outline-none px-2
                    focus:border-2 focus:border-primary" value={password} onInput={handlePassword}/>
                    <button type="submit" className="w-full h-[35px] bg-primary rounded-lg my-5 duration-300 hover:bg-secondary">
                        Sign in account
                    </button>
                    <span className="w-full flex justify-center items-center">Forgot Password ?</span>
                </form>

                <div className='w-[370px] mt-10 flex gap-5 justify-center items-center'>
                    <button className="flex flex-col justify-center items-center gap-2">
                        <img src="logoOther/google.png" alt="google" className="w-[30px] h-[30px] object-contain"/>
                        <span>Sign in with Google</span>
                    </button>
                    <button className="flex flex-col justify-center items-center gap-2">
                        <img src="logoOther/discord.png" alt="facebook" className="w-[30px] h-[30px] object-contain"/>
                        <span>Sign in with Discord</span>
                    </button>
                </div>
            </div>

            <div className='w-full text-center mt-10'>
                <span className="text-sm">Don't have an account ? <Link to='/register' className="text-primary cursor-pointer hover:text-secondary duration-300">Sign up</Link></span>
            </div>

        </div>
    </div>
  )
}

export default Login