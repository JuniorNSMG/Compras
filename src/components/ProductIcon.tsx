import { Icon } from '@iconify/react'

interface ProductIconProps {
  icon: string
  size?: number
  className?: string
}

export function ProductIcon({ icon, size = 32, className = '' }: ProductIconProps) {
  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      className={className}
    />
  )
}
