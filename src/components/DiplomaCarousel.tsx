import { useState } from 'react';
import Icon from '@/components/ui/icon';

const DIPLOMAS = [
  {
    title: 'Евгений — мастер эстетики тела',
    subtitle: 'Лимфодренаж · Моделирование силуэта · Москва',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/d21d70f6-4ee0-4ffe-99ce-27e4da494786.jpeg',
    portrait: true,
  },
  {
    title: 'Сертификат — Массажист универсал',
    subtitle: 'Учебный центр Андрея Мартынова',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/5d982237-1ce7-471f-922a-f5df942f802f.jpeg',
  },
  {
    title: 'Диплом о профессиональной переподготовке',
    subtitle: 'Учебный центр Андрея Мартынова',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/56720788-52b1-4744-9152-3d02a2ef2ea6.jpeg',
  },
  {
    title: 'Диплом — Инструктор фитнеса и бодибилдинга',
    subtitle: 'Колледж фитнеса и бодибилдинга им. Бена Вейдера',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/6b1e05f9-619b-4f68-90e1-941359f4146b.jpeg',
  },
  {
    title: 'Свидетельство — Массажист универсал',
    subtitle: 'Колледж фитнеса и бодибилдинга им. Бена Вейдера',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/01ed165c-9ffa-4086-affb-259fb6996587.jpeg',
  },
  {
    title: 'Приложение к свидетельству',
    subtitle: 'Учебный центр Андрея Мартынова',
    src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/08b4afb0-5276-4485-a4b7-f8511062e097.jpeg',
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
          {/* Arrow left */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-border/40 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
            aria-label="Назад"
          >
            <Icon name="ChevronLeft" size={16} className="text-foreground/60" />
          </button>

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

          {/* Arrow right */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-9 h-9 flex items-center justify-center rounded-full border border-border/40 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
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
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-1.5 bg-primary' : 'w-1.5 h-1.5 bg-border hover:bg-primary/40'}`}
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