import firebase from 'firebase';

export class AuthService {
  // Equivalent to an HTTP request to REST API
  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    // deletes token
    firebase.auth().signOut();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }
}
