/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║           Diigiure Smart Menu — إعدادات المتجر          ║
 * ║  ✏️ هذا الملف الوحيد الذي تحتاج لتعديله لتخصيص قائمتك  ║
 * ╚══════════════════════════════════════════════════════════╝
 */

const STORE = {
  name: "Diigiure Café",
  tagline: "أفضل تجربة قهوة في المدينة",
  description: "نقدم أشهى المشروبات والمأكولات بأجواء مميزة تجمع بين الراحة والذوق الرفيع.",
  logo: "",                          // رابط الشعار (اتركه فارغاً لعرض الحرف الأول)
  cover: "",                         // رابط صورة الغلاف (اختياري)
  phone: "+213 555 123 456",
  whatsapp: "213555123456",          // الرقم بدون + وبدون مسافات
  address: "شارع الاستقلال، سطيف",
  instagram: "https://instagram.com/diigiurecafe",
  facebook:  "https://facebook.com/diigiurecafe",

  // ── الألوان ──────────────────────────────────────────────
  accentColor: "#FF5C35",           // اللون الرئيسي (برتقالي حار)
  heroGradient: ["#1a1a2e", "#16213e"],  // ألوان خلفية Hero

  // ── بانر ترويجي ──────────────────────────────────────────
  promo: {
    active: true,
    text: "🎉 عرض اليوم: خصم 25% على كل البيتزا حتى الساعة 10 مساءً",
  },

  // ── الفئات ───────────────────────────────────────────────
  categories: [
    { id: "hot",      name: "مشروبات ساخنة",  icon: "☕" },
    { id: "cold",     name: "مشروبات باردة",  icon: "🧃" },
    { id: "sandwich", name: "سندويشات",       icon: "🥪" },
    { id: "pizza",    name: "بيتزا",          icon: "🍕" },
    { id: "dessert",  name: "حلويات",         icon: "🍰" },
    { id: "offers",   name: "العروض",         icon: "⭐" },
  ],

  // ── المنتجات ─────────────────────────────────────────────
  // badge: "new" | "popular" | "offer" | null
  products: [
    // ─ مشروبات ساخنة
    {
      id: "p1", cat: "hot",
      name: "قهوة عربية",
      desc: "قهوة عربية أصيلة بالهيل والزعفران، تُقدَّم مع التمر",
      price: 150, oldPrice: null, badge: "popular",
      img: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&q=80",
      available: true,
    },
    {
      id: "p2", cat: "hot",
      name: "كابوتشينو",
      desc: "إسبريسو إيطالي مع رغوة حليب كريمية ناعمة",
      price: 200, oldPrice: 250, badge: "offer",
      img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
      available: true,
    },
    {
      id: "p3", cat: "hot",
      name: "شاي مغربي",
      desc: "شاي أخضر بالنعناع الطازج والسكر الطبيعي",
      price: 120, oldPrice: null, badge: null,
      img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80",
      available: true,
    },
    {
      id: "p4", cat: "hot",
      name: "لاتيه فانيليا",
      desc: "قهوة لاتيه ناعمة مع نكهة الفانيليا الطبيعية",
      price: 220, oldPrice: null, badge: "new",
      img: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&q=80",
      available: true,
    },

    // ─ مشروبات باردة
    {
      id: "p5", cat: "cold",
      name: "عصير مانجو",
      desc: "مانجو طبيعي 100٪ طازج يومياً بدون إضافات",
      price: 180, oldPrice: null, badge: "popular",
      img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80",
      available: true,
    },
    {
      id: "p6", cat: "cold",
      name: "موهيتو ليمون",
      desc: "ليمون طازج مع نعناع وصودا وثلج مكعبات",
      price: 200, oldPrice: null, badge: "new",
      img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
      available: true,
    },
    {
      id: "p7", cat: "cold",
      name: "ميلك شيك شوكولاتة",
      desc: "شوكولاتة بلجيكية داكنة مع كريمة وآيس كريم",
      price: 250, oldPrice: 300, badge: "offer",
      img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
      available: true,
    },

    // ─ سندويشات
    {
      id: "p8", cat: "sandwich",
      name: "برغر كلاسيك",
      desc: "لحم بقري طازج مع الجبن والخضروات وصوص خاص",
      price: 450, oldPrice: null, badge: "popular",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      available: true,
    },
    {
      id: "p9", cat: "sandwich",
      name: "دجاج مقرمش",
      desc: "فيليه دجاج مقرمش مع صوص الثوم والخس الطازج",
      price: 380, oldPrice: null, badge: null,
      img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
      available: true,
    },
    {
      id: "p10", cat: "sandwich",
      name: "كلوب هاوس",
      desc: "ثلاث طبقات من الدجاج والبيض والبيكون والخضار",
      price: 420, oldPrice: null, badge: null,
      img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
      available: false,
    },

    // ─ بيتزا
    {
      id: "p11", cat: "pizza",
      name: "مارغريتا",
      desc: "طماطم طازجة، موتزاريلا، ريحان إيطالي",
      price: 600, oldPrice: null, badge: null,
      img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      available: true,
    },
    {
      id: "p12", cat: "pizza",
      name: "أربعة جبنات",
      desc: "موتزاريلا، غودا، بارميزان، ريكوتا — مزيج استثنائي",
      price: 750, oldPrice: 850, badge: "offer",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
      available: true,
    },
    {
      id: "p13", cat: "pizza",
      name: "دجاج حار",
      desc: "دجاج مشوي بالبهارات مع فلفل حلو وصوص حار",
      price: 700, oldPrice: null, badge: "popular",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      available: true,
    },

    // ─ حلويات
    {
      id: "p14", cat: "dessert",
      name: "تيراميسو",
      desc: "كريمة ماسكاربوني مع قهوة وبسكويت سافويار",
      price: 280, oldPrice: null, badge: "new",
      img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
      available: true,
    },
    {
      id: "p15", cat: "dessert",
      name: "كيك شوكولاتة",
      desc: "شوكولاتة بلجيكية داكنة مع كريمة وفراولة طازجة",
      price: 250, oldPrice: null, badge: null,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
      available: true,
    },

    // ─ عروض
    {
      id: "p16", cat: "offers",
      name: "وجبة عائلية",
      desc: "بيتزا كبيرة + 4 مشروبات + حلوى — وفر أكثر مع العائلة",
      price: 1500, oldPrice: 2000, badge: "offer",
      img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      available: true,
    },
  ],
};
