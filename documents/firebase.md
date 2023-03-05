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
const firebase = initializeApp(firebaseConfig);

export { firebase };
```

### 3. firebase 연결 확인

```tsx
// index.tsx
// ...
import { firebase } from "./firebase.config";

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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // (*)
import { firebase } from "../firebase.config";

const auth = getAuth(firebase);

try {
  // Signed in
  const { user } = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
} catch (err) {
  const errorCode = error.code;
  const errorMessage = error.message;
  //...
}
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

## 생성한 유저에 상세 정보 추가하기 (v9)

```js
// RegisterPage.tsx
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile, // (*)
} from "firebase/auth";
import { firebase } from "../firebase.config"; // (*)

const onSubmit = handleSubmit(async (data) => {
    const auth = getAuth(firebase); // (*)
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          data.email || ""
        )}?d=identicon`,
      }); // (*)
    } catch (err: any) {
      // catch
    } finally {
      // finally
    }
  });
```

## Firebase에 생성한 유저 데이터베이스에 저장 (v9)

- database 생성 (프로젝트에서는 Realtime Database로 생성 함)
- firebase.ts에 database 셋팅
- [Firebase 데이터베이스 API](https://firebase.google.com/docs/database/web/start?hl=ko)

```js
import { getDatabase } from "firebase/database"; // (*)
import { firebase } from "../firebase.config";

const firebaseConfig = {
  // ...
  databaseURL: process.env.REACT_APP_DATABASE_URL, // 환경 변수에 추가
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export { firebase };
```

- 실제 데이터베이스 저장 코드

```js
// RegisterPage.tsx
import { getDatabase, ref, set } from "firebase/database"; // (*)
import { firebase } from "../firebase.config";

const onSubmit = handleSubmit(async (data) => {
  const auth = getAuth(firebase);
  const db = getDatabase(firebase); // (*)
  setLoading(true);

  try {
    const { user } = await createUserWithEmailAndPassword(/* ... */);

    // 실제 데이터베이스에 저장
    await set(ref(db, "users/" + user.uid), {
      name: user.displayName,
      image: user.photoURL,
    });
  } catch (err: any) {
    // ...
  } finally {
    // ...
  }
});
```

- 결과물

<img width="746" alt="스크린샷 2023-02-14 오전 1 19 48" src="https://user-images.githubusercontent.com/64779472/218513167-bee420ce-a367-4810-a486-cb717178dad5.png">

<br />

## Firebase 로그인 (v9)

- 기존 사용자가 자신의 이메일 주소와 비밀번호를 사용해 로그인 할 때는 Firebase v9 부터는 `signInWithEmailAndPassword` 을 이용할 수 있다.
- [Firebase 로그인 관련 문서](https://firebase.google.com/docs/auth/web/start?hl=ko#sign_in_existing_users)

```jsx
import { getAuth } from "firebase/auth";
import { firebase } from "../firebase.config";

const onSubmit = handleSubmit(async (data) => {
  const auth = getAuth(firebase);
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
    // Signed in
    const user = userCredential.user;
  } catch (err: any) {
    // ...
  } finally {
    // ...
  }
});
```

<br />

## Firebase 인증된 유저 정보 가져오기

- Firebase v9부터 `onAuthStateChanged` 메서드를 사용해 관찰자를 연결해서 사용자의 로그인 상태가 변경될 때마다 이 관찰자가 호출된다.
- 사용자가 로그인되면 관찰자에서 사용자에 대한 정보를 가져올 수 있습니다.
- [Firebase 인증된 유저 정보 가져오기 관련 문서](https://firebase.google.com/docs/auth/web/start?hl=ko#set_an_authentication_state_observer_and_get_user_data)

```js
// App.tsx
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "./firebase.config";

const auth = getAuth(firebase);

useEffect(() => {
  const auth = getAuth(firebase);

  onAuthStateChanged(auth, (user) => {
    // user가 이제 로그인 한 유저 데이터 반환한다.
    if (user) {
      // 로그인
    } else {
      // 로그아웃
    }
  });
}, []);
```
