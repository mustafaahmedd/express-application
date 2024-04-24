import React from 'react'

const Pagination = ({per_page, users, handleClick}) => {
  
    const pageNumbers = []
    for(let i=1; i<=Math.ceil(users/ per_page); i++)
    {
      pageNumbers.push(i)
    }
    handleClick = (pageNumber) => {
        this.setState({ currentPage: pageNumber })
    }
    return (
    <div>
      {pageNumbers.map(number => (
        <Button 
        className="button" 
        variant="secondary" 
        key={number} 
        href="!#"
        onClick={() => handleClick(number)}>
          {number}
        </Button>
        )
      )}
    </div>
  )
}

export default Pagination;
