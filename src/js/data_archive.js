// Data Layer for DIGIFLOW (APPKA PORG)
// Updated with 12 scenarios and all reaction options

/**
 * Scenarios for Task 1 (Quiz)
 * Based on the 12 situations from "App MSVK situace-reakce.docx"
 */
const SCENARIOS = [
    {
        id: 'humor',
        title: 'Vtipný příspěvek',
        description: 'Sdílel/a jsi příspěvek, který ti připadal vtipný, jenže ostatním ne. Teď se smějí tobě, ne tvému vtipu.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nevhodné. Pokud tě někdo neuráží, blokace působí přehnaně.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nedává smysl. Dává smysl pouze v případě, že výsměch přejde v urážky.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Pomůže ti zpracovat trapný pocit a získat nadhled.' },
            { text: 'Dát si pauzu', type: 'ok', feedback: 'Docela dobré. Krátké odpojení ti pomůže ulevit od studu nebo stresu.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nevhodné. Obrana nebo hádka situaci obvykle zhorší.' },
            { text: 'Ignorovat', type: 'ok', feedback: 'Docela dobré. Pokud nejde o šikanu, může být nejlepší prostě nechat věc vyšumět.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Nastavení soukromí neřeší reakce lidí na příspěvek.' },
            { text: 'Smazat příspěvek', type: 'ideal', feedback: 'Ideální. Ukončíš situaci, která ti je nepříjemná, a projevíš zralost.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nevhodné. Kvůli jedné situaci není nutné aplikaci mazat.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. Nové přátelství situaci nijak neřeší.' }
        ]
    },
    {
        id: 'flirting',
        title: 'Neznámý člověk',
        description: 'Začne ti psát někdo, koho neznáš, snaží se s tebou flirtovat a neustále se vyptává na osobní otázky.',
        options: [
            { text: 'Zablokovat', type: 'ideal', feedback: 'Ideální. Chráníš své soukromí i psychické bezpečí.' },
            { text: 'Nahlásit', type: 'ideal', feedback: 'Ideální. Pomůžeš sobě i ostatním, pokud dotyčný obtěžuje více lidí.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Sdílení s někým spolehlivým ti dodá podporu i jistotu.' },
            { text: 'Dát si pauzu', type: 'bad', feedback: 'Nevhodné. Problém je v konkrétní osobě, ne v přetížení sociálními sítěmi.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nevhodné. Odpovídání může podnítit další kontakt.' },
            { text: 'Ignorovat', type: 'ok', feedback: 'Docela dobré. Pokud nejde o hrozbu, může být dočasně účinné.' },
            { text: 'Změnit nastavení', type: 'ok', feedback: 'Docela dobré. Pomůže omezit, kdo ti může psát.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Nejde o sdílený obsah.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nedává smysl. Není nutné mazat aplikaci kvůli jednomu kontaktu.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nevhodné. Zvyšuje riziko manipulace, podvodu nebo obtěžování.' }
        ]
    },
    {
        id: 'comparison',
        title: 'Srovnávání se',
        description: 'Čím dál častěji se porovnáváš s ostatními lidmi online – všichni vypadají skvěle a žijí lepší život než ty.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nedává smysl. Problém není v konkrétním člověku, ale v celkovém působení obsahu.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nedává smysl. Není co nahlásit – lidé jen sdílejí svůj život.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Sdílení pocitů pomáhá uvědomit si, že podobně se cítí i ostatní.' },
            { text: 'Dát si pauzu', type: 'ideal', feedback: 'Ideální. Pomůže přerušit nezdravé srovnávání a obnovit vnitřní rovnováhu.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nevhodné. Jde o tvé vnitřní prožívání.' },
            { text: 'Ignorovat', type: 'bad', feedback: 'Nevhodné. Potlačení těchto emocí bez změny chování problém neřeší.' },
            { text: 'Změnit nastavení', type: 'ok', feedback: 'Docela dobré. Můžeš si skrýt obsah, který ti spouští negativní pocity.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Situace se netýká tvého obsahu.' },
            { text: 'Odinstalovat', type: 'ideal', feedback: 'Ideální. Dlouhodobá přestávka může zlepšit sebevnímání i duševní pohodu.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. Nové kontakty nepomohou řešit negativní srovnávání.' }
        ]
    },
    {
        id: 'cyberbullying',
        title: 'Kyberšikana',
        description: 'Dostaneš se do vyhrocené hádky v komentářích a najednou se ostatní začnou spojovat proti tobě.',
        options: [
            { text: 'Zablokovat', type: 'ok', feedback: 'Docela dobré. Pokud tě někdo uráží, blokace je vhodná.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nevhodné. Pokud nejde o vyložené porušení pravidel, není to nutné.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Sdílení s někým blízkým může pomoci zpracovat negativní pocity.' },
            { text: 'Dát si pauzu', type: 'ideal', feedback: 'Ideální. Pomůže zklidnit emoce a zabránit dalšímu vyhrocování.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nevhodné. Pokračování v hádce situaci jen zhoršuje.' },
            { text: 'Ignorovat', type: 'ideal', feedback: 'Ideální. Ukončíš zbytečnou konfrontaci a chráníš své duševní zdraví.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Nastavení soukromí se hádky v komentářích netýká.' },
            { text: 'Smazat příspěvek', type: 'ok', feedback: 'Docela dobré. Pokud jsi autorem, může to situaci uklidnit.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nevhodné. Kvůli jedné hádce není potřeba mazat aplikaci.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. S lidmi, kteří tě napadají, se není vhodné spojovat.' }
        ]
    },
    {
        id: 'notifications',
        title: 'Noční notifikace',
        description: 'Snažíš se usnout, ale tvůj displej nonstop bliká kvůli různým upozorněním a hodně tě to stresuje.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nedává smysl. Nejde o konkrétního člověka.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nedává smysl. Notifikace nejsou porušením pravidel.' },
            { text: 'Svěřit se', type: 'bad', feedback: 'Nevhodné. Problém s notifikacemi vyřešíš spíš nastavením.' },
            { text: 'Dát si pauzu', type: 'ideal', feedback: 'Ideální. Odložení telefonu pomůže uklidnit mozek a zlepšit spánek.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nedává smysl. Není s kým se hádat.' },
            { text: 'Ignorovat', type: 'bad', feedback: 'Nevhodné. Neustálé rušení bez reakce jen zvyšuje stres.' },
            { text: 'Změnit nastavení', type: 'ideal', feedback: 'Ideální. Upravíš si notifikace a získáš kontrolu nad rušivými signály.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Situace se netýká sdíleného obsahu.' },
            { text: 'Odinstalovat', type: 'ok', feedback: 'Docela dobré. Pokud ti aplikace dlouhodobě narušují klid, může to být zdravé řešení.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. Nové kontakty problém s notifikacemi neřeší.' }
        ]
    },
    {
        id: 'wrong_content',
        title: 'Nevhodný obsah',
        description: 'Narazíš na příspěvek, který podle tebe není správný. Máš pocit, že chceš nějak zakročit.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nevhodné. Blokace bude zbytečná, pokud příspěvek nepochází od člověka, který tě obtěžuje.' },
            { text: 'Nahlásit', type: 'ideal', feedback: 'Ideální. Pokud příspěvek porušuje pravidla, je to správný krok.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Pomůže, pokud si nejsi jistý, jak reagovat.' },
            { text: 'Dát si pauzu', type: 'bad', feedback: 'Nevhodné. Samotná pauza problém s nevhodným obsahem neřeší.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nevhodné. Může to vést ke konfliktům.' },
            { text: 'Ignorovat', type: 'ok', feedback: 'Docela dobré. Ne všechen obsah musíš řešit.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Nastavení nezmění obsah, který vidíš.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Nemůžeš mazat příspěvky, které nejsou tvé.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nedává smysl. Příspěvek jedné osoby není důvodem k odinstalaci.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. S někým, kdo sdílí nevhodný obsah, se není třeba spojovat.' }
        ]
    },
    {
        id: 'strange_messages',
        title: 'Divné zprávy',
        description: 'Tvůj známý ti neustále posílá divné a nepříjemné zprávy.',
        options: [
            { text: 'Zablokovat', type: 'ideal', feedback: 'Ideální. Chráníš se před nepříjemnou komunikací.' },
            { text: 'Nahlásit', type: 'ok', feedback: 'Docela dobré. Pokud zprávy porušují pravidla, je to správné.' },
            { text: 'Svěřit se', type: 'ideal', feedback: 'Ideální. Sdílení s někým spolehlivým ti pomůže získat podporu.' },
            { text: 'Dát si pauzu', type: 'ok', feedback: 'Docela dobré. Přestávka ti pomůže získat odstup.' },
            { text: 'Vyjádřit nesouhlas', type: 'ok', feedback: 'Docela dobré. Můžeš mu napsat, že ti to vadí.' },
            { text: 'Ignorovat', type: 'ok', feedback: 'Docela dobré. Někdy je ignorování nejlepší volba.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Nastavení nezmění chování konkrétního člověka.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Nejde o příspěvek.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nevhodné. Kvůli jednomu člověku nemá smysl odstraňovat celou aplikaci.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nevhodné. Pokračování v komunikaci situaci zhorší.' }
        ]
    },
    {
        id: 'shared_photo',
        title: 'Sdílená fotka',
        description: 'Kamarád nebo člen rodiny zveřejnil tvou fotku, aniž by se tě zeptal. Fotka se ti nelíbí.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nedává smysl. Je to někdo, koho znáš.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nedává smysl. Fotka od známého obvykle neporušuje pravidla.' },
            { text: 'Svěřit se', type: 'ideal', feedback: 'Ideální. Promluv si s dotyčným člověkem o tom, že ti to vadí.' },
            { text: 'Dát si pauzu', type: 'ok', feedback: 'Docela dobré. Pomůže ti to získat klid.' },
            { text: 'Vyjádřit nesouhlas', type: 'ok', feedback: 'Docela dobré. Požádej o smazání fotky.' },
            { text: 'Ignorovat', type: 'bad', feedback: 'Nedává smysl. Fotka tě pravděpodobně trápí.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Toto je problém s konkrétní osobou.' },
            { text: 'Smazat příspěvek', type: 'ideal', feedback: 'Ideální. Požádej o smazání nebo to udělej sám/sama pokud možná.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nevhodné. Řešení není v odinstalaci aplikace.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. S někým, kdo ti udělal něco nepříjemného, se není třeba více spojovat.' }
        ]
    },
    {
        id: 'someone_elses_bullying',
        title: 'Šikana jiného',
        description: 'Spolužák je veřejně zesměšňovaný online, nikdo se ho nezastane a všichni to sdílejí dál.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nedává smysl. Tvá blokace nic nezmění.' },
            { text: 'Nahlásit', type: 'ideal', feedback: 'Ideální. Nahlas šikanu, chráníš oběť.' },
            { text: 'Svěřit se', type: 'ideal', feedback: 'Ideální. Promluv si s někým dospělým.' },
            { text: 'Dát si pauzu', type: 'bad', feedback: 'Nedává smysl. Pomoc potřebuje někdo jiný.' },
            { text: 'Vyjádřit nesouhlas', type: 'ok', feedback: 'Docela dobré. Postav se za oběť veřejně.' },
            { text: 'Ignorovat', type: 'bad', feedback: 'Nevhodné. Tvá pasivita situaci zhoršuje.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Neochráníš tím oběť.' },
            { text: 'Smazat příspěvek', type: 'ok', feedback: 'Docela dobré. Přestaň sdílet obsah šikany.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nedává smysl. Tvá přítomnost může pomoci.' },
            { text: 'Navázat spojení', type: 'ok', feedback: 'Docela dobré. Nabídni oběti podporu.' }
        ]
    },
    {
        id: 'stranger_follow',
        title: 'Neznámý follow',
        description: 'Někdo, koho vůbec neznáš a nemáte společné přátele, si tě přidá a chce si psát.',
        options: [
            { text: 'Zablokovat', type: 'ideal', feedback: 'Ideální. Chráníš své soukromí před cizími lidmi.' },
            { text: 'Nahlásit', type: 'ok', feedback: 'Docela dobré. Pokud ti to je nepříjemné, je to správné.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Sdílení s někým ti pomůže rozhodnout se.' },
            { text: 'Dát si pauzu', type: 'bad', feedback: 'Nedává smysl. Problém je konkrétní osoba, ne aplikace.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nevhodné. Zbytečná konfrontace s cizím člověkem.' },
            { text: 'Ignorovat', type: 'ok', feedback: 'Docela dobré. Jednoduše neodpovídej.' },
            { text: 'Změnit nastavení', type: 'ok', feedback: 'Docela dobré. Omez, kdo tě může sledovat.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Nejde o tvůj obsah.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nedává smysl. Jeden člověk není důvodem.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nevhodné. Spojení s cizím člověkem je riskantní.' }
        ]
    },
    {
        id: 'friend_insult',
        title: 'Urážka od kamaráda',
        description: 'Dobrý kamarád tě během online hry nebo konverzace nějak urazí a hodně tě to zabolí.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nedává smysl. Je to kamarád, se kterým bys měl mluvit.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nedává smysl. Jde o kamaráda, ne o cizího člověka.' },
            { text: 'Svěřit se', type: 'ideal', feedback: 'Ideální. Promluv si s ním nebo s někým blízkým.' },
            { text: 'Dát si pauzu', type: 'ok', feedback: 'Docela dobré. Dej si čas na zpracování emocí.' },
            { text: 'Vyjádřit nesouhlas', type: 'ideal', feedback: 'Ideální. Řekni mu, že ti to vadí a proč.' },
            { text: 'Ignorovat', type: 'bad', feedback: 'Nedává smysl. Je to tvůj kamarád, měli byste to vyřešit.' },
            { text: 'Změnit nastavení', type: 'bad', feedback: 'Nedává smysl. Nastavení nezmění chování kamaráda.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Nejde o příspěvek.' },
            { text: 'Odinstalovat', type: 'bad', feedback: 'Nevhodné. Kamarádství se dá řešit jinak.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. Spojení už existuje, teď ho musíte opravit.' }
        ]
    },
    {
        id: 'scrolling_fatigue',
        title: 'Únava ze scrollování',
        description: 'Několik hodin v kuse projíždíš příspěvky na sítích a cítíš se vyčerpaně, nejistě a trochu naštvaně.',
        options: [
            { text: 'Zablokovat', type: 'bad', feedback: 'Nedává smysl. Problém je ve tvém chování, ne v obsahu.' },
            { text: 'Nahlásit', type: 'bad', feedback: 'Nedává smysl. Nikdo nic neporušil.' },
            { text: 'Svěřit se', type: 'ok', feedback: 'Docela dobré. Sdílení pocitů pomůže.' },
            { text: 'Dát si pauzu', type: 'ideal', feedback: 'Ideální. Okamžitě odlož telefon a jdi dělat něco jiného.' },
            { text: 'Vyjádřit nesouhlas', type: 'bad', feedback: 'Nedává smysl. S kým bys nesouhlasil/a?' },
            { text: 'Ignorovat', type: 'bad', feedback: 'Nevhodné. Ignorování problému ho nevyřeší.' },
            { text: 'Změnit nastavení', type: 'ok', feedback: 'Docela dobré. Omez si čas na sociálních sítích.' },
            { text: 'Smazat příspěvek', type: 'bad', feedback: 'Nedává smysl. Smaž spíš aplikaci než příspěvek.' },
            { text: 'Odinstalovat', type: 'ideal', feedback: 'Ideální. Pokud ti to nepomáhá, je odinstalace zdravá.' },
            { text: 'Navázat spojení', type: 'bad', feedback: 'Nedává smysl. Potřebuješ spíš offline kontakt.' }
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
