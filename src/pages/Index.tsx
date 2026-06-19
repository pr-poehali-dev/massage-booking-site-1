import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

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
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('home')}
            className="font-display text-2xl tracking-tight text-foreground"
          >
            МАССАЖ <span className="text-primary">ЕВГЕНИЙ</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('booking')} className="rounded-full px-6">
            Записаться
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="container grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="animate-fade-up">
            <span className="inline-block text-sm tracking-[0.2em] uppercase text-primary mb-6">
              профессиональный массаж
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.02] mb-6">
              Лёгкость.<br />Контур.<br />Сияние.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-10">
              Глубокая проработка мышц, моделирование контура тела и полная
              перезагрузка за один визит. Выберите удобное время и начните
              с первого сеанса.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('booking')} className="rounded-full px-8 h-12">
                Записаться на сеанс
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo('services')}
                className="rounded-full px-8 h-12 border-primary/30"
              >
                Смотреть услуги
              </Button>
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[1rem] bg-primary/20 blur-3xl" />
              <img
                src={HERO_DECOR_IMG}
                alt="Массаж"
                className="relative rounded-[1rem] w-full aspect-square object-cover shadow-2xl ring-1 ring-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="max-w-xl mb-16">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">услуги</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Что я предлагаю</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.name} className="hover-lift bg-card rounded-2xl p-8 border border-border/60 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 shrink-0">
                  <Icon name={s.icon} className="text-primary" size={22} />
                </div>
                <h3 className="font-display text-xl mb-3">{s.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1">{s.desc}</p>
                <div className="border-t border-border/40 pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm flex items-center gap-2">
                      <Icon name="Clock" size={14} /> {s.duration}
                    </span>
                    <div className="text-right">
                      {s.sale ? (
                        <>
                          <div className="text-xs text-muted-foreground line-through">{s.price}</div>
                          <div className="text-primary font-medium">{s.sale} <span className="text-xs text-muted-foreground font-normal">акция</span></div>
                        </>
                      ) : (
                        <div className="text-primary font-medium text-lg">{s.price}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground text-center">
            * Акция «Знакомство» — цена первого сеанса для новых клиентов
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <img
              src={HERO_IMG}
              alt="Евгений — профессиональный массажист"
              className="rounded-[1rem] w-full object-cover object-top"
            />
          </div>
          <div className="md:col-span-3">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">обо мне</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6">
              Ваше тело — моя работа
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Меня зовут Евгений. Более 8 лет я работаю с телом: восстановление
              после нагрузок, эстетика контура, возвращение лёгкости и тонуса.
              Владею техниками классического, лимфодренажного, медового массажа
              и обёртываний. Работаю на результат, который виден и ощутим.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Каждый сеанс — это не просто массаж, а продуманная схема под ваш
              запрос. Хотите убрать отёчность и подтянуть контур — построим курс
              лимфодренажа и обёртываний. Нужно снять боль и напряжение — глубоко
              проработаем мышцы классической или комбинированной техникой. Хотите
              мощный детокс — включим медовый массаж. Без спешки, с вниманием
              к каждому участку тела.
            </p>
            <div className="flex flex-wrap gap-10">
              {[
                { n: '8+', l: 'лет практики' },
                { n: '1200+', l: 'довольных клиентов' },
                { n: '100%', l: 'индивидуальный подход' },
              ].map((stat) => (
                <div key={stat.l}>
                  <div className="font-display text-4xl text-primary">{stat.n}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-24 bg-primary/5">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">онлайн-запись</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Выберите услугу и время</h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Оставьте заявку — я свяжусь с вами, чтобы подтвердить запись и ответить на вопросы.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 md:p-10 border border-border/60 shadow-sm">
            <label className="block text-sm font-medium mb-3">Желаемая услуга</label>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {SERVICE_NAMES.map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setSelectedService(name)}
                  className={`text-left rounded-xl border p-4 text-sm transition-colors ${
                    selectedService === name
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium mb-3">Удобное время</label>
            <div className="flex flex-wrap gap-3 mb-8">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-full px-5 py-2.5 border text-sm transition-colors ${
                    time === t
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Input placeholder="Ваше имя" className="h-12 rounded-xl" />
              <Input placeholder="Телефон" type="tel" className="h-12 rounded-xl" />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-full h-12">
              Записаться{time ? ` на ${time}` : ''}
            </Button>
          </form>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Что говорят клиенты</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-2xl p-8 border border-border/60">
                <div className="flex gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6 text-sm leading-relaxed">«{r.text}»</p>
                <div className="font-display text-lg">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 bg-secondary/40">
        <div className="container grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-sm tracking-[0.2em] uppercase text-primary">контакты</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-8">Свяжитесь со мной</h2>
            <p className="text-muted-foreground mb-8">
              Перед первым визитом свяжитесь со мной: обсудим ваш запрос,
              подберём подходящую услугу и удобное время.
            </p>
            <div className="space-y-5">
              {[
                { icon: 'Phone', label: '+7 (993) 338-73-73', href: 'tel:+79933387373' },
                { icon: 'MapPin', label: 'Москва, Пятницкая ул., 62с7', href: null },
                { icon: 'Clock', label: 'Ежедневно · 10:00 — 20:00', href: null },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  {c.href ? (
                    <a href={c.href} className="text-lg hover:text-primary transition-colors">{c.label}</a>
                  ) : (
                    <span className="text-lg">{c.label}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <a
                href="https://t.me/+79933387373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
              >
                <Icon name="Send" size={16} /> Telegram
              </a>
              <a
                href="https://wa.me/79933387373"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors text-sm font-medium"
              >
                <Icon name="MessageCircle" size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="bg-card border border-border rounded-[1rem] min-h-[300px] flex items-center justify-center">
            <Icon name="Map" size={56} className="text-primary/40" />
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-border/60">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display text-xl text-foreground">
            ЕВГЕНИЙ<span className="text-primary">.</span>
          </span>
          <span>© {new Date().getFullYear()} · Профессиональный массаж · Москва</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;