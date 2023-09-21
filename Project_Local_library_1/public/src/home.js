function getTotalBooksCount(books=[]) {
  return books.length
}

function getTotalAccountsCount(accounts=[]) {
  return accounts.length
}

function getBooksBorrowedCount(books=[]) {
  total = 0 
  for(const book of books){
    const borrowed = book.borrows[0] 
    if (borrowed.returned === false) {
      total ++
    }
  }
  return total 
}

function getMostCommonGenres(books=[]) {
  const lookup = {}
  books.forEach(bookObj => {
    const {genre} = bookObj 
    if(!lookup[genre]){
      lookup[genre] = 1
    }else{
      lookup[genre]++
    }
})
  const result = []
  for(let genreNameKey in lookup){
    const obj = {name: genreNameKey, count: lookup[genreNameKey]}
    result.push(obj)
  }
  result.sort((countA, countB)=> countB.count - countA.count)
  return result.slice(0,5)
}

function getMostPopularBooks(books=[]) {
  const result = [] 
  books.forEach((bookObj)=>{
    const {title, borrows} = bookObj
    result.push({
      "name": title, 
      "count": borrows.length 
    })
  })
  result.sort((countA, countB) => countB.count - countA.count)
  return result.slice(0,5)
}

function getMostPopularAuthors(books=[], authors=[]) {
  const result = []
  authors.forEach((authorsObj)=> {
    const combinedObj = {}
    const {id, name} = authorsObj
    const fullName = `${name.first} ${name.last}`
    books.forEach((bookObj)=> {
      const {authorId, borrows} = bookObj
      if(id === authorId){
        if(!combinedObj["name"]) combinedObj["name"] = fullName
        if(!combinedObj["count"]) combinedObj["count"] = borrows.length
        else combinedObj["count"] += borrows.length
      }
    })
    result.push(combinedObj)
  })
  result.sort((countA, countB) => countB.count - countA.count)
  return result.slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
