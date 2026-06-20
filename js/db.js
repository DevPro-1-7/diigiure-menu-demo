/**
 * db.js — Firebase wrapper
 * كل عمليات قاعدة البيانات في مكان واحد
 */

// ── Firebase SDK (ESM via CDN) ──────────────────────────────
import { initializeApp }                           from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,
         signOut, onAuthStateChanged }             from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc,
         collection, getDocs, addDoc, updateDoc,
         deleteDoc, onSnapshot, orderBy, query,
         serverTimestamp, writeBatch }             from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes,
         getDownloadURL, deleteObject }            from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// ── Init ────────────────────────────────────────────────────
const app     = initializeApp(FIREBASE_CONFIG);
const auth    = getAuth(app);
const db      = getFirestore(app);
const storage = getStorage(app);

// ── Auth ────────────────────────────────────────────────────
export const Auth = {
  login:    (email, pass) => signInWithEmailAndPassword(auth, email, pass),
  logout:   ()            => signOut(auth),
  onChange: (cb)          => onAuthStateChanged(auth, cb),
  current:  ()            => auth.currentUser,
};

// ── Store Settings ──────────────────────────────────────────
export const StoreDB = {
  // Read once
  get: async () => {
    const snap = await getDoc(doc(db, "settings", "store"));
    return snap.exists() ? snap.data() : null;
  },
  // Write (merge keeps existing fields)
  set: (data) => setDoc(doc(db, "settings", "store"), data, { merge: true }),
  // Live listener
  listen: (cb) => onSnapshot(doc(db, "settings", "store"), snap => cb(snap.data() || null)),
};

// ── Categories ──────────────────────────────────────────────
export const CatsDB = {
  list: async () => {
    const q    = query(collection(db, "categories"), orderBy("order"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  add: (data)     => addDoc(collection(db, "categories"), { ...data, order: Date.now() }),
  update: (id, d) => updateDoc(doc(db, "categories", id), d),
  delete: (id)    => deleteDoc(doc(db, "categories", id)),
  listen: (cb)    => onSnapshot(
    query(collection(db, "categories"), orderBy("order")),
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  ),
  // Batch reorder
  reorder: async (cats) => {
    const batch = writeBatch(db);
    cats.forEach((c, i) => batch.update(doc(db, "categories", c.id), { order: i }));
    return batch.commit();
  },
};

// ── Products ────────────────────────────────────────────────
export const ProdsDB = {
  list: async () => {
    const q    = query(collection(db, "products"), orderBy("order"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  add: (data)     => addDoc(collection(db, "products"), {
    ...data, order: Date.now(), views: 0, createdAt: serverTimestamp()
  }),
  update: (id, d) => updateDoc(doc(db, "products", id), d),
  delete: (id)    => deleteDoc(doc(db, "products", id)),
  listen: (cb)    => onSnapshot(
    query(collection(db, "products"), orderBy("order")),
    snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  ),
};

// ── Image Upload ────────────────────────────────────────────
export const ImgDB = {
  /**
   * Upload image file → returns download URL
   * @param {File}   file   - image file (compressed before upload)
   * @param {string} folder - "products" | "logos" | "banners"
   */
  upload: async (file, folder = "products") => {
    // Client-side compression (max 800px, quality 0.75)
    const compressed = await compressImage(file, 800, 0.75);
    const name       = `${folder}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const storageRef = ref(storage, name);
    await uploadBytes(storageRef, compressed);
    return getDownloadURL(storageRef);
  },
  delete: (url) => {
    try {
      const r = ref(storage, url);
      return deleteObject(r);
    } catch { return Promise.resolve(); }
  },
};

// ── Image Compression (client-side) ─────────────────────────
function compressImage(file, maxPx = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    // Reject files > 10MB before compression
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error("حجم الصورة يتجاوز 10MB"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width: w, height: h } = img;
        if (w > maxPx || h > maxPx) {
          if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
          else       { w = Math.round(w * maxPx / h); h = maxPx; }
        }
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        canvas.toBlob(resolve, "image/jpeg", quality);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Analytics (simple view counter) ─────────────────────────
export const Analytics = {
  trackVisit: () => {
    const today = new Date().toISOString().slice(0, 10);
    const docRef = doc(db, "analytics", today);
    getDoc(docRef).then(snap => {
      const data = snap.exists() ? snap.data() : { visits: 0, date: today };
      setDoc(docRef, { ...data, visits: data.visits + 1 }, { merge: true });
    }).catch(() => {});
  },
  trackProductView: (productId) => {
    if (!productId) return;
    const docRef = doc(db, "products", productId);
    getDoc(docRef).then(snap => {
      if (snap.exists()) updateDoc(docRef, { views: (snap.data().views || 0) + 1 });
    }).catch(() => {});
  },
  getStats: async () => {
    const snap = await getDocs(collection(db, "analytics"));
    const rows = snap.docs.map(d => d.data());
    const today = new Date().toISOString().slice(0, 10);
    const monthPrefix = today.slice(0, 7);
    return {
      totalVisits: rows.reduce((s, r) => s + (r.visits || 0), 0),
      todayVisits: rows.find(r => r.date === today)?.visits || 0,
      monthVisits: rows.filter(r => r.date?.startsWith(monthPrefix)).reduce((s, r) => s + (r.visits || 0), 0),
      weekly: rows.sort((a,b)=>a.date>b.date?1:-1).slice(-7),
    };
  },
};
