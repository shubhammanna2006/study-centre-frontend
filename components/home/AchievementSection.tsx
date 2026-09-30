import { achievements } from '@/lib/data'
import React from 'react'
import { Counter } from '../site/Counter'

const AchievementSection = () => {
  return (
    <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-extrabold text-gradient">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default AchievementSection