import React, { useState } from 'react'
import { AUTH_TOKEN } from '../constants'
import {useHistory} from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

export default function Login() {
  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

  const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const _saveUserData = token => {
  localStorage.setItem(AUTH_TOKEN, token)
}

  const _confirm = async (data) => {
    const { token } = login ? data.login : data.signup
    console.debug('data login',data.login)
    console.debug('data signup',data.signup)
    _saveUserData(token)
    console.log(login)
    console.log(token)
    
    history.push(`/`)
  }




  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => _confirm(data)}
        >

          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>

        <div
          className="pointer button"
          onClick={() => setLogin(!login)}
        >
          {login
            ? 'need to create an account?'
            : 'already have an account?'}
        </div>
      </div>
    </div>
  )

}

