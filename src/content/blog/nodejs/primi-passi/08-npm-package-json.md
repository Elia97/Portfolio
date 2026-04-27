---
title: "NPM e il cuore del progetto: package.json"
description: "Scopri come gestire le dipendenze, automatizzare task e organizzare i tuoi progetti Node.js con NPM."
pubDate: "Jan 14 2026"
tags: ["npm", "package-json", "dependencies"]
series: "primi-passi-con-nodejs"
order: 8
---

<div class="callout note">
  <strong>In breve:</strong> NPM è il cuore operativo di ogni progetto Node.js: gestisce dipendenze, versioni e comandi in modo standardizzato.
</div>

Dopo aver capito come funziona l'asincronia, è il momento di imparare a dare una struttura professionale ai nostri progetti. Benvenuti nel mondo di **NPM (Node Package Manager)**.

NPM unisce due cose: uno **strumento da terminale** e un enorme **registro online** di librerie. In pratica, è ciò che ti permette di installare dipendenze, aggiornare versioni e automatizzare comandi.

---

## Cos'è un gestore di pacchetti

Un gestore di pacchetti automatizza quattro attività fondamentali:

- installazione delle librerie
- aggiornamento delle versioni
- configurazione del progetto
- distribuzione del software

In altri ecosistemi trovi strumenti simili: in Java, ad esempio, si usa **Maven**. In Node.js, lo standard è NPM.

---

## Inizializzazione e Gestione delle Dipendenze

Ogni progetto Node.js inizia con un file chiamato `package.json`. Per crearlo, si utilizza il comando di inizializzazione `npm init`:

```text
npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (node)
version: (1.0.0)
description:
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
type: (commonjs) module
About to write to /home/elia97/node/package.json:

{
  "name": "node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "type": "module"
}


Is this OK? (yes)
```

Se vuoi saltare le domande e usare i valori predefiniti, puoi usare la modalità rapida <code>npm init -y</code>.

<div class="callout note">
  Nota: se usi il flag <code>-y</code>, dovrai aggiungere manualmente <code>"type": "module"</code> al tuo <code>package.json</code>.
</div>

<div class="callout tip">
  <strong>Perché ES Modules?</strong><br/>
  Node.js sta completando la transizione verso gli <strong>ES Modules</strong> (<code>import/export</code>), lo standard ECMAScript che unifica JavaScript su browser e server. In questa guida adottiamo questa sintassi moderna.
</div>

### Creare l'Entry Point

Dopo aver inizializzato il progetto, il passo successivo è creare il file principale. Per convenzione si chiama `index.js`:

```bash
# Linux/macOS
touch index.js

# Windows (PowerShell)
New-Item index.js -ItemType File
```

Aggiungi un semplice messaggio per testare il setup:

```javascript
console.log("Hello from Node.js! 🚀")
```

### Configurare gli Script NPM

Apri il `package.json` e modifica la sezione `scripts`:

```json
"scripts": {
  "start": "node index.js",
  "dev": "node --watch index.js"
}
```

<div class="callout tip">
  <strong>Il flag --watch</strong><br/>
  Da Node.js 18+, il flag <code>--watch</code> riavvia automaticamente lo script quando modifichi il file. Perfetto per lo sviluppo!
</div>

Ora puoi avviare il tuo progetto con:

```bash
npm start        # Esegue una volta
npm run dev      # Esegue con auto-reload
```

---

### Varianti di Installazione e Flag

Quando installi una libreria, NPM la salva nella cartella `node_modules/` e aggiorna il `package.json`. Esistono diverse modalità:

- <span class="badge">--save</span>: aggiunge a `dependencies` (default). Sono i pacchetti necessari per far girare l'app in produzione.
- <span class="badge">--save-dev</span>: aggiunge a `devDependencies`. Sono strumenti utili solo durante lo sviluppo (es. test runner).
- <span class="badge">--save-optional</span>: inserisce in `optionalDependencies`.
- <span class="badge">--no-save</span>: installa senza modificare il `package.json`.
- <span class="badge">-g</span>: installazione globale per usare il pacchetto come comando CLI ovunque nel sistema.

