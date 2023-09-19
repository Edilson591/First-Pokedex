const pokemonList = document.getElementById('pokemonList');
const btnsprev = document.getElementById('btnsprev');
const btnnext = document.getElementById('btnnext');
// const maxRecord = 5
const maxRecord = 156
const limit = 1;
let  offset = 0;


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
                </div>
                <ol class ="skill">
                Skill:${pokemon.skill}
                </ol>
                <ol class = "weight">Weight: ${pokemon.weight / 10}kg
                <ol/>
                <ol class ="height">Height: ${pokemon.height / 10} M
                </ol>
            </li>
        `).join('')

        pokemonList.innerHTML = newHTML
    })
}

loadPokemonItems(offset,limit)

btnnext.addEventListener('click', () => {
    offset += limit;
    const qntRecordWithNewPage = offset + limit

    if (qntRecordWithNewPage >= maxRecord) {
        const newLimit = maxRecord + offset;
        loadPokemonItems(offset, newLimit)

        btnnext.parentElement.removeChild(btnnext)
    } else {
        loadPokemonItems(offset, limit)
    }
})

btnsprev.addEventListener('click', () => {
    offset-=limit;
   loadPokemonItems(offset,limit)
   if(offset-=limit = 0){
    btnsprev.parentElement.removeChild(btnsprev)
    loadPokemonItems(offset,limit)
   }
})




