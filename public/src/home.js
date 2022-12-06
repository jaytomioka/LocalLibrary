function getTotalBooksCount(books) {
  return (books.length)
}

function getTotalAccountsCount(accounts) {
  return (accounts.length)
}

function getBooksBorrowedCount(books) {
  let result = 0;
  result =  books.reduce((acc, book)=> {
    book.borrows.find((checkedOut) => checkedOut.returned == false)
      ? acc+=1 : acc+=0;
      return acc;
  },0)
  return result
}
function helperFunction(books) { 
  let item = {}; 
  books.forEach((book) => { if (item[book.genre] != null) { 
    item[book.genre]++; 
  } else { 
    item[book.genre] = 1; 
  }
  }); 
  return item; 
}

function getMostCommonGenres(books) {
  let helper = helperFunction(books);
  let result = [];
  for (const [key, value] of Object.entries(helper)) {
  result.push({name: key, count: value});
  }
  result.sort((genreA, genreB) => genreB.count - genreA.count);
  return result.slice(0, 5)
}

function getMostPopularBooks(books) {
  let popularBooks =[];
  let result = []
  books.map((book) => {
    let numberOfBorrows = book.borrows.length;
    let nameOfBook = book.title;
    popularBooks.push({name: nameOfBook,
                      count: numberOfBorrows})
  })
  popularBooks = popularBooks.sort((count1, count2)=> count2.count - count1.count)
  for(let i =0; i<5; i++){
    result.push(popularBooks[i])
  }
  return result;
  }


function getMostPopularAuthors(books, authors) {
    let authorData = []
    let popularAuthor = []
    let countsById = []
    let result = []
  
    authors.map((author) => {
      authorData.push({
        name: author.name.first + " " + author.name.last,
        id: author.id
      })
    })
    // console.log(authorData)
    authorData.forEach((author) => {
      let booksByAuthor = [];
      booksByAuthor = books.filter((book) =>
        book.authorId == author.id
      )
      popularAuthor.push({
        ["id"]: author.id,
        ["name"]: author.name,
        ["books"]: booksByAuthor
      })
    })
    //  console.log(popularAuthor)
    popularAuthor.forEach((author) => {
      if (author.books.length > 0) {
        let count = 0;
        author.books.forEach((book) => count += book.borrows.length)
        countsById.push({
          ["id"]: author.id,
          ["name"]: author.name,
          ["count"]: count
        })
      }
    })
  
    countsById.sort((count1, count2) => count2.count - count1.count);
    for (let i = 0; i < 5; i++) {
      result.push({["name"]: countsById[i].name, ["count"]: countsById[i].count})
    }
    // console.log(result)
    return result
  }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
