import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const saltRounds = 10;

const prisma = new PrismaClient();

async function main() {
    // Suppression de tous les posts
    await prisma.type.deleteMany();
    await prisma.pokemonCard.deleteMany();

    // Réinitialisation de l'auto-incrémentation
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Type'`;
    await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='PokemonCard'`;

    await prisma.type.createMany({
        data: [
            { name: 'Normal' },
            { name: 'Fire' },
            { name: 'Water' },
            { name: 'Grass' },
            { name: 'Electric' },
            { name: 'Ice' },
            { name: 'Fighting' },
            { name: 'Poison' },
            { name: 'Ground' },
            { name: 'Flying' },
            { name: 'Psychic' },
            { name: 'Bug' },
            { name: 'Rock' },
            { name: 'Ghost' },
            { name: 'Dragon' },
            { name: 'Dark' },
            { name: 'Steel' },
            { name: 'Fairy' },
        ],
    });

    await prisma.pokemonAttack.createMany({
        data: [
            { name: 'Charge', damages: 10, type_id: 5 }, // Attaque électrique
            { name: 'Ember', damages: 15, type_id: 2 }, // Attaque feu
            { name: 'Water Gun', damages: 20, type_id: 3 }, // Attaque eau
            { name: 'Vine Whip', damages: 15, type_id: 4 }, // Attaque plante
            { name: 'Tackle', damages: 10, type_id: 1 }, // Attaque normale
            { name: 'Lick', damages: 10, type_id: 8 }, // Attaque poison
            { name: 'Psychic Blast', damages: 30, type_id: 11 }, // Attaque psychique
            { name: 'Rock Throw', damages: 20, type_id: 13 }, // Attaque roche
            { name: 'Iron Tail', damages: 25, type_id: 17 }, // Attaque acier
            { name: 'Shadow Ball', damages: 40, type_id: 14 }, // Attaque spectre
        ],
    });

    await prisma.pokemonCard.createMany({
        data: [
            {
                name: 'Pikachu',
                pokedexId: 25,
                typeId1: 5,
                attackId: 1,
                lifePoints: 60,
            },
            {
                name: 'Bulbizarre',
                pokedexId: 1,
                typeId1: 4,
                attackId: 2,
                lifePoints: 45,
            },
        ],
    });

    const hash_admin = bcrypt.hashSync('admin', saltRounds);

    await prisma.user.createMany({
        data: {
            email: 'admin@mail.com',
            password: hash_admin,
        },
    });

    console.log('🌱 Seed completed!');
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
