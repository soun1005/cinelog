import { useSignup } from '../hooks/useSignup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const usernameRules = /^[a-zA-Z0-9]{1,15}$/;
const nameRules = /^[A-Za-z]+$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const schema = yup
  .object({
    email: string().required('Required').email('This is not a validate email'),
    password: string().required('Required').matches(passwordRules, {
      message:
        'Min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.',
    }),
    // confirmPassword: string()
    //   .oneOf([yup.ref('password'), null], 'Passwords must match')
    //   .required('Required'),
    username: string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(usernameRules, { message: 'Incorrect form of username!' }),
    firstname: string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(nameRules, { message: 'Name should only contain alphabets' }),
    lastname: string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(nameRules, { message: 'Name should only contain alphabets' }),
  })
  .required();

const Signup = () => {
  // React hook form
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { signup, error, isLoading } = useSignup();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   await signup(email, password, username, firstname, lastname);
  //   // console.log(email, password);
  // };

  const onSubmit = async (data) => {
    await signup(data);
    console.log('data:', data);
  };

  return (
    <div className="singup__container">
      <div className="form-container">
        <h2 className="form-title">Sign up</h2>

        <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              {...register('email')}
              // onChange={(e) => setEmail(e.target.value)}
              // value={email}
            />
          </div>
          <div className="error">
            {formState.errors.email?.message !== undefined
              ? `${formState.errors.email?.message}`
              : ''}
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              {...register('password')}
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
            />
          </div>
          <div className="error">
            {formState.errors.password?.message !== undefined
              ? `${formState.errors.password?.message}`
              : ''}
          </div>

          {/* <div>
            <label className="form-label">Confirm password</label>
            <input
              className="form-input"
              type="password"
              {...register('confirmpw')}
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
            />
          </div>
          {formState.errors.confirmpw?.message !== undefined
            ? `${formState.errors.confirmpw?.message}`
            : ''} */}

          <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              {...register('username')}
              // onChange={(e) => setUsername(e.target.value)}
              // value={username}
            />
          </div>
          <div>
            <div className="error">
              {formState.errors.username?.message !== undefined
                ? `${formState.errors.username?.message}`
                : ''}
            </div>

            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-input"
              {...register('firstname')}
              // onChange={(e) => setFirstname(e.target.value)}
              // value={firstname}
            />
          </div>
          <div className="error">
            {formState.errors.firstname?.message !== undefined
              ? `${formState.errors.firstname?.message}`
              : ''}
          </div>

          <div>
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-input"
              {...register('lastname')}
              // onChange={(e) => setLastname(e.target.value)}
              // value={lastname}
            />
          </div>
          <div className="error">
            {formState.errors.lastname?.message !== undefined
              ? `${formState.errors.lastname?.message}`
              : ''}
          </div>

          <button disabled={isLoading} className="form-btn btnStyle basicBtn">
            <span>Sign up</span>
          </button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
