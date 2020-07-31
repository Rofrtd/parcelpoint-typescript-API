import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Parcel } from "./Parcel"

@Entity("agents")
export class Agent {

    @PrimaryGeneratedColumn()
    id: bigint

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    externalId: string;

    @Column()
    address: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(type => Parcel, parcel => parcel.agent)
    parcels: Parcel[];
}
