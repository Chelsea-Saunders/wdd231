
// practice api:
const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
const urlList = 'https://pokeapi.co/api/v2/pokemon?limit=500&offset=0'; // limit gives you the first 500 (or whatever number) in the list. Offset will give you then succeeding number. This works great if you only want so many per page. i have 0 here since we don't need more than that. 
let results = null; 
// async function getPokemon(url) {
//     const response = await fetch(url)
//     // check if the fetch was successful
//     if (response.ok) {
//         // the API will send us JSON for us to convert
//         // .json() also returns a promise so we await it too...
//         const data = await response.json();
//         results = data; // this updates the global variable
//         showOutput(); // this calls the function to display it
//     }
// }
// async function getPokemonList(url) {
//     const response = await fetch(url)
//     // check if fetch was successful
//     if (response.ok) {
//         const data = await response.json();
//         results = data; 
//         doStuffList(data); 
//     }
// }
// function doStuff(data) {
//     const abilities = data.abilities.map(abilities => {
//         return `<li>${abilities.ability.name}</li>`;
//     });
//     const power = data.stats.map(stats => {
//         return `<li>${stats.stat.name}: ${stats.base_stat}</li>`;
//     });
//     return `
//         <section class="output">
//             <h2>${data.name}</h2>
//             <h3>Abilities:</h3>
//             <ul>${abilities.join("")}</ul>
//             <h3>Stats:</h3>
//             <ul>${power.join("")}</ul>
//             <img src="${results.sprites.front_default}" alt="Image of ${data.name}">
//         </section> 
//     `;
// }
// // this function will be for all the pokemon in the list
// function doStuffList(data) {
//     console.log(data);// what's inside the list
//     const pokeList = data.results; // this will access the list of pokemon
//     const outputElement = document.querySelector("#output");
    
//     const listItems = pokeList.map(pokemon => {
//         return `<li>${pokemon.name}</li>`;
//     });

//     // sort the list
//     const sortedList = sortPokeymon(pokeList);
//     const sortedListItems = sortedList.map(pokemon => {
//         return `<li>${pokemon.name}</li>`;
//     })

//     outputElement.innerHTML += `
//         <h2>All Pokemon</h2>
//         <ul>${listItems.join("")}</ul>
//         <h2>Sorted Pokemon</h2>
//         <ul>${sortedListItems.join("")}</ul>
//         `;
// }

// // alphabetical order
// function sortPokemonList(a, b) {
//     if (a.name < b.name) {
//         return -1;
//     } else if (a.name > b.name) {
//         return 1; 
//     } else return 0;
// }
// function sortPokeymon(list) {
//     let sortedList = list.sort(sortPokemonList);
//     return sortedList;
// }

// function showOutput() {
//     const outputing = document.querySelector("#output");
//     // const outputList = document.querySelector("#pokeList");
//     // insert into inner.HTML
//     outputing.innerHTML = doStuff(results);
//     // outputList.innerHTML = doStuffList(results);
// }
// getPokemon(url);
// getPokemonList(urlList);



// this will output the pokemon - now changing it to a callback function
function getData(url, callback) {
    fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
}
// redoing this like given in the example
function doStuff(data) {
    const outputElement = document.querySelector("#output");
    outputElement.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="Image of ${data.name}">
    `; 

    results = data; // this will update the global variable
    console.log("first: ", results); // remove this since we're now dealing with a list
}
function doStuffList(data) {
    console.log(data);
    const pokeListElement = document.querySelector("#outputList");
    let pokeList = data.results; 
    // sort list alphabetically
    pokeList = sortPokemonList(pokeList);
    // clear list before adding new items
    pokeListElement.innerHTML = "";
    //output list
    pokeList.forEach((currentItem) => {
        const html = `<li data-url="${currentItem.url}">${currentItem.name}</li>`;
        pokeListElement.innerHTML += html;
    });
}
function comparePokemonList(a, b) {
    if (a.name < b.name) return -1; 
    if (a.name > b.name) return 1; 
    return 0;
}
function sortPokemonList(list) {
    return list.sort(comparePokemonList);
}

getData(url, doStuff);
console.log("second: ", results);
getData(urlList, doStuffList);