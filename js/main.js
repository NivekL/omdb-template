/**
 *  OMDb template
 *	Documentation: http://www.omdbapi.com/
 *  Generate an API key here: http://www.omdbapi.com/apikey.aspx
 */


/**
* According to documentation, you need at least 2 parameters when calling the API http://www.omdbapi.com/
* 1 Required parameter: apikey
* 2 Required parameter: One of the following i=, t= or s=
*
* 
* Example with parameter s=star trek
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek
*
* Example with parameter s=star trek AND y=2020
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&y=2020
*
* Example with parameter s=star trek AND type=series
* http://www.omdbapi.com/?apikey=[yourkey]&s=star trek&type=series
*
*/

let searchBar = document.getElementById("searchbar");
let content = document.getElementById("container");

searchBar.addEventListener("input", fetchData);


async function fetchData() {
    try {
        let response = await fetch("http://www.omdbapi.com/?apikey=72e2b6a0&s=" + searchBar.value);
        
        if(!response.ok) {
            throw new Error("there was an error with the response" + response.status);
        } else {
            let data = await response.json();

            if(searchBar.value.trim() === "") {
                content.innerHTML = emptyResult();
            } else {
                content.innerHTML = displaySearchData(data);
            }
        }
    } catch (e) {
        console.log("error occured" + e);
    }

    function displaySearchData(data) {
        let displayResults = "";
        let result = data['Search'];
        for(let results of result) {
            displayResults += `
                <div class='media-container'>
                    <div class='media-poster-container'>
                        <img src='${results.Poster}' alt='Poster for ${results.Title}'>
                    </div>
                    <div class='media-info-container'>
                        <h2>${results.Title}</h2>
                        <p>${results.Year}</p>
                        <p>${results.Type}</p>
                    </div>
                </div>
            `;
        }

        return displayResults;
    }

    function emptyResult() {
        return defaultResultHTML = "<h2>That aint no movie I ever heard of! Type in a movie or series to get results.</h2>";
    }
}
