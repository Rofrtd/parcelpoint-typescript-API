import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from "typeorm";
import { Parcel } from "./Parcel"

@Entity("retailers")
export class Retailer {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(type => Parcel, parcel => parcel.retailer)
    parcels: Parcel[];
}
