/* Tracking bersama: GA4 + Google Ads + Meta Pixel.
   Dimuat sebelum cart.js di index.html dan produk.html. */
window.TRACKING = (() => {
  /* Konversi Google Ads. Kosongkan? Tidak ada send_to yang dikirim, situs tetap normal.
     Setelah konversi "Webpage" dibuat di Google Ads, isi kedua nilai di bawah
     (Conversion ID + Conversion label dari tab Tag setup), lalu commit. */
  const ads = { id: '', label: '' };

  const punyaAds = () => /^AW-\d+$/.test(ads.id);

  /* P4: peta nomor WhatsApp outlet -> id outlet, supaya nama outlet ikut terkirim
     sebagai custom parameter `outlet` (daftar sebagai custom dimension di GA4). */
  const OUTLET_BY_WA = {
    '6285156338939': 'yogyakarta',
    '62895400927385': 'sleman',
    '628998000502': 'klaten',
    '6281220408070': 'madiun',
  };

  const nomorWa = (href) => {
    const m = /wa\.me\/(\d+)/.exec(href || '');
    return m ? m[1] : '';
  };

  /* Outlet dibaca berurutan dari: atribut data-outlet, nomor wa.me, akhiran
     data-wa-src (mis. nav_dropdown_klaten). Nomor utama tidak dipetakan. */
  function outletFrom(el, source) {
    if (el && el.dataset && el.dataset.outlet) return el.dataset.outlet;
    const dariNomor = OUTLET_BY_WA[nomorWa(el && el.getAttribute ? el.getAttribute('href') : '')];
    if (dariNomor) return dariNomor;
    const m = /(?:^|_)(yogyakarta|sleman|klaten|madiun)$/.exec(source || '');
    return m ? m[1] : '';
  }

  /* source  : penanda tombol asal, diambil dari atribut data-wa-src tiap link
     outlet  : id outlet (yogyakarta|sleman|klaten|madiun), '' untuk nomor utama
     value   : estimasi subtotal dalam rupiah, 0 bila tidak ada keranjang
     items   : jumlah item di keranjang */
  function trackLead({ source = 'wa_click', outlet = '', value = 0, items = 0 } = {}) {
    const p = { event_category: 'engagement', event_label: source };
    if (outlet) p.outlet = outlet;
    if (value > 0) p.value = Math.round(value);
    if (punyaAds()) p.send_to = ads.label ? ads.id + '/' + ads.label : ads.id;
    if (typeof gtag === 'function') gtag('event', 'generate_lead', p);

    const f = { content_name: source };
    if (outlet) f.outlet = outlet;
    if (value > 0) {
      f.value = Math.round(value);
      f.currency = 'IDR';
    }
    if (items > 0) f.num_items = items;
    if (typeof fbq === 'function') fbq('track', 'Lead', f);
  }

  function trackOutbound(source) {
    if (typeof gtag === 'function') {
      gtag('event', 'outbound_click', {
        event_category: 'external',
        event_label: source,
        transport_type: 'beacon',
      });
    }
  }

  document.addEventListener('click', (e) => {
    const wa = e.target.closest('a[href*="wa.me"]');
    if (wa) {
      if (wa.dataset.waSkip) return;
      const source = wa.dataset.waSrc || 'wa_click';
      trackLead({ source, outlet: outletFrom(wa, source) });
      return;
    }
    const shp = e.target.closest('a[href*="shopee.co.id"]');
    if (shp) trackOutbound(shp.dataset.waSrc || 'shopee_click');
  });

  return { trackLead, trackOutbound, ads };
})();
