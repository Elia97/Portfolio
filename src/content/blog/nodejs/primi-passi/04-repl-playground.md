---
title: "REPL: Il tuo primo Playground in Node.js"
description: "Scopri come usare la Console REPL di Node.js per testare codice al volo, eseguire calcoli e sperimentare senza creare file."
pubDate: "Jan 14 2026"
tags: ["repl", "terminale", "playground"]
series: "primi-passi-con-nodejs"
order: 4
---

<div class="callout note">
  <strong>Prova subito:</strong> Non serve creare file per iniziare a programmare. Node.js ha una console interattiva pronta a rispondere a ogni tuo comando.
</div>

Dopo aver installato Node.js, la prima cosa che vuoi fare è probabilmente scrivere un po' di codice. Prima ancora di creare il tuo primo file `.js`, Node ti offre uno strumento potentissimo chiamato <span class="badge">REPL</span>.

---

## Cos'è il REPL?

L'acronimo sta per **Read-Eval-Print-Loop** (Leggi-Valuta-Stampa-Ciclo). È un ambiente interattivo che segue quattro fasi:

1.  **Read**: Legge il tuo input (JavaScript).
2.  **Eval**: Valuta e calcola il codice inserito.
3.  **Print**: Stampa il risultato in console.
4.  **Loop**: Torna ad aspettare un nuovo input.

Per avviarlo, apri il tuo terminale e scrivi semplicemente:

```bash
node
```

Vedrai comparire un cursore `>`: sei dentro il playground!

---

## Primi passi nel REPL

### Operazioni aritmetiche

Puoi usare il REPL come una calcolatrice immediata:

```javascript
> 5 + 5
10
> (10 * 2) / 4
5
```

### Usare variabili e funzioni

Puoi definire costanti e funzioni proprio come in un file reale. Nota che dopo una dichiarazione di variabile il REPL risponde `undefined`: è normale, poiché la dichiarazione stessa non restituisce un valore.

```javascript
> const nome = "Node"
undefined
> console.log(`Ciao ${nome}`)
Ciao Node
```

---

## Trucchi da Pro

### La variabile underscore (`_`)

Una delle funzioni più utili: la variabile `_` contiene l'ultimo risultato ottenuto.

```javascript
> 10 + 20
30
> _ * 2
60
```

### Comandi speciali (Dot Commands)

Il REPL ha dei comandi interni che iniziano con il punto `.`:

- <span class="badge">.help</span>: Mostra tutti i comandi disponibili.
- <span class="badge">.editor</span>: Entra in modalità editor per scrivere codice complesso (su più righe) più facilmente.
- <span class="badge">.load</span>: Carica il contenuto di un file JS nel REPL.
- <span class="badge">.save</span>: Salva la sessione corrente in un file.
- <span class="badge">.exit</span> (o premere `Ctrl+C` due volte): Esci dal REPL.

---

<div style="text-align: center; margin-top: 3rem; opacity: 0.8;">
  <em>Hai visto quanto è reattivo REPL, ma cosa c'è dietro tanta velocità? Nel prossimo articolo solleveremo il cofano per scoprire <strong>V8</strong> e l'architettura che rende Node.js un campione di performance.</em>
</div>
