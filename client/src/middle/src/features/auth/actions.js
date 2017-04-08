//=== Import Internal ===
import * as Types from './types';
import {ApiUrl, FetchHelper} from '../../services';

//=== ACTIONS TYPES REDUX ===
function loggedIn(auth) {
  return {
    type: Types.LOGGED_IN,
    auth
  };
}

function loggedOut() {
  return {
    type: Types.LOGGED_OUT
  };
}

function logginError(message) {
  return {
    type: Types.LOGGED_ERROR,
    message
  };
}

function rememberChange(remember) {
  return {
    type: Types.REMEMBER_CHANGE,
    remember
  };
}

function userRegister(patient) {
    return {
        type: Types.USER_REGISTER,
        patient
    };
}

function userRegisterFaild(faild) {
    return {
        type: Types.USER_REGISTER_FAILD,
        faild
    };
}

function userRegisterError(error) {
    return {
        type: Types.USER_REGISTER_ERROR,
        error
    };
}
//=== ACTIONS LOGIC ===
function login(params) {
  return (dispatch) => {
    if (params.username === '' || params.username === null || params.password === '' || params.password === null) {
      dispatch(logginError('Login failed wrong password or username'));
      return;
    }

    FetchHelper.postEncode(
        ApiUrl.login,
        undefined,
        params,
        undefined,
        (res) => {
          let auth = {
            id: res.user._id,
            token: res.accessToken,
            remember: params.remember,
            isLogged: true,
            info: res.user
          };

          FetchHelper.token = auth.token;

          if (params.remember !== undefined && params.remember) {
            localStorage.setItem("auth", JSON.stringify(auth));
          }

          dispatch(loggedIn(auth));
        },
        (res) => {
          dispatch(logginError('Login failed wrong password or username'));
        },
        (error) => {
          dispatch(logginError('Server overload! try again'));
        }
    );
  }
}

function register(params) {
  return (dispatch) => {
    if (
      params.fullname === '' || params.fullname === null  
    ) {
      dispatch(logginError('Fullname is required'));
      return;
    }
    if (
      params.username === '' || params.username === null 
    ) {
      dispatch(logginError('Username is required'));
      return;
    }
    if (
      params.password === '' || params.password === null 
    ) {
      dispatch(logginError('Password is required'));
      return;
    }
    if (
      params.password !== params.re_password
    ) {
      dispatch(logginError('Re-password is not equal password'));
      return;
    }


    console.log(params,"params")
    //insert new user
    let mappers = [];
    let url =  ApiUrl.register;

    FetchHelper.postEncode(
        url,
        "POST",
        params,
        mappers,
        (res) => {
            dispatch(userRegister(res));
        },
        (faild) => {
            dispatch(userRegisterFaild(faild));
        },
        (error) => {
            dispatch(userRegisterError(error || null));
        }
    );

   
  }
}

function logout() {
  return (dispatch) => {
    localStorage.removeItem('auth');
    dispatch(loggedOut());
  }
}

export default {
  login,
  register,
  logout,
  rememberChange,
}
