import './styles.scss';
import axios from 'axios';
import { addToLocalStorage, logErrors, hideMenue, logOut } from './services';

logOut();
hideMenue();
// =======================DATA=======================
export const firebaseConfig = {
  apiKey: 'AIzaSyDM4b8GRIsIe7_30Fx8kj3A7uV0dBkEs-o',
  authDomain: 'salletronbase.firebaseapp.com',
  databaseURL: 'https://salletronbase.firebaseio.com',
  projectId: 'salletronbase',
  storageBucket: 'salletronbase.appspot.com',
  messagingSenderId: '555686357871',
  appId: '1:555686357871:web:7845e33c12341a4949969a',
};
//=======================user========================
const user = {
  email: '',
  password: '',
};
export const userLoginHandler = e => (user[e.target.name] = e.target.value);

const resetUserData = e => {
  user.email = '';
  user.password = '';
};
//===========/user==============
{
  // const ifRegistered = async()=>{
  //   try {
  //     const result = await axios.get()
  //   } catch (error) {
  //     logErrors(error)
  //   }
  // }
  // {async function checkUserInFirebase(email) {
  //   return new Promise((resolve) => {
  //       admin.auth().getUserByEmail(email)
  //           .then((user) => {
  //               resolve({ isError: false, doesExist: true, user });
  //           })
  //           .catch((err) => {
  //               resolve({ isError: true, err });
  //           });
  //   });
  // }
  // const rFirebase = await checkUserInFirebase('abc@gmail.com');
  // rFirebase()
  // }
  // export default class Login extends Component {
  //   constructor(props) {
  //       super(props)
  //       this.state = {
  //           email: '',
  //           password: '',
  //           response: ''
  //       }
  //       this.signUp = this.signUp.bind(this)
  //       this.login = this.login.bind(this)
  //   }
  //   async signUp() {
  //       try {
  //           await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  //           this.setState({
  //               response: 'Account Created!'
  //           })
  //           setTimeout(() => {
  //               this.props.navigator.push({
  //                   id: 'App'
  //               })
  //           }, 500)
  //       } catch (error) {
  //           this.setState({
  //               response: error.toString()
  //           })
  //       }
  //   }
  //   async login() {
  //       try {
  //           await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  //           this.setState({
  //               response: 'user login in'
  //           })
  //           setTimeout(() => {
  //               this.props.navigator.push({
  //                   id: 'App'
  //               })
  //           })
  //       } catch (error) {
  //           this.setState({
  //               response: error.toString()
  //           })
  //       }
  //   }
  // render() {
  //     return (
  //         <View style={styles.container}>
  //             <View style={styles.containerInputes}>
  //                 <TextInput
  //                     placeholderTextColor="gray"
  //                     placeholder="Email"
  //                     style={styles.inputText}
  //                     onChangeText={(email) => this.setState({ email })}
  //                 />
  //                 <TextInput
  //                     placeholderTextColor="gray"
  //                     placeholder="Password"
  //                     style={styles.inputText}
  //                     password={true}
  //                     secureTextEntry={true}
  //                     onChangeText={(password) => this.setState({ password })}
  //                 />
  //             </View>
  //             <TouchableHighlight
  //                 onPress={this.login}
  //                 style={[styles.loginButton, styles.button]}
  //             >
  //                 <Text
  //                     style={styles.textButton}
  //                 >Login</Text>
  //             </TouchableHighlight>
  //             <TouchableHighlight
  //                 onPress={this.signUp}
  //                 style={[styles.loginButton, styles.button]}
  //             >
  //                 <Text
  //                     style={styles.textButton}
  //                 >Signup</Text>
  //             </TouchableHighlight>
  //         </View>
  //     )
  // }
  // }
}
//===========API==============
const fetch = async action => {
  const errorPassword = document.querySelector('.errorPassword');
  const errorEmail = document.querySelector('.errorEmail');

  try {
    const result = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${firebaseConfig.apiKey}`,
      { ...user, returnSecureToken: true },
    );
    // console.log(result.data.message);

    const token = result.data.idToken;
    const userID = result.data.localId;
    addToLocalStorage(token, userID);
    hideMenue();
  } catch (error) {
    logErrors(error);
    switch (error.response.data.error.message) {
      case 'INVALID_PASSWORD':
        errorPassword.textContent = 'Wrong password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorEmail.textContent = 'User not found';
        break;
      case 'EMAIL_EXISTS':
        errorEmail.textContent = 'User already exist';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorEmail.textContent =
          'Too many unsuccessful login attempts. Please try again later.';
        break;
  
      default:
        break;
    }
  }

};
//===========/API==============
const submitData = () => {
  fetch('signUp');
  resetUserData();
};
const checkData = () => {
  fetch('signInWithPassword');
  resetUserData();
};

export function submitForm(e) {
  e.preventDefault();
  switch (e.submitter.classList[0]) {
    case 'login':
      checkData();
      break;
    case 'registration':
      submitData();

      break;
  }
}

// ===============================================================

// const authWithEmailAndPassword = async () => {
//   try {
//     const result = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`,
//       { ...user, returnSecureToken: true },
//     );
//     const token = result.data.idToken;
//     const userID = result.data.localId;
//     addToLocalStorage(token, userID);
//     hideMenue();
//     //  (response.status === 200 ) && alert('Registration successfully completed');
//   } catch (error) {
//     logErrors(error);
//   }
// };
// const signInWithPassword = async () => {
//   try {
//     const result = await axios.post(
//       `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
//       { ...user, returnSecureToken: true },
//     );
//     const token = result.data.idToken;
//     const userID = result.data.localId;
//     addToLocalStorage(token, userID);
//     hideMenue();
//   } catch (error) {
//     logErrors(error);
//   }
// };
