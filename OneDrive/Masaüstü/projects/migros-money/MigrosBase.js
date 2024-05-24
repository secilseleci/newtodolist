class MigrosBase {
  indirimOrani = 20;
  constructor(isim, soyisim, kartVarmi, urunler) {
    this.isim = isim;
    this.soyisim = soyisim;
    this.kartVarmi = kartVarmi;
    this.urunler = urunler;
  }

  //ürünler listesini kontrol eden fonksiyon
  urunleriKontrolEt(urunler) {
    if (urunler != null && urunler.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  //tutar hesaplama
  hesapla() {
    let tutar = 0;

    if (this.urunleriKontrolEt(this.urunler)) {
      //sepetim dolu

      if (this.kartVarmi) {
        urunler.forEach(
          (urun) => (tutar += (urun.fiyat * (100 - this.indirimOrani)) / 100)
        );
      } else {
        urunler.forEach((urun) => (tutar += urun.fiyat));
      }
    } else {
      alert("En az bir adet ürün eklemelisiniz.");
    }
    return tutar;
  }
}
