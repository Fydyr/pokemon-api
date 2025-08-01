import { Request, Response } from 'express';
import prisma from '../client';

export const getPokemonCards = async (_req: Request, res: Response) => {
    try {
        const pokemons = await prisma.pokemonCard.findMany();

        if (pokemons.length === 0) {
            res.status(204).send([]);
        } else {
            res.status(200).send(pokemons);
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const getPokemonCardsById = async (req: Request, res: Response) => {
    try {
        const pokemonCardId = parseInt(req.params.pokemonCardId);

        const pokemon = await prisma.pokemonCard.findUnique({
            where: { id: pokemonCardId },
        });

        if (!pokemon) {
            res.status(404).send({ error: 'PokemonCard not found' });
        } else {
            res.status(200).send(pokemon);
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const postPokemonCards = async (req: Request, res: Response) => {
    try {
        const {
            name,
            pokedexId,
            type1Id,
            type2Id,
            attackId,
            lifePoints,
            size,
            weight,
            imageURL,
        } = req.body;

        if (
            name === 0 ||
            pokedexId === 0 ||
            type1Id === 0 ||
            lifePoints === 0 ||
            attackId === 0
        )
            res.status(400).send({ error: 'Data not found' });

        const existingPokemon = await prisma.pokemonCard.findFirst({
            where: {
                OR: [{ name }, { pokedexId }],
            },
        });

        if (existingPokemon)
            res.status(409).send({ error: 'Pokemon already exist' });
        else {
            const newPokemonCard = await prisma.pokemonCard.create({
                data: {
                    name,
                    pokedexId,
                    typeId1: type1Id,
                    typeId2: type2Id || null,
                    attackId,
                    lifePoints,
                    size: size || null,
                    weight: weight || null,
                    imageUrl: imageURL || null,
                },
            });

            res.status(201).send(newPokemonCard);
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const patchPokemonCards = async (req: Request, res: Response) => {
    try {
        const {
            id,
            name,
            pokedexId,
            type1Id,
            type2Id,
            attackId,
            lifePoints,
            size,
            weight,
            imageURL,
        } = req.body;

        if (name === 0 || pokedexId === 0 || type1Id === 0 || lifePoints === 0)
            res.status(400).send({ error: 'Data not found' });

        const existingPokemon = await prisma.pokemonCard.findFirst({
            where: { id },
        });

        if (existingPokemon === null)
            res.status(404).send({ error: 'Pokemon not found' });
        else {
            const updatePokemonCard = await prisma.pokemonCard.update({
                where: { id },
                data: {
                    name,
                    pokedexId,
                    typeId1: type1Id,
                    type2: type2Id || null,
                    attackId,
                    lifePoints,
                    size: size || null,
                    weight: weight || null,
                    imageUrl: imageURL || null,
                },
            });

            res.status(200).send(updatePokemonCard);
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const deletePokemonCards = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.pokemonCardId);

        const existingPokemon = await prisma.pokemonCard.findUnique({
            where: { id },
        });

        if (existingPokemon === null)
            res.status(404).send({ error: 'Pokemon not found' });
        else {
            await prisma.pokemonCard.delete({ where: { id } });

            res.status(204).send();
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};
