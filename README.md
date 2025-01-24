# statistiques

## Ressources gérées :

Données agrégées issues des matchs (nombre de matchs, victoires, défaites, 
utilisation de créatures, etc.) 
Historique et agrégation pour reporting (par jour, par créature, etc.) 

## Technologies :

Typescript avec Fastify
Stockage : PostgreSQL 
Envoie et récupération des statistiques via un bus de messages RabbitMQ (reste a implémenter stp Lucie aide nous 🙏🏽)

## Principales fonctionnalités API :

GET /stats/match/{DDMMYYYY} : Récupérer les stats sur les matches sur un jours donnée 

GET /stats/store/{DDMMYYYY} : Récupérer les stats sur l'utilisation du store sur un jours donnée 

GET /stats/summarize : Récupérer les stats globale de l'application

## How to use it
Pour lancer le service :
```
docker compose up
```
Ensuite
```
npm run dev
```
