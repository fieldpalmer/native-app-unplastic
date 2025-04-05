# native-app-unplastic
#### 🌿 Plastic-Free Lifestyle Tracker

A mobile app to help individuals track, improve, and celebrate their journey toward a plastic-free lifestyle. Built with React Native and Firebase.

---

## ✨ Features

- ✅ Daily logging of plastic-free actions
- ✅ Visual progress tracking & impact stats
- ✅ Location-based map of sustainable stores and refill stations
- ✅ Daily tips and low-waste challenges
- ✅ Optional social sharing + badge generator
- ✅ Firebase-backed data storage and push notifications

---

## 📱 Tech Stack

| Layer        | Tech                  |
|--------------|-----------------------|
| Frontend     | React Native (Expo)   |
| Backend      | Firebase (Auth, Firestore) |
| Maps         | Google Maps API       |
| Notifications| Expo Push Notifications |
| Styling      | Tailwind (via NativeWind or custom) |

---

## 🧠 Why This App?

For the sake of the planet we should all be committed to reducing our plastic use in daily life — this app began as a personal tool, and evolved into a portfolio-quality project I hope others find useful and inspiring.

---

## 🏗️ Architecture Overview

- **Users** authenticate via Firebase Auth (email or Google)
- **Logs** stored in Firestore (`/logs/{userId}`)
- **Map pins** stored in Firestore (`/locations`)
- **Tips & challenges** are pulled from static content or AI-generated

---

## 🚀 Setup

```bash
git clone https://github.com/fieldpalmer/native-app-unplastic
cd native-app-unplastic
npm install
npx expo start
```
Don't forget to set up your `.env` for Firebase config!

## 📸 Screenshots (Coming Soon)
- Home / Log screen
- Progress dashboard
- Sustainable map
- Tip of the day

## 🧪 In Progress
 - QR/barcode product scan for recyclability
 - Local challenge leaderboard
 - Merch + guides integration

## 📌 Status
🚧 MVP in development – core logging + dashboard first, then map + challenges.

## 🌍 License
MIT

## 🤝 Contribute or Collaborate
Got an idea, dataset, or want to team up?
Get in touch

