import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import {environment} from '../environments/environment'

const poolData = {
  UserPoolId:  environment.userPoolId, // Your user pool id here
  ClientId: environment.clientId // Your client id here  
};

const userPool = new CognitoUserPool(poolData);

@Injectable()
export class AuthorizationService {
  cognitoUser: any;

  constructor() { }

  register(userName, email, password) {

    const attributeList = [];
    const emailId = {
      Name: "email",
      Value: email
    }

    let attributeEmail = new CognitoUserAttribute(emailId);
    attributeList.push(attributeEmail);

    return Observable.create(observer => {
      userPool.signUp(userName, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }
        this.cognitoUser = result.user;
        console.log("signUp success", result);
        observer.next(result);
        observer.complete();
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username: this.cognitoUser.username,
      Pool: userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) {

    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

          //console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          Swal("", err.message, "error")

        }
      });
    });
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }

  resetPassword(email) {
    const user = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(user);
    return Observable.create(observer => {

      cognitoUser.forgotPassword({
        onSuccess: function (result) {

          console.log('call result: ' + JSON.stringify(result));
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          Swal(err.message)
          observer.error(err);
        }

      });
    });
  }

  confirmPassword(verificationCode, email, newPassword, data): Promise<any> {
    const user = {
      Username: email,
      Pool: userPool
    };

    console.log(email);
    const cognitoUser = new CognitoUser(user);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess: function () {
          Swal("", "Your Password changed sucessfully!!", "success");
          resolve();
        },
        onFailure: function (err) {
          Swal("",err.message,"error");
          reject(err);
        }
      });

    });

  }
}