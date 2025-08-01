/*
  Warnings:

  - You are about to drop the column `imageURL` on the `PokemonCard` table. All the data in the column will be lost.
  - You are about to drop the column `type1Id` on the `PokemonCard` table. All the data in the column will be lost.
  - You are about to drop the column `type2Id` on the `PokemonCard` table. All the data in the column will be lost.
  - You are about to drop the column `typeWeaknessId` on the `PokemonCard` table. All the data in the column will be lost.
  - Added the required column `attacksId` to the `PokemonCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId1` to the `PokemonCard` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PokemonAttack" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "damages" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "PokemonAttack_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PokemonCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pokedexId" INTEGER NOT NULL,
    "typeId1" INTEGER NOT NULL,
    "typeId2" INTEGER,
    "typeIdWeakness" INTEGER,
    "attacksId" INTEGER NOT NULL,
    "lifePoints" INTEGER NOT NULL,
    "size" REAL,
    "weight" REAL,
    "imageUrl" TEXT,
    CONSTRAINT "PokemonCard_typeId1_fkey" FOREIGN KEY ("typeId1") REFERENCES "Type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PokemonCard_typeId2_fkey" FOREIGN KEY ("typeId2") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PokemonCard_typeIdWeakness_fkey" FOREIGN KEY ("typeIdWeakness") REFERENCES "Type" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PokemonCard_attacksId_fkey" FOREIGN KEY ("attacksId") REFERENCES "PokemonAttack" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PokemonCard" ("id", "lifePoints", "name", "pokedexId", "size", "weight") SELECT "id", "lifePoints", "name", "pokedexId", "size", "weight" FROM "PokemonCard";
DROP TABLE "PokemonCard";
ALTER TABLE "new_PokemonCard" RENAME TO "PokemonCard";
CREATE UNIQUE INDEX "PokemonCard_name_key" ON "PokemonCard"("name");
CREATE UNIQUE INDEX "PokemonCard_pokedexId_key" ON "PokemonCard"("pokedexId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
