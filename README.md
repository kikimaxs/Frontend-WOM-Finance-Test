This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Download APK

You can download the latest release APK from the following link:

**Android APK (Release)**:

https://drive.google.com/file/d/1idx8OkQ6aMV3KyU8JSEudCu3w2kvw4w-/view?usp=drive_link

If the link requires access, ensure your Google account has permission or request access from the maintainer.

---

## Perintah Proyek (Scripts)

Gunakan perintah berikut untuk bekerja dengan proyek React Native ini:

- `npm start` atau `yarn start` — Menjalankan Metro bundler.
- `npm run android` atau `yarn android` — Menjalankan aplikasi di Android (emulator/perangkat).
- `npm run ios` atau `yarn ios` — Menjalankan aplikasi di iOS (hanya di macOS, pastikan CocoaPods terpasang).
- `npm run lint` — Menjalankan lint untuk memeriksa kualitas kode.
- `npm test` — Menjalankan unit test dengan Jest.

## Langkah Menjalankan Proyek (Ringkas)

1. Pastikan lingkungan sudah siap (Node.js ≥ 20, JDK 17, Android SDK/Platform Tools). Ikuti panduan resmi: https://reactnative.dev/docs/set-up-your-environment
2. Jalankan Metro: `npm start`.
3. Buka terminal baru:
   - Android: `npm run android`
   - iOS (macOS):
     - Pertama kali atau setelah mengubah native deps: `bundle install` lalu `bundle exec pod install` di folder `ios/`.
     - Jalankan: `npm run ios`.

## Build APK / AAB (Rilis)

Di Windows (PowerShell) dari folder `android/`:

- Build APK Debug: `./gradlew.bat assembleDebug`
  - Output: `android/app/build/outputs/apk/debug/app-debug.apk`
- Build APK Release: `./gradlew.bat assembleRelease`
  - Output: `android/app/build/outputs/apk/release/app-release.apk`
- Build App Bundle Release (AAB): `./gradlew.bat bundleRelease`
  - Output: `android/app/build/outputs/bundle/release/app-release.aab`

Di macOS/Linux (bash) gunakan `./gradlew` (tanpa `.bat`).

## Catatan Penting

- Engine Node: proyek ini mensyaratkan Node ≥ 20 (`package.json` engines).
- JDK: gunakan Java 17 agar cocok dengan RN 0.81.x.
- Gradle memory: jika melihat peringatan Metaspace/Heap, tingkatkan `org.gradle.jvmargs` di `android/gradle.properties`, contoh:
  - `org.gradle.jvmargs=-Xmx4g -XX:MaxMetaspaceSize=1024m -Dkotlin.daemon.jvm.options=-Xmx2g`
- Google Sign-In: file `android/app/google-services.json` sudah tersedia. Pastikan Firebase/Google Sign-In dikonfigurasi sesuai project.

## Instalasi APK di Perangkat

- Salin file APK (`app-release.apk` atau `app-debug.apk`) ke perangkat.
- Buka file tersebut di perangkat dan izinkan pemasangan dari sumber tidak dikenal jika diminta.
