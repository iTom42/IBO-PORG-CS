// i18n helper for DIGIFLOW (APPKA PORG)
// Resolves age-based text: 'child' => tykání, 'adult' => vykání.
//
// Two globals are used directly inside Alpine templates (Alpine evaluates
// expressions against globals too, the same way SCENARIOS/ACTIVITIES/Math are
// used) and inside store methods:
//   tv(value, mode)  -> resolves a { child, adult } object OR a plain string
//   t(key, mode)     -> resolves a UI string from UI_STRINGS by key
//
// CURRENT_AGE_MODE mirrors the app's ageMode so JS methods that have no
// reactive ageMode in scope (e.g. plannerStore alerts) can still resolve text.
// Templates should pass the reactive `ageMode` explicitly so Alpine re-renders
// when the mode changes.

let CURRENT_AGE_MODE = 'adult';

function setAgeModeI18n(mode) {
    CURRENT_AGE_MODE = mode === 'child' ? 'child' : 'adult';
}

// Resolve a value that may be a plain string (age-neutral) or a { child, adult } object.
function tv(value, mode = CURRENT_AGE_MODE) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    const key = mode === 'child' ? 'child' : 'adult';
    return value[key] ?? value.child ?? value.adult ?? '';
}

// UI chrome strings that differ by age (tykání / vykání).
// Age-neutral UI text stays hardcoded in index.html.
const UI_STRINGS = {
    // Menu
    menu_quiz_desc: {
        child: 'Zvládneš náročné situace na sítích? Otestuj se v kvízu!',
        adult: 'Zvládnete náročné situace na sítích? Otestujte se v kvízu!'
    },
    menu_planner_desc: {
        child: 'Zjisti, kolik času trávíš zábavou u obrazovek.',
        adult: 'Zjistěte, kolik času trávíte zábavou u obrazovek.'
    },

    // Quiz results
    quiz_done_title: {
        child: 'Máš hotovo.<br>Jak to dopadlo?',
        adult: 'Máte hotovo.<br>Jak to dopadlo?'
    },
    quiz_review_hint: {
        child: 'Kliknutím zobrazíš detail',
        adult: 'Kliknutím zobrazíte detail'
    },

    // Quiz detail modal – "your answer" labels
    detail_answer_ideal: {
        child: '✅ Tvoje odpověď (ideální):',
        adult: '✅ Vaše odpověď (ideální):'
    },
    detail_answer_ok: {
        child: '🤔 Tvoje odpověď (dobré, ale...):',
        adult: '🤔 Vaše odpověď (dobré, ale...):'
    },
    detail_answer_bad: {
        child: '⚠️ Tvoje odpověď (nevhodné):',
        adult: '⚠️ Vaše odpověď (nevhodné):'
    },

    // Planner
    planner_eval_incomplete: {
        child: 'Vyplň celý den ⏳',
        adult: 'Vyplňte celý den ⏳'
    },
    planner_instructions: {
        child: '<strong>Návod:</strong> Nejprve vyber všední nebo víkendový den. Poté naklikej povinné položky z levého sloupce do časových oken. Po použití všech povinných ikon se odemknou volitelné ikonky. Kliknutím na „Vymazat aktivitu" můžeš smazat libovolnou buňku.',
        adult: '<strong>Návod:</strong> Nejprve vyberte všední nebo víkendový den. Poté naklikejte povinné položky z levého sloupce do časových oken. Po použití všech povinných ikon se odemknou volitelné ikonky. Kliknutím na „Vymazat aktivitu" můžete smazat libovolnou buňku.'
    },
    planner_mobile_helper: {
        child: 'Tažením prstu vyplníš více políček',
        adult: 'Tažením prstu vyplníte více políček'
    },
    planner_results_title: {
        child: 'Analýza tvého dne 📊',
        adult: 'Analýza vašeho dne 📊'
    },
    planner_screen_ok: {
        child: 'Super! Netrávíš u obrazovek zbytečně moc času. Odborníci doporučují trávit zábavou u obrazovek nanejvýš 2h denně.',
        adult: 'Super! Netrávíte u obrazovek zbytečně moc času. Odborníci doporučují trávit zábavou u obrazovek nanejvýš 2h denně.'
    },
    planner_screen_over: {
        child: 'Odborníci doporučují trávit zábavou u obrazovek nanejvýš 2h denně, tuto hranici překračuješ. Zkus se víc bavit třeba čtením, tvořením, pohybem nebo setkáváním s přáteli.',
        adult: 'Odborníci doporučují trávit zábavou u obrazovek nanejvýš 2h denně, tuto hranici překračujete. Zkuste se víc bavit třeba čtením, tvořením, pohybem nebo setkáváním s přáteli.'
    },
    planner_distribution_title: {
        child: 'Jak jsi rozdělil/a čas:',
        adult: 'Jak jste rozdělili čas:'
    },
    planner_locked_alert: {
        child: 'Nejdříve musíš naplánovat všechny povinné aktivity (škola, jídlo, spánek, hygiena)!',
        adult: 'Nejdříve musíte naplánovat všechny povinné aktivity (škola, jídlo, spánek, hygiena)!'
    },

    // App-wide
    reset_confirm: {
        child: 'Opravdu chceš začít úplně od začátku? Vše se vymaže.',
        adult: 'Opravdu chcete začít úplně od začátku? Vše se vymaže.'
    },

    // Final feedback (by grade)
    final_A: {
        child: 'Fantastické! Jsi skutečný digitální mistr. 🏆',
        adult: 'Fantastické! Jste skutečný digitální mistr. 🏆'
    },
    final_B: {
        child: 'Skvělá práce! Rozumíš tomu, jen malý kousek chyběl k dokonalosti.',
        adult: 'Skvělá práce! Rozumíte tomu, jen malý kousek chyběl k dokonalosti.'
    },
    final_C: {
        child: 'Dobrá práce, ale je tu prostor pro zlepšení. Zkus se zamyslet nad svým časem nebo reakcemi.',
        adult: 'Dobrá práce, ale je tu prostor pro zlepšení. Zkuste se zamyslet nad svým časem nebo reakcemi.'
    },
    final_D: {
        child: 'Pozor! V online světě bys měl být opatrnější a hlídat si čas.',
        adult: 'Pozor! V online světě byste měli být opatrnější a hlídat si čas.'
    },
    final_F: {
        child: 'Fíha! Tohle se nepovedlo. Zkus si kurz projít znovu a naučit se víc o bezpečí.',
        adult: 'Fíha! Tohle se nepovedlo. Zkuste si kurz projít znovu a naučit se víc o bezpečí.'
    }
};

function t(key, mode = CURRENT_AGE_MODE) {
    const entry = UI_STRINGS[key];
    if (!entry) return key;
    return tv(entry, mode);
}
