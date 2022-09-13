import React from 'react'

const pagiantion = ({ nPages, currentPage, setCurrentPage }) => {

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  
  const nextPage = () => {
    console.log("Next page.",currentPage);
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    console.log("previous page.",currentPage);
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <nav>
        <ul className='pagination justify-content-center' >
          <li className='page-item'>
            <a className='page-link'
              onClick={prevPage}
              href="#">
              Previous
            </a>
          </li>
          {
            pageNumbers.map((pgNumber) => (
              <li key={pgNumber}
                className={`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                <a onClick={() => setCurrentPage(pgNumber)}
                  className="page-link"
                  href='#'>
                  {pgNumber}
                </a>
              </li>
            ))
          }
          <li className='page-item'>
            <a className='page-link'
              onClick={nextPage}
              href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>

    </>
  )
}

export default pagiantion
