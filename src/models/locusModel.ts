import { Any, In } from 'typeorm';
import AppDataSource from '../config/typeORM';
import { RequestQuery } from '../controllers/locusController';
import { RncLocus } from '../entities/rncLocus';

// Define a type for permissions
export type Permission = {
    [key: string]: {
        canAccessAllColumns: boolean;
        canUseSideloading: boolean;
        allowedRegionId?: number | number[] | undefined;
    };
};

export const getLocusData = async (queryParams: RequestQuery, permissions: Permission) => {

    if (AppDataSource.isInitialized) {
        try {
            const { id, assembly_id, region_id, membership_status, sideloading, page, perPage, orderBy, userRole } = await queryParams as RequestQuery;

            const limit = perPage ? parseInt(perPage) : 1000;
            const offset = page ? parseInt(page) : 1;
            const skip = (offset - 1) * limit;
            const take = limit;

            const results = await AppDataSource.getRepository(RncLocus);

            const user = await (userRole && permissions[userRole]);
            console.log(user);

            let options = {};
            if (user) {
                if (user.canAccessAllColumns && user.canUseSideloading && !user.allowedRegionId) {
                    options = {
                        relations: ['locus_members'],
                        skip,
                        take,
                        where: {
                            id: id,
                            assembly_id: assembly_id,
                            locus_members: {
                                region_id: region_id,
                                membership_status: membership_status
                            }
                        },
                        order: orderBy
                    }
                }
                else if (!user.canAccessAllColumns && !user.canUseSideloading) {
                    options = {
                        skip,
                        take,
                        where: {
                            id: id,
                            assembly_id: assembly_id
                        },
                        order: orderBy
                    }
                }
                else if (user.canAccessAllColumns && user.canUseSideloading && user.allowedRegionId) {

                    const allowedRegions = [86118093, 86696489, 88186467];
                    const regionID = region_id || In(allowedRegions);

                    if (!regionID) return false;

                    console.log(Array.isArray(allowedRegions));

                    options = {
                        relations: ['locus_members'],
                        skip,
                        take,
                        where: {
                            id: id,
                            assembly_id: assembly_id,
                            locus_members: {
                                region_id: regionID,
                                membership_status: membership_status
                            }
                        },
                        order: orderBy
                    }
                }

            } else {
                return false;
            }

            const data = await results.find(options);

            return data;

        } catch (error) {
            console.error('Error in getLocusData:', error);
            throw error;
        }
    } else {
        return "Database is trying to be connected!"
    }
};
