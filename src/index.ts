import "reflect-metadata";
import { createConnection } from "typeorm";
import * as fastify from 'fastify'

import { parcelController } from './controllers/parcel-controller'
import { carrierController } from "./controllers/carrier-controller";
import { retailerController } from "./controllers/retailer-controller";

createConnection().then(() => {
    const server: fastify.FastifyInstance = fastify.fastify({ logger: true })

    server.register(parcelController)
    server.register(carrierController)
    server.register(retailerController)

    server.listen(3000, (err) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
        server.log.info(`server listening on ${server.server.address().port}`)
    })

}).catch(error => console.log(error));
