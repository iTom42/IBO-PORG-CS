# Nasazení aplikace DIGIFLOW na server (návod pro administrátora)

Tento návod popisuje nasazení aplikace **DIGIFLOW** na vlastní (on-premise) webový server. Návod je psán pro **server Apache (httpd)**, na konci jsou poznámky i pro Nginx a IIS.

Aplikace se dodává jako **ZIP balíček** se statickými soubory (`digiflow-deploy.zip`) – není potřeba klonovat Git repozitář.

---

## 1. Co aplikace je (a co potřebuje)

DIGIFLOW je **čistě statická webová aplikace** (HTML + JavaScript + CSS). To výrazně zjednodušuje nasazení:

| Potřebuje | Nepotřebuje |
|---|---|
| Webový server schopný servírovat statické soubory (Apache, Nginx, IIS…) | ❌ Databázi (MySQL, PostgreSQL…) |
| **Připojení klientů k internetu** (viz níže) | ❌ PHP, Node.js, Python na serveru |
| Moderní prohlížeč na straně uživatele | ❌ Aplikační server / runtime |
| | ❌ Žádný build krok |

> ⚠️ **Důležité – připojení k internetu:** Aplikace načítá knihovny (Tailwind CSS, Alpine.js, Lucide Icons) a fonty (Google Fonts) z veřejných CDN. **Počítače, na kterých aplikace poběží, musí mít přístup na internet.** Bez něj se aplikace nezobrazí správně. (Pokud bude aplikace nasazena do prostředí bez internetu, je potřeba CDN knihovny stáhnout lokálně – viz sekce 8.)

> ℹ️ Soubory `package.json`, `node_modules`, `serve`, Python apod. slouží **pouze pro lokální vývoj**. Na produkční Apache server nejsou potřeba a v dodaném ZIP balíčku nejsou.

---

## 2. Obsah ZIP balíčku

Po rozbalení `digiflow-deploy.zip` získáte složku `digiflow/` s touto strukturou:

```
digiflow/
├── index.html          # vstupní stránka aplikace
├── js/
│   ├── app.js          # logika aplikace
│   ├── data.js         # obsah kvízu a aktivit
│   └── i18n.js         # texty (tykání/vykání)
├── assets/
│   ├── logo.png        # logo MSVK
│   └── logo.jpg
└── NASAZENI.md         # tento návod (kopie)
```

Aplikace používá **relativní cesty**, takže funguje jak v podadresáři (např. `https://server/digiflow/`), tak na samostatné doméně.

---

## 3. Rychlé nasazení (Apache, podadresář)

Nejjednodušší varianta – aplikace pojede na adrese `http://vas-server/digiflow/`.

```bash
# 1) Rozbalte balíček
unzip digiflow-deploy.zip

# 2) Zkopírujte složku do kořene webu Apache
#    (typické umístění docrootu – ověřte podle své distribuce)
sudo cp -r digiflow /var/www/html/

# 3) Nastavte vlastníka a práva (Debian/Ubuntu: www-data; RHEL/CentOS: apache)
sudo chown -R www-data:www-data /var/www/html/digiflow
sudo find /var/www/html/digiflow -type d -exec chmod 755 {} \;
sudo find /var/www/html/digiflow -type f -exec chmod 644 {} \;
```

Hotovo. Otevřete v prohlížeči **`http://vas-server/digiflow/`**.

> Typické umístění docrootu: Debian/Ubuntu `/var/www/html`, RHEL/CentOS/Fedora `/var/www/html`, openSUSE `/srv/www/htdocs`. Ověřte direktivou `DocumentRoot` v konfiguraci Apache.

---

## 4. Nasazení jako samostatný web (VirtualHost)

Pokud má aplikace běžet na vlastní doméně (např. `digiflow.knihovna.cz`), vytvořte VirtualHost.

**a) Rozbalte obsah do vlastního adresáře:**

```bash
sudo mkdir -p /var/www/digiflow
sudo cp -r digiflow/* /var/www/digiflow/
sudo chown -R www-data:www-data /var/www/digiflow
```

**b) Vytvořte konfiguraci** (Debian/Ubuntu: `/etc/apache2/sites-available/digiflow.conf`):

```apache
<VirtualHost *:80>
    ServerName digiflow.knihovna.cz
    DocumentRoot /var/www/digiflow

    <Directory /var/www/digiflow>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        DirectoryIndex index.html
    </Directory>

    # Diakritika v textech (ě, š, č…) se zobrazí správně
    AddDefaultCharset UTF-8

    ErrorLog  ${APACHE_LOG_DIR}/digiflow-error.log
    CustomLog ${APACHE_LOG_DIR}/digiflow-access.log combined
</VirtualHost>
```

**c) Aktivujte web a načtěte konfiguraci:**

```bash
# Debian/Ubuntu
sudo a2ensite digiflow
sudo apache2ctl configtest      # ověření syntaxe
sudo systemctl reload apache2

# RHEL/CentOS (konfigurace patří do /etc/httpd/conf.d/digiflow.conf)
sudo apachectl configtest
sudo systemctl reload httpd
```

---

## 5. Doporučená konfigurace přes `.htaccess` (volitelné)

Pokud nechcete (nebo nemůžete) zasahovat do hlavní konfigurace serveru, vložte do kořene aplikace soubor `.htaccess`. Funguje pouze tehdy, má-li daný adresář `AllowOverride All` (resp. `AllowOverride` pokrývající dané direktivy).

