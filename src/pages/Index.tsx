import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/27dbd435-5956-42d1-ae6e-3adbaec2e040/files/1c509776-56db-4a08-8cd7-88527d45d208.jpg';

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
    name: 'Классический массаж',
    desc: 'Расслабление мышц, снятие напряжения и общий тонус тела.',
    duration: '60 мин',
    price: '3 500 ₽',
  },
  {
    icon: 'Flower2',
    name: 'Релакс-массаж',
    desc: 'Мягкие техники с ароматическими маслами для глубокого покоя.',
    duration: '90 мин',
    price: '4 800 ₽',
  },
  {
    icon: 'Mountain',
    name: 'Глубокотканный',
    desc: 'Проработка глубоких слоёв мышц, для активных и спортивных людей.',
    duration: '75 мин',
    price: '4 500 ₽',
  },
  {
    icon: 'Sparkles',
    name: 'Антистресс-сеанс',
    desc: 'Спина, шея, голова — точечное снятие стресса за один визит.',
    duration: '45 мин',
    price: '2 900 ₽',
  },
];

const REVIEWS = [
  {
    name: 'Анна',
    text: 'Никогда не чувствовала себя настолько отдохнувшей. Тёплая атмосфера и невероятно бережные руки.',
  },
  {
    name: 'Дмитрий',
    text: 'После сидячей работы спина была как камень. Уже после первого сеанса забыл о боли. Рекомендую!',
  },
  {
    name: 'Мария',
    text: 'Это не просто массаж — это маленькое путешествие в тишину. Возвращаюсь каждую неделю.',
  },
];

const TIMES = ['10:00', '11:30', '13:00', '15:00', '16:30', '18:00'];

const Index = () => {
  const { toast } = useToast();
  const [service, setService] = useState(SERVICES[0].name);
  const [time, setTime] = useState('');

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена',
      description: 'Это демо-версия. Скоро вернёмся к вам с подтверждением.',
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('home')}
            className="font-display text-2xl tracking-tight text-primary"
          >
            tishina<span className="text-accent-foreground">.</span>
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
          <Button
            onClick={() => scrollTo('booking')}
            className="rounded-full px-6"
          >
            Записаться
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <div className="container grid md:grid-cols-2 gap-12 items-center py-20">
          <div className="animate-fade-up">
            <span className="inline-block text-sm tracking-[0.2em] uppercase text-primary mb-6">
              частная практика массажа
            </span>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-6">
              Пространство тишины и&nbsp;восстановления
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-10">
              Бережный массаж, который возвращает телу лёгкость, а мыслям —
              ясность. Запишитесь на удобное время онлайн.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollTo('booking')}
                className="rounded-full px-8 h-12"
              >
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
          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-accent/40 blur-2xl" />
              <img
                src={HERO_IMG}
                alt="Спокойная атмосфера массажного кабинета"
                className="relative rounded-[2rem] w-full aspect-square object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-secondary/40">
        <div className="container">
          <div className="max-w-xl mb-16">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">
              услуги
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">
              Что я предлагаю
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="hover-lift bg-card rounded-2xl p-8 border border-border/60"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name={s.icon} className="text-primary" size={22} />
                </div>
                <h3 className="font-display text-2xl mb-2">{s.name}</h3>
                <p className="text-muted-foreground mb-6">{s.desc}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Icon name="Clock" size={16} /> {s.duration}
                  </span>
                  <span className="font-medium text-foreground text-lg">
                    {s.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24">
        <div className="container grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2">
            <div className="aspect-[4/5] rounded-[2rem] bg-accent/40 flex items-center justify-center">
              <Icon name="HandHeart" size={64} className="text-primary/50" />
            </div>
          </div>
          <div className="md:col-span-3">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">
              обо мне
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-6">
              Забота, в которую веришь
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Меня зовут Елена. Более 8 лет я помогаю людям возвращать телу
              комфорт, а себе — внутренний баланс. Каждый сеанс я выстраиваю
              индивидуально, прислушиваясь к вашим ощущениям.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Я верю, что массаж — это диалог между руками и телом, где главное
              доверие и тишина.
            </p>
            <div className="flex gap-10">
              {[
                { n: '8+', l: 'лет практики' },
                { n: '1200+', l: 'довольных клиентов' },
                { n: '100%', l: 'индивидуальный подход' },
              ].map((stat) => (
                <div key={stat.l}>
                  <div className="font-display text-4xl text-primary">
                    {stat.n}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.l}
                  </div>
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
            <span className="text-sm tracking-[0.2em] uppercase text-primary">
              онлайн-запись
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">
              Выберите услугу и время
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/60 shadow-sm"
          >
            <label className="block text-sm font-medium mb-3">Услуга</label>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {SERVICES.map((s) => (
                <button
                  type="button"
                  key={s.name}
                  onClick={() => setService(s.name)}
                  className={`text-left rounded-xl border p-4 transition-colors ${
                    service === s.name
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {s.duration} · {s.price}
                  </div>
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium mb-3">
              Удобное время
            </label>
            <div className="flex flex-wrap gap-3 mb-8">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-full px-5 py-2.5 border text-sm transition-colors ${
                    time === t
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/40'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <Input placeholder="Ваше имя" className="h-12 rounded-xl" />
              <Input
                placeholder="Телефон"
                type="tel"
                className="h-12 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full h-12"
            >
              Записаться{time && ` на ${time}`}
            </Button>
          </form>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-24">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-sm tracking-[0.2em] uppercase text-primary">
              отзывы
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">
              Что говорят клиенты
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-card rounded-2xl p-8 border border-border/60"
              >
                <div className="flex gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-6">“{r.text}”</p>
                <div className="font-display text-xl">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-24 bg-secondary/40">
        <div className="container grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-sm tracking-[0.2em] uppercase text-primary">
              контакты
            </span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-8">
              Свяжитесь со мной
            </h2>
            <div className="space-y-5">
              {[
                { icon: 'Phone', label: '+7 (900) 123-45-67' },
                { icon: 'Mail', label: 'hello@tishina-massage.ru' },
                { icon: 'MapPin', label: 'Москва, ул. Тихая, 12' },
                { icon: 'Clock', label: 'Ежедневно · 10:00 — 20:00' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <span className="text-lg">{c.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              {['Send', 'MessageCircle', 'Instagram'].map((i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name={i} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="bg-accent/30 rounded-[2rem] min-h-[300px] flex items-center justify-center">
            <Icon name="Map" size={56} className="text-primary/40" />
          </div>
        </div>
      </section>

      <footer className="py-10 border-t border-border/60">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display text-xl text-primary">tishina.</span>
          <span>© {new Date().getFullYear()} · Частная практика массажа</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
