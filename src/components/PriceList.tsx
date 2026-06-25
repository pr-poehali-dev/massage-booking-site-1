import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Duration = '60' | '90';

const PLANS = [
  {
    id: 'lymph',
    tag: 'Главная услуга',
    name: 'Лимфодренажный\nмассаж тела',
    desc: 'Мягкая авторская техника, запускающая движение лимфы. Уходят отёки и застоявшаяся жидкость, проявляются контуры, возвращается лёгкость и подтянутость силуэта.',
    featured: true,
    options: {
      '60': { price: '3 000 ₽', base: '3 500 ₽', note: 'Экспресс-сеанс: интенсивный запуск лимфы и снятие утренней тяжести.' },
      '90': { price: '4 000 ₽', base: '4 500 ₽', note: 'Комплексный лимфодренаж всего тела для максимального моделирования силуэта.' },
    },
  },
  {
    id: 'classic',
    tag: 'Классика',
    name: 'Классический\nмассаж всего тела',
    desc: 'Глубокое ручное воздействие, которое возвращает коже упругость, снимает накопленное напряжение и пробуждает природный тонус тела — от шеи до стоп.',
    featured: false,
    options: {
      '60': { price: '2 500 ₽', base: '3 000 ₽', note: 'Идеально, чтобы быстро снять зажимы в спине и шее после рабочего дня.' },
      '90': { price: '3 500 ₽', base: '4 000 ₽', note: 'Тотальное восстановление и глубокая анатомическая проработка каждой мышцы.' },
    },
  },
];

export default function PriceList() {
  const [durations, setDurations] = useState<Record<string, Duration>>({ lymph: '90', classic: '60' });

  const toggle = (id: string, val: Duration) =>
    setDurations((prev) => ({ ...prev, [id]: val }));

  return (
    <section id="price" className="py-12 md:py-28" style={{ backgroundColor: '#F5EBE6' }}>
      <div className="container">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-6 bg-primary" />
          <span
            className="text-xs tracking-[0.15em] md:tracking-[0.3em] uppercase text-primary"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
          >
            прайс-лист
          </span>
        </div>
        <h2
          className="mb-8 md:mb-14"
          style={{
            fontFamily: "'Tenor Sans', serif",
            fontSize: 'clamp(1.6rem, 6vw, 3rem)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: '#2d2420',
            lineHeight: 1.2,
          }}
        >
          Цены на процедуры
        </h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-3xl">
          {PLANS.map((plan) => {
            const dur = durations[plan.id];
            const opt = plan.options[dur];
            return (
              <div
                key={plan.id}
                className="flex flex-col"
                style={{
                  backgroundColor: plan.featured ? '#2d2420' : '#fff8f5',
                  border: plan.featured ? 'none' : '1px solid rgba(139,109,96,0.2)',
                  padding: '28px',
                }}
              >
                {/* Тег */}
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase px-2 py-1"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 300,
                      backgroundColor: plan.featured ? 'rgba(255,255,255,0.1)' : 'rgba(139,109,96,0.1)',
                      color: plan.featured ? 'rgba(255,255,255,0.7)' : '#7a6155',
                    }}
                  >
                    {plan.tag}
                  </span>

                </div>

                {/* Название */}
                <h3
                  className="mb-3 whitespace-pre-line"
                  style={{
                    fontFamily: "'Tenor Sans', serif",
                    fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    lineHeight: 1.25,
                    color: plan.featured ? '#f5ebe6' : '#2d2420',
                  }}
                >
                  {plan.name}
                </h3>

                {/* Описание */}
                <p
                  className="text-xs md:text-sm leading-relaxed mb-6"
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    color: plan.featured ? 'rgba(245,235,230,0.65)' : '#7a6155',
                  }}
                >
                  {plan.desc}
                </p>

                {/* Переключатель длительности */}
                <div
                  className="flex mb-6 self-start"
                  style={{
                    border: plan.featured ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(139,109,96,0.2)',
                  }}
                >
                  {(['60', '90'] as Duration[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => toggle(plan.id, d)}
                      className="px-4 py-2 text-xs tracking-widest uppercase transition-all duration-200 min-w-[72px] min-h-[40px]"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: dur === d ? 400 : 300,
                        backgroundColor:
                          dur === d
                            ? plan.featured
                              ? 'rgba(255,255,255,0.12)'
                              : 'rgba(139,109,96,0.12)'
                            : 'transparent',
                        color:
                          dur === d
                            ? plan.featured ? '#f5ebe6' : '#2d2420'
                            : plan.featured ? 'rgba(245,235,230,0.4)' : 'rgba(45,36,32,0.4)',
                      }}
                    >
                      {d} мин
                    </button>
                  ))}
                </div>

                {/* Цена */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span
                      style={{
                        fontFamily: "'Tenor Sans', serif",
                        fontSize: 'clamp(1.8rem, 6vw, 2.4rem)',
                        letterSpacing: '0.03em',
                        color: plan.featured ? '#f5ebe6' : '#2d2420',
                      }}
                    >
                      {opt.price}
                    </span>
                    <span
                      className="text-sm line-through"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 300,
                        color: plan.featured ? 'rgba(245,235,230,0.35)' : 'rgba(45,36,32,0.35)',
                      }}
                    >
                      {opt.base}
                    </span>
                  </div>
                  <p
                    className="text-xs mt-2 leading-relaxed"
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 300,
                      color: plan.featured ? 'rgba(245,235,230,0.5)' : '#7a6155',
                    }}
                  >
                    {opt.note}
                  </p>
                </div>

                {/* Кнопка */}
                <div className="mt-auto pt-4">
                  <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      className="w-full h-12 rounded-none text-xs tracking-widest uppercase"
                      style={
                        plan.featured
                          ? { backgroundColor: '#f5ebe6', color: '#2d2420' }
                          : {}
                      }
                      variant={plan.featured ? 'ghost' : 'default'}
                    >
                      Записаться
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p
          className="mt-5 text-xs text-muted-foreground tracking-wider"
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
        >
          * Скидка 500 ₽ действует на первый сеанс для новых клиентов
        </p>
      </div>
    </section>
  );
}