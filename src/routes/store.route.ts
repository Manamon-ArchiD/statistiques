import {FastifyInstance} from "fastify";
import {StoreService} from "../services/store/store.service";
import {utilsDate} from "../services/utils/utilsDate";

export async function storeRoutes(fastify: FastifyInstance){

    fastify.get<{ Params: { date: string } }>("/stats/store/:date", async (request, reply) => {

        const date: string = request.params.date
        let day;

        // Traitement du parametre
        if (date.length == 8){
            day = utilsDate.stringParamToDate(date)
        } else {
            return reply.status(400).send("La date passé en parametre ne doit pas avoir le bon format (pas 8 caracteres) elle doit correspondre à DDMMYYYY.")
        }
        return reply.status(200).send( await StoreService.getStatStoreByDay(day));
    })
}