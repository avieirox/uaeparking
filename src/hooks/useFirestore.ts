import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ParkingSpot } from '../types/parking';

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all parkings with pagination
  const getParkings = async (
    page: number = 1, 
    itemsPerPage: number = 12,
    filters: Record<string, any> = {}
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryConstraints: QueryConstraint[] = [
        orderBy('name'),
        limit(itemsPerPage)
      ];

      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryConstraints.push(where(key, '==', value));
        }
      });

      const parkingsRef = collection(db, 'parkings');
      const q = query(parkingsRef, ...queryConstraints);
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ParkingSpot[];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get single parking
  const getParking = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const parkingRef = doc(db, 'parkings', id);
      const parkingDoc = await getDoc(parkingRef);
      
      if (!parkingDoc.exists()) {
        throw new Error('Parking not found');
      }
      
      return {
        id: parkingDoc.id,
        ...parkingDoc.data()
      } as ParkingSpot;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Add new parking
  const addParking = async (parking: Omit<ParkingSpot, 'id'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const parkingsRef = collection(db, 'parkings');
      const docRef = await addDoc(parkingsRef, parking);
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update parking
  const updateParking = async (id: string, data: Partial<ParkingSpot>) => {
    setLoading(true);
    setError(null);
    
    try {
      const parkingRef = doc(db, 'parkings', id);
      await updateDoc(parkingRef, data);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete parking
  const deleteParking = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const parkingRef = doc(db, 'parkings', id);
      await deleteDoc(parkingRef);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    getParkings,
    getParking,
    addParking,
    updateParking,
    deleteParking,
    loading,
    error
  };
};