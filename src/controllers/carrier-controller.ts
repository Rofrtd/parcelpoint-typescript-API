import * as fastify from 'fastify'
import { getRepository } from "typeorm";
import { Carrier } from '../entities/Carrier';

export function carrierController(server: fastify.FastifyInstance, opts: any, done: any) {
    const carrierRepository = getRepository(Carrier)

    const prefix = "/api/v1"

    // Get carriers
    server.route<{ Querystring: { limit: number } }>({
        method: "GET",
        url: `${prefix}/carrier/list`,
        handler: async (request) => {
            return await carrierRepository.find({
                order: {
                    id: "DESC"
                },
                take: request.query.limit
            })
        }
    })

    done()
}