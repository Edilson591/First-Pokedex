const pokemonList = document.getElementById('pokemonList');
const btnsprev = document.getElementById('btnsprev');
const btnnext = document.getElementById('btnnext');
const searchinput = document.getElementById('search-input');
const searchbutton =document.getElementById('search-button');

// const maxRecord = 5
const maxRecord = 150;
const limit = 1;
let offset= 0;


function loadPokemonItems(offset,limit) {
    pokeApi.getPokemons(offset,limit)
        .then((pokemons = []) => {
        const newHTML = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
                <ol class ="skill">
                Skill:${pokemon.skill}
                </ol>
                <div class = "paraments">
                <ol class = "weight">Weight: ${pokemon.weight / 10}kg
                <ol/>
                <ol class ="height">Height: ${pokemon.height / 10} M
                </ol>
                </div>
                
            </li>
        `).join('')

        pokemonList.innerHTML = newHTML
    })
}

document.getElementById('btnsprev').disabled = true

btnnext.addEventListener('click', () => {
    offset += limit;;
    const qntRecordWithNewPage = offset + limit;
    document.getElementById('btnsprev').disabled = false;

    if (qntRecordWithNewPage >= maxRecord) {
        const newLimit = maxRecord - offset;
        loadPokemonItems(offset, newLimit)

    document.getElementById('btnnext').disabled = true
    } else {
        loadPokemonItems(offset, limit)
    }
})

btnsprev.addEventListener('click', () => {
    offset-=limit;
    loadPokemonItems(offset,limit);
    const qntRecordWithPrevPage = offset;
    if(qntRecordWithPrevPage === 0){
        document.getElementById('btnsprev').disabled = true;
        document.getElementById('btnnext').disabled = false;
    }else{
        loadPokemonItems(offset,limit)
    }
})


searchbutton.addEventListener('click', (event) => {
    event.preventDefault()
    if(searchinput.value - 1  < maxRecord){
        loadPokemonItems(searchinput.value - 1,limit);
        
    }else{
        window.alert('Erro pokemon invalido')
        loadPokemonItems(offset,limit);
    }
})

loadPokemonItems(offset,limit)






