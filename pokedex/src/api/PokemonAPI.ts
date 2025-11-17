import type { BoxEntry, Pokemon } from "../types/types";

export class PokemonAPI {
    static BASE_URL = 'https://hw4.cis1962.esinx.net/api/';
    static PAGE_SIZE = 10;
    static jwtToken = import.meta.env.API_TOKEN;

    static async getAllPokemon(pageNumber: number): Promise<Pokemon[]> {
        try {
            const offset = (pageNumber - 1) * PokemonAPI.PAGE_SIZE;
            const response = await fetch(`${PokemonAPI.BASE_URL}pokemon/?limit=${PokemonAPI.PAGE_SIZE}&offset=${offset}`);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching all Pokemon:', error);
            throw error;
        }
    }

    static async getPokemonByName(name: string): Promise<Pokemon> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}pokemon/${name}`, {
                headers: {
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Pokemon by name:', error);
            throw error;
        }
    }

    static async getBox(): Promise<string[]>{
            try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/`, {
                headers: {
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching box entries:', error);
            throw error;
        }
    }

    static async addBoxEntry(entry: BoxEntry): Promise<BoxEntry> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                },
                body: JSON.stringify(entry)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error adding box entry:', error);
            throw error;
        }
    }
    
    static async getBoxEntry(id: string): Promise<BoxEntry> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/${id}`, {
                headers: {
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching box entry by id:', error);
            throw error;
        }
    }

    static async updateBox(id: string, entry: Partial<BoxEntry>): Promise<BoxEntry> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                },
                body: JSON.stringify(entry)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating box entry:', error);
            throw error;
        }

    }

    static async deleteBoxEntry(id: string): Promise<null> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return null;
        } catch (error) {
            console.error('Error deleting box entry:', error);
            throw error;
        }
    }
}