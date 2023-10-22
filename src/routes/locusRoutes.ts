import { Router } from "express";
import locusController from "../controllers/locusController";

const router = Router();

/**
 * @swagger
 * /api/locus:
 *   get:
 *     summary: Get Locus Data
 *     description: Retrieve Locus data based on query parameters.
 *     parameters:
 *       - name: id
 *         in: query
 *         description: The ID of the Locus. (Optional)
 *         schema:
 *           type: integer
 *           default: 157572
 * 
 *       - name: assembly_id
 *         in: query
 *         description: The assembly ID. (Optional)
 *         schema:
 *           type: string
 *           default: 'ASM15162v1'
 * 
 *       - name: sideloading
 *         in: query
 *         description: Set sideloading to add rnc_locus_members data loading. (Optional)
 *         schema:
 *           type: string
 *           enum: [locusMembers, none]
 *           default: locusMembers
 *  
 *       - name: region_id
 *         in: query
 *         description: Get locus data by region ID if sideloading set to locusMembers (Optional)
 *         schema:
 *           type: integer
 *           default: 41427209 
 *            
 *       - name: membership_status
 *         in: query
 *         description: Get locus data by membership status if sideloading set to locusMembers (Optional)
 *         schema:
 *           type: string
 *           default: member
 *            
 *       - name: sort
 *         in: query         
 *         description: Sort order (Optional)
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           x-parser: case-insensitive
 * 
 *       - name: page
 *         in: query         
 *         description: Set page number (Optional)
 *         schema:
 *           type: integer
 *           default: 1
 * 
 *       - name: perPage
 *         in: query         
 *         description: Set data limit per loading (Optional)
 *         schema:
 *           type: integer
 *           default: 1000
 *  
 *     responses:
 *       '200':
 *         description: Successful response
 *       '403':
 *         description: Access denied
 */


router.get('/locus', locusController);

export default router;