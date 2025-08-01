import { Request, Response } from 'express';
import prisma from '../client';
import { AttackPayload } from '../common/type';

export const getAttacks = async (req: Request, res: Response) => {
    try {
        const pokemons = await prisma.pokemonAttack.findMany();

        if (pokemons.length === 0) {
            res.status(204).send([]);
        } else {
            res.status(200).send(pokemons);
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const getAttackById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.pokemonAttackId);

        const attack = await prisma.pokemonAttack.findUnique({ where: { id } });

        if (!attack) {
            res.status(404).send({ error: 'Attack not found' });
        } else {
            res.status(200).send(attack);
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const postPokemonAttacks = async (
    req: Request<object, object, AttackPayload>,
    res: Response,
) => {
    try {
        const { name, damage, type } = req.body;

        if (!name || !damage || !type) {
            res.status(400).send({ error: 'Data is missing' });
        } else {
            const existingAttack = await prisma.pokemonAttack.findFirst({
                where: { name },
            });

            if (existingAttack) {
                res.status(409).send({ error: 'Attack already exist' });
            } else {
                const attack = await prisma.pokemonAttack.create({
                    data: {
                        name,
                        damages: damage,
                        type_id: type,
                    },
                });

                res.status(201).send(attack);
            }
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const patchPokemonAttacks = async (req: Request, res: Response) => {
    try {
        const { name, damage, type } = req.body;

        const id = req.params.id;

        if (!name || !damage || !type)
            res.status(400).send({ error: 'Data is missing' });
        else {
            const existingAttack = await prisma.pokemonAttack.findFirst({
                where: { id: Number(id) },
            });

            if (!existingAttack)
                res.status(404).send({ error: 'Attack not found' });
            else {
                const updatedAttack = await prisma.pokemonAttack.update({
                    where: { id: Number(id) },
                    data: {
                        name,
                        damages: damage,
                        type_id: type,
                    },
                });

                res.status(200).send(updatedAttack);
            }
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};

export const deletePokemonAttacks = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const existingAttack = await prisma.pokemonAttack.findFirst({
            where: { id: Number(id) },
        });

        if (existingAttack === null)
            res.status(404).send({ error: 'Attack not found' });
        else {
            await prisma.pokemonAttack.delete({
                where: { id: Number(id) },
            });

            res.status(204).send();
        }
    } catch {
        res.status(500).send({ error: 'Erreur reçu' });
    }
};
