# Stav aplikace „DIGIFLOW"

*(dřívější pracovní název „Bezpečně na Netu")*

| | |
|---|---|
| **Verze:** | 3.0 |
| **Datum:** | Červen 2026 |
| **Status:** | Funkční, připraveno k nasazení |

## Shrnutí

Aplikace je **funkční a připravená k nasazení** na server knihovny. Implementuje všechny klíčové funkce z PRD (v3.0) a prošla několika koly oprav textů a chyb na základě připomínek MSVK. Je vhodná k pilotnímu provozu na workshopech.

## Detailní stav funkcí (dle PRD)

- [x] **Věková brána (FR-001):** Funkční. Při každém spuštění se zobrazí výběr „Méně než 15 let" / „15 a více let". Přepíná vizuální styl (barvy, fonty, animace) i tón (tykání / vykání).
- [x] **Hlavní menu (FR-002):** Funkční. Rozcestník na oba úkoly (Kvíz, Můj Den) s indikací dokončení.
- [x] **Úkol 1 – Kvíz (FR-003 až FR-005):**
  - 12 scénářů, každý s 6 možnostmi (typy `ideal` / `ok` / `bad`).
  - Pořadí scénářů i možností se při každém spuštění náhodně přeskládá.
  - Okamžitá zpětná vazba (modal) s „lepším řešením".
  - Souhrn výsledků s rozklikávacím detailem každé otázky.
- [x] **Úkol 2 – Můj Den (FR-006 až FR-011):**
  - Výběr typu dne (všední / víkend).
  - Paleta povinných a volitelných aktivit; volitelné se odemknou po použití všech povinných.
  - Mřížka 48 bloků (30 min); podporuje klikání i tažení (i na dotyku).
  - Výpočet času u obrazovek v reálném čase vůči doporučenému limitu 2 h.
  - Vyhodnocení s rozložením aktivit a slovním doporučením.
- [x] **Finální hodnocení (FR-012):** Funkční. Po dokončení obou úkolů spočítá známku A–F z bodové škály (kvíz max 5 b. + Můj Den 2 b.).
- [x] **Reset (FR-013):** Tlačítko „Začít znovu" promaže data a vrátí na věkovou bránu.
- [x] **Responzivita (FR-014):** Funguje na mobilu, tabletu i desktopu.
- [x] **Perzistence:** Postup se ukládá do `localStorage`, přežije obnovení stránky.

## Technický stav

- **Technologie:** HTML5 + Tailwind CSS + Alpine.js + Lucide Icons (vše z CDN).
- **Architektura:** Pouze frontend, žádný backend ani databáze.
- **Závislosti:** Pro běh je nutné připojení k internetu (knihovny a fonty z CDN).
- **Struktura kódu:**
  - Logika a výpočty: `js/app.js`
  - Data kvízu a aktivit: `js/data.js` (pro snadnou editaci obsahu)
  - Texty dle věku (tykání/vykání): `js/i18n.js`
  - Vzhled: Tailwind třídy v `index.html`

## Doporučení pro klienta

1. **Finální korektura textů:** Projít všechny scénáře a hodnocení a ověřit srozumitelnost a bezchybnost.
2. **Pilotní test na tabletu:** Vyzkoušet ergonomii dotykového ovládání na zařízení, které se bude v knihovně používat.
3. **Nasazení:** Aplikaci lze hostovat na běžném webovém serveru (např. Apache) bez databáze. Podrobný návod pro administrátora je v [NASAZENI.md](NASAZENI.md). Dodávka probíhá formou ZIP balíčku.
4. **Internetové připojení:** Na místě konání workshopu je nutné funkční připojení k internetu (kvůli CDN).
