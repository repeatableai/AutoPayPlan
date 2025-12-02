/**
 * Profile Service
 * 
 * Handles CRUD operations for user financial profiles
 */

import { supabase } from './client';
import { Database } from './types';

type Profile = Database['public']['Tables']['user_financial_profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['user_financial_profiles']['Insert'];
type ProfileUpdate = Database['public']['Tables']['user_financial_profiles']['Update'];

/**
 * Create a new financial profile
 */
export async function createFinancialProfile(
  userId: string,
  profileData: Omit<ProfileInsert, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<Profile> {
  const { data, error } = await supabase
    .from('user_financial_profiles')
    .insert({
      user_id: userId,
      ...profileData,
      remaining: (profileData.income || 0) - (profileData.needs || 0) - (profileData.wants || 0),
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating financial profile:', error);
    throw error;
  }

  return data;
}

/**
 * Get financial profile by ID
 */
export async function getFinancialProfile(profileId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('user_financial_profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error getting financial profile:', error);
    throw error;
  }

  return data;
}

/**
 * Get financial profile by user ID
 */
export async function getFinancialProfileByUserId(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('user_financial_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error getting financial profile by user ID:', error);
    throw error;
  }

  return data;
}

/**
 * Update financial profile
 */
export async function updateFinancialProfile(
  profileId: string,
  updates: ProfileUpdate
): Promise<Profile> {
  const { data, error } = await supabase
    .from('user_financial_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', profileId)
    .select()
    .single();

  if (error) {
    console.error('Error updating financial profile:', error);
    throw error;
  }

  return data;
}

/**
 * Delete financial profile
 */
export async function deleteFinancialProfile(profileId: string): Promise<void> {
  const { error } = await supabase
    .from('user_financial_profiles')
    .delete()
    .eq('id', profileId);

  if (error) {
    console.error('Error deleting financial profile:', error);
    throw error;
  }
}


