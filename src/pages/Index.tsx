import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CAROUSEL_IMGS = [
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/cfcf6f6c-2016-4cde-8548-81773e53c622.jpg', label: 'Классический массаж' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/e172a2d9-ed03-4981-b8f8-9b6e6a910a5a.jpg', label: 'Лимфодренаж' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/d74e2b0e-5380-4b20-97f3-b9fd6423fc7d.jpg', label: 'Медовый массаж' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/61deb89e-1343-4c95-a71e-735084d616eb.jpg', label: 'Обёртывания' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/75126526-93ea-4a5a-8252-93f677c6ac37.jpg', label: 'Антицеллюлитный' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/707a897f-3682-487b-ade8-85e60e964b6f.jpg', label: 'Расслабляющий массаж' },
];

const HERO_IMG =
  'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/28ffc5f0-71c5-447f-9ed0-c48abdf9dc70.jpeg';

const HERO_DECOR_IMG =
  'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/8cabd1eb-8eed-4b1b-a9e0-75b8c8eb5693.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'services', label: 'Услуги' },
  { id: 'about', label: 'Обо мне' },
  { id: 'booking', label: 'Запись' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const SERVICES = [
  {
    icon: 'Waves',
    name: 'Классический массаж всего тела',
    desc: 'Восстановление мышечного тонуса, улучшение кровообращения, снятие общего напряжения. Глубокая проработка всех мышечных групп — от шеи до стоп.',
    duration: '90 мин',
    price: '4 500 ₽',
    sale: '4 000 ₽',
  },
  {
    icon: 'Droplets',
    name: 'Лимфодренажный массаж тела',
    desc: 'Мягкая техника, запускающая движение лимфы. Уходят отёки, выводится лишняя жидкость, возвращается лёгкость и подтянутость контура.',
    duration: '90 мин',
    price: '4 000 ₽',
    sale: '3 500 ₽',
  },
  {
    icon: 'Layers',
    name: 'Комбинированный массаж-конструктор',
    desc: 'Соберите сеанс под свой запрос. Классическая база + лимфодренаж. Можно добавить антицеллюлитный блок для проработки проблемных зон — моделирование контура и повышение упругости кожи.',
    duration: '90 мин',
    price: '4 500 ₽',
    sale: '4 000 ₽',
  },
  {
    icon: 'Flame',
    name: 'Медовый массаж',
    desc: 'Глубокий детокс и перезапуск обмена веществ. Мёд вытягивает токсины через кожу, прогревает ткани и разбивает застойные зоны. Интенсивно, но с мощным очищающим результатом.',
    duration: '45 мин',
    price: '3 800 ₽',
    sale: '3 300 ₽',
  },
  {
    icon: 'Sparkles',
    name: 'Обёртывания',
    desc: 'Завершающий штрих к массажу или самостоятельная процедура. Водорослевое — детокс и минерализация; шоколадное — питание и лифтинг; грязевое — глубокое прогревание и антицеллюлитный эффект. Состав подбирается под ваш запрос.',
    duration: '45 мин',
    price: '2 800 ₽',
    sale: '',
  },
  {
    icon: 'PackageCheck',
    name: 'Массаж всего тела + обёртывание',
    desc: 'Комплексная программа: глубокая проработка мышц и завершающее обёртывание на выбор. Максимальный результат за один визит.',
    duration: '2 часа',
    price: '5 000 ₽',
    sale: '',
  },
];

const REVIEWS = [
  {
    name: 'Марина',
    text: 'Пришла с сильной отёчностью после перелётов. После первого же лимфодренажного сеанса почувствовала невероятную лёгкость. Прошла курс — минус 3 см в объёмах, лицо посвежело, тело как будто стало другим.',
  },
  {
    name: 'Ольга',
    text: 'Классический массаж у Евгения — это не просто поглаживания, а настоящая лечебная работа. Спина перестала болеть уже после второго сеанса. Очень грамотный подход, чувствуется знание анатомии.',
  },
  {
    name: 'Елена',
    text: 'Брала комбинированный массаж с антицеллюлитным блоком + обёртывания. Через 6 сеансов кожа стала заметно ровнее и подтянутее. Результат, которого не добилась ни в одном салоне.',
  },
  {
    name: 'Ирина',
    text: 'Понравилось, что Евгений слышит запрос. Я не знала, что именно мне нужно — предложил комбинированный массаж. После сеанса впервые за долгое время забыла про тяжесть в ногах и скованность в плечах.',
  },
  {
    name: 'Светлана',
    text: 'Медовый массаж — это что-то невероятное. Кожа после него дышит, ощущение чистоты и лёгкости на несколько дней. Теперь беру курсом раз в сезон.',
  },
];

const SERVICE_NAMES = [
  'Классический массаж всего тела',
  'Лимфодренажный массаж тела',
  'Комбинированный массаж-конструктор',
  'Медовый массаж',
  'Обёртывания',
  'Массаж всего тела + обёртывание',
  'Затрудняюсь выбрать',
];

const TIMES = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

const Index = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState(SERVICE_NAMES[0]);
  const [time, setTime] = useState('');
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => setSlide((s) => (s + 1) % CAROUSEL_IMGS.length), []);
  const prevSlide = useCallback(() => setSlide((s) => (s - 1 + CAROUSEL_IMGS.length) % CAROUSEL_IMGS.length), []);

  useEffect(() => {
    const t = setInterval(nextSlide, 4000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена',
      description: 'Евгений свяжется с вами, чтобы подтвердить запись.',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/30">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('home')}
            className="font-display text-xl tracking-widest text-foreground"
          >
            ЕВГЕНИЙ <span className="text-primary">МАССАЖ</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-none px-6 text-xs tracking-widest uppercase h-9">Записаться</Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container grid md:grid-cols-2 gap-16 items-center py-24">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-primary">профессиональный массаж · москва</span>
            </div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] mb-8 text-foreground">
              Лёгкость.<br /><span className="text-primary">Контур.</span><br />Перезагрузка.
            </h1>
            <p className="text-base text-muted-foreground max-w-sm mb-10 leading-relaxed">
              Глубокая проработка мышц, моделирование контура тела и полная
              перезагрузка за один визит.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-none px-10 h-12 text-xs tracking-widest uppercase">Записаться на сеанс</Button>
              </a>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollTo('services')}
                className="rounded-none px-10 h-12 text-xs tracking-widest uppercase border border-border/40 hover:border-primary/40 hover:bg-transparent hover:text-primary"
              >
                Услуги и цены
              </Button>
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-8 bg-primary/10 blur-[80px] rounded-full" />
              <div className="absolute -top-3 -right-3 w-24 h-24 border border-primary/20" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border border-primary/10" />

              {/* Карусель */}
              <div className="relative overflow-hidden shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)' }}>
                {CAROUSEL_IMGS.map((img, i) => (
                  <div
                    key={img.src}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === slide ? 1 : 0, position: i === slide ? 'relative' : 'absolute' }}
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))}

                {/* Лейбл */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-4">
                  <span className="text-xs tracking-[0.25em] uppercase text-white/80">{CAROUSEL_IMGS[slide].label}</span>
                </div>

                {/* Кнопки */}
                <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white transition-colors opacity-0 group-hover:opacity-100">
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>

              {/* Точки */}
              <div className="flex gap-2 justify-center mt-4">
                {CAROUSEL_IMGS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-px transition-all duration-300 ${i === slide ? 'w-8 bg-primary' : 'w-4 bg-border'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-28 bg-secondary/20">
        <div className="container">
          <div className="flex items-end justify-between mb-16 border-b border-border/30 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-primary" />
                <span className="text-xs tracking-[0.3em] uppercase text-primary">услуги</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl">Что я предлагаю</h2>
            </div>
            <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer" className="hidden md:block text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors border-b border-border/40 pb-1">
              Записаться →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.name} className="card-premium hover-lift p-8 flex flex-col group">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-8 shrink-0 group-hover:border-primary/60 group-hover:bg-primary/5 transition-colors">
                  <Icon name={s.icon} className="text-primary" size={18} />
                </div>
                <h3 className="font-display text-lg mb-3 leading-tight">{s.name}</h3>
                <p className="text-muted-foreground text-sm mb-8 flex-1 leading-relaxed">{s.desc}</p>
                <div className="border-t border-border/30 pt-5 mt-auto flex items-center justify-between">
                  <span className="text-muted-foreground text-xs tracking-wider flex items-center gap-1.5">
                    <Icon name="Clock" size={12} /> {s.duration}
                  </span>
                  <div className="text-right">
                    {s.sale ? (
                      <>
                        <div className="text-xs text-muted-foreground line-through">{s.price}</div>
                        <div className="text-primary font-medium text-sm">{s.sale} <span className="text-xs text-muted-foreground font-normal">акция</span></div>
                      </>
                    ) : (
                      <div className="text-primary font-medium">{s.price}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground text-center tracking-wider">
            * Акция «Знакомство» — цена первого сеанса для новых клиентов
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28">
        <div className="container grid md:grid-cols-5 gap-16 items-center">
          <div className="md:col-span-2 relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/15" />
            <div className="absolute -bottom-4 -right-4 w-14 h-14 border border-primary/10" />
            <img
              src={HERO_IMG}
              alt="Евгений — профессиональный массажист"
              className="relative w-full object-cover object-top"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' }}
            />
          </div>
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-primary">обо мне</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-8">
              Ваше тело —<br />моя работа
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Меня зовут Евгений. Более 8 лет я работаю с телом: восстановление
              после нагрузок, эстетика контура, возвращение лёгкости и тонуса.
              Владею техниками классического, лимфодренажного, медового массажа
              и обёртываний. Работаю на результат, который виден и ощутим.
            </p>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Каждый сеанс — продуманная схема под ваш запрос. Без спешки,
              с вниманием к каждому участку тела.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-border/30 pt-8">
              {[
                { n: '8+', l: 'лет практики' },
                { n: '1200+', l: 'клиентов' },
                { n: '100%', l: 'индивидуально' },
              ].map((stat) => (
                <div key={stat.l} className="relative pl-4 before:absolute before:left-0 before:top-1 before:h-4/5 before:w-px before:bg-primary/40">
                  <div className="font-display text-4xl text-primary">{stat.n}</div>
                  <div className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-28 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="container max-w-3xl relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-primary">онлайн-запись</span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="font-display text-5xl md:text-6xl mb-4">Выберите услугу</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Оставьте заявку — свяжусь, чтобы подтвердить запись и ответить на вопросы.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-card border border-border/40 p-8 md:p-10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 0 100%)' }}>
            <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-4">Желаемая услуга</label>
            <div className="grid sm:grid-cols-2 gap-2 mb-8">
              {SERVICE_NAMES.map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setSelectedService(name)}
                  className={`text-left border p-4 text-sm transition-all duration-200 ${
                    selectedService === name
                      ? 'border-primary bg-primary/8 text-foreground'
                      : 'border-border/40 text-muted-foreground hover:border-primary/30 hover:text-foreground'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <label className="block text-xs tracking-widest uppercase text-muted-foreground mb-4">Удобное время</label>
            <div className="flex flex-wrap gap-2 mb-8">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`px-5 py-2 border text-sm transition-all duration-200 tracking-wider ${
                    time === t
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/40 text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              <Input placeholder="Ваше имя" className="h-11 rounded-none border-border/40 focus:border-primary bg-transparent" />
              <Input placeholder="Телефон" type="tel" className="h-11 rounded-none border-border/40 focus:border-primary bg-transparent" />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-none h-12 text-xs tracking-widest uppercase">
              Записаться{time ? ` на ${time}` : ''}
            </Button>
          </form>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-16 border-b border-border/30 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-primary" />
                <span className="text-xs tracking-[0.3em] uppercase text-primary">отзывы</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl">Что говорят клиенты</h2>
            </div>
            <div className="hidden md:flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={16} fill="currentColor" />
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="card-premium p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">«{r.text}»</p>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-border/30">
                  <div className="w-7 h-7 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary text-xs font-display">{r.name[0]}</span>
                  </div>
                  <span className="font-display text-sm tracking-wider">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
        <div className="container relative">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">контакты</span>
            <h2 className="font-display text-4xl md:text-6xl mt-3">Свяжитесь со мной</h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Обсудим ваш запрос, подберём услугу и удобное время
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (993) 338-73-73', href: 'tel:+79933387373' },
                { icon: 'MapPin', label: 'Адрес', value: 'Москва, Пятницкая ул., 62с7', href: null },
                { icon: 'Clock', label: 'Режим', value: 'По предварительной записи', href: null },
              ].map((c) => (
                <div key={c.label} className="bg-card border border-border/60 rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-medium hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <span className="font-medium">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/+79933387373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium group"
              >
                <Icon name="Send" size={18} className="text-primary" />
                <span>Написать в Telegram</span>
              </a>
              <a
                href="https://wa.me/79933387373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium group"
              >
                <Icon name="MessageCircle" size={18} className="text-primary" />
                <span>Написать в WhatsApp</span>
              </a>
              <a
                href="https://dikidi.app/2093993"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-all text-sm font-medium"
              >
                <Icon name="CalendarCheck" size={18} />
                <span>Записаться онлайн</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border/20">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg tracking-widest text-foreground">
            ЕВГЕНИЙ<span className="text-primary">.</span>
          </span>
          <span className="text-xs tracking-wider text-muted-foreground uppercase">© {new Date().getFullYear()} · Профессиональный массаж · Москва</span>
          <a
            href="https://dikidi.app/2093993"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors border-b border-border/30 pb-0.5"
          >
            Записаться онлайн →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;