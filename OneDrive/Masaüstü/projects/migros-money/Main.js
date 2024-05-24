let mesaj = `
    Migrosa Hoşgeldiniz.
    Monay kartınız var mı?
    1-Evet
    2-Hayır
    `;

const urunler = [
  {
    urunAd: "Süt",
    fiyat: 45.99,
  },
  {
    urunAd: "Yumurta",
    fiyat: 78.97,
  },
  {
    urunAd: "Çilek",
    fiyat: 75.34,
  },
  {
    urunAd: "Zeytin Yağı",
    fiyat: 124.55,
  },
  {
    urunAd: "Süzme Peynir",
    fiyat: 155.89,
  },
];

let sonuc = confirm(mesaj);
let tutar;

if (sonuc) {
  //money kartı var
  let isim = prompt("Adınızı Giriniz: ");
  let soyisim = prompt("Soyadınızı Giriniz: ");

  const musteri = new Musteri(isim, soyisim, sonuc, urunler);
  tutar = musteri.hesapla();
  alert(`
    Müşteri Bilgileri: ${isim} ${soyisim}
    Ödenecek Tutar: ${tutar} TL'dir.
    `);
} else {
  //money kartı yok
  const musteri = new Musteri(null, null, sonuc, urunler);
  tutar = musteri.hesapla();
  alert(`
    Ödenecek Tutar: ${tutar} TL'dir.
    `);
}
