import * as fastify from 'fastify'
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Parcel } from "../entity/Parcel"
import { Retailer } from '../entity/Retailer';

export function parcelController(server: fastify.FastifyInstance, opts: any, done: any) {
    const userRepository = getRepository(User)
    const parcelRepository = getRepository(Parcel)
    const retailerRepository = getRepository(Retailer)

    const prefix = "/api/v1"

    // Create parcel
    server.route<{
        Body: {
            externalId: string,
            type: string,
            status: string,
            user: number,
            carrier: number,
            retailer: number,
            agent: number
        }
    }>({
        method: "POST",
        url: `${prefix}/parcel`,
        schema: {
            body: {
                type: 'object',
                properties: {
                    externalId: { type: 'string' },
                    type: { type: 'string' },
                    retailer: { type: 'number' },
                    user: { type: 'number' },
                    carrier: { type: 'number' },
                    agent: { type: 'number' },
                    status: { type: 'string' }
                },
                required: ['externalId', 'type', 'user', 'retailer'],
            }
        },
        handler: async (request) => {
            const parcel = new Parcel();
            parcel.user = await userRepository.findOne({ id: request.body.user })
            parcel.retailer = await retailerRepository.findOne({ id: request.body.retailer })
            parcel.type = request.body.type
            parcel.externalId = request.body.externalId

            return await parcelRepository.save(parcel);
        }
    })

    // Get all parcels
    server.route<{ Querystring: { limit: number } }>({
        method: "GET",
        url: `${prefix}/parcel/list`,
        handler: async (request) => {
            return await parcelRepository.find({
                relations: ["carrier", "user", "agent", "retailer"],
                order: {
                    id: "DESC"
                },
                take: request.query.limit
            })
        }
    })

    // Get parcel by ExternalId
    server.route<{ Params: { externalId: string } }>({
        method: "GET",
        url: `${prefix}/parcel/:externalId`,
        handler: async (request) => {
            return await parcelRepository.findOne({ externalId: request.params.externalId })
        }
    })

    // Update parcel status
    server.route<{
        Params: { externalId: string },
        Body: {
            externalId: string,
            type: string,
            status: string,
        }
    }>({
        method: "PUT",
        url: `${prefix}/parcel/:externalId`,
        schema: {
            body: {
                type: 'object',
                properties: {
                    status: { type: 'string' },
                },
                required: ['status'],
            }
        },
        handler: async (request) => {
            const parcel = await parcelRepository.findOne({ externalId: request.params.externalId })
            parcel.status = request.body.status
            return await parcelRepository.save(parcel)
        }
    })

    done()
}