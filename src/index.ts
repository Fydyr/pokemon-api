import express from 'express';
import { pokemonCardsRouter } from './pokemonCards/pokemonCards.router';
import { usersRouter } from './users/users.router';
export const app = express();
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const port = process.env.PORT || 3000;
app.use(express.json());

const swaggerDocument = YAML.load(
    path.join(__dirname, './common/swagger.yaml'),
);

// Serveur Swagger UI à l'adresse /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(pokemonCardsRouter);
app.use(usersRouter);

export const server = app.listen(port);

export function stopServer() {
    server.close();
}
