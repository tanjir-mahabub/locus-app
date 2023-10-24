import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RncLocus } from './rncLocus';

/**
 * RNC Locus Members Data TypeORM Entity
 */
@Entity({ name: 'rnc_locus_members', schema: 'rnacen' })
export class RncLocusMembers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    region_id: string;

    @Column()
    locus_id: number;

    @Column()
    membership_status: string;

    @Column()
    urs_taxid: string;

    @ManyToOne(() => RncLocus, (locus) => locus.locus_members)
    @JoinColumn({ name: 'locus_id' })
    locus: RncLocus;
}