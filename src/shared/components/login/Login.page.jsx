import React, { useState } from "react";
import Modal from "../modals/modal";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  deleteUser,
} from "firebase/auth";

const ACCESSORS = [-1100094163, 580637913, -1832356757, 182488850];
const ACCESSOR_E = [-573709167, 1079467346, -762918048, -386773661];

function b64(str) {
  return str
    .split("")
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
  const modal = document.querySelector("div.modal-bg");

  signOut(auth)
    .then(() => {
      console.log("signed out");
      setUser("");
    })
    .catch((error) => {
      console.log("error");
      console.log(error);
    });
  modal.click();
}

function HandleLogin(cred, setUser) {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const modal = document.querySelector("div.modal-bg");

  const valid = vd(b64(cred)) ? true : false;

  if (valid) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const valid_user = result.user;

        if (!vde(b64(valid_user.email))) {
          deleteUser(valid_user)
            .then(() => {
              console.log("deleted user");
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
    console.log("incorrect login");
    console.log("attempt recorded");
  }
}

const LoginModal = () => {
  const [input, setInput] = useState("");

  return (
    <div className="bg-white p-1 rounded xl:w-[60vw] lg:w-[60vw] w-[90vw]">
      {"user" !== "" ? (
        <>
          <p className="text-4xl p-4">Logout</p>
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
          <p className="text-4xl p-4">NeuroExed Access</p>
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
              className="w-4/5 shadow my-auto"
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
      className="fixed bottom-1 right-1 z-[1001] grayscale w-12"
      onClick={() => Modal(<LoginModal />)}
    >
      <img src="./img/lock.png" alt="lock" />
    </div>
  );
};

export default Login;
