import { EVIDENCE_TIERS } from '@/lib/utils'
import type { EvidenceTier } from '@/lib/utils'

interface EvidenceBadgeProps {
  tierId: number | null
  size?: 'sm' | 'md'
}

export function EvidenceBadge({ tierId, size = 'sm' }: EvidenceBadgeProps) {
  if (!tierId) return null

  const tier = Object.values(EVIDENCE_TIERS).find(t => t.id === tierId)
  if (!tier) return null

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses} ${tier.bg} text-white`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
      {tier.short}
    </span>
  )
}
