import request from 'supertest';
import { app } from '../src';
import { prismaMock } from './jest.setup';

describe('PokemonCard API', () => {
    describe('GET /pokemon-cards', () => {
        it('should fetch all PokemonCards', async () => {
            const mockPokemonCards = [
                {
                    id: 1,
                    name: 'Michel',
                    pokedexId: 1,
                    type1Id: 1,
                    type2Id: 1,
                    typeWeaknessId: 1,
                    lifePoints: 1,
                    size: 1,
                    weight: 1,
                    imageURL: 'Michel.png',
                },
            ];

            prismaMock.pokemonCard.findMany.mockResolvedValue(mockPokemonCards);

            const response = await request(app).get('/pokemon-cards');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPokemonCards);
        });
    });

    describe('GET /pokemon-cards/:pokemonCardId', () => {
        it('should fetch a PokemonCard by ID', async () => {
            const mockPokemonCard = {
                id: 1,
                name: 'Michel',
                pokedexId: 1,
                type1Id: 1,
                type2Id: 1,
                typeWeaknessId: 1,
                lifePoints: 1,
                size: 1,
                weight: 1,
                imageURL: 'Michel.png',
            };

            prismaMock.pokemonCard.findUnique.mockResolvedValue(
                mockPokemonCard,
            );

            const response = await request(app).get('/pokemon-cards/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPokemonCard);
        });

        it('should return 404 if PokemonCard is not found', async () => {
            const response = await request(app).get('/pokemon-cards/2');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'PokemonCard not found' });
        });
    });

    describe('POST /pokemon-cards', () => {
        it('should create a new PokemonCard', async () => {
            const createdPokemonCard = {
                id: 1,
                name: 'Michel',
                pokedexId: 1,
                type1Id: 1,
                type2Id: 1,
                typeWeaknessId: 1,
                lifePoints: 1,
                size: 1,
                weight: 1,
                imageURL: 'Michel.png',
            };

            prismaMock.pokemonCard.create.mockResolvedValue(createdPokemonCard);

            const response = await request(app)
                .post('/pokemon-cards')
                .auth('mockedToken', { type: 'bearer' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(createdPokemonCard);
        });
    });

    describe('PATCH /pokemon-cards/:pokemonCardId', () => {
        it('should update an existing PokemonCard', async () => {
            const updatedPokemonCard = {
                id: 1,
                name: 'Michel',
                pokedexId: 1,
                type1Id: 2,
                type2Id: 2,
                typeWeaknessId: 2,
                lifePoints: 1,
                size: 1,
                weight: 1,
                imageURL: 'Michel.png',
            };

            prismaMock.pokemonCard.update.mockResolvedValue(updatedPokemonCard);

            const response = await request(app)
                .patch('/pokemon-cards/1')
                .send({ type1Id: 2 })
                .auth('mockedToken', { type: 'bearer' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedPokemonCard);
        });
    });

    describe('DELETE /pokemon-cards/:pokemonCardId', () => {
        it('should delete a PokemonCard', async () => {
            const response = await request(app)
                .delete('/pokemon-cards/1')
                .auth('mockedToken', { type: 'bearer' });

            expect(response.status).toBe(204);
        });
    });
});
