const pokemon = {
    id : document.getElementById("pokemon-id"),
    sprite : document.getElementById("sprite"),
    pokemonName : document.getElementById("pokemon-name"),
    weight : document.getElementById("weight"),
    height : document.getElementById("height"),
    stats:{
    hp : document.getElementById("hp"),
    attack : document.getElementById("attack"),
    defense : document.getElementById("defense"),
    "special-attack" : document.getElementById("special-attack"),
    "special-defense" : document.getElementById("special-defense"),
    speed : document.getElementById("speed"),
    },
    types : document.getElementById("types"),
}

const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

async function getPokemon(id) {
    try{
    const root = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/"
    const origin = root + id
    const response = await fetch(origin);
    const data = await response.json();
    console.log(data);
    return data
    }
    catch(err){
        alert("Pokémon not found")
    }
  }
const constructor=(data)=>{
//id,name,sprite,weight,height
pokemon.id.innerHTML = `#${data.id}`
pokemon.pokemonName.innerHTML = `${data.name}`
pokemon.sprite.setAttribute("src", data.sprites["front_default"])
pokemon.sprite.setAttribute("alt", `${data.name}'s image`)
pokemon.weight.innerHTML= `${data.weight}`
pokemon.height.innerHTML= `${data.height}`
//stats//
data.stats.forEach((element)=>{
    pokemon.stats[element.stat.name].innerHTML = `${element["base_stat"]}`

})
pokemon.types.innerHTML = data.types.map((element)=>{
    return `<p class="type ${element.type.name}">${element.type.name}</p>`
}).join("")

}
searchButton.addEventListener("click",()=>{
    const value = searchInput.value.toLowerCase()
    console.log(value)
    if(value==""){
        alert("Please input Pokemon name or ID")
    }else{
    getPokemon(value)
    .then((data)=>constructor(data))
    }
})