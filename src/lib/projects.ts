export type ProjectTone = "blue" | "pink" | "white";

export type Project = {
  slug: string;
  tag: string;
  subtag: string;
  tone: ProjectTone;
  title: string;
  problem: string;
  solution: string;
  role: string;
  team: string;
  year: string;
  duration: string;
  context: string;
  approach: string[];
  outcomes: { label: string; value: string }[];
  screens: { title: string; caption: string }[];
  components: { label: string; note: string }[];
};

export const projects: Project[] = [
  {
    slug: "homepage-redesign",
    tag: "Redesign",
    subtag: "Product Design",
    tone: "blue",
    title: "Редизайн главной страницы",
    problem:
      "Главная перегружена: пользователи не находят ключевое действие за первые 10 секунд.",
    solution:
      "Переосмыслила иерархию, вынесла один основной сценарий и убрала визуальный шум.",
    role: "Product Designer",
    team: "PM, 2 разработчика, аналитик",
    year: "2024",
    duration: "6 недель",
    context:
      "После нескольких итераций главная страница превратилась в набор баннеров и промо-блоков. Метрики показывали высокий bounce rate и низкую конверсию в основное действие.",
    approach: [
      "Собрала интервью с продактами и поддержкой, чтобы понять, зачем добавлялся каждый блок.",
      "Провела аналитику скроллинга и кликов: 70% пользователей не доходили до третьего экрана.",
      "Сформулировала один главный сценарий и три вспомогательных, остальное — вынесла глубже.",
      "Собрала прототип, протестировала на 8 респондентах, доработала перед разработкой.",
    ],
    outcomes: [
      { label: "Конверсия в основное действие", value: "+38%" },
      { label: "Bounce rate", value: "−22%" },
      { label: "Time to first action", value: "−41%" },
    ],
    screens: [
      { title: "Hero", caption: "Один фокус, один CTA" },
      { title: "Value", caption: "Три причины остаться" },
      { title: "Proof", caption: "Кейсы и цифры" },
    ],
    components: [
      { label: "Primary CTA", note: "Единственная точка входа в сценарий" },
      { label: "Feature card", note: "Компактный блок ценности" },
      { label: "Metric badge", note: "Цифры вместо длинных описаний" },
    ],
  },
  {
    slug: "design-system",
    tag: "Design System",
    subtag: "Foundation",
    tone: "pink",
    title: "UI Kit и основы дизайн-системы",
    problem:
      "Каждая команда рисовала свои компоненты — консистентность и скорость страдали.",
    solution:
      "Собрала базовый UI Kit с токенами и правилами, ускорив запуск фич в 2 раза.",
    role: "Product Designer, Design Lead",
    team: "3 дизайнера, 4 фронтенд-инженера",
    year: "2023",
    duration: "4 месяца",
    context:
      "В продукте параллельно работали три команды, каждая переизобретала кнопки, поля и модалки. Разработчики жаловались на бесконечные ревью и разные отступы.",
    approach: [
      "Провела аудит: собрала все существующие компоненты и посчитала дубли.",
      "Определила токены — цвет, типографика, отступы, радиусы, тени.",
      "Собрала базовый набор компонентов и правила их использования.",
      "Внедрила через воркшопы и парные ревью с командами.",
    ],
    outcomes: [
      { label: "Скорость сборки макета", value: "×2" },
      { label: "Компонентных дублей", value: "−85%" },
      { label: "Скорость релиза UI-фич", value: "×1.7" },
    ],
    screens: [
      { title: "Tokens", caption: "Основа системы" },
      { title: "Components", caption: "Базовый набор" },
      { title: "Guidelines", caption: "Правила использования" },
    ],
    components: [
      { label: "Color tokens", note: "Семантические переменные" },
      { label: "Button", note: "5 вариантов, 3 размера" },
      { label: "Input field", note: "Единое поведение и состояния" },
    ],
  },
  {
    slug: "multi-number",
    tag: "Feature Launch",
    subtag: "UX Flow",
    tone: "white",
    title: "Поддержка нескольких номеров",
    problem:
      "Пользователи хотели держать несколько номеров в одном аккаунте без хаоса.",
    solution:
      "Спроектировала логику переключения без потери контекста и с прозрачным биллингом.",
    role: "Product Designer",
    team: "PM, 3 разработчика, QA",
    year: "2024",
    duration: "8 недель",
    context:
      "Аккаунт был жёстко привязан к одному номеру. Пользователи заводили несколько аккаунтов, путались в оплате и теряли историю.",
    approach: [
      "Собрала JTBD-интервью с активными пользователями с 2+ аккаунтов.",
      "Спроектировала архитектуру: аккаунт → номера → сценарии.",
      "Продумала переключение так, чтобы контекст не терялся при смене номера.",
      "Согласовала биллинг: один счёт, прозрачная разбивка по номерам.",
    ],
    outcomes: [
      { label: "Добавили второй номер", value: "27% активных" },
      { label: "Обращения в поддержку", value: "−34%" },
      { label: "Retention D30", value: "+11%" },
    ],
    screens: [
      { title: "Switcher", caption: "Быстрое переключение" },
      { title: "Manage", caption: "Управление номерами" },
      { title: "Billing", caption: "Прозрачный счёт" },
    ],
    components: [
      { label: "Account switcher", note: "Всегда на виду в шапке" },
      { label: "Number card", note: "Статус, тариф, баланс" },
      { label: "Billing breakdown", note: "Разбивка по номерам" },
    ],
  },
  {
    slug: "payments-flow",
    tag: "Scenario",
    subtag: "Payments",
    tone: "blue",
    title: "Переработка сценария пополнения",
    problem:
      "Отвал на шаге оплаты: 3 из 10 пользователей не доходили до успешного платежа.",
    solution:
      "Сократила сценарий до двух шагов, добавила понятные ошибки и подстановку сумм.",
    role: "Product Designer",
    team: "PM, 2 разработчика, аналитик",
    year: "2023",
    duration: "5 недель",
    context:
      "Сценарий пополнения был растянут на 5 шагов с непонятными ошибками. Пользователи бросали процесс, а поддержка получала одинаковые жалобы.",
    approach: [
      "Собрала воронку по шагам и определила два основных места отвала.",
      "Переработала сценарий: сумма и способ оплаты — на одном экране.",
      "Проработала все типы ошибок и подсказки к ним.",
      "Добавила подстановку частых сумм и запомненных карт.",
    ],
    outcomes: [
      { label: "Успешные платежи", value: "+29%" },
      { label: "Обращения по оплате", value: "−46%" },
      { label: "Время до оплаты", value: "−52%" },
    ],
    screens: [
      { title: "Amount", caption: "Сумма и способ" },
      { title: "Confirm", caption: "Подтверждение" },
      { title: "Success", caption: "Понятный результат" },
    ],
    components: [
      { label: "Amount input", note: "С быстрыми пресетами" },
      { label: "Payment method", note: "Сохранённые карты" },
      { label: "Error state", note: "Что произошло и что делать" },
    ],
  },
  {
    slug: "banking-app",
    tag: "Banking",
    subtag: "Release",
    tone: "pink",
    title: "Обновлённое банковское приложение",
    problem:
      "Нужно выпустить новую версию приложения, сохранив привычки текущих клиентов.",
    solution:
      "Вела продуктовую часть релиза: требования, сценарии, синк с разработкой, поддержка запуска.",
    role: "Product Manager",
    team: "PM, 2 дизайнера, 6 инженеров, аналитик",
    year: "2024",
    duration: "5 месяцев",
    context:
      "Приложение устарело технически и визуально, но клиенты привыкли к его логике. Нужно было обновить, не сломав привычные сценарии.",
    approach: [
      "Собрала карту сценариев и приоритизировала по частоте использования.",
      "Согласовала перенос ключевых паттернов из старой версии в новую.",
      "Вела бэклог, синхронизировала дизайн и разработку, снимала блокеры.",
      "Спланировала поэтапный релиз с обратной связью от пользователей.",
    ],
    outcomes: [
      { label: "NPS после релиза", value: "+18" },
      { label: "Крашей", value: "−72%" },
      { label: "DAU через 2 месяца", value: "+14%" },
    ],
    screens: [
      { title: "Home", caption: "Быстрый доступ к главному" },
      { title: "Transfer", caption: "Привычный сценарий" },
      { title: "Card", caption: "Управление картой" },
    ],
    components: [
      { label: "Balance card", note: "Основной экран" },
      { label: "Action row", note: "Быстрые действия" },
      { label: "Transaction item", note: "История операций" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
