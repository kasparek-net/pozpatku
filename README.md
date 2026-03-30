<p align="center">
  <img src="maskot.png" alt="Pozpátku maskot" width="300">
</p>

<h1 align="center">Pozpátku!</h1>

<p align="center">
  Online generátor pro převracení českého textu pozpátku.<br>
  Každé slovo se otočí, slovosled zůstane stejný.
</p>

<p align="center">
  <a href="https://pozpatku.kasparek.net">pozpatku.kasparek.net</a>
</p>

---

## Co to dělá?

Převrátí každé slovo v textu pozpátku, ale zachová slovosled:

| Vstup | Výstup |
|---|---|
| Tluče bubeníček | ečulT kečínebub |
| Skákal pes přes oves | lakákS sep seřp sevo |
| Holka modrooká | akloH ákoordom |

Správně pracuje s českými znaky s diakritikou (ě, š, č, ř, ž, ý, á, í, é, ú, ů, ď, ť, ň).

## K čemu to je?

Vytvořeno pro **táborové hry a šifrovačky**. Vedoucí zadá dětem text napsaný pozpátku a ty ho musí rozluštit. Generátor zajistí, že převod je vždy 100% správný — žádné halucinace, žádné chyby.

## Jak to funguje?

Čistý JavaScript, žádné AI, žádný backend. Vše běží v prohlížeči. Stačí nahrát `index.html` + obrázek maskota na jakýkoliv webový server.

### Soubory pro deployment

Stačí nahrát na FTP:
- `public/index.html`
- `public/maskot.webp`
- `public/maskot.avif`

### Funkce

- Převracení slov v reálném čase
- Ukázkové české lidové písničky
- Volitelné zachování interpunkce na místě
- Kopírování výsledku jedním klikem
- Honeypot ochrana proti botům
- Responzivní design (mobil + desktop)
- PageSpeed 100/100/100/100
