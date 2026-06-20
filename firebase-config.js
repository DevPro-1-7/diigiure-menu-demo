/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         Diigiure Smart Menu — إعداد Firebase               ║
 * ║                                                              ║
 * ║  1. اذهب إلى: https://console.firebase.google.com          ║
 * ║  2. أنشئ مشروعاً جديداً                                     ║
 * ║  3. أضف تطبيق ويب (Web App)                                ║
 * ║  4. انسخ بيانات الإعداد وضعها هنا                           ║
 * ║  5. فعّل Authentication → Email/Password                    ║
 * ║  6. فعّل Firestore Database                                 ║
 * ║  7. فعّل Storage                                            ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

  const firebaseConfig = {
    apiKey: "AIzaSyBD1Q2MZp61DTaqELLM8Tc0E0tMzEazyTY",
    authDomain: "diigiure-print.firebaseapp.com",
    projectId: "diigiure-print",
    storageBucket: "diigiure-print.firebasestorage.app",
    messagingSenderId: "65847216519",
    appId: "1:65847216519:web:5ceae447450993bcb7ab22",
    measurementId: "G-NG7B92S80N"
  };
  
/**
 * بيانات المتجر الافتراضية (تُستخدم عند الإعداد الأول فقط)
 * بعد ذلك تُحفظ جميع البيانات في Firebase
 */
const DEFAULT_STORE = {
  name:        "Diigiure Café",
  tagline:     "أجواء مميزة وطعم لا يُنسى",
  description: "نقدم أشهى المشروبات والمأكولات في أجواء دافئة تجمع بين الراحة والذوق الرفيع.",
  logo:        "",
  phone:       "+213 555 123 456",
  whatsapp:    "213555123456",
  address:     "شارع الاستقلال، سطيف، الجزائر",
  instagram:   "https://instagram.com/diigiurecafe",
  facebook:    "https://facebook.com/diigiurecafe",
  currency:    "دج",
  accentColor: "#FF5C35",
  heroFrom:    "#1C1C2E",
  heroTo:      "#2D1B4E",
  promo: {
    active: true,
    text:   "🎉 عرض اليوم: خصم 25% على جميع البيتزا حتى الساعة 10 مساءً",
  },
};
