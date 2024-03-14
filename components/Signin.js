/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <div className="sign-in">
        <div className="logo-container">
          <img src="/wplogo.png" alt="Watch Party Logo" className="sign-in-logo" />
        </div>
        <p className="sign-in-text">Sign in with</p>
        <div className="sign-in-btn-container">
          <Button className="sign-in-btn" onClick={signIn}>
            <img src="/google.png" alt="google sign in" className="google-button" />Google
          </Button>
        </div>
      </div>
      <footer className="sign-in-footer">Full-stack Capstone Developed By: Mara Caoile | Github: <Link href="https://github.com/marcelcao">@marcelcao</Link></footer>
    </>
  );
}

export default Signin;
