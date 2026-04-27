---
title: "Il cuore di Node.js: L'Event Loop"
description: "Scopri come l'Event Loop permette a Node.js di gestire migliaia di operazioni contemporaneamente pur essendo single-threaded."
pubDate: "Jan 14 2026"
tags: ["event-loop", "asincronia", "performance"]
series: "primi-passi-con-nodejs"
order: 6
---

<div class="callout note">
  <strong>Il segreto della scalabilità:</strong> Node.js non usa un thread per ogni utente. Usa un unico thread e un ciclo infinito chiamato <strong>Event Loop</strong> per orchestrare tutto.
</div>

Abbiamo visto che Node.js è veloce grazie al suo modello I/O non bloccante. Ma come fa un unico filo di esecuzione (**single-thread**) a gestire migliaia di connessioni senza andare in tilt? La risposta risiede in un meccanismo chiamato <span class="badge">Event Loop</span>.

---

## Il Cameriere Perfetto: Un'analogia reale

Immagina un ristorante con un solo cameriere (l'Event Loop) e un cuoco (il Sistema Operativo/Libuv).

1.  **L'Ordine**: Il cameriere prende l'ordine al Tavolo A.
2.  **Delega**: Invece di aspettare in cucina che il piatto sia pronto, consegna la comanda e corre subito al Tavolo B.
3.  **L'Evento**: Quando il piatto del Tavolo A è pronto, il cuoco suona un campanello (genera un **evento**).
4.  **Callback**: Appena il cameriere finisce di servire chi ha davanti, sente il campanello e porta il piatto al Tavolo A.

Questo cameriere è instancabile perché non rimane mai con le mani in mano ad aspettare.

---

## Come funziona tecnicamente

L'Event Loop monitora costantemente lo stato del programma muovendosi tra diverse "code" di messaggi. Ogni giro completo del ciclo è chiamato <span class="badge">Tick</span>.

<div class="feature-list">
  <div class="feature-item">
    <strong>1. Call Stack</strong>
    È dove vengono eseguite le funzioni "normali" (sincrone). Se una funzione è qui, l'Event Loop è occupato.
  </div>
  <div class="feature-item">
    <strong>2. Microtask Queue</strong>
    Una coda speciale ad altissima priorità. Qui vivono le <strong>Promise</strong>. Node.js svuota sempre questa coda prima di passare alla successiva.
  </div>
  <div class="feature-item">
    <strong>3. Task Queue (Callback Queue)</strong>
    Qui finiscono le funzioni asincrone pronte per essere eseguite, come un `setTimeout` scaduto o un'operazione su file conclusa.
  </div>
</div>

---

## Un esempio pratico: Chi arriva primo?

Anche se JavaScript esegue il codice riga per riga, l'Event Loop può cambiare l'ordine delle "apparenze". Guarda questo codice:

```javascript
console.log("1. Inizio")

setTimeout(() => {
  console.log("2. Timeout (5 secondi)")
}, 5000)

fetch("https://api.esempio.it/").then(() => {
  console.log("3. Risposta dalla rete")
})

console.log("4. Fine")
```

### Cosa succede "sotto il cofano"?

1.  **Sincrono**: Stampa "1. Inizio".
2.  **Asincrono (Timer)**: Trova `setTimeout`. Delega il timer a Node.js e passa oltre.
3.  **Asincrono (Microtask)**: Trova la `fetch`. Delega la richiesta e continua.
4.  **Sincrono**: Stampa "4. Fine".

Appena il Call Stack è vuoto:

- La callback della fetch (Microtask) ha la priorità e viene eseguita non appena i dati tornano.
- Il `setTimeout` (Task) viene eseguito solo allo scadere del tempo.

**Output finale:**

```text
1. Inizio
4. Fine
3. Risposta dalla rete
2. Timeout (5 secondi)
```

---

<div class="callout warning">
  <strong>La Regola d'Oro:</strong> "Don't Block the Event Loop". Poiché c'è un solo thread, se scrivi un calcolo che dura 10 secondi, il cameriere rimarrà "congelato" e il server non risponderà a nessun altro utente.
</div>

---

<div style="text-align: center; margin-top: 3rem; opacity: 0.8;">
  <em>Hai capito come funziona l'Event Loop, ma come si scrive codice che lo sfrutta al meglio? Nel prossimo articolo ripercorreremo l'evoluzione dell'asincronia: dalle <strong>Callback</strong> fino al moderno <strong>async/await</strong>.</em>
</div>
