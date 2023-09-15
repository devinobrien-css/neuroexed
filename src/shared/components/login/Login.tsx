import {
  GoogleAuthProvider,
  deleteUser,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';

const provider = new GoogleAuthProvider();

function HandleLogin() {
  const auth = getAuth();

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
