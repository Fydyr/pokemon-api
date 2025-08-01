import {
    getPokemonCards,
    getPokemonCardsById,
    postPokemonCards,
    patchPokemonCards,
    deletePokemonCards,
} from './pokemonCards.controller';
import { Router } from 'express';
import { verifyJWT } from '../common/jwt.middleware';

export const pokemonCardsRouter = Router();

pokemonCardsRouter.get('/pokemon-cards', getPokemonCards);
pokemonCardsRouter.get('/pokemon-cards/:pokemonCardId', getPokemonCardsById);
pokemonCardsRouter.post('/pokemon-cards', verifyJWT, postPokemonCards);
pokemonCardsRouter.patch(
    '/pokemon-cards/:pokemonCardId',
    verifyJWT,
    patchPokemonCards,
);
pokemonCardsRouter.delete(
    '/pokemon-cards/:pokemonCardId',
    verifyJWT,
    deletePokemonCards,
);
