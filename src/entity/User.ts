import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Parcel } from "./Parcel";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    address: string;

    @CreateDateColumn()
    createdOn: Date;

    @UpdateDateColumn()
    updatedOn: Date;

    @OneToMany(type => Parcel, parcel => parcel.user)
    parcels: Parcel[];
}
