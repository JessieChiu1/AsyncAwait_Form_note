function createSingleAmiiboCard(singleAmiibo){
  console.log(singleAmiibo)
  // create individual tags
  const container_div_tag = document.createElement("div")
  container_div_tag.classList.add("single-character-card")

  const name_p_tag = document.createElement("p")
  name_p_tag.textContent = singleAmiibo.name
  name_p_tag.classList.add("character-name")

  const img_tag = document.createElement("img")
  img_tag.setAttribute("src", singleAmiibo.image)
  img_tag.classList.add("character-img")

  const series_p_tag = document.createElement("p")
  series_p_tag.textContent = singleAmiibo.gameSeries
  series_p_tag.classList.add("character-series")

  const releaseDate_p_tag = document.createElement("p")
  releaseDate_p_tag.textContent = singleAmiibo.release.na
  releaseDate_p_tag.classList.add("character-release_date")

  // assemble into card
  container_div_tag.append(name_p_tag, img_tag, series_p_tag, releaseDate_p_tag)

  // the assembled single character card in memory
  return container_div_tag
}



async function fetchAndDisplay(){
  // if the first search result is an error, there will be an error message
  // but we want to make sure that error message disappear once we re-search again
  // so each time the search button is clicked, we need to hide the button and clear the error message text
  const error_p_tag = document.querySelector("#error-message")
  error_p_tag.hidden = true
  error_p_tag.textContent = ""

  // you need to erase the last search result
  const all_amiibo_container = document.querySelector("#all-amiibo-container")
  all_amiibo_container.replaceChildren()

  try {
    // construct URL
    const searchBar_element = document.querySelector("#searchbar")
    const amiibo_name = searchBar_element.value
    const url = `https://www.amiiboapi.com/api/amiibo/?character=${amiibo_name}`

    // send api request
    const response = await fetch(url)

    // check if we get a bad response from server like Internal Server Error
    // response code video - https://www.youtube.com/watch?v=qmpUfWN7hh4
    if (!response.ok) {
      throw new Error("successful fetch request but response is not okay - not within 2XX")
    }

    // translate JSON back to JavaScript object so we can work we it
    const jsObject = await response.json()
    const amiiboList = jsObject.amiibo

    // I noticed that if you typed in an incorrect name - it just return an empty array, instead of a bad response
    // Normally, I would move all of the bad response check before translating JSON back to JS object
    if (amiiboList.length === 0){
      throw new Error(`Found no Amiibo named ${amiibo_name} - Did you spell it correctly?`)
    }

    // display create the character card and append it to the page
    amiiboList.forEach((single_amiibo) => {
      const single_amiibo_card = createSingleAmiiboCard(single_amiibo)
      const all_amiibo_container = document.querySelector("#all-amiibo-container")
      all_amiibo_container.append(single_amiibo_card)
    });

  } catch (error) {
    // un hide the error message p tag
    // we don't need to querySelect for the error_p_tag again because a reference is already created in line
    error_p_tag.hidden = false
    
    // display the text
    error_p_tag.textContent = `An Error has occurred: ${error.message}`
  }
}

// construct eventListener

const button = document.querySelector("#search-button")
button.addEventListener("click", fetchAndDisplay)