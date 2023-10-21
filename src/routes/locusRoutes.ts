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
 *           default: 1878843
 * 
 *       - name: assembly_id
 *         in: query
 *         description: The assembly ID. (Optional)
 *         schema:
 *           type: string
 *           default: 'GRCh38'
 * 
 *       - name: sideLoading
 *         in: query
 *         description: The assembly ID. (Optional)
 *         schema:
 *           type: string
 *           enum: [locusMembers, none]
 *           default: locusMembers
 *  
 *       - name: region_id
 *         in: query
 *         description: Get locus data by region ID if sideLoading set locusMembers (Optional)
 *         schema:
 *           type: integer
 *           default: 182936 
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
 */


router.get('/locus', locusController);

export default router;



// /**
//  * @swagger
//  * /api/locus:
//  *   get:
//  *   summary: Get Locus Data
//  *   description: Retrieve Locus data based on query parameters.
//  *     parameters:
//  *       - name: id
//  *         in: query
//  *         description: The ID of the Locus. (Optional)
//  *         schema:
//  *         type: integer
//  *          default: 1878843
//  *
//  *      - name: assembly_id
//  *        in: query
//  *        description: The assembly ID. (Optional)
//  *        schema:
//  *          type: integer
//  *          default: 123  # Set your default value here
//  *
//  *      - name: region_id
//  *        in: query
//  *        description: The region ID. (Optional)
//  *        schema:
//  *          type: string
//  *          default: 'your_default_value'
//  *
//  *      - name: membership_status
//  *        in: query
//  *        description: The membership status. (Optional)
//  *        schema:
//  *          type: string
//  *          default: 'your_default_value'
//  *
//  *       - name: sideLoad
//  *         in: query
//  *         description: The sideLoad parameter. (Optional)
//  *         schema:
//  *           type: string
//  *           default: 'none'
//  *           enum:
//  *             - 'locusMembers'
//  *             - 'none'
//  *
//  *       - name: page
//  *         in: query
//  *         description: The page number for pagination. (Optional)
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *
//  *       - name: perPage
//  *         in: query
//  *         description: The number of items per page for pagination. (Optional)
//  *         schema:
//  *           type: integer
//  *           default: 1000
//  *
//  *       - name: sort
//  *         in: query
//  *         description: Sorting options. (Optional)
//  *         schema:
//  *           type: string
//  *           default: 'your_default_sort_field'
//  *           example: 'field1,field2'  # Example format for sorting
//  *     responses:
//  *       '200':
//  *       description: Successful response
//  */