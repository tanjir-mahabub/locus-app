import { In } from 'typeorm';
import AppDataSource from '../config/typeORM';
import { RequestQuery } from '../controllers/locusController';
import { RncLocus } from '../entities/rncLocus';
import { Permission } from '../config/user';

/**
 * Get Locus Data
 * 
 * @param queryParams RequestQuery
 * @param permissions Permission
 * @returns RncLocus[] | boolean
 */
export const getLocusData = async (queryParams: RequestQuery, permissions: Permission) => {

    if (AppDataSource.isInitialized) {

        try {

            /**
             * Query Parameters
             */
            const { id, assembly_id, region_id, membership_status, sideloading, page, perPage, orderBy, userRole } = await queryParams as RequestQuery;

            const limit = perPage ? parseInt(perPage) : 1000;
            const offset = page ? parseInt(page) : 1;
            const skip = (offset - 1) * limit;
            const take = limit;

            /**
             * Database Table call
             */
            const results = await AppDataSource.getRepository(RncLocus);

            /**
             * User Roles Checker
             */
            const user = await (userRole && permissions[userRole]);
            // console.log(user);

            /**
             * Database Query By Conditions On User Roles 
             */
            let options = {};

            if (user) {

                /**
                 * Admin User
                 */
                if (user.canAccessAllColumns && user.canUseSideloading && !user.allowedRegionId) {

                    options = {
                        relations: sideloading === 'locusMembers' && ['locus_members'],
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

                /**
                 * Normal User
                 */
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

                /**
                 * Limited User
                 */
                else if (user.canAccessAllColumns && user.canUseSideloading && user.allowedRegionId) {

                    const allowedRegions = user.allowedRegionId;
                    const regionID: string | string[] | boolean = !region_id ? allowedRegions : region_id ? allowedRegions.includes(region_id) && region_id : false;

                    let checkID = regionID && Array.isArray(regionID) ? In(regionID) : regionID

                    if (regionID !== false) {
                        options = {
                            relations: ['locus_members'],
                            skip,
                            take,
                            where: {
                                id: id,
                                assembly_id: assembly_id,
                                locus_members: {
                                    region_id: checkID,
                                    membership_status: membership_status
                                }
                            },
                            order: orderBy
                        }
                    } else {

                        return false;
                    }

                }

                /**
                 * Find Table Instance
                 */
                const data = await results.find(options);

                return data;

            } else {
                return false;
            }

        } catch (error) {

            console.error('Error in getLocusData:', error);
            throw error;

        }
    } else {

        return "Database is trying to be connected!"

    }
};
