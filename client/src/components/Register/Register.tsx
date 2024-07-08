/* eslint-disable @typescript-eslint/no-unused-vars */
// import {useState} from 'react'
import { Link } from 'react-router-dom'


function Register() {

  return (
    <div className="w-full h-[calc(100vh-75px)] flex justify-center items-center">
        <div className="flex flex-col gap-5 scale-105 mt-[-5rem]">

            <header className="text-2xl font-semibold my-5 flex gap-2 justify-center items-center">
                <img src="logo.png" alt="logo" className="w-[60px] h-[60px] object-contain"/>
                <span>NC Developer</span>
            </header>
            <div>
                <form className="w-[370px] flex flex-col gap-2">
                    <label className="text-md font-semibold">Username</label>
                    <input type="text" className="w-full h-[30px] rounded-lg outline-none px-2 focus:border-2 focus:border-primary"/>
                    <label className="text-md font-semibold">Email</label>
                    <input type="text" className="w-full h-[30px] rounded-lg outline-none px-2
                    focus:border-2 focus:border-primary"/>
                    <label className="text-md font-semibold">Password</label>
                    <input type="text" className="w-full h-[30px] rounded-lg outline-none px-2
                    focus:border-2 focus:border-primary"/>
                    <label className="text-md font-semibold">ConfirmPassword</label>
                    <input type="text" className="w-full h-[30px] rounded-lg outline-none px-2
                    focus:border-2 focus:border-primary"/>
                    <button type="submit" className="w-full h-[35px] bg-primary rounded-lg my-5 duration-300 hover:bg-secondary">
                        Sign Up account
                    </button>
                    <span className="w-full flex justify-center items-center">
                    Do you want to go back to
                    <Link to='/login' className="text-primary cursor-pointer hover:text-secondary duration-300 ml-2">login?</Link>
                    </span>
                </form>
            </div>

        </div>
    </div>
  )
}

export default Register