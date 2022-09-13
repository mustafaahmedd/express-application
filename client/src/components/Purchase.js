export default function Purchase() {
  return (
    <>
      <h1>Purchase</h1>
      <div class="row align-items-center">
        <div class="col"></div>
        <div class="col">
          <div className="">
            <h2>Form</h2>
            <form className="form">
              <div class="mb-3">
                <label for="formGroupExampleInput" class="align-items-start">Coins</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Coins.."/>
              </div>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Quantity</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Quantity.."/>
              </div>
              <button>Purchase</button>
            </form>
          </div>
        </div>
        <div class="col"></div>
      </div>

    </>
  )
}