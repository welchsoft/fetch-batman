let featuredEntries = $("#features")
let details = $("#details")

const API_KEY= '2719bf93'

fetch('http://www.omdbapi.com/?s=batman&apikey='+API_KEY).then(function(response){
  return response.json()
}).then(function(json){
  featuredEntries.html('')
  json.Search.forEach(function(item){

    let entry = $("<div>").html(`<div class="card">
    <img class="card-img-top" src="${item.Poster}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${item.Title} (${item.Year})</h5>
      <p class="card-text">Media: ${item.Type}</p>
      <footer class="blockquote-footer">
        <small class="text-muted">
          IMDB ID: ${item.imdbID}
        </small>
      </footer>
    </div>
  </div>`)
  entry.click(function(){
    displayDetails(item.imdbID)
  })

  featuredEntries.append(entry)
  })
})

function displayDetails(imdbid){
  fetch('http://www.omdbapi.com/?i='+imdbid+`&apikey=${API_KEY}`).then(function(response){
    return response.json()
  }).then(function(json){
    console.log(json)
    let detailEntry = $("<div>").html(`<div class="card mb-3">
  <img class="card-img-top" src="${json.Poster}" width="300" height="400" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${json.Title}</h5>
    <p class="card-text">Actors: ${json.Actors} <br>Awards: ${json.Awards} <br>BoxOffice: ${json.BoxOffice} <br>Country: ${json.Country} <br>
    DVD: ${json.DVD} <br>Director: ${json.Director} <br>Genre: ${json.Genre} <br>Language: ${json.Language} <br>Metascore: ${json.Metascore} <br>
    Plot: ${json.Plot} <br>Production: ${json.Production} <br>Rated: ${json.Rated} <br>Ratings: ${json.Ratings[0].Source}:${json.Ratings[0].Value} ${json.Ratings[1].Source}:${json.Ratings[1].Value} ${json.Ratings[2].Source}:${json.Ratings[2].Value}  <br>Released: ${json.Released} <br>
    Runtime: ${json.Runtime} <br>Type: ${json.Type} <br>Website: ${json.Website} <br>Writer: ${json.Writer} <br>Year: ${json.Year} <br>ImdbID: ${json.imdbID} <br>
    ImdbRating: ${json.imdbRating} <br>Imdbvotes: ${json.imdbVotes} <br></p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>`)
  details.html(detailEntry)
})
}
