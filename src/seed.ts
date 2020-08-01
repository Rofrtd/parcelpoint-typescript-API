import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Retailer } from "./entities/Retailer";
import { Agent } from "./entities/Agent";
import { Carrier } from "./entities/Carrier";
import { Parcel } from "./entities/Parcel";

createConnection().then(async connection => {
    const userRepository = connection.getRepository(User);
    const retailerRepository = connection.getRepository(Retailer);
    const agentRepository = connection.getRepository(Agent);
    const carrierRepository = connection.getRepository(Carrier);
    const parcelRepository = connection.getRepository(Parcel);

    const parcel = new Parcel();
    parcel.externalId = "P0001";
    parcel.type = "Box";
    parcel.status = "Picked up"
    await parcelRepository.save(parcel).catch(() => { console.log("parcel already exists") });

    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.email = "bla@haosk.com";
    user.address = "bla address";
    user.parcels = [parcel]
    await userRepository.save(user).catch(() => { console.log("user already exists") });

    const retailer = new Retailer();
    retailer.name = "Nike";
    retailer.parcels = [parcel]
    await retailerRepository.save(retailer).catch(() => { console.log("retailer already exists") });

    const agent = new Agent();
    agent.name = "Hub House";
    agent.externalId = "A0001";
    agent.address = "Bla street, Ble Suburb";
    agent.parcels = [parcel]
    await agentRepository.save(agent).catch(() => { console.log("agent already exists") });

    const carrier = new Carrier();
    carrier.name = "Australian Post";
    carrier.parcels = [parcel]
    await carrierRepository.save(carrier).catch(() => { console.log("carrier already exists") });

}).catch(error => console.log(error));
