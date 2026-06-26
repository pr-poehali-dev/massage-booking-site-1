import { useState } from 'react';
import Icon from '@/components/ui/icon';

const DIPLOMAS = [
  {
    title: 'Евгений Малахов',
    subtitle: 'Мастер эстетики тела · Лимфодренаж · Москва',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/f1a5fa7e-f624-4ec5-a122-1b0f89fe8e60.jpeg',
    portrait: true,
  },
  {
    title: 'Свидетельство — Инструктор фитнеса, бодибилдинга, оздоровительной физической культуры',
    subtitle: 'Колледж фитнеса и бодибилдинга им. Бена Вейдера · 2019',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/86577a3e-d76d-4250-8b80-d3210ad5a638.jpeg',
  },
  {
    title: 'Диплом — Инструктор фитнеса, бодибилдинга, оздоровительной физической культуры',
    subtitle: 'Колледж фитнеса и бодибилдинга им. Бена Вейдера · 2019',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/1c3dbcfd-df30-48fe-a14f-2926781c9130.jpeg',
  },
  {
    title: 'Сертификат — Массажист универсал',
    subtitle: 'Учебный центр Андрея Мартынова · 288 часов · 2026',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/57507b7a-851a-43f4-995d-5bf4c35e11a4.jpeg',
  },
  {
    title: 'Диплом о профессиональной переподготовке — Косметик-эстетист по уходу за телом',
    subtitle: 'Учебный центр Андрея Мартынова · 288 часов · 2026',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/62b0c67a-b015-4a62-97c5-a7f59a32a167.jpeg',
  },
  {
    title: 'Приложение к свидетельству — Массажист универсал',
    subtitle: 'Учебный центр Андрея Мартынова · 288 часов · 2026',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/60efcf7b-109b-4687-82be-153c08f404da.jpeg',
  },
];

export default function DiplomaCarousel() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const prev = () => setCurrent((c) => (c === 0 ? DIPLOMAS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === DIPLOMAS.length - 1 ? 0 : c + 1));

  const d = DIPLOMAS[current];

  return (
    <>
      <div className="flex flex-col items-center select-none">
        {/* Card */}
        <div className="relative w-full max-w-sm mx-auto">
          {/* Image */}
          <button
            className="block w-full overflow-hidden shadow-lg border border-border/20 group"
            style={{ borderRadius: '1rem' }}
            onClick={() => setLightbox(d.src)}
            aria-label="Открыть"
          >
            <img
              src={d.src}
              alt={d.title}
              className={`w-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ${'portrait' in d && d.portrait ? 'aspect-[3/4] object-top' : 'aspect-[4/3]'}`}
            />
          </button>

          {/* Стрелки поверх фото */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm border border-border/20"
            aria-label="Назад"
          >
            <Icon name="ChevronLeft" size={16} className="text-foreground/60" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm border border-border/20"
            aria-label="Вперёд"
          >
            <Icon name="ChevronRight" size={16} className="text-foreground/60" />
          </button>
        </div>

        {/* Caption */}
        <div className="mt-5 text-center px-4">
          <p className="text-sm font-medium text-foreground/80" style={{ fontFamily: 'Montserrat, sans-serif' }}>{d.title}</p>
          <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}>{d.subtitle}</p>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-5">
          {DIPLOMAS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-primary' : 'w-2 h-2 bg-border hover:bg-primary/40'}`}
              style={{ padding: '6px', boxSizing: 'content-box' }}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-w-full max-h-full object-contain rounded-lg" />
          <button className="absolute top-4 right-4 text-white/60 hover:text-white" onClick={() => setLightbox(null)}>
            <Icon name="X" size={28} />
          </button>
        </div>
      )}
    </>
  );
}