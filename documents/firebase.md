# 💻 firebase

## 초기 셋팅

1. 설치

```
yarn add firebase
```

2. SDK 추가

- firebaseConfig의 value들은 아래와 같이 `env` 파일에서 관리한다.
- 참고로 env파일은 root 폴더에 생성해야 작동하며, React에서는 REACT_APP이 prefix로 붙어야지 정상 작동한다.

```
REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxxxxxxxxxxxxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxxxxxxxxxxxxxxxx
REACT_APP_PROJECT_ID=xxxxxxxxxxxxxxxxxxxx
REACT_APP_ID=xxxxxxxxxxxxxxxxxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxxxxxxxxxxxxxxxxx
REACT_APP_MEASUREMENT_ID=xxxxxxxxxxxxxxxxxxxx
```

```ts
// firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const analytics = getAnalytics(app);

export { fireStore, analytics };
```

3. firebase 연결 확인

```ts
// index.tsx
import { firebase } from "./firebase";

console.log(firebase);
/*
FirebaseAppImpl {_isDeleted: false, _options: {…}, _config: {…}, _name: '[DEFAULT]', _automaticDataCollectionEnabled: false, …}
*/
```
