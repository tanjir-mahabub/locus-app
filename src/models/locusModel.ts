import { DBConnection } from '../config/database';

interface LocusData {
    id?: string;
    assembly_id?: string;
    region_id?: string;
    membership_status?: string;
    sideLoading?: 'locusMembers' | 'none';
    page?: string;
    perPage?: string;
    sort?: string;
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
     * Pagination and Sorting Variables
     */
    const page = queryParams.page ? parseInt(queryParams.page, 10) : 1;
    const perPage = queryParams.perPage ? parseInt(queryParams.perPage, 10) : 1000;
    const sort = queryParams.sort;

    /**
     * Query Parameter Logic
     */
    if (queryParams.id) {
        queryConditions.push('rl.id = $1');
        queryParameters.push(parseInt(queryParams.id, 10));
    }

    if (queryParams.assembly_id) {
        queryConditions.push('rl.assembly_id = $' + (queryParameters.length + 1));
        queryParameters.push(queryParams.assembly_id);
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
    let sql = `
        SELECT rl.*${queryParams.sideLoading === 'locusMembers' ? ', rlm.*' : ''}
        FROM rnc_locus rl
        ${queryParams.sideLoading === 'locusMembers' ? 'LEFT JOIN rnc_locus_members rlm ON rlm.locus_id = rl.id' : ''}
        ${whereClause}    
    `;

    /**
     * Sorting by column_name
     */
    if (sort == 'asc') {
        sql += ` ORDER BY rl.id ASC`;
    }
    else if (sort == 'desc') {
        sql += ` ORDER BY rl.id DESC`;
    }
    else if (sort) {
        sql += ` ORDER BY ${sort}`;
    }

    /**
     * Pagination and Offset Logic
     */
    const offset = (page - 1) * perPage;
    sql += ` OFFSET $${queryParameters.length + 1} LIMIT $${queryParameters.length + 2}`
    queryParameters.push(offset, perPage);



    /**
     * Retrieve data from database
     */
    try {
        db.connect({ direct: true });
        const data = await db.any(sql, [...queryParameters, 5]);
        db.$pool.end();
        return data;
    } catch (error) {
        console.error('Error in getLocusData:', error);
        db.$pool.end();
        throw error;
    }
};

export default getLocusData;
