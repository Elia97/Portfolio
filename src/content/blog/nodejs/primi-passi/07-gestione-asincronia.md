---
title: "Gestire l'Asincronia: Callback, Promise e Async/Await"
description: "L'evoluzione del codice asincrono in Node.js: come passare dal disordine delle callback alla pulizia di async/await."
pubDate: "Jan 14 2026"
tags: ["javascript", "asincronia", "promises", "async-await"]
series: "primi-passi-con-nodejs"
order: 7
---

<div class="callout note">
  <strong>Evoluzione:</strong> JavaScript è progredito enormemente nel modo in cui gestisce l'attesa. Siamo passati dalle "funzioni dentro le funzioni" a una sintassi che sembra quasi linguaggio naturale.
</div>

In Node.js, l'asincronia non è un'opzione, è lo standard. Poiché il sistema deve gestire molte operazioni contemporaneamente senza bloccare l'Event Loop, negli anni sono nati diversi strumenti per scrivere questo tipo di codice.

---

## 1. Le Callback: Il metodo "vecchia scuola"

Una **Callback** è una funzione passata come argomento a un'altra funzione. In JavaScript questo è possibile perché le funzioni sono **cittadini di prima classe** (_First-Class Functions_): possono essere assegnate a variabili, passate come parametri e restituite da altre funzioni.

```javascript
setTimeout(() => {
  console.log("Eseguito dopo 2 secondi")
}, 2000)
```

### Il problema: Callback Hell

Quando devi concatenare molte operazioni, il codice inizia a "scivolare" verso destra, creando una piramide illeggibile chiamata <span class="badge">Callback Hell</span>.

```javascript
// La piramide della rovina
operazione1(() => {
  operazione2(() => {
    operazione3(() => {
      // Difficile da leggere e da debuggare...
    })
  })
})
```

---

## 2. Le Promise: Una boccata d'aria

Una <span class="badge">Promise</span> rappresenta un valore che non conosciamo ancora, ma che "promettiamo" di restituire in futuro. Una promessa può trovarsi in tre stati:

<div class="feature-list">
  <div class="feature-item">
    <strong>Pending</strong>
    Stato iniziale: l'operazione è ancora in corso.
  </div>
  <div class="feature-item">
    <strong>Resolved (Fulfilled)</strong>
    L'operazione è terminata con successo e ha restituito un valore.
  </div>
  <div class="feature-item">
    <strong>Rejected</strong>
    L'operazione è fallita e ha restituito un errore.
  </div>
</div>

Ecco come creiamo una promessa che controlla il risultato di una moltiplicazione:

```javascript
function ottieniProdotto(a, b) {
  return new Promise((resolve, reject) => {
    const prodotto = a * b
    if (prodotto <= 50) {
      resolve("Risultato accettabile")
    } else {
      reject(new Error("Il risultato è troppo alto!"))
    }
  })
}
```

---

## 3. Async / Await: Lo standard moderno

Questa è l'evoluzione finale. `async/await` è costruito sopra le Promise, ma rende il codice lineare, come se fosse sincrono.

- **async**: Trasforma una funzione normale in una che restituisce sempre una Promise.
- **await**: Dice a JavaScript di "fermare" l'esecuzione della funzione corrente finché la promessa non viene risolta.

```javascript
async function eseguiCalcolo() {
  try {
    const risultato = await ottieniProdotto(5, 5)
    console.log(risultato) // Risultato accettabile
  } catch (error) {
    console.error("Errore:", error.message)
  }
}
```

<div class="callout tip">
  <strong>Perché usarlo?</strong> È pulito, gestisce gli errori con il classico <code>try/catch</code> e rende lo stack trace degli errori molto più comprensibile durante il debug.
</div>

---

## Cosa scegliere oggi?

<div class="feature-list">
  <div class="feature-item">
    <strong>Callback</strong>
    Da usare solo se strettamente necessario (vecchie API o librerie datate).
  </div>
  <div class="feature-item">
    <strong>Async/Await</strong>
    <strong>Scegli questo nel 99% dei casi.</strong> È lo standard industriale attuale per scrivere codice leggibile e robusto.
  </div>
</div>

---

<div style="text-align: center; margin-top: 3rem; opacity: 0.8;">
  <em>Hai padroneggiato l'asincronia, ora manca solo un ingrediente per costruire progetti veri: la gestione delle dipendenze. Nel prossimo articolo scoprirai <strong>NPM</strong> e il file <code>package.json</code>.</em>
</div>
