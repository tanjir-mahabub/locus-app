import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RncLocusMembers } from './rncLocusMember';

/**
 * RNC Locus Data TypeORM Entity
 */
@Entity({ name: 'rnc_locus', schema: 'rnacen' })
export class RncLocus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    assembly_id: string;

    @Column()
    locus_name: string;

    @Column()
    public_locus_name: string;

    @Column()
    chromosome: string;

    @Column()
    strand: string;

    @Column()
    locus_start: number;

    @Column()
    locus_stop: number;

    @Column()
    member_count: number;

    @OneToMany(() => RncLocusMembers, (locusMember) => locusMember.locus)
    locus_members: RncLocusMembers[];
}