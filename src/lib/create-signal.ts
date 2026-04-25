/**
 * Crea una funzione che, ad ogni chiamata, abbortisce il controller
 * precedente e restituisce il signal del nuovo. Usata per evitare
 * l'accumulo di event listener tra navigazioni con ClientRouter.
 */
export function createSignal() {
  let ctrl = new AbortController()
  return (): AbortSignal => {
    ctrl.abort()
    ctrl = new AbortController()
    return ctrl.signal
  }
}
