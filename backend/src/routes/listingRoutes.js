import { Router } from 'express'
import authenticate from '../middlewares/authenticate.js'
import {
    getAllListing,
    getListingById,
    createListing,
    updateListing,
    deleteListing
} from '../controllers/listingController.js'

const router = Router()

router.get('/', getAllListing)
router.get('/:id', getListingById)
router.post('/', authenticate, createListing)
router.put('/:id', authenticate, updateListing)
router.delete('/:id', authenticate, deleteListing)

export default router