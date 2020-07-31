import * as fastify from 'fastify'
import { getRepository } from "typeorm";
import { Retailer } from '../entity/Retailer';

export function retailerController(server: fastify.FastifyInstance, opts: any, done: any) {
    const retailerRepository = getRepository(Retailer)

    const prefix = "/api/v1"

    // Get retailers
    server.route<{ Querystring: { limit: number } }>({
        method: "GET",
        url: `${prefix}/retailer/list`,
        handler: async (request) => {
            return await retailerRepository.find({
                order: {
                    id: "DESC"
                },
                take: request.query.limit
            })
        }
    })

    done()
}