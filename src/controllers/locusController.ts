import { Request, Response } from 'express';
import getLocusData from '../models/locusModel';
import { verifyToken } from '../middleware/authMiddleware';

/**
 * Authenticated Request Interface Definition
 */
interface AuthenticatedRequest extends Request {
    user?: { role: string; regionId?: string };
}

/**
 * Request Query Interface Definition
 */
interface RequestQuery {
    id?: string;
    assembly_id?: string;
    region_id?: string;
    membership_status?: string;
    sideloading?: 'locusMembers' | 'none';
    page?: string;
    perPage?: string;
    sort?: string;
    userRole?: string;
}

/**
 * Locus Controller
 * 
 * @param req AuthenticatedRequest
 * @param res Response
 */
const locusController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {

        /**
         * Requested Query Variables
         */
        const { id, assembly_id, region_id, membership_status, sideloading, page, perPage, sort } = req.query as RequestQuery;

        /**
         * JWT Token Verification
         */
        verifyToken(req, res, async () => {

            const userRole = req.user?.role;

            const data = await getLocusData({
                id,
                assembly_id,
                region_id,
                membership_status,
                sideloading,
                page,
                perPage,
                sort,
                userRole
            });

            data ? res.json(data) : res.status(403).json({ message: 'Data access denied for this user.' });

        });
    } catch (error) {

        console.error(error);

        res.status(500).json({ message: 'Error retrieving locus data' });

    }
};


export default locusController;
