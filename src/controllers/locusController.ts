import { Request, Response } from 'express';
import getLocusData from '../models/locusModel';

interface LocusData {
    [key: string]: string | number;
}

interface RequestQuery {
    id?: string;
    assemblyId?: string;
    regionId?: string;
    membershipStatus?: string;
}

const locusController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, assemblyId, regionId, membershipStatus } = req.query as RequestQuery;
        const data = await getLocusData({ id, assemblyId, regionId, membershipStatus });

        const filteredData = data.filter((item: LocusData) => {
            if (id !== undefined && item.id !== parseInt(id, 10)) return false;
            if (assemblyId !== undefined && item.assemblyId !== parseInt(assemblyId, 10)) return false;
            if (regionId !== undefined && item.regionId !== regionId) return false;
            if (membershipStatus !== undefined && item.membershipStatus !== membershipStatus) return false;

            return true;
        });

        //console.log(filteredData);
        res.json(filteredData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving locus data' });
    }
};


export default locusController;
