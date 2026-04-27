---
title: "La tua prima Console App: un convertitore di valuta"
description: "Mettiamo in pratica ciò che abbiamo imparato creando un'applicazione interattiva da riga di comando con ES Modules."
pubDate: "Jan 14 2026"
tags: ["console", "readline", "cli", "tutorial"]
series: "primi-passi-con-nodejs"
order: 9
---

È il momento di smettere di leggere e iniziare a costruire! Dopo aver studiato l'asincronia e NPM, siamo pronti per creare un vero script interattivo che gira direttamente nel tuo terminale.

In questo tutorial realizzeremo un **Convertitore di Valuta** professionale, imparando a gestire l'input dell'utente e a formattare i dati in uscita.

<div class="callout note">
  <strong>Ricorda:</strong> Assicurati di avere <code>"type": "module"</code> nel tuo <code>package.json</code> come visto nell'articolo precedente.
</div>

---

## Preparare il Progetto

Se hai seguito la guida dall'inizio, puoi creare una nuova sottocartella nella directory `progetti-nodejs`:

```bash
mkdir convertitore-valuta
cd convertitore-valuta
npm init -y
```

Poi aggiungi `"type": "module"` al `package.json` generato. Crea il file per il convertitore:

```bash
# Linux/macOS
touch converter.js

# Windows (PowerShell)
New-Item converter.js -ItemType File
```

---

## Il modulo Interfaccia: readline

Node.js include un modulo integrato chiamato <span class="badge">readline</span>. Questo strumento è fondamentale per creare interazioni "botta e risposta" nel terminale. Per funzionare, si collega a due flussi (stream) di dati:

- <span class="badge">process.stdin</span>: lo "Standard Input" (quello che scrivi sulla tastiera).
- <span class="badge">process.stdout</span>: lo "Standard Output" (quello che vedi sullo schermo).

<div class="callout note">
  <strong>Nota Tecnica:</strong> Il modulo readline è basato su eventi. Vedremo come gestire la chiusura dell'interfaccia per evitare che il programma rimanga "appeso" in attesa di dati.
</div>

---

## Sviluppo del Convertitore

Apri `converter.js` nel tuo editor e incolla il codice seguente. Nota come utilizziamo lo standard moderno degli **ES Modules** per importare le funzionalità.

```javascript
import readline from "node:readline"

// Configurazione dell'interfaccia di comunicazione
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("-----------------------------------------")
console.log("   BENVENUTO NEL CONVERTITORE EUR -> USD  ")
console.log("-----------------------------------------")

// Chiediamo l'input all'utente
rl.question("Inserisci l'importo in Euro (€): ", (amount) => {
  const eur = parseFloat(amount.replace(",", ".")) // Gestiamo anche la virgola italiana

  if (isNaN(eur)) {
    console.error("\n❌ Errore: Per favore, inserisci un numero valido.")
  } else {
    const rate = 1.08 // Tasso di cambio fittizio
    const usd = (eur * rate).toFixed(2)

    console.log(`\n✅ Risultato: ${eur}€ equivalgono a circa $${usd} USD.`)
    console.log("-----------------------------------------")
  }

  // Fondamentale: chiudere l'interfaccia altrimenti il processo non termina
  rl.close()
})
```

---

## Guida all'Esecuzione

Per testare la tua app, segui questi passaggi:

1.  **Apri il terminale** nella cartella del progetto.
2.  **Verifica il file**: assicurati che `converter.js` sia salvato correttamente.
3.  **Lancia lo script**:
    ```bash
    node converter.js
    ```
4.  **Interagisci**: inserisci un numero e premi <kbd>Invio</kbd>.

---

## Analisi del Codice

Perché abbiamo scritto il codice in questo modo?

<div class="feature-list">
  <div class="feature-item">
    <strong>Sintassi import</strong>
    Usiamo <code>import readline from "node:readline"</code>. Il prefisso <code>node:</code> è la best practice moderna per distinguere i moduli integrati da quelli installati tramite NPM.
  </div>
  <div class="feature-item">
    <strong>Validazione</strong>
    Utilizziamo <code>parseFloat()</code> e <code>isNaN()</code>. Un'app professionale non deve mai crashare se l'utente sbaglia a digitare, ma deve fornire un feedback chiaro.
  </div>
  <div class="feature-item">
    <strong>Gestione Risorse</strong>
    Chiamando <code>rl.close()</code>, diciamo a Node.js che abbiamo finito di usare la tastiera. Se dimentichi questo comando, il cursore continuerà a lampeggiare all'infinito nel terminale.
  </div>
</div>

---

<div style="text-align: center; margin-top: 3rem; opacity: 0.8;">
  <em>Hai creato la tua prima app interattiva, ma Node.js è nato per il web. Nel prossimo e ultimo articolo costruiremo un vero <strong>server HTTP</strong> che risponde dal browser.</em>
</div>
