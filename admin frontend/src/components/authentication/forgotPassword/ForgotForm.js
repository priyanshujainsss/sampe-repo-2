import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';

// ----------------------------------------------------------------------

export default function ForgotForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState('');
  const [otp, setotp] = useState('');
  const [password, setpassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [emailerror, setemailerror] = useState(false);
  const [otperror, setotperror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [cpassworderror, setcpassworderror] = useState('');
  const [showEmail, setshowEmail] = useState(true);
  const [showotp, setshowotp] = useState(false);
  const [showpasswordfield, setshowpasswordfield] = useState(false);
  const ForgotSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: ForgotSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleForgotEmail = async () => {
    if (!email) {
      return setemailerror(true);
    }
    console.log(email);
    setemailerror(false);
    setshowEmail(false);
    setshowotp(true);
    setshowpasswordfield(false);
    const res = await axios.post('http://localhost:4000/forgot', { email });
    console.log('response from forgot email', res);
  };

  const handelForgotOTP = async (e) => {
    e.preventDefault();
    setshowEmail(false);
    if (!otp) {
      return setotperror('Please Enter a OTP');
    }

    const res = await axios.post('http://localhost:4000/forgotOTP', { email, otp });
    console.log('response from forgot otp', res);
    if (res.data.status === 200) {
      setotperror('');
      setshowotp(false);
      setshowpasswordfield(true);
    } else {
      setotperror('Please Enter valid OTP');
    }
  };
  const handleUpdatePAssword = async (e) => {
    e.preventDefault();
    if (!password || !cpassword) {
      if (!password && !cpassword)
        return (
          setpassworderror('Please Enter a password'),
          setcpassworderror('Please Enter a confirm password')
        );

      if (!password) return setpassworderror('Please Enter a password');

      if (!cpassword) return setcpassworderror('Please Enter a confirm password');
    } else if (password !== cpassword) return setcpassworderror('Confirm Password not matched');
    else {
      const res = await axios.post('http://localhost:4000/resetpass', {
        email,
        password,
        cpassword
      });
      console.log('response from reset password', res);
      if (res.data.status === 200) {
        setshowEmail(false);
        setshowotp(false);
        setshowpasswordfield(false);
        window.location.replace('/login');
      } else {
        alert('Failed to reset password');
      }
    }
  };

  return (
    <FormikProvider value={formik}>
      {showEmail && (
        <Form autoComplete="off" noValidate onSubmit={handleForgotEmail}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              type="email"
              label="Email address"
              required="true"
              // {...getFieldProps('email')}
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            {emailerror && (
              <p style={{ color: 'red', fontSize: '12px' }}>Please Enter Valid Email Address</p>
            )}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Send OTP
            </LoadingButton>
          </Stack>
        </Form>
      )}

      {showotp && (
        <Form autoComplete="off" noValidate onSubmit={handelForgotOTP}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="Email OTP"
              // {...getFieldProps('email')}
              value={otp}
              onChange={(e) => setotp(e.target.value)}
            />
            {otperror && <p style={{ color: 'red', fontSize: '12px' }}>{otperror}</p>}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Verify OTP
            </LoadingButton>
          </Stack>
        </Form>
      )}

      {showpasswordfield && (
        <Form autoComplete="off" noValidate onSubmit={handleUpdatePAssword}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Enter New Password"
              // {...getFieldProps('password')}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              // error={Boolean(touched.password && errors.password)}
              // helperText={touched.password && errors.password}
            />
            {passworderror && <p style={{ fontSize: '16px', color: 'red' }}> {passworderror} </p>}
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Confirm New Password"
              // {...getFieldProps('password')}
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {cpassworderror && <p style={{ fontSize: '16px', color: 'red' }}> {cpassworderror} </p>}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Update Password
            </LoadingButton>
          </Stack>
        </Form>
      )}
    </FormikProvider>
  );
}
