# Cartographe

Cartographe est une application web de graphes de suivi narratif pour les campagnes de jeu de rôle.

## Démarrage

Lancer l'application :

```bash
docker compose up --build
```

Ouvrir ensuite [http://localhost:5173](http://localhost:5173) avec `localhost`, et non une adresse IP : l'API File System Access exige un contexte sécurisé.

Lancer les tests :

```bash
docker compose run --rm app npm test
```

Ajouter une dépendance :

```bash
docker compose run --rm app npm install <paquet>
docker compose up --build -V
```

Si le rechargement à chaud ne fonctionne pas, copier `.env.example` vers `.env` et activer `VITE_POLLING=true`.
