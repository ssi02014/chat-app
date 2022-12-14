# ๐ป firebase

## ์ด๊ธฐ ์ํ

### 1. ์ค์น

```
yarn add firebase
```

### 2. SDK ์ถ๊ฐ

- firebaseConfig์ value๋ค์ ์๋์ ๊ฐ์ด `env` ํ์ผ์์ ๊ด๋ฆฌํ๋ค.
- ์ฐธ๊ณ ๋ก envํ์ผ์ `root` ํด๋์ ์์ฑํด์ผ ์๋ํ๋ฉฐ, React์์๋ `REACT_APP_*` ํํ๋ก ์์ฑํด์ผ ์ ์ ์๋ํ๋ค.
- ํ๊ฒฝ๋ณ์๋ ๋ณด์ ์ ๋ณด๊ธฐ ๋๋ฌธ์ github์ ์ฌ๋ผ๊ฐ๋ ๊ฒ์ ๋ฐฉ์งํ๊ธฐ ์ํด `.gitignore`์๋ค `.env`๋ฅผ ์ถ๊ฐํด์ผํ๋ค.

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

### 3. firebase ์ฐ๊ฒฐ ํ์ธ

```tsx
// index.tsx
// ...
import { firebase, analytics } from "./firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log(firebase);
/*
FirebaseAppImplย {_isDeleted: false, _options: {โฆ}, _config: {โฆ}, _name: '[DEFAULT]', _automaticDataCollectionEnabled: false,ย โฆ}
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
