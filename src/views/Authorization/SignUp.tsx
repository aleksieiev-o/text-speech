import React, { FC, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../store/hooks';
import { inputChangeHandler } from '../../utils/inputChangeHandler';

const SignUp: FC = (): ReactElement => {
  const { singUpEmailAndPassword } = useStore().authorizationStore;

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submitHandler =  async () => {
    await singUpEmailAndPassword('', '');
  };

  return (
    <div>
      <p>Sign Up</p>

      <form onSubmit={submitHandler}>
        <input value={email} onChange={(e) => inputChangeHandler(e, setEmail)} name={'email'} type="email" autoFocus/>
        <input value={password} onChange={(e) => inputChangeHandler(e, setPassword)} name={'password'} type="password"/>

        <p>{`I already have an account.`}</p>
        <Link to={'sign-in'}>Sign In</Link>

        <button type={'submit'}>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
