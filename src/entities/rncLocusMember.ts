import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RncLocus } from './rncLocus';

@Entity({ name: 'rnc_locus_members', schema: 'rnacen' })
export class RncLocusMembers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    region_id: number;

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