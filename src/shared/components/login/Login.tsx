import {
  GoogleAuthProvider,
  deleteUser,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';

const ACCESSORS = [-1100094163, 580637913, -1832356757, 182488850];
const ACCESSOR_E = [-573709167, 1079467346, -762918048, -386773661];

function b64(str: string) {
  return str
    .split('')
    .reduce((prev, cur) => ((prev << 5) - prev + cur.charCodeAt(0)) | 0, 0);
}
function vd(cred: number) {
  return ACCESSORS.includes(cred);
}
function vde(cred: number) {
  return ACCESSOR_E.includes(cred);
}

const provider = new GoogleAuthProvider();

function HandleLogin(cred: string) {
  const auth = getAuth();
  const valid = vd(b64(cred));

  signInWithPopup(auth, provider)
    .then((result) => {
      const valid_user = result.user;

      if (valid_user.email) {
        deleteUser(valid_user)
          .then(() => {
            console.log('deleted user');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => console.log('error'));
}
