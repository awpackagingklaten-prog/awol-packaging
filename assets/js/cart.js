// ===== KERANJANG PESANAN (Checkout via WhatsApp) =====
// Dipakai bersama oleh index.html & produk.html. Memerlukan assets/js/products.js (data PRODUCTS) yang dimuat lebih dulu.
// Isi keranjang & data pemesan disimpan di localStorage supaya tetap ada walau pindah halaman atau menutup tab.
// Outlet WAJIB dipilih sebelum pesanan dikirim, supaya pesan masuk ke outlet terdekat.

const CART_KEY = 'awol_cart_v1';
const CART_OUTLET_KEY = 'awol_cart_outlet_v1';
const CART_PEMESAN_KEY = 'awol_cart_pemesan_v1';

const OUTLET_PILIHAN = [
  { id: 'yogyakarta', nama: 'AWOL Packaging', kota: 'Yogyakarta', logo: 'logo-awol-packaging-yogyakarta.png', wa: '6285156338939' },
  { id: 'sleman', nama: 'AWOL Packaging', kota: 'Sleman', logo: 'logo-awol-packaging-sleman.png', wa: '62895400927385' },
  { id: 'klaten', nama: 'ADI WIJAYA Packaging', kota: 'Klaten', logo: 'logo-adi-wijaya-packaging-klaten.png', wa: '628998000502' },
  { id: 'madiun', nama: 'ASIA LESTARI Packaging', kota: 'Madiun', logo: 'logo-asia-lestari.png', wa: '6281220408070' },
];

// Kunci produk = nama file gambar tanpa ekstensi (ikut berubah otomatis bila data diedit)
const PRODUCT_BY_ID = {};
PRODUCTS.forEach((p) => { PRODUCT_BY_ID[p.image.replace(/\.[^.]+$/, '')] = p; });

// Kartu produk unggulan di beranda (index.html) berisi kategori, bukan varian katalog,
// jadi tidak ada di PRODUCTS. Supaya tetap bisa dimasukkan ke keranjang, daftarkan di sini.
const KATEGORI_BY_ID = {
  'kardus-kategori': { image: 'kardus-box.jpg', name: 'Kardus (berbagai varian)', price: 'Mulai Rp 900/pcs' },
  'lakban-kategori': { image: 'lakban-OPP.jpg', name: 'Lakban (berbagai varian)', price: 'Mulai Rp 1.500/roll' },
  'bubble-kategori': { image: 'bubble-mailer.jpg', name: 'Bubble Wrap (berbagai varian)', price: 'Mulai Rp 650/pcs' },
};

const produkById = (id) => PRODUCT_BY_ID[id] || KATEGORI_BY_ID[id] || null;

const cartRead = (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } };
const cartWrite = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

// Hanya id + qty yang disimpan; nama & harga selalu diambil dari PRODUCTS (selalu sinkron)
let cart = cartRead(CART_KEY, []).filter((it) => produkById(it.id));
let cartOutlet = cartRead(CART_OUTLET_KEY, '');
let pemesan = Object.assign({ nama: '', wa: '', alamat: '' }, cartRead(CART_PEMESAN_KEY, {}));

const hargaAngka = (harga) => {
  const m = String(harga).match(/[\d][\d.,]*/);
  return m ? parseInt(m[0].replace(/[.,]/g, ''), 10) : 0;
};
const hargaSatuan = (harga) => (String(harga).split('/')[1] || '').trim();
const rupiah = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const totalItem = () => cart.reduce((t, it) => t + it.qty, 0);
const totalSub = () => cart.reduce((t, it) => t + hargaAngka(produkById(it.id).price) * it.qty, 0);
// Harga varian tanpa angka (mis. "Hubungi Kami") tetap ditampilkan apa adanya
const labelHarga = (harga) => (hargaAngka(harga) ? rupiah(hargaAngka(harga)) : harga);
const labelSubtotal = () => (totalSub() > 0 ? rupiah(totalSub()) : 'Sesuai konfirmasi outlet');
const angkaWa = (v) => String(v).replace(/\D/g, '');

const IKON_KERANJANG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 004.6 19H19a2 2 0 002-2v-3"/></svg>';
const IKON_WA = '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.613.613l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.319 0-4.478-.665-6.32-1.81l-.44-.27-2.633.878.878-2.633-.27-.44A9.965 9.965 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>';

const INPUT_PEMESAN = 'w-full px-3 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-brand-600 focus:ring-1 focus:ring-brand-600';

// Posisi tombol melayang: 'left' di halaman utama, 'right' di katalog (data-cart-fab pada <body>)
const FAB_KIRI = document.body.dataset.cartFab === 'left';
const kelasFab = FAB_KIRI
  ? 'fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 bg-brand-600 text-white py-3.5 pl-4 pr-5 rounded-full shadow-xl shadow-brand-600/30 hover:bg-brand-700 transition'
  : 'fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 bg-brand-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-xl shadow-brand-600/30 hover:bg-brand-700 transition';

