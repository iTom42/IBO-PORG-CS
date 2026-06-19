// Data Layer for DIGIFLOW (APPKA PORG)
// Updated with 12 scenarios and 6 reaction options each
// Options sourced from "Aplikace pro MSVK - 6 řešení.docx"
//
// Text variants: `description` and `feedback` may be either a plain string
// (age-neutral) or an object { child, adult } for tykání (child) / vykání
// (adult). They are resolved in the UI via the global tv() helper (see i18n.js).

/**
 * Scenarios for Task 1 (Quiz)
 * Based on the 12 situations from "Aplikace pro MSVK - 6 řešení.docx"
 * Each scenario has 6 options: ideal / ok (celkem dobré) / bad (nevhodné)
 */
const SCENARIOS = [
    {
        id: 'humor',
        title: 'Vtipný příspěvek',
        description: {
            child: 'Sdílel/a jsi příspěvek, který ti připadal vtipný, jenže ostatním ne. Teď se smějí tobě, ne tvému vtipu. <b>Co uděláš?</b>',
            adult: 'Sdílel/a jste příspěvek, který Vám připadal vtipný, jenže ostatním ne. Teď se smějí Vám, ne Vašemu vtipu. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Smazat příspěvek', type: 'ideal', feedback: { child: 'Ukončíš nepříjemnou situaci a dáš najevo, že umíš uznat, když něco nevyšlo.', adult: 'Ukončíte nepříjemnou situaci a dáte najevo, že umíte uznat, když něco nevyšlo.' } },
            { text: 'Uznat chybu', type: 'ideal', feedback: 'Krátká reakce typu „OK, tenhle vtip asi nevyšel 😅" často napětí rychle rozpustí.' },
            { text: 'Ignorovat komentáře', type: 'ok', feedback: 'Pokud nejde o urážky, pozornost lidí často sama odezní.' },
            { text: 'Svěřit se někomu blízkému', type: 'ok', feedback: { child: 'Pomůže ti zpracovat stud nebo trapný pocit a získat odstup.', adult: 'Pomůže Vám zpracovat stud nebo trapný pocit a získat odstup.' } },
            { text: 'Dát si na chvíli pauzu od sítí', type: 'ok', feedback: 'Krátké odpojení sníží emoční tlak a zabrání impulzivním reakcím.' },
            { text: 'Bránit se v komentářích', type: 'bad', feedback: 'Obrana nebo vysvětlování humoru většinou zesílí posměch a konflikt.' }
        ]
    },
    {
        id: 'flirting',
        title: 'Neznámý člověk',
        description: {
            child: 'Začne ti psát někdo, koho neznáš, snaží se s tebou flirtovat a neustále se vyptává na osobní otázky. <b>Co uděláš?</b>   ',
            adult: 'Začne Vám psát někdo, koho neznáte, snaží se s Vámi flirtovat a neustále se vyptává na osobní otázky. <b>Co uděláte?</b>   '
        },
        options: [
            { text: 'Zablokovat dotyčného', type: 'ideal', feedback: { child: 'Okamžitě přerušíš kontakt a ochráníš své soukromí i psychickou pohodu.', adult: 'Okamžitě přerušíte kontakt a ochráníte své soukromí i psychickou pohodu.' } },
            { text: 'Nahlásit profil nebo zprávy', type: 'ideal', feedback: { child: 'Pomáháš zastavit obtěžování a chráníš i ostatní uživatele.', adult: 'Pomáháte zastavit obtěžování a chráníte i ostatní uživatele.' } },
            { text: 'Svěřit se někomu', type: 'ok', feedback: { child: 'Získáš podporu a radu, jak situaci řešit bezpečně a s klidem.', adult: 'Získáte podporu a radu, jak situaci řešit bezpečně a s klidem.' } },
            { text: 'Omezit, kdo nám může psát', type: 'ok', feedback: { child: 'Snížíš pravděpodobnost, že se podobná situace bude opakovat.', adult: 'Snížíte pravděpodobnost, že se podobná situace bude opakovat.' } },
            { text: 'Ignorovat, ono to přestane', type: 'bad', feedback: 'Krátkodobě může fungovat, ale často vede k tomu, že dotyčný pokračuje.' },
            { text: 'Navázat konverzaci a odpovídat', type: 'bad', feedback: { child: 'Zvyšuješ riziko manipulace, zneužití osobních informací nebo nátlaku.', adult: 'Zvyšujete riziko manipulace, zneužití osobních informací nebo nátlaku.' } }
        ]
    },
    {
        id: 'comparison',
        title: 'Srovnávání se',
        description: {
            child: 'Čím dál častěji se porovnáváš s ostatními lidmi online – všichni vypadají skvěle a žijí lepší život než ty. <b>Co uděláš?</b>',
            adult: 'Čím dál častěji se porovnáváte s ostatními lidmi online – všichni vypadají skvěle a žijí lepší život než vy. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Dát si pauzu od sítí', type: 'ideal', feedback: { child: 'Přerušíš neustálé srovnávání a dáš prostor návratu k vlastnímu prožívání.', adult: 'Přerušíte neustálé srovnávání a dáte prostor návratu k vlastnímu prožívání.' } },
            { text: 'Omezit čas na sítích', type: 'ideal', feedback: { child: 'Získáš více podnětů z offline života a nebudeš se tolik soustředit na obraz ostatních na sítích.', adult: 'Získáte více podnětů z offline života a nebudete se tolik soustředit na obraz ostatních na sítích.' } },
            { text: 'Skrýt účty, které způsobují nepříjemné pocity', type: 'ok', feedback: { child: 'Snížíš množství spouštěčů negativního srovnávání.', adult: 'Snížíte množství spouštěčů negativního srovnávání.' } },
            { text: 'Připomínat si, že lidi sdílí jen to pěkné', type: 'ok', feedback: 'Pomáhá kognitivně oslabit zkreslení „všichni se mají lépe než já".' },
            { text: 'Odinstalovat aplikaci', type: 'ok', feedback: 'Dlouhodobá změna prostředí může výrazně zlepšit sebevědomí i psychickou pohodu.' },
            { text: 'Ignorovat, vždyť ono to přejde', type: 'bad', feedback: 'Neřešené emoce se hromadí a mohou vést k dlouhodobé nespokojenosti nebo úzkosti.' }
        ]
    },
    {
        id: 'cyberbullying',
        title: 'Kyberšikana',
        description: {
            child: 'Dostaneš se do vyhrocené hádky v komentářích a najednou se ostatní začnou spojovat proti tobě. <b>Co uděláš?</b>',
            adult: 'Dostanete se do vyhrocené hádky v komentářích a najednou se ostatní začnou spojovat proti Vám. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Dát si pauzu a přestat reagovat', type: 'ideal', feedback: { child: 'Zabráníš dalšímu vyhrocování a dáš prostor emocím, aby se uklidnily.', adult: 'Zabráníte dalšímu vyhrocování a dáte prostor emocím, aby se uklidnily.' } },
            { text: 'Odejít z diskuze', type: 'ideal', feedback: { child: 'Ukončíš konflikt bez dalšího psychického zatížení.', adult: 'Ukončíte konflikt bez dalšího psychického zatížení.' } },
            { text: 'Svěřit se někomu blízkému', type: 'ok', feedback: { child: 'Pomůže ti zpracovat pocit nespravedlnosti a osamění, který v takové situaci často vzniká.', adult: 'Pomůže Vám zpracovat pocit nespravedlnosti a osamění, který v takové situaci často vzniká.' } },
            { text: 'Smazat příspěvek nebo komentář', type: 'ok', feedback: { child: 'Pokud jsi spustil/a diskuzi, může to pomoci konflikt rychle utlumit.', adult: 'Pokud jste spustil/a diskuzi, může to pomoci konflikt rychle utlumit.' } },
            { text: 'Zablokovat ty, kteří nás napadají', type: 'ok', feedback: { child: 'Chráníš se před osobními útoky, i když to neřeší celou diskuzi.', adult: 'Chráníte se před osobními útoky, i když to neřeší celou diskuzi.' } },
            { text: 'Obhajovat dál svůj názor', type: 'bad', feedback: { child: 'Přitahuješ další útočníky a konflikt se obvykle ještě více vyhrotí.', adult: 'Přitahujete další útočníky a konflikt se obvykle ještě více vyhrotí.' } }
        ]
    },
    {
        id: 'notifications',
        title: 'Noční notifikace',
        description: {
            child: 'Snažíš se usnout, ale tvůj displej nonstop bliká kvůli různým upozorněním a hodně tě to stresuje. <b>Co uděláš?</b>',
            adult: 'Snažíte se usnout, ale Váš displej nonstop bliká kvůli různým upozorněním a hodně Vás to stresuje. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Změnit nastavení notifikací', type: 'ideal', feedback: { child: 'Získáš kontrolu nad rušivými podněty a podpoříš klidný spánek.', adult: 'Získáte kontrolu nad rušivými podněty a podpoříte klidný spánek.' } },
            { text: 'Používat režim Nerušit / noční režim', type: 'ideal', feedback: 'Mozek se lépe zklidní a snáze přejde do režimu spánku.' },
            { text: 'Odinstalovat nebo omezit rušivé aplikace', type: 'ok', feedback: { child: 'Dlouhodobě tím snížíš stres, i když je to spíš radikálnější krok.', adult: 'Dlouhodobě tím snížíte stres, i když je to spíš radikálnější krok.' } },
            { text: 'Nastavit si pravidlo „bez mobilu před spaním"', type: 'ok', feedback: 'Pomáhá vytvořit zdravý návyk, i když vyžaduje disciplínu.' },
            { text: 'Ignorovat upozornění', type: 'bad', feedback: 'Stres se tím zvyšuje a tělo zůstává v pohotovosti.' },
            { text: 'Neřešit to a spoléhat, že si tělo zvykne', type: 'bad', feedback: 'Dlouhodobě to může vést k poruchám spánku a vyčerpání.' }
        ]
    },
    {
        id: 'wrong_content',
        title: 'Nevhodný obsah',
        description: {
            child: 'Narazíš na příspěvek, který podle tebe není správný. Máš pocit, že chceš nějak zakročit. <b>Co uděláš?</b>',
            adult: 'Narazíte na příspěvek, který podle Vás není správný. Máte pocit, že chcete nějak zakročit. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Nahlásit příspěvek správcům', type: 'ideal', feedback: 'Pokud porušuje pravidla, je to nejúčinnější a nejbezpečnější způsob, jak zakročit.' },
            { text: 'Ignorovat příspěvek, pokud není vážně škodlivý', type: 'ok', feedback: 'Ne každý nesmysl si zaslouží pozornost a další šíření.' },
            { text: 'Svěřit se někomu zkušenějšímu', type: 'ok', feedback: { child: 'Pomůže ti ověřit, zda je reakce potřeba a jak ji zvolit.', adult: 'Pomůže Vám ověřit, zda je reakce potřeba a jak ji zvolit.' } },
            { text: 'Vyjádřit věcný a slušný nesouhlas', type: 'ok', feedback: { child: 'Má smysl jen tehdy, pokud zvládneš zůstat klidný/á a nepřilévat olej do ohně. Můžeš ale příspěvku zvýšit dosah.', adult: 'Má smysl jen tehdy, pokud zvládnete zůstat klidný/á a nepřilévat olej do ohně. Můžete ale příspěvku zvýšit dosah.' } },
            { text: 'Impulzivně zareagovat', type: 'bad', feedback: 'Emoční reakce často posílí konflikt a zvýší dosah problematického obsahu.' },
            { text: 'Zablokovat autora', type: 'bad', feedback: { child: 'Uleví to tobě, ale neřeší to šíření škodlivého obsahu.', adult: 'Uleví to Vám, ale neřeší to šíření škodlivého obsahu.' } }
        ]
    },
    {
        id: 'strange_messages',
        title: 'Divné zprávy',
        description: {
            child: 'Tvůj známý ti neustále posílá divné a nepříjemné zprávy. <b>Co uděláš?</b>',
            adult: 'Váš známý Vám neustále posílá divné a nepříjemné zprávy. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Zablokovat dotyčného', type: 'ideal', feedback: { child: 'Jasně tím nastavíš hranice a zabráníš dalšímu obtěžování.', adult: 'Jasně tím nastavíte hranice a zabráníte dalšímu obtěžování.' } },
            { text: 'Nahlásit chování platformě', type: 'ideal', feedback: 'Pokud zprávy překračují hranice slušnosti, je to správný a systémový krok.' },
            { text: 'Svěřit se někomu', type: 'ok', feedback: { child: 'Získáš podporu, ujištění a případně pomoc s dalším postupem.', adult: 'Získáte podporu, ujištění a případně pomoc s dalším postupem.' } },
            { text: 'Upravit nastavení soukromí nebo zpráv', type: 'ok', feedback: { child: 'Můžeš snížit riziko, že tě bude kontaktovat znovu nebo že se to bude opakovat u jiných lidí.', adult: 'Můžete snížit riziko, že Vás bude kontaktovat znovu nebo že se to bude opakovat u jiných lidí.' } },
            { text: 'Ignorovat zprávy, ono to přestane', type: 'bad', feedback: 'Krátkodobě to může fungovat, ale často tím dáváme prostor pokračování obtěžování.' },
            { text: 'Snažit se mu to vysvětlit', type: 'bad', feedback: 'Reakce může druhého povzbudit k dalším zprávám nebo situaci vyhrotit.' }
        ]
    },
    {
        id: 'shared_photo',
        title: 'Sdílená fotka',
        description: {
            child: 'Kamarád nebo člen rodiny zveřejnil tvou fotku, aniž by se tě zeptal. Fotka se ti nelíbí. <b>Co uděláš?</b>',
            adult: 'Kamarád nebo člen rodiny zveřejnil Vaši fotku, aniž by se Vás zeptal. Fotka se Vám nelíbí. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Vyjádřit klidně nesouhlas', type: 'ideal', feedback: { child: 'Jasně nastavíš hranice a dáš druhému šanci situaci napravit.', adult: 'Jasně nastavíte hranice a dáte druhému šanci situaci napravit.' } },
            { text: 'Požádat o smazání fotky nebo odstranění označení', type: 'ideal', feedback: { child: 'Přímo řešíš problém a chráníš své soukromí.', adult: 'Přímo řešíte problém a chráníte své soukromí.' } },
            { text: 'Svěřit se někomu', type: 'ideal', feedback: { child: 'Pomůže ti zorientovat se v emocích a zvolit další postup.', adult: 'Pomůže Vám zorientovat se v emocích a zvolit další postup.' } },
            { text: 'Nahlásit příspěvek', type: 'ok', feedback: { child: 'Je to oprávněný krok, když není respektováno tvé právo na soukromí, ale měl by navazovat až na další kroky.', adult: 'Je to oprávněný krok, když není respektováno Vaše právo na soukromí, ale měl by navazovat až na další kroky.' } },
            { text: 'Upravit nastavení soukromí', type: 'ok', feedback: 'Pomůže předejít podobným situacím do budoucna, ale týká se jen označování.' },
            { text: 'Dělat, že se nic neděje', type: 'bad', feedback: { child: 'Dává to signál, že je v pořádku překračovat tvé hranice, a může to být dlouhodobě nepříjemné.', adult: 'Dává to signál, že je v pořádku překračovat Vaše hranice, a může to být dlouhodobě nepříjemné.' } }
        ]
    },
    {
        id: 'someone_elses_bullying',
        title: 'Šikana jiného',
        description: {
            child: 'Spolužák je veřejně zesměšňovaný online, nikdo se ho nezastane a všichni to sdílejí dál. <b>Co uděláš?</b>',
            adult: 'Spolužák je veřejně zesměšňovaný online, nikdo se ho nezastane a všichni to sdílejí dál. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Nahlásit příspěvek platformě', type: 'ideal', feedback: { child: 'Pomáháš zastavit šíření škodlivého obsahu a chráníš oběť šikany.', adult: 'Pomáháte zastavit šíření škodlivého obsahu a chráníte oběť šikany.' } },
            { text: 'Svěřit se autoritě', type: 'ideal', feedback: { child: 'Zajistíš, že se situací bude zabývat někdo, kdo má možnost zasáhnout.', adult: 'Zajistíte, že se situací bude zabývat někdo, kdo má možnost zasáhnout.' } },
            { text: 'Veřejně se oběti zastat', type: 'ideal', feedback: { child: 'Dáváš jasně najevo, že šikana není v pořádku, a můžeš tím prolomit „mlčení davu".', adult: 'Dáváte jasně najevo, že šikana není v pořádku, a můžete tím prolomit „mlčení davu".' } },
            { text: 'Vyjádřit oběti podporu soukromě', type: 'ok', feedback: 'Pro oběť může být velmi posilující vědět, že v tom není sama.' },
            { text: 'Zablokovat zdroj obsahu nebo přestat ho sledovat', type: 'ok', feedback: { child: 'Chráníš sebe před negativním obsahem, i když tím problém neřešíš systémově.', adult: 'Chráníte sebe před negativním obsahem, i když tím problém neřešíte systémově.' } },
            { text: 'Ignorovat situaci', type: 'bad', feedback: 'Mlčení podporuje šikanu a dává agresorům pocit, že je jejich chování přijatelné.' }
        ]
    },
    {
        id: 'stranger_follow',
        title: 'Neznámý follow',
        description: {
            child: 'Někdo, koho vůbec neznáš a nemáte společné přátele, si tě přidá a chce si psát. <b>Co uděláš?</b>',
            adult: 'Někdo, koho vůbec neznáte a nemáte společné přátele, si Vás přidá a chce si psát. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Zablokovat neznámý účet', type: 'ideal', feedback: { child: 'Okamžitě tím zabráníš kontaktu a ochráníš své soukromí.', adult: 'Okamžitě tím zabráníte kontaktu a ochráníte své soukromí.' } },
            { text: 'Upravit nastavení soukromí', type: 'ideal', feedback: { child: 'Dlouhodobě snížíš riziko podobných situací.', adult: 'Dlouhodobě snížíte riziko podobných situací.' } },
            { text: 'Nahlásit účet, pokud působí podezřele', type: 'ideal', feedback: { child: 'Pomáháš chránit sebe i ostatní uživatele platformy.', adult: 'Pomáháte chránit sebe i ostatní uživatele platformy.' } },
            { text: 'Ignorovat žádost a nereagovat', type: 'ok', feedback: 'V mnoha případech kontakt sám ustane, i když nejde o aktivní řešení.' },
            { text: 'Svěřit se někomu zkušenějšímu', type: 'ok', feedback: 'Pomůže hlavně mladším uživatelům získat jistotu, že postupují správně.' },
            { text: 'Navázat konverzaci, o nic nejde', type: 'bad', feedback: { child: 'Zvyšuješ riziko manipulace, podvodu nebo zneužití osobních informací.', adult: 'Zvyšujete riziko manipulace, podvodu nebo zneužití osobních informací.' } }
        ]
    },
    {
        id: 'friend_insult',
        title: 'Urážka od kamaráda',
        description: {
            child: 'Dobrý kamarád tě během online hry nebo konverzace nějak urazí a hodně tě to zabolí. <b>Co uděláš?</b>',
            adult: 'Dobrý kamarád vás během online hry nebo konverzace nějak urazí a hodně Vás to zabolí. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Říct, že nám to ublížilo', type: 'ideal', feedback: { child: 'Dáváš druhému šanci pochopit dopad jeho slov a napravit situaci.', adult: 'Dáváte druhému šanci pochopit dopad jeho slov a napravit situaci.' } },
            { text: 'Svěřit se někomu', type: 'ideal', feedback: { child: 'Pomůže ti zpracovat emoce a získat nadhled, než budeš reagovat.', adult: 'Pomůže Vám zpracovat emoce a získat nadhled, než budete reagovat.' } },
            { text: 'Dát si pauzu na uklidnění', type: 'ok', feedback: { child: 'Zabráníš impulzivní reakci, i když samotný problém zatím zůstává otevřený.', adult: 'Zabráníte impulzivní reakci, i když samotný problém zatím zůstává otevřený.' } },
            { text: 'Promyslet, co nám ublížilo', type: 'ok', feedback: 'Pojmenování emocí umožňuje se s nimi lépe vyrovnat, problémové chování ale neřeší.' },
            { text: 'Předstírat, že se nic nestalo', type: 'bad', feedback: 'Nevyřešené pocity se mohou projevit později a vztah poškodit.' },
            { text: 'Kamaráda zablokovat', type: 'bad', feedback: 'U blízkého vztahu jde o přehnaný krok bez pokusu o domluvu.' }
        ]
    },
    {
        id: 'scrolling_fatigue',
        title: 'Únava ze scrollování',
        description: {
            child: 'Několik hodin v kuse projíždíš příspěvky na sítích a cítíš se vyčerpaně, nejistě a trochu naštvaně. <b>Co uděláš?</b>',
            adult: 'Několik hodin v kuse projíždíte příspěvky na sítích a cítíte se vyčerpaně, nejistě a trochu naštvaně. <b>Co uděláte?</b>'
        },
        options: [
            { text: 'Dát si pauzu od sítí', type: 'ideal', feedback: { child: 'Přerušíš zahlcení a dáš psychice prostor se zregenerovat.', adult: 'Přerušíte zahlcení a dáte psychice prostor se zregenerovat.' } },
            { text: 'Odinstalovat aplikaci', type: 'ok', feedback: 'Pokud se situace opakuje, dlouhodobá změna může výrazně zlepšit duševní pohodu. Je to však extrémní řešení.' },
            { text: 'Upravit nastavení (časové limity, notifikace, doporučený obsah)', type: 'ok', feedback: { child: 'Pomůže ti lépe regulovat používání sítí, i když vyžaduje sebekontrolu.', adult: 'Pomůže Vám lépe regulovat používání sítí, i když vyžaduje sebekontrolu.' } },
            { text: 'Svěřit se někomu blízkému', type: 'ok', feedback: 'Sdílení pocitů pomáhá vstřebat zkušenost a získat nadhled.' },
            { text: 'Ignorovat únavu a pokračovat', type: 'bad', feedback: 'Varovné signály těla se zesilují a hrozí digitální vyčerpání.' },
            { text: 'Zlepšit si náladu jiným obsahem', type: 'bad', feedback: { child: 'Přidáváš další podněty, které únavu a frustraci obvykle ještě zhorší.', adult: 'Přidáváte další podněty, které únavu a frustraci obvykle ještě zhorší.' } }
        ]
    }
];

