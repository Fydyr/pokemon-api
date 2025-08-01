/*
  Warnings:

  - You are about to drop the column `typeId` on the `PokemonAttack` table. All the data in the column will be lost.
  - You are about to drop the column `attacksId` on the `PokemonCard` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `PokemonAttack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attackId` to the `PokemonCard` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PokemonAttack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "damages" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    CONSTRAINT "PokemonAttack_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PokemonAttack" ("damages", "id", "name") SELECT "damages", "id", "name" FROM "PokemonAttack";
DROP TABLE "PokemonAttack";
ALTER TABLE "new_PokemonAttack" RENAME TO "PokemonAttack";
CREATE TABLE "new_PokemonCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pokedexId" INTEGER NOT NULL,
    "typeId1" INTEGER NOT NULL,
    "typeId2" INTEGER,
    "typeIdWeakness" INTEGER,
    "attackId" INTEGER NOT NULL,
    "lifePoints" INTEGER NOT NULL,
    "size" REAL,
    "weight" REAL,
    "imageUrl" TEXT,
    CONSTRAINT "PokemonCard_typeId1_fkey" FOREIGN KEY ("typeId1") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonCard_typeId2_fkey" FOREIGN KEY ("typeId2") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PokemonCard_typeIdWeakness_fkey" FOREIGN KEY ("typeIdWeakness") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PokemonCard_attackId_fkey" FOREIGN KEY ("attackId") REFERENCES "PokemonAttack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PokemonCard" ("id", "imageUrl", "lifePoints", "name", "pokedexId", "size", "typeId1", "typeId2", "typeIdWeakness", "weight") SELECT "id", "imageUrl", "lifePoints", "name", "pokedexId", "size", "typeId1", "typeId2", "typeIdWeakness", "weight" FROM "PokemonCard";
DROP TABLE "PokemonCard";
ALTER TABLE "new_PokemonCard" RENAME TO "PokemonCard";
CREATE UNIQUE INDEX "PokemonCard_name_key" ON "PokemonCard"("name");
CREATE UNIQUE INDEX "PokemonCard_pokedexId_key" ON "PokemonCard"("pokedexId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