document.body.insertAdjacentHTML('beforeend', `
  <!-- KERANJANG PESANAN (dibuat oleh assets/js/cart.js) -->
  <div id="cart-overlay" class="hidden fixed inset-0 z-[60] bg-black/50"></div>
  <aside id="cart-panel" class="hidden fixed top-0 right-0 z-[70] h-full w-full sm:max-w-md bg-white shadow-2xl flex flex-col" aria-label="Keranjang pesanan">
    <div class="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
      <span class="w-5 h-5 text-brand-600">${IKON_KERANJANG}</span>
      <h3 class="font-bold text-lg text-gray-900">Keranjang</h3>
      <span id="cart-count-head" class="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">0 item</span>
      <button id="cart-close" aria-label="Tutup keranjang" class="ml-auto p-2 rounded-full text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div id="cart-items" class="flex-1 overflow-y-auto px-5"></div>
    <div class="border-t border-gray-100 px-5 py-4 space-y-3 max-h-[75vh] overflow-y-auto">
      <div>
        <p class="text-xs font-bold text-gray-500 uppercase tracking-wide">Data Pemesan <span class="text-red-500">*</span></p>
        <div class="mt-2 space-y-2">
          <input id="cart-nama" type="text" autocomplete="name" placeholder="Nama lengkap" class="${INPUT_PEMESAN} border-gray-200" />
          <input id="cart-wa" type="tel" autocomplete="tel" placeholder="Nomor WhatsApp (contoh: 0812-3456-7890)" class="${INPUT_PEMESAN} border-gray-200" />
          <textarea id="cart-alamat" rows="2" placeholder="Alamat lengkap pengiriman" class="${INPUT_PEMESAN} border-gray-200 resize-none"></textarea>
        </div>
        <p id="cart-warn-pemesan" class="hidden mt-2 text-xs font-semibold text-red-600">Lengkapi nama, nomor WhatsApp, dan alamat lengkap terlebih dahulu.</p>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wide">Pilih Outlet <span class="text-red-500">*</span></p>
          <p class="text-[11px] text-gray-400">WAJIB sebelum kirim</p>
        </div>
        <div id="cart-outlets" class="grid grid-cols-2 gap-2 mt-2"></div>
        <p id="cart-warn" class="hidden mt-2 text-xs font-semibold text-red-600">Silakan pilih outlet terlebih dahulu supaya pesanan dikirim ke outlet terdekat.</p>
      </div>
      <div class="flex items-center justify-between pt-1">
        <span class="text-sm text-gray-500">Subtotal estimasi</span>
        <span id="cart-subtotal" class="text-lg font-extrabold text-brand-600">Rp 0</span>
      </div>
      <p class="text-[11px] text-gray-400 leading-relaxed">Harga bersifat estimasi &quot;mulai&quot;. Harga final, ketersediaan stok, dan ongkir dikonfirmasi oleh outlet.</p>
      <button id="cart-send" class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold transition bg-gray-100 text-gray-400">Keranjang Kosong</button>
      <button id="cart-clear" class="hidden w-full text-xs font-semibold text-gray-400 hover:text-red-500 transition">Kosongkan keranjang</button>
    </div>
  </aside>

  <!-- Tombol keranjang mengambang -->
  <button id="cart-fab" class="${kelasFab}" aria-label="Buka keranjang">
    <span class="relative flex">
      <span class="w-5 h-5">${IKON_KERANJANG}</span>
      <span class="cart-badge hidden absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-brand-600 text-[10px] font-bold items-center justify-center">0</span>
    </span>
    <span class="text-sm font-bold">Keranjang</span>
  </button>

  <!-- Notifikasi singkat -->
  <div id="cart-toast" class="hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl"></div>
`);

const cartPanel = document.getElementById('cart-panel');
const cartOverlay = document.getElementById('cart-overlay');
const cartList = document.getElementById('cart-items');
const cartOutlets = document.getElementById('cart-outlets');
const cartSend = document.getElementById('cart-send');
const cartWarn = document.getElementById('cart-warn');
const cartWarnPemesan = document.getElementById('cart-warn-pemesan');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartCountHead = document.getElementById('cart-count-head');
const cartClear = document.getElementById('cart-clear');
const cartToast = document.getElementById('cart-toast');
const inputNama = document.getElementById('cart-nama');
const inputWa = document.getElementById('cart-wa');
const inputAlamat = document.getElementById('cart-alamat');
const btnSiap = 'bg-[#25D366] text-white hover:bg-[#1eb455] shadow-lg';
const btnKunci = 'bg-gray-100 text-gray-400';
let toastTimer = null;

