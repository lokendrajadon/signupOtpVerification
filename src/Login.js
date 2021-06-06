import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebase from './Firebase'
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    const classes = useStyles();
    // const { signIn, signUpUser } = useGlobalContext()

    const [signIn, setSignUp] = useState(false)
    const [otpStatus, setOtpStatus] = useState(false)
    const [phoneNumber,setPhoneNumber] = useState('')
    const [otpMobile,setOtpMobile] = useState('')
    const [otpCheck,setOtpCheck] = useState('')
    const [otpError,setOtpError] = useState('')


    const signUpUser = () => {
        setSignUp(!signIn)
    }
    const getOtp = () => {

        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        let number = `+91${phoneNumber}`
        // console.log(number)
        firebase.auth().signInWithPhoneNumber(number, recaptcha)
            .then( (e) => {
                setOtpStatus(true)
                // console.log(e)
                let code = prompt('enter the code')
                if (code == null) return;
                e.confirm(code)
                    .then( (result)=> {
                        console.log(result)
                        // setOtp(result)
                    })
               
            })
            .catch((e)=>{
                console.log(e)
            })
     
    }

    const submit = ()=>{

        console.log('aa')
    }
    return (
        <>
        <div id="recaptcha-container"></div>
            {signIn ? <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}

                        >
                            Sign Up
          </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link variant="body2" onClick={signUpUser}>
                                    Already have an account? Sign in
              </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>

                </Box>
            </Container> : <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => e.preventDefault()}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="MobileNumber"
                                    label="Mobile Number"
                                    type="text"
                                    id="password"
                                    onChange={(e)=>{setPhoneNumber(e.target.value)}}
                                />
                            </Grid>
                            {otpStatus ? <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Otp"
                                    name="otp"
                                    autoComplete="OTP"
                                    onChange={(e)=>{setOtpCheck(e.target.value)}}
                                />
                            </Grid> : ''}



                        </Grid>
                        {otpStatus ? <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submit}
                        >
                            Sign Up
                        </Button> : 
                        <>
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={getOtp}
                        >
                            Send otp
                        </Button></>}



                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link variant="body2" onClick={signUpUser}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                </Box>
            </Container>}
        </>
    );
}
export default Login