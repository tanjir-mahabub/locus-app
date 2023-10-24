import { Request, Response } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { getLocusData } from './../models/locusModel';
import { permissions } from '../config/user';

/**
 * Authenticated Request Interface Definition
 */
interface AuthenticatedRequest extends Request {
    user?: { role: string; regionId?: string };
}

/**
 * Request Query Interface Definition
 */
export interface RequestQuery {
    id?: number;
    assembly_id?: string;
    region_id?: string;
    membership_status?: string;
    sideloading?: 'locusMembers' | 'none';
    page?: string;
    perPage?: string;
    orderBy?: any;
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
        const { id, assembly_id, region_id, membership_status, sideloading, page, perPage, orderBy } = await req.query as RequestQuery;

        /**
         * JWT Token Verification
        */
        verifyToken(req, res, async () => {

            const userRole = req.user?.role;

            /**
             * Call Data By User Role Permissions Checking
             */
            if (userRole) {

                (!permissions[userRole]) && res.status(403).json({ message: 'Access denied' });

                const options = {
                    id,
                    assembly_id,
                    region_id,
                    membership_status,
                    sideloading,
                    page,
                    perPage,
                    orderBy,
                    userRole
                };

                const data = await getLocusData(options, permissions);
                // console.log('controller', data);

                data ? res.json(data) : res.status(403).json({ message: 'Data access denied for this user.' });

            }
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error retrieving locus data' });

    }
};

export default locusController;
