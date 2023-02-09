# 💻 firebase

- [FireBase API 문서](https://firebase.google.com/docs/auth/web/firebaseui?hl=ko)

<br />

## 초기 셋팅

### 1. 설치 (v9)

```
yarn add firebase
```

### 2. SDK 추가

- firebaseConfig의 value들은 아래와 같이 `env` 파일에서 관리한다.
- 참고로 env파일은 `root` 폴더에 생성해야 작동하며, React에서는 `REACT_APP_*` 형태로 작성해야 정상 작동한다.
- 환경변수는 보안 정보기 때문에 github에 올라가는 것을 방지하기 위해 `.gitignore`에다 `.env`를 추가해야한다.

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

### 3. firebase 연결 확인

```tsx
// index.tsx
// ...
import { firebase, analytics } from "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log(firebase);
/*
FirebaseAppImpl {_isDeleted: false, _options: {…}, _config: {…}, _name: '[DEFAULT]', _automaticDataCollectionEnabled: false, …}
*/

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
```

<br />

## 암호 기반 계정 만들기(v9)

```js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
```

<br />

```
Uncaught (in promise) FirebaseError: Firebase: Error (auth/configuration-not-found)
```

- 이대로만 바로 유저생성을 하려고하면 다음과 같은 에러가 발생한다.

![스크린샷 2023-02-09 오후 10 21 55](https://user-images.githubusercontent.com/64779472/217824297-d62560d9-8658-4d8b-be2a-66db444e8621.png)

- 위와 같은 에러가 발생하면 firebase 페이지에 들어가서 Authentication에서 인증 방식에 대해서 추가해줘야한다. 아래와 같이 이메일/비밀번호를 추가한다.

<br />

![스크린샷 2023-02-09 오후 10 25 17](https://user-images.githubusercontent.com/64779472/217825052-ebcbf031-01a4-4f2b-b97f-c9655c355b14.png)

- 앞에 말한 셋팅 후에 유저 생성을해보면 다음과 같이 유저가 생성된 것을 확인할 수 있다.

<br />