inputNama.value = pemesan.nama;
inputWa.value = pemesan.wa;
inputAlamat.value = pemesan.alamat;

function toast(pesan) {
  cartToast.textContent = pesan;
  cartToast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => cartToast.classList.add('hidden'), 2200);
}

function renderCart() {
  const jml = totalItem();
  document.querySelectorAll('.cart-badge').forEach((b) => {
    b.textContent = jml;
    b.classList.toggle('hidden', jml === 0);
    b.classList.toggle('flex', jml > 0);
  });
  cartCountHead.textContent = jml + ' item';
  cartSubtotal.textContent = cart.length ? labelSubtotal() : 'Rp 0';

  cartList.innerHTML = cart.length
    ? cart.map((it) => {
        const p = produkById(it.id);
        return `
        <div class="flex gap-3 py-3 border-b border-gray-100">
          <img src="${p.image}" alt="${p.name}" class="w-14 h-14 rounded-xl object-cover shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-gray-900 leading-snug">${p.name}</p>
            <p class="text-xs text-gray-500">${p.price}</p>
            <div class="flex items-center gap-2 mt-2">
              <button data-dec="${it.id}" aria-label="Kurangi jumlah" class="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:border-brand-600 hover:text-brand-600 transition leading-none">−</button>
              <span class="text-sm font-bold text-gray-900 w-6 text-center">${it.qty}</span>
              <button data-inc="${it.id}" aria-label="Tambah jumlah" class="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:border-brand-600 hover:text-brand-600 transition leading-none">+</button>
              <button data-del="${it.id}" class="ml-auto text-xs font-semibold text-gray-400 hover:text-red-500 transition">Hapus</button>
            </div>
          </div>
        </div>`;
      }).join('')
    : `
      <div class="text-center py-14">
        <span class="w-12 h-12 mx-auto text-gray-300 mb-3 block">${IKON_KERANJANG}</span>
        <p class="text-sm font-semibold text-gray-900">Keranjang masih kosong</p>
        <p class="text-xs text-gray-500 mt-1">Pilih produk, isi data pemesan, lalu tentukan outlet pengiriman.</p>
        <button data-isi-katalog class="mt-5 inline-flex items-center gap-1.5 bg-brand-600 text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-brand-700 transition">
          Lihat Produk
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>`;

  cartOutlets.innerHTML = OUTLET_PILIHAN.map((o) => `
    <button data-outlet="${o.id}" class="flex items-center gap-2 p-2 rounded-xl border text-left transition ${o.id === cartOutlet ? 'border-brand-600 bg-brand-50 ring-1 ring-brand-600' : 'border-gray-200 hover:border-brand-300 hover:bg-gray-50'}">
      <img src="${o.logo}" alt="${o.nama} ${o.kota}" class="w-8 h-8 rounded-full object-contain bg-gray-200 p-0.5 shrink-0" />
      <span class="min-w-0">
        <span class="block text-[11px] font-bold text-gray-900 leading-tight truncate">${o.nama}</span>
        <span class="block text-[11px] text-gray-500">${o.kota}</span>
      </span>
    </button>`).join('');

  const outletTerpilih = OUTLET_PILIHAN.some((o) => o.id === cartOutlet);
  const siapKirim = Boolean(cart.length && outletTerpilih);
  cartSend.className = 'w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold transition '
    + (siapKirim ? btnSiap : btnKunci);
  cartSend.innerHTML = !cart.length
    ? 'Keranjang Kosong'
    : (siapKirim ? IKON_WA + ' Kirim Pesanan via WhatsApp' : 'Lengkapi Data & Pilih Outlet');
  cartClear.classList.toggle('hidden', !cart.length);
  cartWarn.classList.toggle('hidden', outletTerpilih || !cart.length);
  cartWarnPemesan.classList.add('hidden');
}

function addToCart(id) {
  const p = produkById(id);
  if (!p) return;
  const item = cart.find((it) => it.id === id);
  if (item) item.qty = Math.min(9999, item.qty + 1);
  else cart.push({ id: id, qty: 1 });
  cartWrite(CART_KEY, cart);
  renderCart();
  gtag('event', 'add_to_cart', {
    currency: 'IDR',
    value: hargaAngka(p.price),
    items: [{ item_id: id, item_name: p.name, price: hargaAngka(p.price), quantity: 1 }],
  });
  toast(p.name + ' masuk keranjang');
}

function updateQty(id, delta) {
  const it = cart.find((x) => x.id === id);
  if (!it) return;
  it.qty = Math.max(1, Math.min(9999, it.qty + delta));
  cartWrite(CART_KEY, cart);
  renderCart();
}

