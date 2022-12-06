function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found
}

function partitionBooksByBorrowedStatus(books) {
  let total = [], stillBorrowedBooks = [], returnedBooks = []
  books.forEach(book => {
    book.borrows.some((borrow)=> borrow.returned == false) 
      ? stillBorrowedBooks.push(book) : returnedBooks.push(book)
  });

  total.push(stillBorrowedBooks)
  total.push(returnedBooks)

  return total; 


}

function getBorrowersForBook(book, accounts) {
  let map = book.borrows.map(borrower => {
  let found = accounts.find(account => borrower.id === account.id);
    found.returned = borrower.returned
  return found
  })
  return (map.filter((borrower, i) => map.findIndex(item => item.id === borrower.id) === i))
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
