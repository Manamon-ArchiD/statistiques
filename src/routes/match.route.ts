import {FastifyInstance} from "fastify";
import {MatchService} from "../services/match.service";

export async function matchRoutes(fastify: FastifyInstance){

    fastify.get("/stats/match", async () => {
        const day = new Date()
        return MatchService.getByDay(day);
    })
}