function openCart() {
  renderCart();
  cartOverlay.classList.remove('hidden');
  cartPanel.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeCart() {
  cartOverlay.classList.add('hidden');
  cartPanel.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
}

// Nama, nomor WhatsApp, dan alamat lengkap wajib diisi sebelum pesanan dikirim
function validasiPemesan() {
  pemesan = {
    nama: inputNama.value.trim(),
    wa: inputWa.value.trim(),
    alamat: inputAlamat.value.trim(),
  };
  cartWrite(CART_PEMESAN_KEY, pemesan);
  const nomor = angkaWa(pemesan.wa);
  const galat = pemesan.nama.length < 2
    || nomor.length < 9 || nomor.length > 15
    || pemesan.alamat.length < 5;
  [inputNama, inputWa, inputAlamat].forEach((el) => el.classList.remove('border-red-400', 'focus:border-red-400', 'focus:ring-red-400'));
  if (galat) {
    if (pemesan.nama.length < 2) inputNama.classList.add('border-red-400');
    if (nomor.length < 9 || nomor.length > 15) inputWa.classList.add('border-red-400', 'focus:border-red-400', 'focus:ring-red-400');
    if (pemesan.alamat.length < 5) inputAlamat.classList.add('border-red-400');
    cartWarnPemesan.classList.remove('hidden');
    return false;
  }
  cartWarnPemesan.classList.add('hidden');
  return true;
}

// Tambah produk dari kartu katalog (index.html & produk.html)
document.addEventListener('click', (e) => {
  const tambah = e.target.closest('[data-add]');
  if (tambah) {
    addToCart(tambah.dataset.add);
    return;
  }
  if (e.target.closest('[data-isi-katalog]')) {
    closeCart();
    if (document.getElementById('kategori-produk')) {
      document.getElementById('kategori-produk').scrollIntoView({ behavior: 'smooth' });
    } else {
      location.href = 'produk.html#kategori-produk';
    }
  }
});

// Ubah jumlah / hapus item di dalam keranjang
cartList.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  if (btn.dataset.inc) updateQty(btn.dataset.inc, 1);
  else if (btn.dataset.dec) updateQty(btn.dataset.dec, -1);
  else if (btn.dataset.del) {
    cart = cart.filter((x) => x.id !== btn.dataset.del);
    cartWrite(CART_KEY, cart);
    renderCart();
  }
});

// Pilih outlet
cartOutlets.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-outlet]');
  if (!btn) return;
  cartOutlet = btn.dataset.outlet;
  cartWrite(CART_OUTLET_KEY, cartOutlet);
  renderCart();
});

// Simpan data pemesan saat diketik
[inputNama, inputWa, inputAlamat].forEach((el) => el.addEventListener('input', () => {
  cartWrite(CART_PEMESAN_KEY, { nama: inputNama.value, wa: inputWa.value, alamat: inputAlamat.value });
}));

cartClear.addEventListener('click', () => {
  cart = [];
  cartWrite(CART_KEY, cart);
  renderCart();
});

// Kirim ringkasan pesanan ke WhatsApp outlet yang dipilih
cartSend.addEventListener('click', () => {
  if (!cart.length) return;
  const outlet = OUTLET_PILIHAN.find((o) => o.id === cartOutlet);
  if (!outlet) {
    cartWarn.classList.remove('hidden');
    return;
  }
  if (!validasiPemesan()) {
    inputNama.focus();
    return;
  }
  const baris = cart.map((it, i) => {
    const p = produkById(it.id);
    const sat = hargaSatuan(p.price);
    return `${i + 1}. ${p.name} x ${it.qty}${sat ? ' ' + sat : ''} @ ${labelHarga(p.price)}${sat ? '/' + sat : ''}`;
  });
  const pesan = [
    `Halo ${outlet.nama} ${outlet.kota},`,
    'saya ingin memesan produk packaging berikut:',
    '',
    baris.join('\n'),
    '',
    `Total: ${totalItem()} item`,
    `Subtotal estimasi: ${labelSubtotal()}`,
    '',
    'Data Pemesan:',
    `Nama: ${pemesan.nama}`,
    `No. WhatsApp: ${pemesan.wa}`,
    `Alamat: ${pemesan.alamat}`,
    '',
    'Mohon kindly dikonfirmasi harga final, ketersediaan stok, dan ongkirnya. Terima kasih.',
  ].join('\n');
  const a = document.createElement('a');
  a.href = 'https://wa.me/' + outlet.wa + '?text=' + encodeURIComponent(pesan);
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('Pesanan dikirim ke WhatsApp ' + outlet.kota);
});

// Buka / tutup panel keranjang
document.querySelectorAll('.cart-trigger').forEach((b) => b.addEventListener('click', (e) => {
  e.preventDefault();
  openCart();
}));
document.getElementById('cart-fab').addEventListener('click', openCart);
document.getElementById('cart-close').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

renderCart();
if (location.hash === '#keranjang') setTimeout(openCart, 250);
