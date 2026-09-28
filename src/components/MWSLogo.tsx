import { cn } from '@/lib/utils'

interface MWSLogoProps {
  className?: string
  showWordmark?: boolean
  wordmarkClassName?: string
  symbolSize?: number
  variant?: 'gold-gradient' | 'gold-solid' | 'gold-white' | 'dark'
}

/**
 * Componente oficial de logotipo do Magic Wire System.
 * Símbolo ortodôntico estilizado: arco lingual invisível contínuo formando os laços característicos
 * com acabamento em ouro metálico (gradiente ouro claro -> ouro nobre -> bronze).
 * Wordmark oficial atualizado: "MAGIC WIRE SYSTEM".
 */
export function MWSLogo({
  className,
  showWordmark = true,
  wordmarkClassName,
  symbolSize = 36,
  variant = 'gold-gradient',
}: MWSLogoProps) {
  const gradientId = 'mws-gold-gradient'
  const glowId = 'mws-gold-glow'

  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      {/* Símbolo MWS */}
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: symbolSize, height: symbolSize }}
      >
        <svg
          viewBox="0 0 48 48"
          width={symbolSize}
          height={symbolSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eed89f" />
              <stop offset="35%" stopColor="#c5a059" />
              <stop offset="70%" stopColor="#b38a42" />
              <stop offset="100%" stopColor="#8c6a28" />
            </linearGradient>
            <linearGradient id="mws-gold-sheen" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9e7d3b" />
              <stop offset="50%" stopColor="#dfc282" />
              <stop offset="100%" stopColor="#eed89f" />
            </linearGradient>
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="1.5"
                floodColor="#000000"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          {/* Fundo suave circular para contraste e profundidade */}
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="#061a14"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.2"
          />

          {/* Símbolo do Fio Mágico Contínuo (Curvatura em M estilizada com nós de torque biomecânicos) */}
          <path
            d="M 10 32 C 12 18, 17 14, 21 26 C 23 31, 25 31, 27 26 C 31 14, 36 18, 38 32"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Traçado de reforço superior e brilho no fio lingual */}
          <path
            d="M 15 28 C 19 19, 21 19, 24 24 C 27 19, 29 19, 33 28"
            stroke="url(#mws-gold-sheen)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />

          {/* Esferas de ativação e ancoragem de precisão nos vértices */}
          <circle cx="10" cy="32" r="2.2" fill="#eed89f" />
          <circle cx="24" cy="18" r="2.4" fill="#eed89f" stroke="#8c6a28" strokeWidth="0.8" />
          <circle cx="38" cy="32" r="2.2" fill="#eed89f" />
        </svg>
      </div>

      {/* Wordmark atualizado com símbolo mantido */}
      {showWordmark && (
        <div className={cn('flex flex-col justify-center leading-tight', wordmarkClassName)}>
          <div className="flex items-center gap-1.5 font-bold tracking-wider text-sm sm:text-base">
            <span
              className={cn(
                variant === 'gold-gradient'
                  ? 'gold-gradient-text'
                  : variant === 'gold-solid'
                    ? 'text-gold'
                    : 'text-white',
                'font-extrabold tracking-widest uppercase text-[15px]',
              )}
            >
              MAGIC WIRE
            </span>
            <span className="text-gold-light text-[10px] font-semibold tracking-widest uppercase px-1.5 py-0.2 rounded bg-gold/15 border border-gold/30">
              SYSTEM
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.22em] text-slate-300/80 font-medium mt-0.5">
            A Verdadeira Ortodontia Invisível
          </span>
        </div>
      )}
    </div>
  )
}
