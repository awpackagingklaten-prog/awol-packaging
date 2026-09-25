// ===== DATA PRODUK (CV. ADI WIJAYA LANGGENG) =====
// Dipakai bersama oleh index.html & produk.html (katalog + keranjang).
// Ganti nama/deskripsi/harga varian cukup edit 'name', 'desc', 'price' di bawah. Urutan = urutan tampil.
// Untuk menambah produk: salin satu baris PRODUCTS & sesuaikan category/image/name/desc/price.
// 'image' juga jadi id produk di keranjang (nama file tanpa ekstensi) - jangan diubah tanpa menyesuaikan foto.

const FILTERS = [
  { id: 'semua', label: 'Semua' },
  { id: 'kardus', label: 'Kardus' },
  { id: 'bubble', label: 'Bubble Wrap' },
  { id: 'foam', label: 'Foam' },
  { id: 'lakban', label: 'Lakban' },
  { id: 'plastik', label: 'Plastik' },
  { id: 'tali', label: 'Tali & Rakitan' },
  { id: 'aksesoris', label: 'Aksesoris Lainnya' },
];

const PRODUCTS = [
  { category: 'kardus', image: 'kardus-single-face.jpg', name: 'Kardus — Single Face', desc: 'Fleksibel, ringan, dan efektif menyerap benturan untuk membungkus barang berukuran tidak beraturan atau digunakan sebagai bantalan pelindung tambahan.', price: 'Mulai Rp 11.000/kg', wa: 'kardus' },
  { category: 'kardus', image: 'kardus-box.jpg', name: 'Kardus — Box (Bisa Custom)', desc: 'Praktis, efisien, dan dapat disesuaikan dengan dimensi produk Anda untuk memberikan perlindungan standar yang rapi serta hemat biaya pengiriman.', price: 'Mulai Rp 900/pcs', wa: 'kardus' },
  { category: 'kardus', image: 'kardus-lembaran.jpg', name: 'Kardus — Lembaran (Bisa Custom)', desc: 'Ekstra tebal, sangat kokoh, dan tahan tumpukan berat, ideal digunakan sebagai penyekat, alas palet, atau bahan pembungkus barang berat.', price: 'Mulai Rp 3.000/pcs', wa: 'kardus' },
  { category: 'kardus', image: 'kardus-honeycomb.jpg', name: 'Kardus — Honeycomb (Bisa Custom)', desc: 'Struktur sarang lebah yang ringan namun sangat kuat, ideal untuk bantalan, alas palet, dan pengganti kayu karena tahan tekanan tinggi.', price: 'Mulai Rp 6.000/lembar', wa: 'kardus' },
  { category: 'bubble', image: 'bubble-roll.jpg', name: 'Bubble Wrap — Roll Utuh (Grosir)', desc: '(Free Req Potong max 6 bagian) Paling hemat untuk usaha besar, stok melimpah, dan ukuran potong bisa disesuaikan kebutuhan packing.', price: 'Mulai Rp 90.000/roll', wa: 'bubble%20wrap' },
  { category: 'bubble', image: 'bubble-alumunium-foil.jpg', name: 'Bubble Wrap — Alumunium Foil', desc: 'Mampu meredam panas dan benturan maksimal, ideal untuk efisiensi insulasi bangunan (atap/dinding) maupun perlindungan ekstra pengiriman barang.', price: 'Mulai Rp 18.000/roll', wa: 'bubble%20wrap' },
  { category: 'bubble', image: 'bubble-inflatable.jpg', name: 'Bubble Wrap — Inflatable/ Poly Air', desc: 'Pelindung bantalan udara ekstra tebal dan tahan benturan, ideal untuk mengamankan barang pecah belah atau produk bernilai tinggi saat pengiriman.', price: 'Mulai Rp 2.500/roll', wa: 'bubble%20wrap' },
  { category: 'bubble', image: 'bubble-meteran.jpg', name: 'Bubble Wrap — Meteran', desc: 'Fleksibel beli sesuai kebutuhan tanpa sisa, pas untuk packing rumahan atau skala sedang.', price: 'Mulai Rp 3.000/meter', wa: 'bubble%20wrap' },
  { category: 'bubble', image: 'bubble-potongan.jpg', name: 'Bubble Wrap — Potongan', desc: 'Serba praktis dan hemat waktu, cocok untuk barang ukuran standar tanpa perlu repot menggunting.', price: 'Mulai Rp 10.000/potong', wa: 'bubble%20wrap' },
  { category: 'bubble', image: 'bubble-mailer.jpg', name: 'Bubble Wrap — Amplop/ Bubble Mailer', desc: 'Amplop pelindung tahan air dan siap rekat, simpel tanpa butuh lakban.', price: 'Mulai Rp 650/pcs', wa: 'bubble%20wrap' },
  { category: 'foam', image: 'foam-bounded.jpg', name: 'Foam — Ecer Meteran', desc: 'Foam bantalan berbagai ukuran, mulai dari 0,5mm sampai 5cm untuk melindungi barang rapuh dari benturan saat pengiriman.', price: 'Mulai Rp 2.000/meter', wa: 'foam' },
  { category: 'foam', image: 'foam-bounded-2.jpg', name: 'Foam — Bounded (Lembaran)', desc: 'Varian ekstra padat dan tahan kempes yang mampu menopang beban berat secara maksimal.', price: 'Mulai Rp 150.000/lembar', wa: 'foam' },
  { category: 'foam', image: 'foam-pe-sheet.jpg', name: 'PE Foam / Foam Sheet (Roll)', desc: 'Varian empuk, ringan, dan fleksibel yang mudah dipotong untuk berbagai pelapis serta kerajinan.', price: 'Mulai Rp 150.000/Roll', wa: 'foam' },
  { category: 'lakban', image: 'lakban-OPP.jpg', name: 'Lakban — OPP Clear & Tan', desc: 'Daya rekat kuat dan tidak mudah putus, standar utama untuk menyegel dus dengan rapi dan aman.', price: 'Mulai Rp 1.500/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-fragile.jpg', name: 'Lakban — Fragile & Unboxing', desc: 'Memberi peringatan ekstra pada kurir sekaligus wajib rekam unboxing untuk keamanan paket.', price: 'Mulai Rp 7.000/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-double.jpg', name: 'Lakban — Double Tape', desc: 'Perekat dua sisi untuk memasang poster, karpet, dekorasi, hingga jilid dokumen.', price: 'Mulai Rp 2.500/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-double-tape-tebal-transparant.jpg', name: 'Lakban — Double Tape Tebal Transparan', desc: 'Double tape super tebal dan tembus pandang dengan daya rekat ekstra kuat untuk benda lebih berat.', price: 'Mulai Rp 15.000/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-double-tape-foam.jpg', name: 'Lakban — Double Tape Foam', desc: 'Perekat dua sisi berbusa sebagai bantalan anti-getar untuk aksesoris, spanduk, dan dekorasi.', price: 'Mulai Rp 2.300/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-kertas.jpg', name: 'Lakban — Kertas (Masking Tape)', desc: 'Mudah disobek dan dilepas tanpa meninggalkan bekas, aman untuk pengecatan dan permukaan halus.', price: 'Mulai Rp 3.000/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-alumunium-foil.jpg', name: 'Lakban — Alumunium Foil', desc: 'Tahan panas dan kedap udara, ideal untuk sambungan ducting, kabel, dan perbaikan kebocoran ringan.', price: 'Mulai Rp 17.500/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-anti-bocor.jpg', name: 'Lakban — Anti Bocor (Waterproof)', desc: 'Perekat kuat tahan air untuk menutup kebocoran pipa, atap, dan sambungan bahkan di cuaca ekstrem.', price: 'Mulai Rp 5.000/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-clout-tape.jpg', name: 'Lakban — Clout / Cloth Tape', desc: 'Bahan kain yang kuat, tahan air dan abrasi, serbaguna untuk perbaikan darurat, ducting, dan kabel.', price: 'Mulai Rp 4.000/roll', wa: 'lakban' },
  { category: 'lakban', image: 'lakban-police-line.jpg', name: 'Lakban — Police Line', desc: 'Tanda area kuning-hitam untuk pengamanan lokasi dan manajemen area kerja.', price: 'Mulai Rp 6.000/roll', wa: 'lakban' },
  { category: 'lakban', image: 'isolasi-listrik.jpg', name: 'Isolasi Listrik (Electrical Tape)', desc: 'Isolasi PVC kedap listrik untuk menyambung dan mengisolasi kabel agar instalasi tetap aman.', price: 'Mulai Rp 1.700/roll', wa: 'lakban' },
  { category: 'plastik', image: 'plastik-wrapping.jpg', name: 'Plastik — Wrapping/ SCF', desc: 'Lentur dan erat, efektif melilit dus/paket dari debu dan air.', price: 'Mulai Rp 24.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-polymailer.jpg', name: 'Plastik — Polymailer (Bisa Custom Sablon)', desc: 'Praktis, tahan air, dan langsung rekat aman tanpa lakban.', price: 'Mulai Rp 160/pcs', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-klip.jpg', name: 'Plastik — Klip', desc: 'Solusi praktis dan ekonomis untuk menyimpan benda-benda kecil atau porsi mini agar tetap rapi, terorganisir, dan terlindung dari debu serta kelembapan.', price: 'Mulai Rp 15.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-pouch.jpg', name: 'Plastik — Pouch', desc: 'Kemasan fleksibel berkapasitas lebih besar yang dirancang untuk menjaga higienitas, kesegaran, dan kualitas produk (seperti makanan atau bubuk) agar tampilan lebih menarik dan tahan lama.', price: 'Mulai Rp 15.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-ziplock.jpg', name: 'Plastik — Ziplock', desc: 'Plastik tebal dengan penyegel kuat yang reusable (dapat dipakai berulang kali), ideal untuk kedap udara, mencegah kebocoran, serta melindungi barang bawaan atau stok bahan secara maksimal.', price: 'Mulai Rp 15.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-clingwrap.jpg', name: 'Plastik — Wrapping Food Grade', desc: 'Higienis dan aman untuk makanan, menjaga kesegaran buah/daging.', price: 'Mulai Rp 15.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-hdpe.jpg', name: 'Plastik — HDPE', desc: 'Tahan panas dan tidak mudah sobek, cocok untuk barang berat.', price: 'Mulai Rp 25.000/pack', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-trash-bag.jpg', name: 'Plastik — Trash Bag', desc: 'Tebal, kuat menampung beban, dan tidak mudah bocor.', price: 'Mulai Rp 25.000/pack', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-karung.jpg', name: 'Plastik — Karung', desc: 'Ekstra kuat dan tahan banting, ideal untuk menampung, menyimpan, dan mengangkut beban berat atau komoditas kapasitas besar.', price: 'Mulai Rp 25.000/pack', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-srink.jpg', name: 'Plastik — Shrink', desc: 'Menyusut saat dipanaskan, membungkus rapat mengikuti bentuk produk.', price: 'Mulai Rp 45.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-vacum-embos.jpg', name: 'Plastik — Vacuum Embos', desc: 'Mengunci udara dari kemasan agar produk lebih awet saat disimpan.', price: 'Mulai Rp 20.000/roll', wa: 'plastik' },
  { category: 'plastik', image: 'plastik-kresek.jpg', name: 'Plastik — Kantong Kresek', desc: 'Ekonomis, kuat, dan praktis untuk belanjaan sehari-hari.', price: 'Mulai Rp 5.000/pack', wa: 'plastik' },
  { category: 'tali', image: 'tali-straping-band.jpg', name: 'Tali — Straping Band', desc: 'Ekstra kuat dan kaku, ideal untuk mengikat dus berat, palet, atau beban besar agar tidak bergeser saat pengiriman.', price: 'Mulai Rp 115.000/roll', wa: 'tali' },
  { category: 'tali', image: 'tali-rafia.jpg', name: 'Tali — Rafia', desc: 'Ekonomis, lentur, dan serbaguna untuk kebutuhan ikat harian atau paket skala ringan hingga sedang.', price: 'Mulai Rp 18.000/roll', wa: 'tali' },
  { category: 'aksesoris', image: 'aksesoris-thermal-resi.jpg', name: 'Thermal Resi Sticker', desc: 'Tinta jelas tanpa pita/ribbon, tinggal tempel tanpa lem, dan tahan percikan air untuk cetak resi pengiriman cepat.', price: 'Mulai Rp 17.000/roll', wa: 'aksesoris%20packaging' },
  { category: 'aksesoris', image: 'aksesoris-thermal-roll.jpg', name: 'Thermal Roll Kertas', desc: 'Hasil cetak tajam dan presisi, pas untuk mesin kasir (POS) maupun struk pembayaran tanpa perlu isi ulang tinta.', price: 'Mulai Rp 15.000/roll', wa: 'aksesoris%20packaging' },
  { category: 'aksesoris', image: 'aksesoris-hvs.jpg', name: 'Kertas HVS', desc: 'Putih bersih, tebal merata, dan anti-macet di mesin cetak, ideal untuk dokumen resmi, nota, atau cetak harian.', price: 'Mulai Rp 45.000/rim', wa: 'aksesoris%20packaging' },
  { category: 'aksesoris', image: 'aksesoris-masker.jpg', name: 'Masker', desc: 'Melindungi dari debu dan percikan saat packing, nyaman dipakai.', price: 'Mulai Rp 30.000/Box', wa: 'aksesoris%20packaging' },
  { category: 'aksesoris', image: 'aksesoris-hair-net.jpg', name: 'Hair Net', desc: 'Menahan rambut agar bersih dan higienis saat menangani makanan.', price: 'Mulai Rp 35.000/box', wa: 'aksesoris%20packaging' },
  { category: 'aksesoris', image: 'aksesoris-sarung-tangan-latex.jpg', name: 'Sarung Tangan Latex', desc: 'Aman untuk kontak makanan, fleksibel dan tidak mudah robek.', price: 'Mulai Rp 69.000/box', wa: 'aksesoris%20packaging' },
];

// Deskripsi cadangan bila varian tidak punya 'desc' sendiri (edit di atas per varian)
const PRODUCT_DESC = {
  kardus: 'Kardus single/double wall, Box, Lembaran berbagai ukuran. Cocok untuk pengiriman & penyimpanan.',
  bubble: 'Perlindungan barang rapuh saat pengiriman. Tersedia berbagai ketebalan & Ukuran (Free Req Potong Max 6 Bagian).',
  lakban: 'Lakban OPP, Fragile, Double Tape, Masking Tape, Clout Tape, Alumunium Foil, Anti Bocor, Police Line, Isolasi Listrik, Dll. Kuat dan banyak varian untuk segala kebutuhan.',
  plastik: 'Plastik Wrapping, HDPE, Clingwrap dan masih banyak lagi sesuai kebutuhan Anda.',
  foam: 'Busa berkualitas tinggi yang tahan lama dan fleksibel untuk memenuhi berbagai kebutuhan industri, mebel, maupun rumah tangga.',
  tali: 'Strapping band, Tali Rafia untuk pengikat & pengaman kargo.',
  aksesoris: 'Thermal label, Resi, Struk Kertas dan perlengkapan packing lainnya.',
};
