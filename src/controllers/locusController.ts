import { Request, Response } from 'express';
import getLocusData from '../models/locusModel';

interface RequestQuery {
    id?: string;
    assembly_id?: string;
    region_id?: string;
    membership_status?: string;
    sideload?: 'locusMembers' | 'none';
    page?: string;
    perPage?: string;
    sort?: string;
}

const locusController = async (req: Request, res: Response): Promise<void> => {
    try {

        /**
         * Requested query checking
         */
        const { id, assembly_id, region_id, membership_status, sideload, page, perPage, sort } = req.query as RequestQuery;
        const data = await getLocusData({
            id,
            assembly_id,
            region_id,
            membership_status,
            sideload,
            page,
            perPage,
            sort
        });

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving locus data' });
    }
};


export default locusController;