/**
 * Activities for Task 2 (Planner)
 */
const ACTIVITIES = [
    // Mandatory
    { id: 'sleep', name: 'Spánek', type: 'mandatory', icon: '😴', color: 'bg-indigo-200' },
    { id: 'food', name: 'Jídlo', type: 'mandatory', icon: '🍔', color: 'bg-green-200' },
    { id: 'school', name: 'Škola/Práce', type: 'mandatory', icon: '🏫', color: 'bg-blue-200' },
    { id: 'hygiene', name: 'Hygiena', type: 'mandatory', icon: '🚿', color: 'bg-cyan-200' },

    // Optional
    { id: 'sport', name: 'Pohyb', type: 'optional', icon: '⚽', color: 'bg-orange-200' },
    { id: 'art', name: 'Tvoření', type: 'optional', icon: '🎨', color: 'bg-pink-200' },
    { id: 'chat', name: 'Povídání', type: 'optional', icon: '🗣️', color: 'bg-yellow-200' },
    { id: 'relax', name: 'Odpočinek', type: 'optional', icon: '🧘', color: 'bg-purple-200' },
    { id: 'screen', name: 'Zábava u obrazovek', type: 'optional', icon: '📱', color: 'bg-red-200' },
    { id: 'read', name: 'Čtení', type: 'optional', icon: '📖', color: 'bg-emerald-200' },
    { id: 'travel', name: 'Cestování', type: 'optional', icon: '🚌', color: 'bg-gray-200' },
    { id: 'other', name: 'Jiné', type: 'optional', icon: '✨', color: 'bg-teal-200' }
];
