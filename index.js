const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poem) => {
  const { title, author, lines} = poem[0]
  console.log(poem)
  const makeTitle = makeTag('h2')
  const makeAuthor = makeTag('h3')
  const makeLine = makeTag('p')
  const makeEmp = makeTag('em')
  

  const titleHTML = makeTitle(title)
  const authorHTML = pipe(makeEmp, makeAuthor)(`by ${author}`)
  
  const stanza = lines.reduce((acc, line) => {
    if (line === '') {
      acc.push([line])
      
    } else{
      acc[acc.length - 1].push(line)
    }
    return acc
  }, [[]])

  const linesHTML = stanza
    .map(stanzas => makeLine(stanzas.join('<br/>')))
    .join('')

 

  console.log(titleHTML)
  console.log(authorHTML)
  console.log(linesHTML)
  const htmlString = titleHTML + authorHTML + linesHTML
  return htmlString
  
  
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
