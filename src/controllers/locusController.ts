import { Request, Response } from 'express';
import getLocusData from '../models/locusModel';

const locusController = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getLocusData();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving locus data' });
    }
};

export default locusController;
