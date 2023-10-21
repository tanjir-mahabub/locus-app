import { DBConnection } from '../config/database';

interface LocusData {
    id?: string;
    assembly_id?: string;
    region_id?: string;
    membership_status?: string;
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

    /**
     * Query Paramsmeter Logic
     */
    if (queryParams.id) {
        queryConditions.push('rl.id = $1');
        queryParameters.push(parseInt(queryParams.id, 10));
    }

    if (queryParams.assembly_id) {
        queryConditions.push('rl.assembly_id = $' + (queryParameters.length + 1));
        queryParameters.push(queryParams.assembly_id);
        console.log(queryParameters);
    }

    if (queryParams.region_id) {
        queryConditions.push('rlm.region_id = $' + (queryParameters.length + 1));
        queryParameters.push(parseInt(queryParams.region_id, 10));
    }

    if (queryParams.membership_status) {
        queryConditions.push('rlm.membership_status = $' + (queryParameters.length + 1));
        queryParameters.push(queryParams.membership_status);
    }

    /**
     * Condition on Sql based on Query
     */
    const whereClause = queryConditions.length > 0 ? 'WHERE ' + queryConditions.join(' AND ') : '';

    /**
     * SQL Schema
     */
    const sql = `SELECT rl.*, rlm.* FROM rnc_locus rl
        LEFT JOIN rnc_locus_members rlm ON rlm.locus_id = rl.id ${whereClause} LIMIT $${queryParameters.length + 1}`;

    /**
     * Retrieve data from database
     */
    try {
        db.connect({ direct: true });
        const data = await db.any(sql, [...queryParameters, 5]);
        db.$pool.end();
        console.log('data .....................', data, queryParameters, queryConditions);
        return data;
    } catch (error) {
        console.error('Error in getLocusData:', error);
        throw error;
    }
};

export default getLocusData;
