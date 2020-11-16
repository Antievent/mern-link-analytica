import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const  [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error)
        clearError()

    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Wellcome</h1>
                <h5>Login: test@ukr.net, Password: 123456 </h5>
                <div className="card blue-grey darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field input-field-custom">
                                <input
                                    placeholder="Input email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field input-field-custom">
                                <input
                                    placeholder="Input password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="waves-effect waves-light btn m-r-10"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Log in
                        </button>

                        <button
                            className="waves-effect waves-light indigo darken-2 btn"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}