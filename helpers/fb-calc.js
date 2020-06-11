import * as firebase from 'firebase';
import 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initRecordDB()
{
firebase.initializeApp(firebaseConfig);
}

export function storeRecordItem(item) {
firebase.database().ref('recordData/').push(item);
}

export function updateRecord(item) {
const key = item.id;
delete item.id;
firebase.database().ref(`recordData/${key}`).set(item);
}

export function deleteRecord(item) {
firebase.database().ref(`recordData/${item.id}`).remove();
}

export function setupRecordListener(updateFunc) {
//console.log('setupRecordListener called');
firebase
.database()
.ref('recordData/')
.on('value', (snapshot) => {
  //console.log('setupRecordListener fires up with: ', snapshot);
  if (snapshot?.val()) {
    const fbObject = snapshot.val();
    const newArr = [];
    Object.keys(fbObject).map((key, index) => {
      //console.log(key, '||', index, '||', fbObject[key]);
      newArr.push({ ...fbObject[key], id: key });
    });
    updateFunc(newArr);
  } else {
    updateFunc([]);
  }
});
} 