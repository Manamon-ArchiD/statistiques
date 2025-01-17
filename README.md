# statistiques

## Ressources gérées :

Données agrégées issues des matchs (nombre de matchs, victoires, défaites, 
utilisation de créatures, etc.) 
Historique et agrégation pour reporting (par jour, par créature, etc.) 

## Technologies :

Typescript avec Express 
Stockage : PostgreSQL 
Envoie et récupération des statistiques via un bus de messages RabbitMQ 

## Principales fonctionnalités API :

GET /stats/matches : Récupérer les statistiques globales sur les matchs.


GET /stats/creatures : Obtenir des statistiques détaillées sur chaque créature 
(usage, victoires, etc.).


GET /stats/daily : Extraire un rapport quotidien des activités sur la plateforme.