### Aggiornamento e Versionamento (SemVer)

NPM gestisce le versioni seguendo il **Semantic Versioning** (`MAJOR.MINOR.PATCH`). Puoi aggiornare i pacchetti con `npm update <nome>` o rimuoverli con `npm uninstall <nome>`.

Nel `package.json` troverai simboli come:

- `^1.2.3`: accetta aggiornamenti compatibili (Minor e Patch).
- `~1.2.3`: accetta solo correzioni di bug (Patch).

---

## La Struttura: node_modules e Lockfile

Un progetto Node.js si poggia su due pilastri fondamentali che garantiscono ordine e riproducibilità:

1. **node_modules**: È la cartella che contiene tutto il codice delle librerie installate. Poiché può diventare estremamente pesante, **non va mai inclusa nel sistema di versionamento (Git)**.
2. **package-lock.json**: Viene generato automaticamente e registra le versioni esatte di ogni singola dipendenza (comprese le dipendenze delle dipendenze). Garantisce che ogni sviluppatore del team lavori esattamente con lo stesso ambiente.

---

## Anatomia del package.json

Il `package.json` è la carta d'identità del tuo progetto. Ecco gli attributi fondamentali che devi conoscere:

- <span class="badge">name</span>: il nome del pacchetto (minuscolo, senza spazi o caratteri speciali).
- <span class="badge">version</span>: la versione corrente del progetto.
- <span class="badge">description</span>: una breve spiegazione del modulo.
- <span class="badge">author</span>: il creatore del progetto (può essere una stringa o un oggetto).
- <span class="badge">contributors</span>: lista di persone che collaborano al progetto.
- <span class="badge">homepage</span>: l'indirizzo URL del sito ufficiale del progetto.
- <span class="badge">repository</span>: indica dove risiede il codice sorgente (es. GitHub).
- <span class="badge">license</span>: il tipo di licenza (es. MIT, ISC).
- <span class="badge">main</span>: il file di ingresso dell'applicazione (solitamente `index.js`).
- <span class="badge">dependencies</span>: le librerie fondamentali per l'esecuzione in produzione.
- <span class="badge">devDependencies</span>: le librerie necessarie solo per lo sviluppo.
- <span class="badge">scripts</span>: comandi personalizzati per automatizzare i task.
- <span class="badge">keywords</span>: parole chiave per aiutare a trovare il pacchetto nel registro NPM.

---

## Gli Script: Automazione al Servizio dei Developer

La sezione `scripts` è uno degli strumenti più flessibili di NPM. Ti permette di creare alias per comandi complessi, facilitando la vita a chiunque collabori al progetto.

```json
"scripts": {
  "start": "node index.js",
  "dev": "node index.js --watch",
  "test": "jest"
}
```

Puoi richiamare questi comandi con `npm run <nome-script>` (o semplicemente `npm start` per lo script standard).

<div class="feature-list">
  <div class="feature-item">
    <strong>Standardizzazione</strong>
    `npm start` e `npm test` sono standard universali: ogni hosting e collaboratore sa cosa aspettarsi.
  </div>
  <div class="feature-item">
    <strong>Workflow Pulito</strong>
    Evita di dover ricordare lunghe stringhe di comandi con decine di flag; basta un alias nel package.json.
  </div>
  <div class="feature-item">
    <strong>Integrazione CI/CD</strong>
    Gli script sono fondamentali per automatizzare i processi di test e deployment continuo.
  </div>
</div>

---

<div style="text-align: center; margin-top: 3rem; opacity: 0.8;">
  <em>Hai configurato il tuo progetto come un professionista. È ora di mettere le mani in pasta! Nel prossimo articolo costruiremo un vero <strong>convertitore di valuta</strong> interattivo da terminale.</em>
</div>
