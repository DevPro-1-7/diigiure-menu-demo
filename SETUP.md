# 🚀 دليل إعداد Diigiure Smart Menu

## الخطوات من الصفر إلى النشر في 10 دقائق

---

## 1️⃣ إنشاء مشروع Firebase (مجاني)

1. افتح [console.firebase.google.com](https://console.firebase.google.com)
2. اضغط **"Add project"** → أدخل اسم مشروعك
3. يمكنك تعطيل Google Analytics (اختياري)
4. انتظر حتى يُنشأ المشروع

---

## 2️⃣ إضافة تطبيق ويب

1. من الصفحة الرئيسية للمشروع اضغط أيقونة **`</>`** (Web)
2. أدخل اسم التطبيق (مثل: diigiure-menu)
3. **لا تُفعّل Firebase Hosting** (سنستخدم Netlify أو غيره)
4. انسخ كود الإعداد الذي يظهر لك:

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

5. افتح ملف **`firebase-config.js`** وضع القيم داخل `FIREBASE_CONFIG`

---

## 3️⃣ تفعيل Authentication

1. من القائمة الجانبية: **Build → Authentication**
2. اضغط **"Get started"**
3. اضغط **Email/Password** → فعّله → احفظ
4. اضغط **"Add user"** وأضف بريدك وكلمة مرور الإدارة

---

## 4️⃣ إنشاء Firestore Database

1. من القائمة: **Build → Firestore Database**
2. اضغط **"Create database"**
3. اختر **Production mode**
4. اختر أقرب منطقة (مثل `europe-west1` لشمال أفريقيا)
5. بعد الإنشاء، اذهب إلى **Rules** وضع هذه القواعد:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // القائمة العامة - للقراءة فقط
    match /settings/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categories/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /products/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // الإحصائيات - يمكن لأي زائر كتابة زيارة
    match /analytics/{doc} {
      allow read:  if request.auth != null;
      allow write: if true;
    }
  }
}
```

---

## 5️⃣ تفعيل Storage (للصور)

1. من القائمة: **Build → Storage**
2. اضغط **"Get started"** → **Production mode** → اختر المنطقة
3. اذهب إلى **Rules** وضع:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // الصور عامة للقراءة
    match /products/{file} {
      allow read:  if true;
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
    match /logos/{file} {
      allow read:  if true;
      allow write: if request.auth != null;
    }
    match /banners/{file} {
      allow read:  if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 6️⃣ إضافة بيانات المتجر الأولية (اختياري)

من **Firestore → Add document**:

- Collection: `settings`
- Document ID: `store`
- أضف الحقول من `DEFAULT_STORE` في `firebase-config.js`

أو ببساطة افتح `admin/index.html` وأدخل البيانات من الإعدادات.

---

## 7️⃣ النشر

### Netlify (الأسهل)
1. افتح [netlify.com/drop](https://app.netlify.com/drop)
2. اسحب مجلد المشروع كاملاً وأفلته
3. يعمل فوراً 🎉

### GitHub Pages
```bash
git init && git add . && git commit -m "init"
git branch -M main
git remote add origin https://github.com/username/menu.git
git push -u origin main
```
ثم: Settings → Pages → Deploy from branch → main

### أي استضافة عادية
ارفع الملفات عبر FTP على `public_html/` — يعمل مباشرة.

---

## 🗂️ هيكل المشروع

```
diigiure-firebase/
├── firebase-config.js   ✏️ أدخل بيانات Firebase هنا
├── index.html           👥 واجهة العملاء (QR Menu)
├── css/
│   └── main.css         🎨 الأنماط المشتركة
├── js/
│   └── db.js            🔌 Firebase wrapper
└── admin/
    ├── login.html       🔐 تسجيل الدخول
    └── index.html       ⚙️ لوحة الإدارة
```

---

## ✅ الميزات

| الميزة | الوصف |
|--------|-------|
| 🔄 مزامنة فورية | التغييرات تظهر للزوار فوراً بدون تحديث |
| 🔐 تسجيل دخول آمن | Firebase Auth - لا كلمات مرور مخزنة يدوياً |
| 🖼️ رفع صور | ضغط تلقائي قبل الرفع، حد أقصى 10MB |
| 📊 إحصائيات | عدد الزيارات اليومية والشهرية |
| 📱 Mobile First | مصمم للهاتف أولاً |
| 🌙 وضع ليلي | محفوظ تلقائياً |
| 📋 نسخ منتج | بضغطة واحدة |
| 👁️ إخفاء منتج | بدلاً من الحذف الدائم |
| 🔀 Drag & Drop | لترتيب الفئات |

---

## 💡 ملاحظات مهمة

- **Firebase Spark (مجاني)**: يكفي لأي مطعم صغير-متوسط
  - 50,000 قراءة/يوم
  - 20,000 كتابة/يوم  
  - 1GB تخزين صور
- إذا احتجت أكثر: Blaze plan = ادفع فقط ما تستخدم (رخيص جداً)
- لا تشارك ملف `firebase-config.js` - لكنه آمن للعميل لأن Firebase Rules تحميك
