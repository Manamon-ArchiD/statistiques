import prisma from "../src/db/prisma.client";

async function createData(){
    await prisma.userStat.createMany({
        data: [
            {datetime: new Date(), userId: 1},
            {datetime: new Date(), userId: 2},
            {datetime: new Date(), userId: 3},
            {datetime: new Date(), userId: 4},
            {datetime: new Date(2025, 1, 22), userId: 5},
        ]
    })
    await prisma.storeStat.createMany({
        data: [
            {datetime: new Date(), userId: 1, itemId: 1, price: 360},
            {datetime: new Date(), userId: 1,itemId: 2, price: 200},
            {datetime: new Date(), userId: 1,itemId: 3, price: 50},
            {datetime: new Date(), userId: 2,itemId: 4, price: 300},
            {datetime: new Date(2025, 1, 22), userId: 3,itemId: 5, price: 125},
        ]
    })
    await prisma.matchStat.createMany({
        data: [
            {datetime: new Date(), matchId: 1, playerId1: 1, playerId2: 2},
            {datetime: new Date(), matchId: 2, playerId1: 3, playerId2: 4},
            {datetime: new Date(), matchId: 3, playerId1: 5, playerId2: 1},
            {datetime: new Date(), matchId: 4, playerId1: 1, playerId2: 2},
            {datetime: new Date(2025, 1, 22), matchId: 5, playerId1: 3, playerId2: 1},
        ]
    })
}

createData()
    .then(async () => {
        console.log("✅ Données user insérées :", await prisma.userStat.findMany())
        console.log("✅ Données store insérées :", await prisma.storeStat.findMany())
        console.log("✅ Données match insérées :", await prisma.matchStat.findMany())
    })
    .catch((e)=> {
        console.error("Erreur dans l'insertion des données dans la db.")
    })
    .finally(async () => {
        await prisma.$disconnect();
    })