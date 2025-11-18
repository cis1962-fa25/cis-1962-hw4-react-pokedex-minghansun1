import type { BoxEntry, InsertBoxEntry, Pokemon } from "../types/types";

async function handleResponse(response: Response) {
    if (response.ok) {
        return response.json();
    }

    let message = `HTTP ${response.status}`;

    try {
        const data = await response.json();

        if (typeof data === "string") {
            message += ": " +  data;
        } else if (data?.error) {
            message += ": " + data.error;
        } else if (data?.message) {
            message += ": " +  data.message;
        } else if (data?.detail) {
            message += ": " + data.detail;
        } else {
            message += ": " + JSON.stringify(data);
        }
    } catch {
        try {
            const text = await response.text();
            if (text) message +=  ": " +  text;
        } catch {
            // Nothing readable
        }
    }

    throw new Error(message);
}

export class PokemonAPI {
    static BASE_URL = 'https://hw4.cis1962.esinx.net/api/';
    static PAGE_SIZE = 10;
    static jwtToken = import.meta.env.VITE_API_KEY;
    static maxPokemonId = 874;

    static async getAllPokemon(pageNumber: number): Promise<Pokemon[]> {
        try {
            const offset = (PokemonAPI.PAGE_SIZE * (pageNumber - 1));
            const response = await fetch(`${PokemonAPI.BASE_URL}pokemon/?limit=${this.PAGE_SIZE}&offset=${offset}`);
            return await handleResponse(response);
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
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching Pokemon by name:', error);
            throw error;
        }
    }

    static async getBoxEntries(): Promise<string[]>{
            try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/`, {
                headers: {
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                }
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching box entries:', error);
            throw error;
        }
    }

    static async addBoxEntry(entry: InsertBoxEntry): Promise<BoxEntry> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                },
                body: JSON.stringify(entry)
            });
            return await handleResponse(response);
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
            return await handleResponse(response);
        } catch (error) {
            console.error('Error fetching box entry by id:', error);
            throw error;
        }
    }

    static async updateBoxEntry(id: string, entry: Partial<BoxEntry>): Promise<BoxEntry> {
        try {
            const response = await fetch(`${PokemonAPI.BASE_URL}box/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${PokemonAPI.jwtToken}`
                },
                body: JSON.stringify(entry)
            });
            console.log(JSON.stringify(entry));
            return await handleResponse(response);
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
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return null;
        } catch (error) {
            console.error('Error deleting box entry:', error);
            throw error;
        }
    }
}