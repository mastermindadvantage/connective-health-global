import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EVIDENCE_TIERS = {
  CLINICAL_TRIAL: { id: 1, name: 'Clinical Trial', short: 'Trial', color: '#22C55E', bg: 'bg-green-500' },
  MULTIPLE_STUDIES: { id: 2, name: 'Multiple Studies', short: 'Studies', color: '#16A34A', bg: 'bg-green-600' },
  PATIENT_REPORTS: { id: 3, name: 'Patient Reports', short: 'Patient', color: '#F59E0B', bg: 'bg-amber-500' },
  EMERGING: { id: 4, name: 'Emerging', short: 'Emerging', color: '#EF4444', bg: 'bg-red-500' },
  LISTING_ONLY: { id: 5, name: 'Listing Only', short: 'Info', color: '#9CA3AF', bg: 'bg-gray-400' },
} as const

export const LISTING_TIERS = {
  free: { name: 'Free', badge: 'bg-gray-100 text-gray-700' },
  verified: { name: 'Verified', badge: 'bg-blue-100 text-blue-700' },
  featured: { name: 'Featured', badge: 'bg-amber-100 text-amber-700' },
} as const

export type EvidenceTier = keyof typeof EVIDENCE_TIERS
export type ListingTier = keyof typeof LISTING_TIERS
