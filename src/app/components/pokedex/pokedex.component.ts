import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements OnInit {

  pokemonList: any[] = [];
  filteredPokemonList: any[] = [];
  searchTerm: string = '';
  selectedPokemon: string | null = null;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(
      data => {
        this.pokemonList = data.results;
        this.filteredPokemonList = this.pokemonList;
      },
      error => {
        console.error('Error fetching Pokémon list', error);
      }
    );
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredPokemonList = this.pokemonList;
    } else {
      this.filteredPokemonList = this.pokemonList.filter(pokemon => 
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
  onSelectPokemon(pokemonName: string): void {
    this.selectedPokemon = pokemonName;
  }
  onCloseDetail(): void {
    this.selectedPokemon = null; // Réinitialiser la sélection de Pokémon
  }

}
