import './Login.css'
import { useContext } from 'react';
import {auth, provider} from './firebase/firebaseConfig';
import { GlobalContext } from './context/GlobalState'; 

const Login = () => {
    

    const { updateUser } = useContext(GlobalContext);

    

    const   signInHandler = () => {

        auth
        .signInWithPopup(provider)
        .then(result => {
            updateUser(result.user);
        })
        .catch((error)=>{
            return alert(error.message)
        })

    }


    return(

        <div className="login">
            <div className="login__modal">
                    <img className="main__img" src="https://firebasestorage.googleapis.com/v0/b/chat-app-clone-a1526.appspot.com/o/5172661.jpg?alt=media&token=55829db9-9d97-44a0-84e0-9d1ec6ff687c" alt=""/>  
                <div className="right__side">
                 <h3>Sign in With Google</h3>
                 <button
                    onClick={signInHandler}
                 >
                    <img alt="No" src="//upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/160px-Google_%22G%22_Logo.svg.png" ></img>
                 </button>
                </div>
            </div>
           
        </div>
    );
}

export default Login;