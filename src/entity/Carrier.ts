import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Parcel } from "./Parcel"

@Entity("carriers")
export class Carrier {

    @PrimaryGeneratedColumn()
    id: bigint

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(type => Parcel, parcel => parcel.carrier)
    parcels: Parcel[];
}
