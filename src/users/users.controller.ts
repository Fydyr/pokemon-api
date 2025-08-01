import { Request, Response } from 'express';
import { UserPayload } from '../common/type';
import bcrypt from 'bcrypt';
import prisma from '../client';
const saltRounds = 10;

export const createUser = async (req: Request, res: Response) => {
    let newUser = null;
    try {
        const hash = bcrypt.hashSync(req.body.password, saltRounds);

        // password = bcrypt
        newUser = {
            email: req.body.email,
            password: hash,
        };
        let user = await prisma.user.findUnique({
            where: { email: newUser.email },
        });

        if (user) {
            res.status(208).send({ result: 'The user already exists' });
            return;
        }

        user = await prisma.user.create({ data: newUser });
        if (!user) {
            res.status(401).send({ result: 'Error when creating user' });
        } else {
            res.status(201).send(user);
        }
    } catch {
        res.status(500).send({
            error: 'Erreur reçu',
        });
    }
};

export const connectionUser = async (
    req: Request<object, object, UserPayload>,
    res: Response,
) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user === null) {
            res.status(204).send(user);
            return;
        }

        // Insérer ici la vérification du mot de passe
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(400).send('Invalid password');
            return;
        }

        if (!user) {
            res.status(401).send({ result: 'Error when creating user' });
        } else {
            res.status(201).send(user);
        }
    } catch {
        res.status(500).send({
            error: 'Erreur reçu',
        });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();

        if (users.length === 0) {
            res.status(204).send([]);
        } else {
            res.status(200).send(
                users.map((user) => {
                    return {
                        email: user.email,
                    };
                }),
            );
        }
    } catch {
        res.status(500).send({
            error: 'Erreur reçu',
        });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.userId);

        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (existingUser === null)
            res.status(404).send({ error: 'User not found' });
        else {
            await prisma.user.delete({ where: { id } });

            res.status(204).send();
        }
    } catch {
        res.status(500).send({
            error: 'Erreur reçu',
        });
    }
};

export const patchUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (email === 0 || password === 0)
            res.status(400).send({ error: 'Data not found' });

        const existingUser = await prisma.user.findFirst({
            where: { id: parseInt(req.params.userId) },
        });

        if (existingUser === null)
            res.status(404).send({ error: 'User not found' });
        else {
            const hash = bcrypt.hashSync(password, saltRounds);
            const updateUser = await prisma.user.update({
                where: { id: parseInt(req.params.userId) },
                data: {
                    email,
                    password: hash,
                },
            });

            res.status(200).send(updateUser);
        }
    } catch {
        res.status(500).send({
            error: 'Erreur reçu',
        });
    }
};
