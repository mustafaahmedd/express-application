export default function Billing() {
    return (
      <>
        <h1>Billing</h1>
        <form className="form">
          <label>Enter your Units: </label>
          <input type="text" name="units" placeholder="Units..." /><br /><br />
          <button>Calculate Bill</button>
        </form>
      </>
    )
  }