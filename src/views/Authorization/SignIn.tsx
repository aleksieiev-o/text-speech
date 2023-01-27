import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthorizationStore } from '../../store/hooks';
import { inputChangeHandler } from '../../utils/inputChangeHandler';
import { observer } from 'mobx-react-lite';
import { ProtectedRoutes } from '../../Router/ProtectedRouter';
import { PublicRoutes } from '../../Router/PublicRouter';

const SignIn: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await authorizationStore.signInEmailPassword(email, password);
      navigate(ProtectedRoutes.COLLECTIONS);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div>
      <p>Sign In</p>

      <form onSubmit={(e) => submitHandler(e)}>
        <input value={email} onChange={(e) => inputChangeHandler(e, setEmail)} name={'email'} type="email" autoFocus/>
        <input value={password} onChange={(e) => inputChangeHandler(e, setPassword)} name={'password'} type="password"/>

        <p>{`I don't have an account.`}</p>
        <Link to={PublicRoutes.SIGN_UP}>Sign Up</Link>

        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
});

export default SignIn;
