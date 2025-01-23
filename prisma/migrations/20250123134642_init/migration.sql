-- CreateTable
CREATE TABLE "MatchStat" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchId" INTEGER NOT NULL,
    "playerId1" INTEGER NOT NULL,
    "playerId2" INTEGER NOT NULL,

    CONSTRAINT "MatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreStat" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "StoreStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserStat" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserStat_pkey" PRIMARY KEY ("id")
);
