export function Toolbar() {
  async function logout() {
    await fetch("/smoothie/api/logout/", {
      method: "POST",
      credentials: "same-origin",
    })
    window.location.href = "/smoothie/login/"
  }

  return (
    <div className="toolbar" style={{ marginTop: 24 }}>
      <button className="btn" onClick={logout} style={{ marginLeft: "auto" }}>
        Esci
      </button>
    </div>
  )
}