```apache
# .htaccess – vložte do složky s aplikací

DirectoryIndex index.html
AddDefaultCharset UTF-8

# Skrýt výpis adresářů
Options -Indexes

# Správné MIME typy (obvykle nastaveno už serverem)
AddType text/javascript .js
AddType image/png .png
AddType image/jpeg .jpg

# Komprese textových souborů (vyžaduje mod_deflate)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript text/javascript
</IfModule>

# Cache statických souborů (vyžaduje mod_expires)
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/javascript "access plus 1 day"
    ExpiresByType image/png "access plus 7 days"
    ExpiresByType image/jpeg "access plus 7 days"
</IfModule>
```

> Pozn.: Aplikace **nepoužívá** žádné URL přesměrování (routing). Není potřeba `mod_rewrite` ani pravidla pro SPA.

---

## 6. HTTPS (doporučeno)

Pro produkční nasazení doporučujeme HTTPS. Nejjednodušší cesta je Let's Encrypt přes `certbot`:

```bash
# Debian/Ubuntu
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d digiflow.knihovna.cz
```

Certbot automaticky upraví VirtualHost a nastaví obnovu certifikátu. Pokud používáte interní certifikát knihovny, nastavte v VirtualHostu (port 443) direktivy `SSLEngine on`, `SSLCertificateFile` a `SSLCertificateKeyFile`.

---

## 7. Ověření po nasazení

1. Otevřete aplikaci v prohlížeči (`http://…/digiflow/` nebo doménu).
2. Zobrazí se uvítací obrazovka „Vítejte!" s logem MSVK a výběrem věku.
3. Projděte **Kvíz** i **Můj Den** a zkontrolujte, že vše funguje.
4. Ověřte diakritiku (ě, š, č, ř) – musí být čitelná. Pokud ne, chybí `AddDefaultCharset UTF-8`.
5. Vyzkoušejte na **tabletu / dotykovém zařízení**, které se bude na workshopech používat.

---

## 8. Provoz bez internetu (offline) – volitelné

Pokud nelze klientům zajistit přístup na internet, je nutné CDN závislosti hostovat lokálně. To je **zásah do kódu** a měl by ho provést vývojář:

1. Stáhnout Tailwind CSS, Alpine.js, Lucide Icons a fonty Nunito/Inter.
2. Uložit je do `assets/` a v `index.html` přepsat `<script>` a `<link>` odkazy z `https://…` na relativní cesty.

Bez této úpravy aplikace v offline prostředí **nebude fungovat správně** (chybí styly, ikony, interaktivita).

---

## 9. Řešení problémů

| Příznak | Pravděpodobná příčina | Řešení |
|---|---|---|
| Stránka je bílá / bez stylů / nereaguje | Klient nemá přístup k CDN (internet) | Ověřit připojení; viz sekce 8 (offline varianta) |
| `403 Forbidden` | Špatná práva nebo `Require`/`Options` | `chown` na uživatele webserveru, `chmod 755/644`, `Require all granted` |
| `404 Not Found` na hlavní stránce | Chybí `DirectoryIndex` nebo špatná cesta | Nastavit `DirectoryIndex index.html`, ověřit `DocumentRoot` |
| Rozsypaná diakritika (Ä›, Å¡…) | Chybí UTF-8 charset | Přidat `AddDefaultCharset UTF-8` |
| Nezobrazuje se logo | Chybí složka `assets/` nebo špatná práva | Zkontrolovat, že `assets/logo.png` existuje a je čitelné |
| `.js` se nenačítají (MIME) | Server neposílá správný typ | Přidat `AddType text/javascript .js` |

Podrobné chyby najdete v logu Apache (`/var/log/apache2/` nebo `/var/log/httpd/`).

---

## 10. Aktualizace na novou verzi

Nová verze se dodává opět jako ZIP balíček. Postup:

```bash
# Záloha stávající verze (doporučeno)
sudo cp -r /var/www/html/digiflow /var/www/html/digiflow.bak

# Rozbalit nový balíček a nahradit soubory
unzip digiflow-deploy.zip
sudo cp -r digiflow/* /var/www/html/digiflow/
sudo chown -R www-data:www-data /var/www/html/digiflow
```

Restart Apache není při výměně statických souborů potřeba. Uživatelům doporučte obnovit stránku (Ctrl+F5) kvůli cache.

---

## 11. Poznámky pro jiné servery

**Nginx** – příklad serverového bloku:

```nginx
server {
    listen 80;
    server_name digiflow.knihovna.cz;
    root /var/www/digiflow;
    index index.html;
    charset utf-8;
    location / {
        try_files $uri $uri/ =404;
    }
}
```

**IIS (Windows Server)** – rozbalte obsah do adresáře webu (např. `C:\inetpub\wwwroot\digiflow`), v IIS Manageru vytvořte aplikaci/web, jako výchozí dokument nastavte `index.html`. Ověřte, že je u typu `.js` nastaven MIME `text/javascript`.

---

## 12. Soukromí a GDPR

Aplikace **neukládá žádná osobní data** na server. Veškerý postup uživatele se ukládá pouze do `localStorage` v jeho prohlížeči a nikam se neodesílá. Není potřeba registrace ani přihlášení. Server pouze odesílá statické soubory.

---

*V případě dotazů k aplikaci kontaktujte dodavatele (Gymnázium PORG Ostrava / tým DIGIFLOW).*
