function findAccountById(accounts=[], id="") {
  return accounts.find((account) => account.id === id)
}

function sortAccountsByLastName(accounts=[]) {
  accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  })
  return accounts
}

function getTotalNumberOfBorrows(account={}, books=[]) {
  const {id} = account  
  let total = books.reduce((acc, bookObj) =>{
    const {borrows} = bookObj 
    const borrowsFilter = borrows.filter((borrowsObj) => {
      return borrowsObj.id === id
    })
    acc += borrowsFilter.length 
    return acc 
   },0)
   return total 
}

function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const {id} = account 
  let filteredBooks = books.filter((book) => book.borrows[0].id === id && book.borrows[0].returned === false)
  
  filteredBooks.forEach((book)=>{
    let foundAuthor = authors.find((author) => book.authorId === author.id)
    book["author"] = foundAuthor
    return book 
  }) 
return filteredBooks 
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
