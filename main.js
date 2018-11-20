class Pokemon {
  constructor(name, sprite, attack, defence, hp, abilities){
    this.name = name;
    this.sprite = sprite;
    this.attack = attack;
    this.defence = defence;
    this.hp = hp;
    this.abilities = abilities;
    this.container = document.getElementById('pokemon-list');
    this.element = document.createElement('div');
    this.element.className = 'pokemon';
    }

    display(){
      let img = document.createElement('img');
      img.src = this.sprite;
      this.element.appendChild(img);

      let name = document.createElement('p');
      name.innerHTML = this.name;
      this.element.appendChild(name);

      let list = document.createElement('ul');
      list.innerHTML = `
        <li>HP: ${this.hp}</li>
        <li>Attack: ${this.attack}</li>
        <li>Defence: ${this.defence}</li>
        <br>
        Abilities: <ul>
      `;
      this.abilities.forEach(item => {
        list.innerHTML += `<li>${item}</li>`
      });
      list.innerHTML += `</ul>`
      this.element.appendChild(list);

      this.container.prepend(this.element);
    }

}

function putPokemon(response){
  input.value = '';
  console.log(response.data);
  let tempPokemon = new Pokemon(
    response.data.name,
    "https://play.pokemonshowdown.com/sprites/xyani/"+response.data.name+".gif",
    response.data.stats[4].base_stat,
    response.data.stats[3].base_stat,
    response.data.stats[5].base_stat,
    response.data.abilities.map(function(item){
      return item.ability.name;
    })
    );
  tempPokemon.display();
}

axios.get('https://fizal.me/pokeapi/api/v2/name/typhlosion.json')
.then(putPokemon);

axios.get('https://fizal.me/pokeapi/api/v2/name/greninja.json')
.then(putPokemon);

axios.get('https://fizal.me/pokeapi/api/v2/name/sceptile.json')
.then(putPokemon);

axios.get('https://fizal.me/pokeapi/api/v2/name/litten.json')
.then(putPokemon);

let input = document.querySelector('input');

input.addEventListener('keyup', search);

function showError(){
  document.getElementById('error').innerHTML = 'POKEMON NOT FOUND!';
}

function search(event){
  if(event.key === "Enter"){
    document.getElementById('error').innerHTML = '';
    axios.get("https://fizal.me/pokeapi/api/v2/name/"+input.value+".json")
    .then(putPokemon)
    .catch(showError);
  }
}
