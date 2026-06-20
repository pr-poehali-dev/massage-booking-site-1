import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const CAROUSEL_IMGS = [
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/9836484f-36a5-4043-9c4a-0580b83bda43.jpg', label: 'Классический массаж' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/2103ac3d-3f72-469f-9bae-337824fcac51.jpg', label: 'Лимфодренаж' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/d74e2b0e-5380-4b20-97f3-b9fd6423fc7d.jpg', label: 'Медовый массаж' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/61deb89e-1343-4c95-a71e-735084d616eb.jpg', label: 'Обёртывания' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/75126526-93ea-4a5a-8252-93f677c6ac37.jpg', label: 'Антицеллюлитный' },
  { src: 'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/707a897f-3682-487b-ade8-85e60e964b6f.jpg', label: 'Расслабляющий массаж' },
];

const HERO_IMG =
  'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/bucket/28ffc5f0-71c5-447f-9ed0-c48abdf9dc70.jpeg';

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
    desc: 'Тело обретает лёгкость, мышцы — тонус, кожа — сияние. Глубокая проработка от шеи до стоп снимает напряжение и запускает естественное восстановление.',
    duration: '90 мин',
    price: '4 500 ₽',
    sale: '4 000 ₽',
  },
  {
    icon: 'Droplets',
    name: 'Лимфодренажный массаж тела',
    desc: 'Лёгкость возвращается после первого же сеанса. Уходят отёки, чётче обозначается силуэт — тело становится таким, каким должно быть.',
    duration: '90 мин',
    price: '4 000 ₽',
    sale: '3 500 ₽',
  },
  {
    icon: 'Layers',
    name: 'Комбинированный массаж-конструктор',
    desc: 'Соберите сеанс под свой запрос. Классика + лимфодренаж + антицеллюлитная проработка — лёгкость, чёткий силуэт и упругость кожи в одном визите.',
    duration: '90 мин',
    price: '4 500 ₽',
    sale: '4 000 ₽',
  },
  {
    icon: 'Flame',
    name: 'Медовый массаж',
    desc: 'Кожа сияет уже после первой процедуры. Мёд вытягивает токсины, прогревает и разбивает застой — тело легчает, а кожа буквально светится.',
    duration: '45 мин',
    price: '3 800 ₽',
    sale: '3 300 ₽',
  },
  {
    icon: 'Sparkles',
    name: 'Обёртывания',
    desc: 'Сияние кожи, мягкость и лифтинг — всё в одной процедуре. Водорослевое, шоколадное или грязевое — состав подбирается под ваш запрос.',
    duration: '45 мин',
    price: '2 800 ₽',
    sale: '2 300 ₽',
  },
  {
    icon: 'PackageCheck',
    name: 'Массаж всего тела + обёртывание',
    desc: 'Лёгкость, чёткий силуэт и сияние кожи — всё за один визит. Глубокая проработка мышц и обёртывание на выбор для максимального результата.',
    duration: '2 часа',
    price: '5 000 ₽',
    sale: '4 500 ₽',
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);

  const nextSlide = useCallback(() => setSlide((s) => (s + 1) % CAROUSEL_IMGS.length), []);
  const prevSlide = useCallback(() => setSlide((s) => (s - 1 + CAROUSEL_IMGS.length) % CAROUSEL_IMGS.length), []);

  useEffect(() => {
    const t = setInterval(nextSlide, 4000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast({ title: 'Заполните имя и телефон', variant: 'destructive' });
      return;
    }
    setSending(true);
    try {
      await fetch('https://functions.poehali.dev/a340d974-1fb9-4649-9187-df18894eeae3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, service: selectedService, time }),
      });
      toast({
        title: 'Заявка отправлена!',
        description: 'Евгений свяжется с вами, чтобы подтвердить запись.',
      });
      setName('');
      setPhone('');
      setTime('');
    } catch {
      toast({ title: 'Ошибка отправки', description: 'Попробуйте ещё раз или позвоните напрямую.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/30">
        <div className="container flex items-center justify-between h-14 md:h-16">
          <button
            onClick={() => scrollTo('home')}
            className="font-display text-base md:text-xl tracking-widest text-foreground"
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
          <div className="flex items-center gap-3">
            <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
              <Button className="rounded-none px-4 md:px-6 text-xs tracking-widest uppercase h-9">Записаться</Button>
            </a>
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню"
            >
              <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-px bg-foreground transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 border-t border-border/30' : 'max-h-0'}`}>
          <div className="container py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors py-2.5 border-b border-border/20 last:border-0"
              >
                {n.label}
              </button>
            ))}
            <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer" className="mt-3">
              <Button className="w-full rounded-none text-xs tracking-widest uppercase h-10">Записаться</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-14 md:pt-16 overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="container grid md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-24">
          <div className="animate-fade-up order-2 md:order-1">
            <div className="flex items-center gap-3 mb-5 md:mb-8">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-primary">профессиональный массаж · москва</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] mb-6 md:mb-8 text-foreground">
              Лёгкость.<br /><span className="text-primary">Силуэт.</span><br />Сияние.
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-sm mb-8 md:mb-10 leading-relaxed">
              Глубокая проработка мышц, моделирование силуэта тела и сияние кожи
              за один визит.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto rounded-none px-8 md:px-10 h-12 text-xs tracking-widest uppercase">Записаться на сеанс</Button>
              </a>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollTo('services')}
                className="w-full sm:w-auto rounded-none px-8 md:px-10 h-12 text-xs tracking-widest uppercase border border-border/40 hover:border-primary/40 hover:bg-transparent hover:text-primary"
              >
                Услуги и цены
              </Button>
            </div>
          </div>
          <div className="animate-fade-up order-1 md:order-2" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-8 bg-primary/10 blur-[80px] rounded-full" />
              <div className="absolute -top-3 -right-3 w-16 md:w-24 h-16 md:h-24 border border-primary/20" />
              <div className="absolute -bottom-3 -left-3 w-10 md:w-16 h-10 md:h-16 border border-primary/10" />

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
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 md:px-6 py-3 md:py-4">
                  <span className="text-xs tracking-[0.25em] uppercase text-white/80">{CAROUSEL_IMGS[slide].label}</span>
                </div>

                {/* Кнопки — на мобиле всегда видны */}
                <button onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 active:bg-black/50 text-white transition-colors md:opacity-0 md:group-hover:opacity-100">
                  <Icon name="ChevronLeft" size={16} />
                </button>
                <button onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/30 active:bg-black/50 text-white transition-colors md:opacity-0 md:group-hover:opacity-100">
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
      <section id="services" className="py-16 md:py-28 bg-secondary/20">
        <div className="container">
          <div className="flex items-end justify-between mb-10 md:mb-16 border-b border-border/30 pb-6 md:pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-primary" />
                <span className="text-xs tracking-[0.3em] uppercase text-primary">услуги</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">Что я предлагаю</h2>
            </div>
            <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer" className="hidden md:block text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors border-b border-border/40 pb-1">
              Записаться →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s) => (
              <div key={s.name} className="card-premium hover-lift p-6 md:p-8 flex flex-col group">
                <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-6 md:mb-8 shrink-0 group-hover:border-primary/60 group-hover:bg-primary/5 transition-colors">
                  <Icon name={s.icon} className="text-primary" size={18} />
                </div>
                <h3 className="font-display text-base md:text-lg mb-3 leading-tight">{s.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 md:mb-8 flex-1 leading-relaxed">{s.desc}</p>
                <div className="border-t border-border/30 pt-4 md:pt-5 mt-auto flex items-center justify-between">
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
          <p className="mt-6 md:mt-8 text-xs text-muted-foreground text-center tracking-wider">
            * Акция «Знакомство» — цена первого сеанса для новых клиентов
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 md:py-28">
        <div className="container grid md:grid-cols-5 gap-8 md:gap-16 items-center">
          <div className="md:col-span-2 relative max-w-xs mx-auto md:max-w-none w-full">
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
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8">
              Ваше тело —<br />моя работа
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
              Меня зовут Евгений. Более 8 лет я работаю с телом: восстановление
              после нагрузок, эстетика контура, возвращение лёгкости и тонуса.
              Владею техниками классического, лимфодренажного, медового массажа
              и обёртываний. Работаю на результат, который виден и ощутим.
            </p>
            <p className="text-muted-foreground mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
              Каждый сеанс — продуманная схема под ваш запрос. Без спешки,
              с вниманием к каждому участку тела.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-border/30 pt-6 md:pt-8">
              {[
                { n: '8+', l: 'лет практики' },
                { n: '1200+', l: 'клиентов' },
                { n: '100%', l: 'индивидуально' },
              ].map((stat) => (
                <div key={stat.l} className="relative pl-3 md:pl-4 before:absolute before:left-0 before:top-1 before:h-4/5 before:w-px before:bg-primary/40">
                  <div className="font-display text-3xl md:text-4xl text-primary">{stat.n}</div>
                  <div className="text-xs text-muted-foreground mt-1 tracking-wider uppercase">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-16 md:py-28 bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="container max-w-2xl relative">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs tracking-[0.3em] uppercase text-primary">онлайн-запись</span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">Запись онлайн</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              Выберите удобное время и услугу прямо в онлайн-календаре
            </p>
          </div>
          <div className="bg-card border border-border/40 p-6 md:p-10 text-center" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 0 100%)' }}>
            <div className="w-16 h-16 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <Icon name="CalendarCheck" className="text-primary" size={28} />
            </div>
            <h3 className="font-display text-2xl md:text-3xl mb-3">Запишитесь за 1 минуту</h3>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-sm mx-auto">
              Выберите услугу, дату и удобное время — подтверждение придёт сразу после записи
            </p>
            <a href="https://dikidi.app/2093993" target="_blank" rel="noopener noreferrer" className="block w-full sm:w-auto sm:inline-block">
              <Button size="lg" className="rounded-none px-16 h-16 text-base tracking-widest uppercase w-full sm:w-auto">
                Записаться онлайн
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 md:py-28">
        <div className="container">
          <div className="flex items-end justify-between mb-10 md:mb-16 border-b border-border/30 pb-6 md:pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6 bg-primary" />
                <span className="text-xs tracking-[0.3em] uppercase text-primary">отзывы</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">Что говорят клиенты</h2>
            </div>
            <div className="hidden md:flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={16} fill="currentColor" />
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((r) => (
              <div key={r.name} className="card-premium p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-5 md:mb-6 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 md:mb-6">«{r.text}»</p>
                </div>
                <div className="flex items-center gap-3 pt-4 md:pt-5 border-t border-border/30">
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
      <section id="contacts" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
        <div className="container relative">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">контакты</span>
            <h2 className="font-display text-4xl md:text-6xl mt-3">Свяжитесь со мной</h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm md:text-base">
              Обсудим ваш запрос, подберём услугу и удобное время
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (993) 338-73-73', href: 'tel:+79933387373' },
                { icon: 'MapPin', label: 'Адрес', value: 'Москва, Пятницкая ул., 62с7', href: null },
                { icon: 'Clock', label: 'Режим', value: 'По предварительной записи', href: null },
              ].map((c) => (
                <div key={c.label} className="bg-card border border-border/60 rounded-2xl p-5 md:p-6 flex flex-col gap-3 hover:border-primary/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-medium hover:text-primary transition-colors text-sm md:text-base">{c.value}</a>
                    ) : (
                      <span className="font-medium text-sm md:text-base">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://t.me/+79933387373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 md:px-8 py-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
              >
                <Icon name="Send" size={18} className="text-primary" />
                <span>Написать в Telegram</span>
              </a>
              <a
                href="https://wa.me/79933387373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 md:px-8 py-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium"
              >
                <Icon name="MessageCircle" size={18} className="text-primary" />
                <span>Написать в WhatsApp</span>
              </a>
              <a
                href="https://dikidi.app/2093993"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 md:px-8 py-4 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-all text-sm font-medium"
              >
                <Icon name="CalendarCheck" size={18} />
                <span>Записаться онлайн</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 md:py-8 border-t border-border/20">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 text-center sm:text-left">
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
            Записаться →
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;