// locusController.ts
import { Request, Response } from 'express';
import { verifyToken } from '../middleware/authMiddleware';
import { getLocusData, Permission } from './../models/locusModel';

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
    region_id?: number;
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
        // Requested Query Variables
        const { id, assembly_id, region_id, membership_status, sideloading, page, perPage, orderBy } = await req.query as RequestQuery;

        // JWT Token Verification
        verifyToken(req, res, async () => {
            const userRole = req.user?.role;

            // Define permissions based on user role
            const permissions: Permission = {
                admin: {
                    canAccessAllColumns: true,
                    canUseSideloading: true,
                },
                normal: {
                    canAccessAllColumns: false,
                    canUseSideloading: false,
                },
                limited: {
                    canAccessAllColumns: true,
                    canUseSideloading: true,
                    allowedRegionId: [86118093, 86696489, 88186467]
                },
            };

            // Check if user has access based on their role
            if (userRole) {

                (!permissions[userRole]) && res.status(403).json({ message: 'Access denied' });


                // Define filtering, sorting, pagination, and sideloading options
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
                console.log(data);

                data ? res.json(data) : res.status(403).json({ message: 'Data access denied for this user.' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving locus data' });
    }
};

export default locusController;
