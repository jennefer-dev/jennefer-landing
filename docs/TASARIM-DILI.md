# Jennefer landing page tasarım dili

Bu belge, **şu anda `app/page.tsx` içinde kullanılan** landing page'in görsel ve etkileşim kurallarını başka bir projede yeniden kurmak için hazırlanmıştır. Marka adı, metinler, ekran görüntüleri ve ürün iddiaları yeni projeye göre değişebilir; aşağıdaki kurallar görsel dili taşır. Repoda kullanılmayan eski bileşenler ve kökteki `SKILL.md` farklı renk ve tipografi önerileri içerdiği için bu belgeye kaynak alınmadı.

## 1. Tasarımın karakteri

**Editoryal anlatım + teknik arayüz.** İlk bakışta büyük ve sakin başlıklar görülür. Yakından bakınca numaralı bölümler, ince çizgiler, mono etiketler, ürün ekranları ve küçük durum göstergeleri ortaya çıkar. Arayüz neredeyse tek renklidir; derinlik renk patlamasıyla değil, ton farkı, boşluk, çizgi ve düşük yoğunluklu ışıkla sağlanır.

Beş temel ilke:

1. **Bir ekranda bir ana fikir:** Başlık baskındır, açıklama kısa ve dar bir sütundadır.
2. **Koyu tonlarda katman:** Sayfa, bölüm ve kart yüzeyleri birkaç yakın siyah tonuyla ayrılır.
3. **Geniş ölçek farkı:** Çok büyük başlıkların yanında 10–12 px mono bilgi etiketleri kullanılır.
4. **Çizgisel geometri:** İnce kenarlıklar, keskin veya hafif yuvarlatılmış köşeler, dört sütunlu kılavuz çizgileri.
5. **Hareket anlatıyı destekler:** Kaydırma ile bölüm açılır, içerik belirir ve ürün örneği değişir; sürekli parlayan dekorlar ana araç değildir.

## 2. Renk sistemi

Kodda renkler çoğunlukla doğrudan yazılmıştır. Yeni projede bunları merkezi token'lara toplayın.

| Rol | Değer | Kullanım |
| --- | --- | --- |
| Sayfa zemini | `#090a0c` | Gövde, hero, header, footer |
| Bölüm zemini | `#0b0c0e` / `#101010` | Bölümler ve kaydırma sahneleri |
| Yükseltilmiş yüzey | `#151619` / `#1b1b1b` | Form, panel, kart |
| Hover yüzeyi | `#262626` / `#272727` | Seçilebilir satır ve kart hover'ı |
| Ana metin | `#f0f0f1` / `#f1f1f1` | Başlık ve güçlü vurgu |
| İkincil metin | `#b8bac1` / `#b6b8bf` | Açıklama ve alan etiketi |
| Üçüncül metin | `#9b9da5` / `#999ba3` | Yardımcı bilgi ve alt bilgi |
| Açık CTA | `#e5e5e7` | Birincil buton zemini |
| CTA yazısı | `#101114` | Açık buton üzerindeki yazı |
| İnce çizgi | `rgba(255,255,255,.10)`–`.20` | Ayırıcı ve panel kenarı |

Renk kullanımı: Aynı ekranda çoğunlukla siyah, gri ve kırık beyaz kalsın. Ana CTA, koyu zemin üzerinde açık bir dikdörtgen olarak ayrışsın. Dekoratif radyal ışık beyazın yaklaşık `%3–5` opaklığıyla uygulansın. Fotoğraf, video ve ürün görsellerinde gri tonlu görünüm tercih edilir. İçerik içinde gerekli durum renkleri kullanılabilir, ancak ana marka paletini ele geçirmemelidir.

```css
:root {
  --bg: #090a0c;
  --bg-section: #0b0c0e;
  --surface: #151619;
  --surface-hover: #262626;
  --text: #f0f0f1;
  --text-muted: #b8bac1;
  --text-subtle: #9b9da5;
  --line: rgba(255, 255, 255, .14);
  --action: #e5e5e7;
  --action-text: #101114;
}
```

## 3. Tipografi

- **Ana yazı:** Manrope, ardından sistem sans fontları. Orta ve yarı kalın ağırlıklar (`500–600`) baskındır.
- **Teknik yazı:** JetBrains Mono. Bölüm numarası, etiket, durum, ölçüm ve kısa meta bilgi için kullanılır. Sayıların hizalanması için `font-variant-numeric: tabular-nums`.
- **Hero başlığı:** `clamp(3.6rem, 5.7vw, 6.5rem)`, ağırlık `600`, satır aralığı `.99`, harf aralığı `-.075em`.
- **Bölüm başlığı:** Yaklaşık `clamp(3.25rem, 8.5vw, 9rem)`, satır aralığı `.98`, harf aralığı `-.075em`.
- **İçerik başlığı:** Genellikle `clamp(2.8rem, 5.5vw, 5.5rem)` civarı. Kart başlıkları `20–30 px` ve daha az sıkı.
- **Açıklama:** `16–18 px`, satır aralığı `1.65–1.8`, ideal metin genişliği `380–480 px`.
- **Mono etiket:** `10–12 px`, büyük harf, `0.12–0.20em` harf aralığı. Uzun cümleler bu stilde yazılmaz.

Başlıklar kısa ve iki veya üç satıra bilinçli bölünür. Bir satır ya da sözcük griye çekilerek vurgu hiyerarşisi kurulur. `text-wrap: balance` başlıklarda, `text-wrap: pretty` paragraflarda kullanılır.

## 4. Izgara, boşluk ve yüzeyler

