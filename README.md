# DIGIFLOW

Webová aplikace pro výuku bezpečného a vyváženého chování na internetu, určená pro workshopy v knihovnách a školách.

Připravili lektoři **Moravskoslezské vědecké knihovny v Ostravě (MSVK)** ve spolupráci s lektorem a studenty **Gymnázia PORG Ostrava**.

> Dřívější pracovní název projektu byl „Bezpečně na Netu“. V některých starších dokumentech a v názvu balíčku (`bezpecne-na-netu`) se může ještě objevovat.

## Co to je

Aplikace učí děti a dospívající, jak reagovat na nepříjemné situace na sociálních sítích a jak vyváženě hospodařit s časem u obrazovek. Má dvě hlavní aktivity:

- **Kvíz** – scénářové otázky o situacích na sociálních sítích (kyberšikana, neznámí lidé, srovnávání, notifikace, závadný obsah…). Ke každé situaci je 6 možností a hráč u každé dostane okamžitou zpětnou vazbu.
- **Můj Den** – plánovač dne (48 bloků po 30 minutách) s analýzou času stráveného u obrazovek.

Po dokončení obou aktivit se zobrazí **finální hodnocení** se známkou A–F.

Podle zvoleného věku se mění vzhled i tón: do 15 let („🌱“) hravější, tykání; 15 a více let („🌳“) střízlivější, vykání. Aplikace je pouze v češtině.

## Jak to funguje

1. **Věková brána** – uživatel zvolí „Méně než 15 let“ nebo „15 a více let“.
2. **Kvíz** – projde scénáři (pořadí scénářů i odpovědí se při každém spuštění náhodně přeskládá), u každé odpovědi vidí zpětnou vazbu a „lepší řešení“. Na konci je souhrn s možností rozkliknout detail.
3. **Můj Den** – vybere typ dne (všední / víkend), naklikává povinné aktivity (spánek, jídlo, škola, hygiena), po jejich použití se odemknou volitelné. Po vyplnění všech 48 bloků klikne na „Vyhodnotit den“ a vidí čas u obrazovek vůči doporučenému limitu (2 h/den) a rozložení aktivit.
4. **Finální hodnocení** – po dokončení obou úkolů se spočítá známka A–F.

## Technologie

Žádný build, žádná instalace. Aplikace je statický web, který za běhu načítá knihovny z CDN:

- Tailwind CSS (CDN)
- Alpine.js (CDN)
- Lucide Icons (CDN)
- Google Fonts – Nunito (do 15 let) a Inter (15+)

**Vyžaduje připojení k internetu** (kvůli CDN a fontům).

## Struktura

```
src/
├── index.html       # Veškeré UI (Alpine.js šablony)
├── js/
│   ├── app.js       # Stav aplikace, navigace, výpočty, ukládání do localStorage
│   ├── data.js      # SCENARIOS (scénáře kvízu) a ACTIVITIES (aktivity plánovače)
│   └── i18n.js      # Texty rozlišené podle věku (tykání/vykání)
└── assets/
    ├── logo.png
    └── logo.jpg
```

- **Obsah kvízu / aktivit** se upravuje v `js/data.js`.
- **Texty rozlišené podle věku** v `js/i18n.js`.
- **Vzhled** v `index.html` (Tailwind třídy).
- **Chování a výpočty** v `js/app.js`.

## Spuštění (lokálně)

Nejjednodušší – otevřít `src/index.html` v prohlížeči.

Lokální server (doporučeno, kvůli relativním cestám):

```bash
# Node (dle package.json)
npm install
npm start            # spustí `serve src` na portu 4173

# nebo Python
cd src && python3 -m http.server 8000
```

## Nasazení na server

Pro nasazení na on-premise server (Apache) viz **[docs/NASAZENI.md](docs/NASAZENI.md)** – podrobný návod pro administrátora včetně práce s distribučním ZIP balíčkem.

## Soukromí

Neukládá žádná osobní data. Veškerý postup jde pouze do `localStorage` v prohlížeči, nikam se nic neodesílá. Není potřeba registrace ani přihlášení.

## Dokumentace

- [docs/PRD.md](docs/PRD.md) – produktová specifikace (požadavky, funkce, UX)
- [docs/stav_aplikace.md](docs/stav_aplikace.md) – aktuální stav implementace
- [docs/NASAZENI.md](docs/NASAZENI.md) – návod na nasazení pro administrátora

---

*Moravskoslezská vědecká knihovna v Ostravě × Gymnázium PORG Ostrava.*
