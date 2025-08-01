import { Router } from 'express';
import {
    getAttackById,
    getAttacks,
    postPokemonAttacks,
    patchPokemonAttacks,
    deletePokemonAttacks,
} from './pokemonAttacks.controller';
import { verifyJWT } from '../common/jwt.middleware';

export const pokemonAttacksRouter = Router();

pokemonAttacksRouter.get('/pokemon-attacks', getAttacks);
pokemonAttacksRouter.get('/pokemon-attack/:pokemonAttackId', getAttackById);
pokemonAttacksRouter.post('/pokemon-attacks', verifyJWT, postPokemonAttacks);
pokemonAttacksRouter.patch(
    '/pokemon-attacks/:pokemonAttackId',
    verifyJWT,
    patchPokemonAttacks,
);
pokemonAttacksRouter.delete(
    '/pokemon-attacks/:pokemonAttackId',
    verifyJWT,
    deletePokemonAttacks,
);
