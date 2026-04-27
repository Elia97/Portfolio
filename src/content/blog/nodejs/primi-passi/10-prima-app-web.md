---
title: "Il tuo primo Web Server: Hello World dal Browser"
description: "Chiudiamo la guida pratica creando un server HTTP nativo con ES Modules. Scopri la potenza del web asincrono."
pubDate: "Jan 14 2026"
tags: ["http", "server", "web", "tutorial"]
series: "primi-passi-con-nodejs"
order: 10
---

Siamo arrivati alla tappa finale di questo viaggio. Abbiamo esplorato l'architettura, dominato l'asincronia e configurato NPM. Ma Node.js brilla davvero quando diventa il motore del **Web**.

Invece di affidarti a server preconfigurati (come Apache o Nginx), con Node.js **scriviamo noi il codice del server**. Questa flessibilità è ciò che ha reso Node.js lo standard per le applicazioni moderne ad alte prestazioni.

<div class="callout tip">
  <strong>Il Segreto della Scalabilità</strong><br/>
  Grazie all'architettura <em>Non-Blocking I/O</em> che abbiamo studiato nei capitoli precedenti, questo semplice server può gestire migliaia di connessioni simultanee con un consumo di risorse minimo.
</div>

---

## Il Modulo Nativo: http

Node.js mette a disposizione il modulo <span class="badge">node:http</span>. Sebbene nel mondo reale useremo framework come _Express_ o _Fastify_, capire come funziona il modulo nativo è essenziale per comprendere il flusso **Richiesta/Risposta**.

Ogni volta che un utente visita il tuo indirizzo, avvengono due cose:

1.  **Request (<span class="badge">req</span>)**: Il server riceve un oggetto contenente i dati del visitatore (URL, browser usato, dati inviati).
2.  **Response (<span class="badge">res</span>)**: Il server deve rispondere inviando uno stato (es. 200 OK) e il contenuto (HTML, JSON, immagini).

---

## Preparare il Progetto

Creiamo l'ultima sottocartella nella nostra directory `progetti-nodejs`:

```bash
mkdir primo-server
cd primo-server
npm init -y
```

Ricorda di aggiungere `"type": "module"` al `package.json`. Poi crea il file del server:

```bash
# Linux/macOS
touch server.js

# Windows (PowerShell)
New-Item server.js -ItemType File
```

---

## Creazione del Server Web

Apri `server.js` e utilizza la potenza degli **ES Modules** per inizializzare il tuo primo server.

```javascript
import { createServer } from "node:http"

// Creiamo un'istanza del server
const server = createServer((req, res) => {
  // 1. Definiamo il tipo di contenuto (HTML con supporto emoji)
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })

  // 2. Scriviamo il corpo della pagina
  res.write("<h1>Benvenuto sul mio server Node.js! 🚀</h1>")
  res.write(
    `<p>Stai visualizzando il percorso: <strong>${req.url}</strong></p>`
  )

  // 3. Importante: segnaliamo che la risposta è terminata
  res.end()
})

// Definiamo la porta di ascolto (3000 è lo standard per lo sviluppo)
const PORT = 3000

server.listen(PORT, () => {
  console.log("-----------------------------------------")
  console.log(`✅ Server attivo!`)
  console.log(`🌐 Indirizzo: http://localhost:${PORT}`)
  console.log("-----------------------------------------")
})
```

---

## Come testare il tuo server

1.  **Avvia il processo**: Nel terminale, scrivi `node server.js`.
2.  **Apri il Browser**: Vai all'indirizzo `http://localhost:3000`.
3.  **Sperimenta**: Prova a navigare su `http://localhost:3000/chi-siamo` o `http://localhost:3000/blog`. Noterai che l'app riconosce il percorso che scrivi nell'URL!

---

## Analisi delle Operazioni

<div class="feature-list">
  <div class="feature-item">
    <strong>createServer</strong>
    È una funzione di "ascolto". Non blocca il computer; resta lì, in attesa che l'Event Loop riceva una connessione.
  </div>
  <div class="feature-item">
    <strong>res.writeHead</strong>
    Comunichiamo al browser che tutto è andato bene (codice 200) e che tipo di file stiamo inviando. Senza questo, il browser potrebbe non capire come visualizzare il testo.
  </div>
  <div class="feature-item">
    <strong>res.end()</strong>
    È il segnale di chiusura del pacchetto. Se lo dimentichi, il browser continuerà a caricare all'infinito perché "pensa" che il server debba ancora dire qualcosa.
  </div>
</div>

---

### 🎉 Congratulazioni!

Hai completato con successo il modulo **"Primi Passi con Node.js"**. Ora hai le basi solide per affrontare sfide più grandi:

- Creare API REST professionali.
- Usare database come MongoDB o PostgreSQL.
- Sviluppare applicazioni in tempo reale con WebSockets.

**Qual è il prossimo passo?** Continua a mettere in pratica ciò che hai imparato utilizzando il nostro **Playground** interattivo che trovi in fondo alla pagina!
