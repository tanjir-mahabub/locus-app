import { DBConnection } from '../config/database';

interface LocusData {
    id?: string;
    assemblyId?: string;
    regionId?: string;
    membershipStatus?: string;
}

const getLocusData = async (queryParams: LocusData) => {
    /**
     * Ensure Database Connection
     */
    const db = await DBConnection();

    /**
     * Construct the SQL query based on the provided query parameters
     */
    const queryConditions = [];
    const queryParameters = [];

    if (queryParams.id) {
        queryConditions.push('rl.id = $1');
        queryParameters.push(parseInt(queryParams.id, 10));
    }

    if (queryParams.assemblyId) {
        queryConditions.push('rl.assemblyId = $' + (queryParameters.length + 1));
        queryParameters.push(queryParams.assemblyId);
        console.log(queryParameters);
    }

    if (queryParams.regionId) {
        queryConditions.push('rl.regionId = $' + (queryParameters.length + 1));
        queryParameters.push(parseInt(queryParams.regionId, 10));
    }

    if (queryParams.membershipStatus) {
        queryConditions.push('rlm.membershipStatus = $' + (queryParameters.length + 1));
        queryParameters.push(queryParams.membershipStatus);
    }

    const whereClause = queryConditions.length > 0 ? 'WHERE ' + queryConditions.join(' AND ') : '';

    const sql = `SELECT rl.*, rlm.* FROM rnc_locus rl
        LEFT JOIN rnc_locus_members rlm ON rlm.locus_id = rl.id ${whereClause} LIMIT $${queryParameters.length + 1}`;

    try {
        db.connect({ direct: true });
        const data = await db.any(sql, [...queryParameters, 10]);
        db.$pool.end();
        console.log('data', queryConditions, queryParameters);
        return data;
    } catch (error) {
        console.error('Error in getLocusData:', error);
        throw error;
    }
};

export default getLocusData;
