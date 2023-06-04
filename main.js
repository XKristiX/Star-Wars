let searchInput = document.getElementById('search');

document.getElementById('get-character').addEventListener
('click', function() {
fetchRandomCharacter();
});

document.getElementById('get-all-characters').
addEventListener('click', function() {
fetchAllCharacters();
});

searchInput.addEventListener('keyup', function(e) {
    let searchString = e.target.value;
    if (searchString && searchString.length > 2) {
        fetchSearchedCharacters(searchString);
    }
});

function fetchRandomCharacter () {
    let randomID = Math.floor(Math.random() * 9) +1;

    fetch(`https://swapi.dev/api/people/${randomID}/`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('character').innerHTML =
        `<h2>${data.name}</h2>
        <p>Height: ${data.height}cm</p>
        <p>Mass: ${data.mass}kg</p>
        <p>Hair Color: ${data.hair_color}</p>
        <p>Skin Color: ${data.skin_color}</p>
        <p>Eye Color: ${data.eye_color}</p>
        <p>Birth Year: ${data.birth_year}</p>
        <p>Gender: ${data.gender}</p>`;
    })
    .catch(error => console.log('Error: ', error));
};

function fetchAllCharacters() {
    fetch('https://swapi.dev/api/people/')
    .then(response => response.json())
    .then(data => {
        let characters = data.results;
        let charactersList = document.getElementById('characters');
        charactersList.innerHTML = '';
        characters.forEach(character => {
            let li = document.createElement('li');
            li.textContent = character.name;
            li.addEventListener('click', function() {
                document.getElementById('character').innerHTML = `<h2>${character.name}</h2>
                <p>Height: ${character.height}cm</p>
                <p>Mass: ${character.mass}kg</p>
                <p>Hair Color: ${character.hair_color}</p>
                <p>Skin Color: ${character.skin_color}</p>
                <p>Eye Color: ${character.eye_color}</p>
                <p>Birth Year: ${character.birth_year}</p>
                <p>Gender: ${character.gender}</p>`;
            })
            charactersList.appendChild(li);
                });
    })
    .catch(error => console.log('Error: ', error));
}
//new code 
function fetchSearchedCharacters(searchString) {
    fetch('https://swapi.dev/api/people/')
        .then(response => response.json())
        .then(data => {
            let characters = data.results;
            let filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchString.toLowerCase()));
            let charactersList = document.getElementById('characters');
            charactersList.innerHTML = ""; // clear the list before appending new characters
            filteredCharacters.forEach(character => {
                let li = document.createElement('li');
                li.textContent = character.name;
                li.addEventListener('click', function() {
                    document.getElementById('character').innerHTML = `
                        <h2>${character.name}</h2>
                        <p>Height: ${character.height}cm</p>
                        <p>Mass: ${character.mass}kg</p>
                        <p>Hair Color: ${character.hair_color}</p>
                        <p>Skin Color: ${character.skin_color}</p>
                        <p>Eye Color: ${character.eye_color}</p>
                        <p>Birth Year: ${character.birth_year}</p>
                        <p>Gender: ${character.gender}</p>
                    `;
                });
                charactersList.appendChild(li);
            });
        })
        .catch(error => console.log('Error:', error));
}







