import type {User} from './user' 

export type ListingSeller = Pick<User, 'id' | 'name' | 'avatar'>;

export type Category =
 | 'BOOKS'
 | 'STUDY_MATERIALS'
 | 'ELECTRONICS'
 | 'EQUIPMENT'
 | 'FURNITURE'
 | 'CLOTHING'
 | 'ACCESSORIES'
 | 'OTHER';

export interface Listing {
    id: string;
    title: string;
    description: string;
    price?: string | null;
    isDonation: boolean;
    imageUrl: string;
    category: Category;
    
    sellerId: string;
    seller?: ListingSeller

    createdAt: string;
    updatedAt: string;
}

export interface CreateListingInput {
    title: string;
    description: string;
    price?: number;
    isDonation: boolean;
    imageUrl: string;
    category: Category;
}

export type UpdateListingInput = Partial<CreateListingInput>;