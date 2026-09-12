/* ==========================================================================
   Suqiure — Landing page interactivity
   Vanilla JS only. No frameworks, no build step.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 0. Configuration                                                    */
  /* ------------------------------------------------------------------ */

  // TODO: replace with the real Windows installer link before publishing.
  const DOWNLOAD_URL = "YOUR_DOWNLOAD_LINK";

  /* ------------------------------------------------------------------ */
  /* 1. Translations                                                     */
  /* ------------------------------------------------------------------ */

  const translations = {
    en: {
      nav: {
        product: "Product",
        features: "Features",
        screens: "Screens",
        download: "Download",
        downloadBtn: "Download"
      },
      hero: {
        title: "Your supermarket. Under control.",
        desc: "Suqiure brings your sales, inventory, products, purchases and reports together in one powerful desktop application.",
        ctaPrimary: "Download Suqiure",
        ctaSecondary: "Explore the system",
        stat1: "Core modules in one system",
        stat2: "Desktop app, no setup complexity",
        stat3: "Built for supermarket operations"
      },
      preview: {
        title: "Everything your supermarket needs.",
        desc: "One system. Complete control.",
        demoBadge: "Demo data",
        tab: {
          pos: "Point of Sale",
          inventory: "Inventory",
          products: "Products",
          purchases: "Purchases",
          reports: "Reports"
        },
        pos: {
          search: "Search products...",
          cartTitle: "Current sale",
          empty: "Tap a product to add it to the cart.",
          cash: "Cash",
          card: "Card",
          subtotal: "Subtotal",
          tax: "Tax",
          total: "Total",
          complete: "Complete Sale",
          modalTitle: "Sale completed",
          modalDesc: "This is a demo of the checkout flow inside Suqiure — no real transaction was made.",
          modalClose: "Close"
        },
        inventory: {
          all: "All",
          inStock: "In Stock",
          lowStock: "Low Stock",
          outStock: "Out of Stock",
          colProduct: "Product",
          colQty: "Quantity",
          colUnit: "Unit",
          colStatus: "Status"
        },
        reports: {
          totalSales: "Total sales",
          invoiceCount: "Invoices issued",
          topProduct: "Best-selling product",
          topProductName: "Mineral Water 1.5L",
          chartTitle: "Sales this week"
        },
        purchases: {
          colSupplier: "Supplier",
          colDate: "Date",
          colTotal: "Total",
          colStatus: "Status",
          pending: "Pending",
          received: "Received",
          cancelled: "Cancelled"
        }
      },
      days: { sat: "Sat", sun: "Sun", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri" },
      problem: {
        title: "Running a supermarket shouldn't feel complicated.",
        item1: "Difficult to keep track of inventory across the store.",
        item2: "Time lost doing manual, error-prone calculations.",
        item3: "No clear picture of daily and weekly sales.",
        item4: "Hard to stay on top of products and purchases.",
        solution: "Suqiure brings everything together."
      },
      features: {
        title: "Built for the way supermarkets work.",
        f1: { title: "Point of Sale", desc: "A fast, organized checkout flow for handling sales and invoices." },
        f2: { title: "Inventory Management", desc: "Track products, quantities and stock movement as they happen." },
        f3: { title: "Product Management", desc: "Manage products, prices, units and barcodes in one place." },
        f4: { title: "Purchases", desc: "Organize purchase orders and keep supplier records in order." },
        f5: { title: "Reports", desc: "See sales and inventory data laid out in clear, readable reports." },
        f6: { title: "Users & Permissions", desc: "Give each team member the right level of access to the system." }
      },
      flow: {
        title: "From daily operations to clear decisions.",
        desc: "Every part of Suqiure feeds into the next, so nothing gets lost between the register and the report.",
        sales: "Sales",
        inventory: "Inventory",
        products: "Products",
        purchases: "Purchases",
        reports: "Reports"
      },
      screens: {
        title: "See Suqiure in action.",
        dashboard: "Dashboard",
        pos: "POS",
        products: "Products",
        reports: "Reports",
        dashboardCaption: "A daily overview of sales, invoices and stock alerts.",
        posCaption: "A focused checkout screen built for speed at the register.",
        productsCaption: "Every product, with its price, quantity and barcode.",
        reportsCaption: "Sales and inventory data laid out clearly, by day and by product."
      },
      download: {
        title: "Ready to take control?",
        desc: "Download Suqiure and start managing your supermarket with a system built for your business.",
        cta: "Download Suqiure for Windows",
        os: "Windows 10 / Windows 11",
        versionNote: "Version details will appear here once published"
      },
      footer: {
        tagline: "Built by Diigiure — Software Engineering & Digital Solutions",
        copy: "© 2026 Diigiure. All rights reserved."
      }
    },

    ar: {
      nav: {
        product: "المنتج",
        features: "المزايا",
        screens: "الواجهات",
        download: "تحميل",
        downloadBtn: "تحميل"
      },
      hero: {
        title: "كل عملية في سوبرماركتك. نظام واحد يتحكم فيها.",
        desc: "يجمع Suqiure المبيعات والمخزون والمنتجات والمشتريات والتقارير في برنامج واحد مصمم لإدارة السوبرماركت.",
        ctaPrimary: "تحميل Suqiure",
        ctaSecondary: "استكشف النظام",
        stat1: "وحدات أساسية في نظام واحد",
        stat2: "برنامج مكتبي دون تعقيد في الإعداد",
        stat3: "مصمم خصيصًا لعمليات السوبرماركت"
      },
      preview: {
        title: "كل ما يحتاجه سوبرماركتك.",
        desc: "نظام واحد. تحكم كامل.",
        demoBadge: "بيانات تجريبية",
        tab: {
          pos: "نقطة البيع",
          inventory: "المخزون",
          products: "المنتجات",
          purchases: "المشتريات",
          reports: "التقارير"
        },
        pos: {
          search: "ابحث عن منتج...",
          cartTitle: "الفاتورة الحالية",
          empty: "اضغط على منتج لإضافته إلى الفاتورة.",
          cash: "نقدًا",
          card: "بطاقة",
          subtotal: "المجموع الفرعي",
          tax: "الضريبة",
          total: "الإجمالي",
          complete: "إتمام البيع",
          modalTitle: "تمت عملية البيع",
          modalDesc: "هذه محاكاة لعملية الدفع داخل Suqiure، ولا تمثل عملية بيع حقيقية.",
          modalClose: "إغلاق"
        },
        inventory: {
          all: "الكل",
          inStock: "متوفر",
          lowStock: "كمية منخفضة",
          outStock: "نفدت الكمية",
          colProduct: "المنتج",
          colQty: "الكمية",
          colUnit: "الوحدة",
          colStatus: "الحالة"
        },
        reports: {
          totalSales: "إجمالي المبيعات",
          invoiceCount: "عدد الفواتير",
          topProduct: "المنتج الأكثر مبيعًا",
          topProductName: "مياه معدنية 1.5 لتر",
          chartTitle: "مبيعات هذا الأسبوع"
        },
        purchases: {
          colSupplier: "المورّد",
          colDate: "التاريخ",
          colTotal: "الإجمالي",
          colStatus: "الحالة",
          pending: "قيد الانتظار",
          received: "تم الاستلام",
          cancelled: "ملغاة"
        }
      },
      days: { sat: "سبت", sun: "أحد", mon: "اثنين", tue: "ثلاثاء", wed: "أربعاء", thu: "خميس", fri: "جمعة" },
      problem: {
        title: "إدارة السوبرماركت لا يجب أن تكون معقدة.",
        item1: "صعوبة متابعة المخزون في مختلف أقسام المتجر.",
        item2: "ضياع الوقت في حسابات يدوية قابلة للخطأ.",
        item3: "عدم وضوح المبيعات اليومية والأسبوعية.",
        item4: "صعوبة متابعة المنتجات والمشتريات أولًا بأول.",
        solution: "Suqiure يجمع كل هذا في مكان واحد."
      },
      features: {
        title: "مصمم ليتماشى مع طريقة عمل السوبرماركت.",
        f1: { title: "نقطة البيع", desc: "عملية دفع سريعة ومنظمة لإدارة المبيعات والفواتير." },
        f2: { title: "إدارة المخزون", desc: "متابعة المنتجات والكميات وحركة المخزون أولًا بأول." },
        f3: { title: "إدارة المنتجات", desc: "إدارة المنتجات والأسعار والوحدات والباركود في مكان واحد." },
        f4: { title: "المشتريات", desc: "تنظيم طلبات الشراء والحفاظ على سجلات الموردين مرتبة." },
        f5: { title: "التقارير", desc: "عرض بيانات المبيعات والمخزون في تقارير واضحة وسهلة القراءة." },
        f6: { title: "المستخدمون والصلاحيات", desc: "منح كل عضو في الفريق مستوى الوصول المناسب للنظام." }
      },
      flow: {
        title: "من العمليات اليومية إلى قرارات واضحة.",
        desc: "كل جزء من Suqiure يغذي الجزء الذي يليه، فلا يضيع شيء بين الكاشير والتقرير.",
        sales: "المبيعات",
        inventory: "المخزون",
        products: "المنتجات",
        purchases: "المشتريات",
        reports: "التقارير"
      },
      screens: {
        title: "شاهد Suqiure أثناء العمل.",
        dashboard: "لوحة التحكم",
        pos: "نقطة البيع",
        products: "المنتجات",
        reports: "التقارير",
        dashboardCaption: "نظرة يومية شاملة على المبيعات والفواتير وتنبيهات المخزون.",
        posCaption: "واجهة دفع مركّزة مصممة للسرعة عند الكاشير.",
        productsCaption: "كل منتج، بسعره وكميته والباركود الخاص به.",
        reportsCaption: "بيانات المبيعات والمخزون معروضة بوضوح، يوميًا وحسب كل منتج."
      },
      download: {
        title: "جاهز لتجعل إدارة سوبرماركتك أكثر تنظيمًا؟",
        desc: "حمّل Suqiure وابدأ في إدارة سوبرماركتك بنظام مصمم خصيصًا لعملك.",
        cta: "تحميل Suqiure لويندوز",
        os: "ويندوز 10 / ويندوز 11",
        versionNote: "سيتم إضافة تفاصيل الإصدار هنا فور توفرها",
        // sizeNote intentionally omitted: not fabricating unknown file size
      },
      footer: {
        tagline: "تطوير Diigiure — هندسة برمجيات وحلول رقمية",
        copy: "© 2026 Diigiure. جميع الحقوق محفوظة."
      }
    }
  };

  /* ------------------------------------------------------------------ */
  /* 2. Demo data (shared across languages, names translated per lang)   */
  /* ------------------------------------------------------------------ */

  const demoProducts = [
    { id: 'p1', en: 'Mineral Water 1.5L', ar: 'مياه معدنية 1.5 لتر', price: 60, qty: 240, barcode: '6191234500017', swatch: ['#2c3a52', '#1b2434'] },
    { id: 'p2', en: 'Whole Milk 1L', ar: 'حليب كامل الدسم 1 لتر', price: 120, qty: 85, barcode: '6191234500024', swatch: ['#4a3550', '#2a2035'] },
    { id: 'p3', en: 'Olive Oil 1L', ar: 'زيت زيتون 1 لتر', price: 950, qty: 32, barcode: '6191234500031', swatch: ['#4d4322', '#2b2513'] },
    { id: 'p4', en: 'White Bread', ar: 'خبز أبيض', price: 35, qty: 60, barcode: '6191234500048', swatch: ['#3a2e22', '#231b14'] },
    { id: 'p5', en: 'Coffee 250g', ar: 'قهوة 250 غ', price: 480, qty: 18, barcode: '6191234500055', swatch: ['#33241b', '#1c130d'] },
    { id: 'p6', en: 'Orange Juice 1L', ar: 'عصير برتقال 1 لتر', price: 180, qty: 54, barcode: '6191234500062', swatch: ['#4a3018', '#2b1b0e'] },
    { id: 'p7', en: 'Rice 5kg', ar: 'أرز 5 كغ', price: 1250, qty: 40, barcode: '6191234500079', swatch: ['#33383a', '#1d2021'] },
    { id: 'p8', en: 'Dish Soap 750ml', ar: 'سائل غسيل الصحون 750 مل', price: 220, qty: 0, barcode: '6191234500086', swatch: ['#204542', '#122725'] }
  ];

  const demoInventory = [
    { en: 'Mineral Water 1.5L', ar: 'مياه معدنية 1.5 لتر', qty: 240, unit: { en: 'Bottle', ar: 'زجاجة' }, status: 'in' },
    { en: 'Whole Milk 1L', ar: 'حليب كامل الدسم 1 لتر', qty: 85, unit: { en: 'Carton', ar: 'علبة' }, status: 'in' },
    { en: 'Olive Oil 1L', ar: 'زيت زيتون 1 لتر', qty: 12, unit: { en: 'Bottle', ar: 'زجاجة' }, status: 'low' },
    { en: 'White Bread', ar: 'خبز أبيض', qty: 60, unit: { en: 'Pack', ar: 'كيس' }, status: 'in' },
    { en: 'Coffee 250g', ar: 'قهوة 250 غ', qty: 6, unit: { en: 'Pack', ar: 'كيس' }, status: 'low' },
    { en: 'Orange Juice 1L', ar: 'عصير برتقال 1 لتر', qty: 54, unit: { en: 'Carton', ar: 'علبة' }, status: 'in' },
    { en: 'Rice 5kg', ar: 'أرز 5 كغ', qty: 40, unit: { en: 'Bag', ar: 'كيس' }, status: 'in' },
    { en: 'Dish Soap 750ml', ar: 'سائل غسيل الصحون 750 مل', qty: 0, unit: { en: 'Bottle', ar: 'زجاجة' }, status: 'out' }
  ];

  const demoPurchases = [
    { supEn: 'Atlas Distribution', supAr: 'أطلس للتوزيع', date: '2026-08-02', total: '182,400 DZD', status: 'received' },
    { supEn: 'Numidia Foods', supAr: 'نوميديا فودز', date: '2026-08-11', total: '94,750 DZD', status: 'received' },
    { supEn: 'Sahel Beverages', supAr: 'الساحل للمشروبات', date: '2026-08-20', total: '61,200 DZD', status: 'pending' },
    { supEn: 'Green Valley Co.', supAr: 'الوادي الأخضر', date: '2026-08-27', total: '38,900 DZD', status: 'cancelled' },
    { supEn: 'Al Wafra Supplies', supAr: 'الوفرة للتوريدات', date: '2026-09-03', total: '146,300 DZD', status: 'pending' }
  ];

  /* ------------------------------------------------------------------ */
  /* 3. Language state + i18n engine                                     */
  /* ------------------------------------------------------------------ */

  const STORAGE_KEY = 'suqiure-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';
  if (currentLang !== 'en' && currentLang !== 'ar') currentLang = 'en';

  function t(path) {
    const parts = path.split('.');
    let node = translations[currentLang];
    for (const p of parts) {
      if (node == null) return path;
      node = node[p];
    }
    return node == null ? path : node;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
    });

    document.title = currentLang === 'ar'
      ? 'Suqiure — كل عملية في سوبرماركتك. نظام واحد يتحكم فيها.'
      : 'Suqiure — Your supermarket. Under control.';

    // Re-render dynamic, data-driven sections in the new language.
    renderPosProducts();
    renderCart();
    renderInventory(currentInventoryFilter);
    renderProductsGrid();
    renderPurchases();
    renderScreen(currentScreen);
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
  }

  const langSwitch = document.getElementById('langSwitch');
  if (langSwitch) {
    langSwitch.addEventListener('click', function () {
      setLang(currentLang === 'en' ? 'ar' : 'en');
    });
  }

  /* ------------------------------------------------------------------ */
  /* 4. Navbar: scroll shadow + mobile menu                               */
  /* ------------------------------------------------------------------ */

  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 8) navEl.classList.add('scrolled');
    else navEl.classList.remove('scrolled');
  }, { passive: true });

  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      const open = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Reveal-on-scroll                                                  */
  /* ------------------------------------------------------------------ */

  const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ------------------------------------------------------------------ */
  /* 6. Interactive Product Preview — tab switching                      */
  /* ------------------------------------------------------------------ */

  const previewTabs = document.querySelectorAll('.preview-tab[data-scene]');
  const scenes = document.querySelectorAll('.scene');

  previewTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      previewTabs.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const target = tab.getAttribute('data-scene');
      scenes.forEach(function (s) { s.classList.remove('active'); });
      const scene = document.getElementById('scene-' + target);
      if (scene) scene.classList.add('active');

      if (target === 'reports') animateReportChart();
    });
  });

  /* ------------------------------------------------------------------ */
  /* 7. POS scene — products, cart, totals, payment, checkout modal       */
  /* ------------------------------------------------------------------ */

  const posProductsEl = document.getElementById('posProducts');
  const posCartItemsEl = document.getElementById('posCartItems');
  const posSubtotalEl = document.getElementById('posSubtotal');
  const posTaxEl = document.getElementById('posTax');
  const posTotalEl = document.getElementById('posTotal');
  const posCompleteBtn = document.getElementById('posComplete');
  const posModal = document.getElementById('posModal');
  const posModalClose = document.getElementById('posModalClose');

  let cart = {}; // { productId: quantity }
  let selectedPayment = 'cash';

  function formatCurrency(amount) {
    return amount.toLocaleString(currentLang === 'ar' ? 'ar-DZ' : 'en-US', { maximumFractionDigits: 2 }) + ' DZD';
  }

  function renderPosProducts() {
    if (!posProductsEl) return;
    posProductsEl.innerHTML = demoProducts.map(function (p) {
      const name = currentLang === 'ar' ? p.ar : p.en;
      return (
        '<button type="button" class="pos-product" data-id="' + p.id + '" style="--swatch-a:' + p.swatch[0] + ';--swatch-b:' + p.swatch[1] + '">' +
          '<span class="pos-product-swatch" aria-hidden="true"></span>' +
          '<b>' + name + '</b>' +
          '<span>' + formatCurrency(p.price) + '</span>' +
        '</button>'
      );
    }).join('');

    posProductsEl.querySelectorAll('.pos-product').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        cart[id] = (cart[id] || 0) + 1;
        renderCart();
      });
    });
  }

  function renderCart() {
    if (!posCartItemsEl) return;
    const ids = Object.keys(cart).filter(function (id) { return cart[id] > 0; });

    if (ids.length === 0) {
      posCartItemsEl.innerHTML = '<div class="pos-cart-empty">' + t('preview.pos.empty') + '</div>';
    } else {
      posCartItemsEl.innerHTML = ids.map(function (id) {
        const p = demoProducts.find(function (x) { return x.id === id; });
        const name = currentLang === 'ar' ? p.ar : p.en;
        const qty = cart[id];
        const lineTotal = p.price * qty;
        return (
          '<div class="pos-cart-item" data-id="' + id + '">' +
            '<span class="name">' + name + '</span>' +
            '<span class="qty">x' + qty + '</span>' +
            '<span class="price">' + formatCurrency(lineTotal) + '</span>' +
            '<button type="button" class="cart-remove" data-id="' + id + '" aria-label="Remove">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
            '</button>' +
          '</div>'
        );
      }).join('');

      posCartItemsEl.querySelectorAll('.cart-remove').forEach(function (btn) {
        btn.addEventListener('click', function () {
          const id = btn.getAttribute('data-id');
          delete cart[id];
          renderCart();
        });
      });
    }

    updateTotals();
  }

  function updateTotals() {
    const ids = Object.keys(cart).filter(function (id) { return cart[id] > 0; });
    let subtotal = 0;
    ids.forEach(function (id) {
      const p = demoProducts.find(function (x) { return x.id === id; });
      subtotal += p.price * cart[id];
    });
    const tax = subtotal * 0.0; // Suqiure demo keeps tax at 0 to avoid implying a real tax rule.
    const total = subtotal + tax;

    if (posSubtotalEl) posSubtotalEl.textContent = formatCurrency(subtotal);
    if (posTaxEl) posTaxEl.textContent = formatCurrency(tax);
    if (posTotalEl) posTotalEl.textContent = formatCurrency(total);
  }

  document.querySelectorAll('.pay-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pay-option').forEach(function (b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      selectedPayment = btn.getAttribute('data-pay');
    });
  });

  if (posCompleteBtn) {
    posCompleteBtn.addEventListener('click', function () {
      if (Object.keys(cart).filter(function (id) { return cart[id] > 0; }).length === 0) return;
      posModal.classList.add('open');
      cart = {};
      renderCart();
    });
  }
  if (posModalClose) {
    posModalClose.addEventListener('click', function () { posModal.classList.remove('open'); });
  }
  if (posModal) {
    posModal.addEventListener('click', function (e) {
      if (e.target === posModal) posModal.classList.remove('open');
    });
  }

  /* ------------------------------------------------------------------ */
  /* 8. Inventory scene — table + status filters                          */
  /* ------------------------------------------------------------------ */

  const inventoryBody = document.getElementById('inventoryBody');
  const invFilters = document.getElementById('invFilters');
  let currentInventoryFilter = 'all';

  function statusBadge(status) {
    const map = {
      in: { cls: 'green', label: t('preview.inventory.inStock') },
      low: { cls: 'amber', label: t('preview.inventory.lowStock') },
      out: { cls: 'red', label: t('preview.inventory.outStock') }
    };
    const s = map[status];
    return '<span class="badge ' + s.cls + '">' + s.label + '</span>';
  }

  function renderInventory(filter) {
    if (!inventoryBody) return;
    currentInventoryFilter = filter || 'all';
    const rows = demoInventory.filter(function (row) {
      return currentInventoryFilter === 'all' || row.status === currentInventoryFilter;
    });

    inventoryBody.innerHTML = rows.map(function (row) {
      const name = currentLang === 'ar' ? row.ar : row.en;
      const unit = currentLang === 'ar' ? row.unit.ar : row.unit.en;
      return (
        '<tr>' +
          '<td class="strong">' + name + '</td>' +
          '<td>' + row.qty + '</td>' +
          '<td>' + unit + '</td>' +
          '<td>' + statusBadge(row.status) + '</td>' +
        '</tr>'
      );
    }).join('');
  }

  if (invFilters) {
    invFilters.querySelectorAll('.filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        invFilters.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        renderInventory(chip.getAttribute('data-filter'));
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 9. Products scene — card grid                                        */
  /* ------------------------------------------------------------------ */

  const productsGridEl = document.getElementById('productsGrid');

  function renderProductsGrid() {
    if (!productsGridEl) return;
    productsGridEl.innerHTML = demoProducts.map(function (p) {
      const name = currentLang === 'ar' ? p.ar : p.en;
      const initial = name.trim().charAt(0).toUpperCase();
      return (
        '<div class="product-card">' +
          '<div class="product-thumb" style="--swatch-a:' + p.swatch[0] + ';--swatch-b:' + p.swatch[1] + '">' + initial + '</div>' +
          '<b>' + name + '</b>' +
          '<div class="product-meta">' +
            '<span class="price">' + formatCurrency(p.price) + '</span>' +
            '<span class="qty">' + p.qty + '</span>' +
          '</div>' +
          '<div class="product-barcode">' + p.barcode + '</div>' +
        '</div>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* 10. Purchases scene — list                                           */
  /* ------------------------------------------------------------------ */

  const purchasesListEl = document.getElementById('purchasesList');

  function purchaseStatusBadge(status) {
    const map = {
      pending: { cls: 'amber', label: t('preview.purchases.pending') },
      received: { cls: 'green', label: t('preview.purchases.received') },
      cancelled: { cls: 'red', label: t('preview.purchases.cancelled') }
    };
    const s = map[status];
    return '<span class="badge ' + s.cls + '">' + s.label + '</span>';
  }

  function renderPurchases() {
    if (!purchasesListEl) return;
    purchasesListEl.innerHTML = demoPurchases.map(function (row) {
      const supplier = currentLang === 'ar' ? row.supAr : row.supEn;
      return (
        '<div class="purchase-row">' +
          '<span class="supplier">' + supplier + '</span>' +
          '<span class="date">' + row.date + '</span>' +
          '<span class="total">' + row.total + '</span>' +
          purchaseStatusBadge(row.status) +
        '</div>'
      );
    }).join('');
  }

  /* ------------------------------------------------------------------ */
  /* 11. Reports scene — animated bar chart                               */
  /* ------------------------------------------------------------------ */

  function animateReportChart() {
    document.querySelectorAll('#reportChart .chart-bar').forEach(function (bar) {
      const h = bar.getAttribute('data-h');
      bar.style.transform = 'scaleY(0)';
      // force reflow so the transition re-triggers every time the tab is opened
      void bar.offsetHeight;
      requestAnimationFrame(function () {
        bar.style.height = h + '%';
        bar.style.transform = 'scaleY(1)';
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 12. Flow diagram — sequential light-up on scroll                     */
  /* ------------------------------------------------------------------ */

  const flowDiagram = document.getElementById('flowDiagram');
  const flowFill = document.getElementById('flowFill');
  let flowPlayed = false;

  function playFlow() {
    if (flowPlayed || !flowDiagram) return;
    flowPlayed = true;
    const nodes = flowDiagram.querySelectorAll('.flow-node');
    if (flowFill) flowFill.style.width = '100%';
    nodes.forEach(function (node, i) {
      setTimeout(function () { node.classList.add('lit'); }, 220 * i + 200);
    });
  }

  if ('IntersectionObserver' in window && flowDiagram) {
    const flowIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { playFlow(); flowIo.disconnect(); }
      });
    }, { threshold: 0.4 });
    flowIo.observe(flowDiagram);
  } else {
    playFlow();
  }

  /* ------------------------------------------------------------------ */
  /* 13. Screenshots section — static preview switcher                    */
  /* ------------------------------------------------------------------ */

  const screenButtons = document.querySelectorAll('.preview-tab[data-screen]');
  const screenHost = document.getElementById('screenHost');
  let currentScreen = 'dashboard';

  function screenTemplate(key) {
    if (key === 'dashboard') {
      return (
        '<div class="reports-grid">' +
          '<div class="report-kpi"><span>' + t('preview.reports.totalSales') + '</span><b>142,850 DZD</b></div>' +
          '<div class="report-kpi"><span>' + t('preview.reports.invoiceCount') + '</span><b>96</b></div>' +
          '<div class="report-kpi"><span>' + t('preview.inventory.lowStock') + '</span><b>6</b></div>' +
        '</div>' +
        '<div class="report-chart"><div class="report-chart-head"><span>' + t('preview.reports.chartTitle') + '</span></div>' +
          '<div class="chart-bars">' +
            [45,60,52,78,66,92,84].map(function(h){ return '<div class="chart-bar-wrap"><div class="chart-bar" style="height:' + h + '%;transform:scaleY(1)"></div></div>'; }).join('') +
          '</div>' +
        '</div>' +
        '<p style="margin-top:18px;color:var(--text-dim);font-size:13.5px;">' + t('screens.dashboardCaption') + '</p>'
      );
    }
    if (key === 'pos') {
      return (
        '<div class="pos-products" style="grid-template-columns:repeat(4,1fr);">' +
          demoProducts.slice(0,4).map(function(p){
            const name = currentLang === 'ar' ? p.ar : p.en;
            return '<div class="pos-product" style="--swatch-a:' + p.swatch[0] + ';--swatch-b:' + p.swatch[1] + '"><span class="pos-product-swatch"></span><b>' + name + '</b><span>' + formatCurrency(p.price) + '</span></div>';
          }).join('') +
        '</div>' +
        '<p style="margin-top:18px;color:var(--text-dim);font-size:13.5px;">' + t('screens.posCaption') + '</p>'
      );
    }
    if (key === 'products') {
      return (
        '<div class="products-grid">' +
          demoProducts.slice(0,4).map(function(p){
            const name = currentLang === 'ar' ? p.ar : p.en;
            const initial = name.trim().charAt(0).toUpperCase();
            return '<div class="product-card"><div class="product-thumb" style="--swatch-a:' + p.swatch[0] + ';--swatch-b:' + p.swatch[1] + '">' + initial + '</div><b>' + name + '</b><div class="product-meta"><span class="price">' + formatCurrency(p.price) + '</span><span class="qty">' + p.qty + '</span></div></div>';
          }).join('') +
        '</div>' +
        '<p style="margin-top:18px;color:var(--text-dim);font-size:13.5px;">' + t('screens.productsCaption') + '</p>'
      );
    }
    // reports
    return (
      '<table class="data-table"><thead><tr>' +
        '<th>' + t('preview.inventory.colProduct') + '</th><th>' + t('preview.inventory.colQty') + '</th><th>' + t('preview.inventory.colStatus') + '</th>' +
      '</tr></thead><tbody>' +
        demoInventory.slice(0,5).map(function(row){
          const name = currentLang === 'ar' ? row.ar : row.en;
          return '<tr><td class="strong">' + name + '</td><td>' + row.qty + '</td><td>' + statusBadge(row.status) + '</td></tr>';
        }).join('') +
      '</tbody></table>' +
      '<p style="margin-top:18px;color:var(--text-dim);font-size:13.5px;">' + t('screens.reportsCaption') + '</p>'
    );
  }

  function renderScreen(key) {
    currentScreen = key;
    if (screenHost) screenHost.innerHTML = screenTemplate(key);
  }

  screenButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      screenButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      renderScreen(btn.getAttribute('data-screen'));
    });
  });

  /* ------------------------------------------------------------------ */
  /* 14. Download button                                                  */
  /* ------------------------------------------------------------------ */

  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.setAttribute('href', DOWNLOAD_URL === 'YOUR_DOWNLOAD_LINK' ? '#download' : DOWNLOAD_URL);
    downloadBtn.addEventListener('click', function (e) {
      if (DOWNLOAD_URL === 'YOUR_DOWNLOAD_LINK') {
        e.preventDefault();
        console.warn('Suqiure: set DOWNLOAD_URL in script.js before publishing.');
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 15. Init                                                             */
  /* ------------------------------------------------------------------ */

  applyTranslations();
  renderScreen('dashboard');

})();
