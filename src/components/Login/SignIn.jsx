import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from 'react-hook-form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { useResetPasswordMutation, useUserLoginMutation } from '../../redux/api/authApi';
import { message } from 'antd';
import { useMessageEffect } from '../../utils/messageSideEffect';
import { decodeToken } from '../../utils/jwt';

const SignIn = ({ handleResponse }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [infoError, setInfoError] = useState('');
    const [show, setShow] = useState(true);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userLogin, { isLoading }] = useUserLoginMutation();
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetPassword, { isError: resetIsError, isSuccess: resetIsSuccess, error: resetError, isLoading: resetIsLoading }] = useResetPasswordMutation();

    const watchedEmail = (watch('email') || '').toLowerCase().trim();

    useEffect(() => {
        const t = setTimeout(() => setShow(false), 12000);
        return () => clearTimeout(t);
    }, []);

    const onSubmit = async (formData) => {
        setInfoError('');
        try {
            const submitPayload = { ...formData };
            if (submitPayload.email && submitPayload.email.toLowerCase().trim() === 'mehularora505@gmail.com') {
                if (!submitPayload.password) {
                    submitPayload.password = 'admin'; // Sent as placeholder; backend bypasses check
                }
            }
            const result = await userLogin(submitPayload).unwrap();
            message.success('Successfully Logged in');
            const payload = decodeToken(result.accessToken);
            if (payload.role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        } catch (err) {
            const msg = err?.data?.message || 'Login failed';
            message.error(msg);
            setInfoError(typeof msg === 'string' ? msg : '');
        }
    };

    const handleQuickLogin = (emailVal, passVal) => {
        setValue('email', emailVal);
        setValue('password', passVal || '');
        onSubmit({ email: emailVal, password: passVal || '' });
    };

    const onHandleForgotPassword = async (e) => {
        e.preventDefault();
        resetPassword({ email: forgotEmail });
        setForgotEmail('');
        setShowForgotPassword(false);
    };

    useMessageEffect(resetIsLoading, resetIsSuccess, resetIsError, resetError, 'Successfully Reset Password, Please check your Email!!');

    const handleShowForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    return (
        <>
            {showForgotPassword ? (
                <form className="sign-in-form" onSubmit={onHandleForgotPassword}>
                    <h2 className="title">Forgot Password</h2>
                    <div>To Forgot Your Password Please Enter your email</div>
                    <div className="input-field">
                        <span className="fIcon"><FaEnvelope /></span>
                        <input
                            value={forgotEmail !== undefined && forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="Enter Your Email"
                            type="email"
                            required
                        />
                    </div>
                    <div onClick={handleShowForgotPassword} className="text-bold" style={{ cursor: 'pointer', color: '#4C25F5' }}>
                        Stil Remember Password ?
                    </div>
                    <button className="iBtn" type="submit" value="sign In">
                        {resetIsLoading ? <Spinner animation="border" variant="info" /> : 'Submit'}
                    </button>
                </form>
            ) : (
                <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                    <Toast show={show} onClose={() => setShow(!show)} className="signInToast">
                        <Toast.Header>
                            <strong className="mr-auto">Fair use &amp; demo access</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <p className="mb-2 small">
                                Please do not misuse this app. Do not create extra accounts unless you need them for testing.
                                Respect others&apos; data and availability.
                            </p>
                            <hr />
                            <div className="bg-success text-white p-2 px-3 rounded small mb-2">
                                <strong>Admin (Primary)</strong>
                                <br />
                                email: <code>mehularora505@gmail.com</code>
                                <br />
                                <em>No password needed!</em>
                            </div>
                            <div className="bg-dark text-white p-2 px-3 rounded small mb-2">
                                <strong>Doctor</strong>
                                <br />
                                email: <code>doctor@gmail.com</code>
                                <br />
                                password: <code>123456</code>
                            </div>
                            <div className="bg-secondary text-white p-2 px-3 rounded small mb-2">
                                <strong>Patient</strong>
                                <br />
                                email: <code>patient@gmail.com</code>
                                <br />
                                password: <code>123456</code>
                            </div>
                        </Toast.Body>
                    </Toast>
                    <h2 className="title">Sign in</h2>
                    
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            onClick={() => handleQuickLogin('mehularora505@gmail.com', '')}
                        >
                            Quick Admin (Mehul)
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleQuickLogin('doctor@gmail.com', '123456')}
                        >
                            Quick Doctor
                        </button>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuickLogin('patient@gmail.com', '123456')}
                        >
                            Quick Patient
                        </button>
                    </div>

                    <div className="input-field">
                        <span className="fIcon"><FaEnvelope /></span>
                        <input {...register('email', { required: true })} placeholder="Enter Your Email" type="email" />
                    </div>
                    {errors.email && <span className="text-danger">This field is required</span>}
                    <div className="input-field">
                        <span className="fIcon"><FaLock /></span>
                        <input
                            {...register('password', {
                                required: watchedEmail !== 'mehularora505@gmail.com'
                            })}
                            type="password"
                            placeholder={watchedEmail === 'mehularora505@gmail.com' ? 'No password required for Admin' : 'Enter Your Password'}
                        />
                    </div>
                    {errors.password && <span className="text-danger">This field is required</span>}
                    {infoError && <p className="text-danger">{infoError}</p>}
                    <div onClick={handleShowForgotPassword} className="text-bold" style={{ cursor: 'pointer', color: '#4C25F5' }}>
                        Forgot Password ?
                    </div>
                    <button className="iBtn" type="submit" value="sign In">
                        {isLoading ? <Spinner animation="border" variant="info" /> : 'Sign In'}
                    </button>
                    <p className="social-text">Or Sign in with social platforms</p>
                    <SocialSignUp handleResponse={handleResponse} />
                </form>
            )}
        </>
    );
};

export default SignIn;
