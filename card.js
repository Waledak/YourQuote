function card(quote){
  return(
    `
    <div>
      <p>${quote.quote}</p>
      <p>${quote.adding_date.getDate()}/${quote.adding_date.getMonth()}/${quote.adding_date.getFullYear()}</p>
      <p>${quote.isTrue === 1? "Vrai": "faux"}</p>
      <p>id: ${quote.id}</p>
      <hr>
    </div>
    `
  )
}

module.exports = card;