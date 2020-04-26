import {createConnectedStore, withLogger} from 'undux';
import * as firebase from 'firebase';

interface State {
  currentUser: firebase.User
}

const initialState: State = {
  currentUser: null,
};

export const Store = createConnectedStore<State>(initialState, withLogger);
