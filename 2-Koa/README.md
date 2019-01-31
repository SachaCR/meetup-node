# Initier un projet node js

## Création du package.json

- taper `$ npm init`

## Installer les dépendances :

- taper `$ npm install koa`
- taper `$ npm i koa-bodyparser`
- taper `$ npm i koa-router`
- taper `$ npm i koa-http-log`

## Lancer le projet :

- taper `$ node index.js`

## Utiliser les dépendances :

Nous allons créer une API pour gérer une todo list. La liste des todos sera gardée en mémoire dans le tableau `todos` ligne 5 dans `index.js`

A l'aide des packages : koa-bodyparser et koa-router

Créer les routes suivantes :

### POST `/todos`

Body :
```js
{
  label: "Learn NodeJS",
  done: false,
}
```

Return `201 Created` :
```js
{
  id: 1,
  label: "Learn NodeJS",
  done: false,
}
```

### GET `/todos` Ordered by alphabetical order

Return `200 OK` :
```js
{
  data: [{
    id: 1,
    label: "Learn NodeJS",
    done: false,
  }, {
    id: 2,
    label: "Learn ReactJS",
    done: false,
  }]
}
```

### PUT `/todos/:id`

Body :
```js
{
  label: "Nouveau label",
  done: true,
}
```

Return `200 OK` :
```js
{
  id: 2,
  label: "Nouveau label",
  done: true,
}
```

Return `404 Not Found` if id does not exist

### DELETE `/todos/:id`

Return `204 No Content`

Return `404 Not Found` if id does not exist


## Utiliser SQLITE pour stocker les données en base :

Nous allons maintenant utiliser une base de données pour persister notre todo list. A l'aide du module `db.js` lire et écrire les données en bases.

- Créez la base de données en tapant : `node ./database/bootstrapBD.js`

- Complétez les methodes `createTodo`, `getAlltodos`, `updateTodo`, `deleteTodo` du module `db.js`. Attention ces méthodes sont asynchrones et renvoie des promesses. Il faut donc utiliser le mot clé await. Voir exemple ci dessous.

En vous aidant de la documentation de SQLITE3 ainsi que de la documentation des promises.

[SQLITE 3 documentation](https://www.npmjs.com/package/sqlite3)

[Promises documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Promise)

Exemple de query avec remplacement de parametres :

```js
dbClient.all('INSERT INTO test (foo, bar) VALUES(?,?);', [data.foo, data.bar], (err, rows) => { })
```

Exemple d'appel avec `async` / `await` :
```js
/**
 * Les fonctions déclarées async renvoie une Promesse. Pour récupérer directement le resultat de la promesse
 * on utilise le mot clé await devant l'appel d'une fonction async.
 */

const todos = await db.getAllTodos()

//On peut entourer ce bloc d'un try catch pour récupérer les éventuelles erreurs.
```

## Valider les inputs :

Pour eviter des erreurs lors de l'insertion en base nous allons valider les payload grace au module AJV.

- Installer le module [AJV](https://www.npmjs.com/package/ajv#getting-started)

- Valider les payloads des routes POST et PUT à l'aide du module AJV :

Exemple de schema AJV :

```js
const schema = {
  id: 'user',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    single: { type: 'boolean' },
  },
  required: [ 'name', 'age' ]
}
```
