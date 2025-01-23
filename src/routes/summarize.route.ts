import {FastifyInstance} from "fastify";
import {utilsDate} from "../services/utils/utilsDate";
import {MatchService} from "../services/match/match.service";
import {SummarizeService} from "../services/summarize/summarize.service";

export async function summarizeRoutes(fastify: FastifyInstance){
    fastify.get("/stats/summarize", async (request, reply) => {
        return reply.status(200).send( await SummarizeService.getStatSummarize());
    })
}