**Ana içerik genişliği:** `1380–1440 px`. Dış boşluk mobilde `20 px`, tablette `32 px`, geniş ekranda `48–54 px`. Bölüm içi dikey boşluk sıkça `96–160 px`. Hero iki sütunlu (`.95fr / 1.05fr`) ve aralarında `50–100 px` boşluk var; `900 px` altında tek sütuna iner.

Yüzey reçetesi:

```css
.panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 0; /* Büyük düz panellerde temel tercih */
  box-shadow: 0 28px 75px rgba(0, 0, 0, .30);
}
```

Kartlar çoğu zaman düz köşeli; küçük medya veya ürün çerçevelerinde `4–6 px` yarıçap kullanılabilir. Bir piksel ayırıcılar ve `gap-px` ile kurulmuş kart ızgaraları sık görülür. Arka planda çok ince dört sütunlu çizgiler (`background-size: 25% 100%`) ve üst ile altta yumuşak maskeleme kullanılabilir. Çizgilerin kontrastı içerikten düşük kalır.

## 5. Tekrarlanan arayüz parçaları

| Parça | Görsel kural | Kaynak örnek |
| --- | --- | --- |
| Sabit üst gezinme | `72 px`, yarı saydam koyu zemin, blur, altta ince çizgi | `components/Header.tsx` |
| Birincil CTA | Açık dolgu, koyu yazı, keskin köşe, sağ üst yön oku, en az `54 px` yükseklik | `components/Hero.tsx` |
| İkincil CTA | Dolgusuz metin bağlantısı, gri yazı, hover'da beyaz | `components/Hero.tsx` |
| Bölüm ayırıcı | Tam ekran sticky alan, büyük başlık, üst ve alt mono bilgi satırları | `components/SectionHeading.tsx` |
| Ürün paneli | Koyu zemin, ince çizgi, küçük teknik etiket, bol iç boşluk | `components/JevAgentShowcase.tsx` |
| Özellik kartı | Basit ikon, mono kategori, kısa başlık, düşük kontrast açıklama | `components/IdeFeaturesShowcase.tsx` |
| Form | Alt çizgili şeffaf alanlar, etiketler üstte, açık renk tam genişlikte gönder butonu | `components/WaitlistSection.tsx` |

İkon dili ince çizgili ve küçük ölçeklidir. Mevcut sayfada Lucide ikonları çoğunlukla `1.5–1.8` stroke ile kullanılır. Dekoratif ikonlar metnin önüne geçmez.

## 6. Görsel anlatım ve hareket

Sayfanın ritmi şu sırayı izler: **kısa vaat → ürün görseli/video → büyük bölüm başlığı → etkileşimli kanıt → sonraki bölüm**. Büyük bölüm başlıkları kendi kaydırma alanlarında sabit kalır; metin aşağıdan yukarı dolar ve sonra sahneden çıkar. Ürün kartları veya ekranları kaydırma ilerlemesine göre görünür. Masaüstünde bazı sahneler sticky, tablette ve mobilde daha düz bir içerik akışı kullanılır.

Hareket ölçüsü:

- Hero içerikleri `0.85–1 sn` içinde `20–28 px` aşağıdan gelir; easing `cubic-bezier(.16,1,.3,1)`.
- Hover geri bildirimi hızlıdır: yaklaşık `0.2–0.3 sn`. Butonda en fazla `2 px` yükselme yeterlidir.
- Kart ve bölüm geçişlerinde ağırlıkla `opacity` ve `transform` kullanılır.
- `prefers-reduced-motion` durumunda giriş animasyonu ve otomatik video hareketi devre dışı kalmalı; içerik statik olarak okunabilmelidir.
- Kaydırma sahneleri içeriğe hizmet etmeli. Aynı efekt her blokta tekrarlanmaz.

## 7. Mobil ve erişilebilirlik

- `900 px` altında hero tek sütun olur; büyük görsel metnin ardından gelir.
- `640 px` altında dış boşluk `20 px` olur. Başlık `clamp(3.45rem, 12vw, 5rem)` ile küçülür.
- Çok sütunlu etkileşimler mobilde tek sütun, seçim listeleri gerekirse `select` olur.
- Başlık ve açıklama `clamp()` ve azami genişliklerle taşmadan ölçeklenir.
- Klavye odağı açık renk `2 px` çizgiyle görünür. Form etiketleri alanlarla ilişkilendirilir; durum mesajlarında `role="status"` veya `aria-live` kullanılır.
- İnce mono metinleri yalnızca yardımcı bilgi için kullanın. Okunması gereken esas açıklamaları 14–18 px aralığında tutun.

## 8. Başka projeye taşıma yolu

1. Yeni projede **renk ve font token'larını** kurun. Manrope ve JetBrains Mono yükleyin.
2. Sayfa kabuğunu oluşturun: koyu gövde, `1380–1440 px` içerik sınırı, üç kademeli dış boşluk.
3. Önce hero, CTA, panel, kart, mono etiket ve bölüm başlığı için ortak bileşenler yapın.
4. Yeni ürünün kendi ekran görüntülerini/video veya diyagramlarını bu çerçevelere yerleştirin. Ürün iddiası gerçek içerikle desteklensin.
5. Yalnızca anlatım gerektiren bölümlere kaydırma animasyonu ekleyin; mobilde düz akışı ve azaltılmış hareket seçeneğini kontrol edin.
6. Son kontrol: başlık satırları bilinçli mi, gri metin okunuyor mu, CTA bir bakışta seçiliyor mu, görseller aynı gri tonlu dünyaya ait mi?

**Tek cümlelik tasarım brief'i:** “Kömüre yakın siyah zemin üzerinde kırık beyaz dev editoryal başlıklar, sakin teknik mono işaretler, ince çizgili ürün panelleri ve yalnızca hikâyeyi ilerleten yumuşak kaydırma hareketleri olan bir teknoloji arayüzü.”
