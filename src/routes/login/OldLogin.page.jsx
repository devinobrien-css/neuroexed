import React, { useState } from 'react';
import Modal from '../../shared/components/modals/Modal';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser,
} from 'firebase/auth';

const ACCESSORS = [-1100094163, 580637913, -1832356757, 182488850];
const ACCESSOR_E = [-573709167, 1079467346, -762918048, -386773661];

function b64(str) {
  return str
    .split('')
    .reduce((prev, cur) => ((prev << 5) - prev + cur.charCodeAt(0)) | 0, 0);
}
function vd(cred) {
  return ACCESSORS.includes(cred);
}
function vde(cred) {
  return ACCESSOR_E.includes(cred);
}

function HandleLogout(setUser) {
  const auth = getAuth();
  const modal = document.querySelector('div.modal-bg');

  signOut(auth)
    .then(() => {
      console.log('signed out');
      setUser('');
    })
    .catch((error) => {
      console.log('error');
      console.log(error);
    });
  modal.click();
}

function HandleLogin(cred, setUser) {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const modal = document.querySelector('div.modal-bg');

  const valid = vd(b64(cred)) ? true : false;

  if (valid) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const valid_user = result.user;

        if (!vde(b64(valid_user.email))) {
          deleteUser(valid_user)
            .then(() => {
              console.log('deleted user');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setUser(valid_user.email);
        }
        modal.click();
      })
      .catch((error) => {});
  } else {
    console.log('incorrect login');
    console.log('attempt recorded');
  }
}

const LoginModal = () => {
  const [input, setInput] = useState('');

  return (
    <div className="w-[90vw] rounded bg-white p-1 lg:w-[60vw] xl:w-[60vw]">
      {'user' !== '' ? (
        <>
          <p className="p-4 text-4xl">Logout</p>
          <div className="flex justify-around p-1">
            <img
              src="./lock.png"
              alt="lock"
              onClick={() => {
                // HandleLogout(setUser);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <p className="p-4 text-4xl">NeuroExed Access</p>
          <div className="flex justify-around p-1">
            <img
              src="./lock.png"
              alt="lock"
              onClick={() => {
                // HandleLogin(input, setUser);
              }}
            />
            <input
              id="input"
              name="input"
              value={input}
              placeholder="..."
              className="my-auto w-4/5 shadow"
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

const Login = () => {
  return (
    <div
      className="fixed bottom-1 right-1 z-[1001] w-12 grayscale"
      onClick={() => Modal(<LoginModal />)}
    >
      <img src="./img/lock.png" alt="lock" />
    </div>
  );
};

export default Login;
