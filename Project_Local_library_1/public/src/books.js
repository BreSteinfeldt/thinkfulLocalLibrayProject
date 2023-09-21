function findAuthorById(authors=[], id=0) {
  return authors.find((author)=> author.id === id)
}

function findBookById(books=[], id=0) {
  return books.find((book) => book.id === id)
}

//helper function created for getBorrowersForBook
function findAccountById(accounts=[], id=0) {
  return accounts.find((accountObj) => accountObj.id === id)
}

function partitionBooksByBorrowedStatus(books=[]) {
  const checkedOut = []
  const available = []
  for (let book of books) {
    const {borrows} = book
    const isAvailable = borrows[0].returned
    if(isAvailable) {
      available.push(book)
    } else{
      checkedOut.push(book)
    }
  }
  return [checkedOut, available]
}

// this function uses a helper function to find account by ID
function getBorrowersForBook(book={}, accounts=[]) {
  const {borrows} = book
  const result = borrows.map((borrowsObj)=>{
    const {id, returned} = borrowsObj
    const foundAccountsId = findAccountById(accounts, id)
    foundAccountsId.returned = returned 
    return foundAccountsId 

  })
  return result.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
