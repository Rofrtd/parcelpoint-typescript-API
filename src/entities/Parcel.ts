import { Entity, PrimaryGeneratedColumn, Column, Index, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User"
import { Carrier } from "./Carrier";
import { Retailer } from "./Retailer";
import { Agent } from "./Agent";

@Entity("parcels")
export class Parcel {

    @PrimaryGeneratedColumn()
    id: bigint

    @Column({ unique: true })
    externalId: string;

    @Column()
    type: string;

    @Column({ default: "Open" })
    status: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @ManyToOne(type => User, user => user.parcels)
    user: User;

    @ManyToOne(type => Carrier, carrier => carrier.parcels)
    carrier: Carrier;

    @ManyToOne(type => Retailer, retailer => retailer.parcels)
    retailer: Retailer;

    @ManyToOne(type => Agent, agent => agent.parcels)
    agent: Agent;

}
