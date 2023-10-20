import { DBConnection } from "../config/database";

const getLocusData = async () => {

    const db = await DBConnection();

    const sql = `SELECT rl.*,rlm.* FROM rnc_locus rl LEFT JOIN rnc_locus_members rlm on
        rlm.locus_id=rl.id LIMIT $1`;

    try {

        db.connect({ direct: true });

        const data = await db.any(sql, [10]);

        return data

    } catch (error) {

        console.error('Error in getLocusData:', error);
        throw error;

    }
}

export default getLocusData;