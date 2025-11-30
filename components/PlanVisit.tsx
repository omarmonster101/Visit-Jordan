
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plane, Ticket, HelpCircle, Sun, MapPin, CheckCircle, Calendar, Users, DollarSign, ArrowRight, ArrowLeft, Heart, Mountain, Landmark, Coffee, Camera, Tent, Star } from 'lucide-react';
import { TripRequest, LanguageCode } from '../types';

// --- LOCAL TRANSLATIONS FOR WIZARD ---
const PLAN_LOCALE: Record<LanguageCode, any> = {
  en: {
    headerTitle: "Build Your Dream Journey",
    headerDesc: "Customize every detail of your visit to Jordan. Tell us what you love, and we'll handle the rest.",
    steps: ["Destinations", "Experience", "Logistics", "Details"],
    step1Title: "Where would you like to go?",
    step1Desc: "Select the sites you don't want to miss.",
    step2Title: "What interests you most?",
    step2Desc: "Select your preferred activities and travel style.",
    step3Title: "When are you planning to visit?",
    step3Desc: "Help us understand your timeline and budget.",
    step4Title: "Almost done!",
    step4Desc: "Where should we send your itinerary?",
    actHistory: "History & Culture",
    actNature: "Nature & Hiking",
    actWellness: "Wellness & Spa",
    actFood: "Food & Dining",
    actAdventure: "Camping & Adventure",
    actPhoto: "Photography",
    labelStart: "Start Date (Approx)",
    labelDuration: "Duration (Days)",
    labelAdults: "Adults",
    labelChildren: "Children",
    labelBudget: "Budget Preference",
    budgetEco: "Economy",
    budgetEcoDesc: "Hostels & Public Transport",
    budgetStd: "Standard",
    budgetStdDesc: "Hotels & Private Drivers",
    budgetLux: "Luxury",
    budgetLuxDesc: "5-Star Resorts & VIP Tours",
    labelName: "Full Name",
    labelEmail: "Email Address",
    labelPhone: "Phone Number",
    labelNotes: "Special Requests / Notes",
    btnNext: "Next Step",
    btnBack: "Back",
    btnSubmit: "Submit Request",
    successTitle: "Trip Request Received!",
    successDesc: "Thank you. Our travel experts are reviewing your preferences and will send you a custom itinerary shortly.",
    btnNew: "Plan Another Trip"
  },
  ar: {
    headerTitle: "صمم رحلة أحلامك",
    headerDesc: "خصص كل تفاصيل زيارتك للأردن. أخبرنا بما تحب، وسنتولى الباقي.",
    steps: ["الوجهات", "التجارب", "اللوجستيات", "التفاصيل"],
    step1Title: "إلى أين ترغب بالذهاب؟",
    step1Desc: "اختر المواقع التي لا تريد تفويت زيارتها.",
    step2Title: "ما هي اهتماماتك؟",
    step2Desc: "اختر الأنشطة ونمط السفر المفضل لديك.",
    step3Title: "متى تخطط للزيارة؟",
    step3Desc: "ساعدنا في فهم الجدول الزمني والميزانية.",
    step4Title: "أوشكنا على الانتهاء!",
    step4Desc: "أين يجب أن نرسل لك خطة الرحلة؟",
    actHistory: "التاريخ والثقافة",
    actNature: "الطبيعة والمشي",
    actWellness: "الصحة والاستجمام",
    actFood: "الطعام والطهي",
    actAdventure: "التخييم والمغامرة",
    actPhoto: "التصوير الفوتوغرافي",
    labelStart: "تاريخ البدء (تقريبي)",
    labelDuration: "المدة (أيام)",
    labelAdults: "البالغين",
    labelChildren: "الأطفال",
    labelBudget: "مستوى الميزانية",
    budgetEco: "اقتصادي",
    budgetEcoDesc: "نزل ومواصلات عامة",
    budgetStd: "قياسي",
    budgetStdDesc: "فنادق وسائق خاص",
    budgetLux: "فاخر",
    budgetLuxDesc: "منتجعات 5 نجوم وخدمات VIP",
    labelName: "الاسم الكامل",
    labelEmail: "البريد الإلكتروني",
    labelPhone: "رقم الهاتف",
    labelNotes: "طلبات خاصة / ملاحظات",
    btnNext: "الخطوة التالية",
    btnBack: "رجوع",
    btnSubmit: "إرسال الطلب",
    successTitle: "تم استلام طلبك!",
    successDesc: "شكراً لك. يقوم خبراؤنا بمراجعة تفضيلاتك وسيرسلون لك خطة رحلة مخصصة قريباً.",
    btnNew: "تخطيط رحلة أخرى"
  },
  fr: {
    headerTitle: "Créez votre voyage de rêve",
    headerDesc: "Personnalisez chaque détail de votre visite en Jordanie.",
    steps: ["Destinations", "Expérience", "Logistique", "Détails"],
    step1Title: "Où souhaitez-vous aller ?",
    step1Desc: "Sélectionnez les sites à ne pas manquer.",
    step2Title: "Qu'est-ce qui vous intéresse ?",
    step2Desc: "Choisissez vos activités et votre style de voyage.",
    step3Title: "Quand prévoyez-vous de visiter ?",
    step3Desc: "Aidez-nous à comprendre votre calendrier et votre budget.",
    step4Title: "Presque fini !",
    step4Desc: "Où devons-nous envoyer votre itinéraire ?",
    actHistory: "Histoire et Culture",
    actNature: "Nature et Randonnée",
    actWellness: "Bien-être et Spa",
    actFood: "Gastronomie",
    actAdventure: "Camping et Aventure",
    actPhoto: "Photographie",
    labelStart: "Date de début",
    labelDuration: "Durée (Jours)",
    labelAdults: "Adultes",
    labelChildren: "Enfants",
    labelBudget: "Budget",
    budgetEco: "Économique",
    budgetEcoDesc: "Auberges et transports publics",
    budgetStd: "Standard",
    budgetStdDesc: "Hôtels et chauffeurs privés",
    budgetLux: "Luxe",
    budgetLuxDesc: "Resorts 5 étoiles et VIP",
    labelName: "Nom complet",
    labelEmail: "Email",
    labelPhone: "Téléphone",
    labelNotes: "Demandes spéciales",
    btnNext: "Suivant",
    btnBack: "Retour",
    btnSubmit: "Envoyer",
    successTitle: "Demande reçue !",
    successDesc: "Merci. Nos experts examineront vos préférences et vous enverront un itinéraire.",
    btnNew: "Planifier un autre voyage"
  },
  es: {
    headerTitle: "Construye el viaje de tus sueños",
    headerDesc: "Personaliza cada detalle de tu visita a Jordania.",
    steps: ["Destinos", "Experiencia", "Logística", "Detalles"],
    step1Title: "¿A dónde te gustaría ir?",
    step1Desc: "Selecciona los sitios que no te quieres perder.",
    step2Title: "¿Qué es lo que más te interesa?",
    step2Desc: "Selecciona tus actividades preferidas.",
    step3Title: "¿Cuándo planeas visitar?",
    step3Desc: "Ayúdanos a entender tu cronograma y presupuesto.",
    step4Title: "¡Casi listo!",
    step4Desc: "¿A dónde debemos enviar tu itinerario?",
    actHistory: "Historia y Cultura",
    actNature: "Naturaleza y Senderismo",
    actWellness: "Bienestar y Spa",
    actFood: "Gastronomía",
    actAdventure: "Camping y Aventura",
    actPhoto: "Fotografía",
    labelStart: "Fecha de inicio",
    labelDuration: "Duración (Días)",
    labelAdults: "Adultos",
    labelChildren: "Niños",
    labelBudget: "Presupuesto",
    budgetEco: "Económico",
    budgetEcoDesc: "Hostales y transporte público",
    budgetStd: "Estándar",
    budgetStdDesc: "Hoteles y conductores privados",
    budgetLux: "Lujo",
    budgetLuxDesc: "Resorts 5 estrellas y VIP",
    labelName: "Nombre completo",
    labelEmail: "Correo electrónico",
    labelPhone: "Teléfono",
    labelNotes: "Notas especiales",
    btnNext: "Siguiente",
    btnBack: "Atrás",
    btnSubmit: "Enviar solicitud",
    successTitle: "¡Solicitud recibida!",
    successDesc: "Gracias. Nuestros expertos revisarán tus preferencias.",
    btnNew: "Planear otro viaje"
  },
  de: {
    headerTitle: "Bauen Sie Ihre Traumreise",
    headerDesc: "Passen Sie jedes Detail Ihres Jordanien-Besuchs an.",
    steps: ["Ziele", "Erlebnis", "Logistik", "Details"],
    step1Title: "Wohin möchten Sie reisen?",
    step1Desc: "Wählen Sie die Orte, die Sie nicht verpassen möchten.",
    step2Title: "Was interessiert Sie am meisten?",
    step2Desc: "Wählen Sie Ihre bevorzugten Aktivitäten.",
    step3Title: "Wann planen Sie Ihren Besuch?",
    step3Desc: "Helfen Sie uns, Ihren Zeitplan und Ihr Budget zu verstehen.",
    step4Title: "Fast fertig!",
    step4Desc: "Wohin sollen wir Ihren Reiseplan senden?",
    actHistory: "Geschichte & Kultur",
    actNature: "Natur & Wandern",
    actWellness: "Wellness & Spa",
    actFood: "Essen & Trinken",
    actAdventure: "Camping & Abenteuer",
    actPhoto: "Fotografie",
    labelStart: "Startdatum",
    labelDuration: "Dauer (Tage)",
    labelAdults: "Erwachsene",
    labelChildren: "Kinder",
    labelBudget: "Budget",
    budgetEco: "Economy",
    budgetEcoDesc: "Hostels & ÖPNV",
    budgetStd: "Standard",
    budgetStdDesc: "Hotels & Private Fahrer",
    budgetLux: "Luxus",
    budgetLuxDesc: "5-Sterne-Resorts & VIP",
    labelName: "Vollständiger Name",
    labelEmail: "E-Mail-Adresse",
    labelPhone: "Telefonnummer",
    labelNotes: "Besondere Wünsche",
    btnNext: "Weiter",
    btnBack: "Zurück",
    btnSubmit: "Anfrage senden",
    successTitle: "Anfrage erhalten!",
    successDesc: "Danke. Unsere Experten werden Ihre Wünsche prüfen.",
    btnNew: "Neue Reise planen"
  },
  it: {
    headerTitle: "Costruisci il viaggio dei tuoi sogni",
    headerDesc: "Personalizza ogni dettaglio della tua visita in Giordania.",
    steps: ["Destinazioni", "Esperienza", "Logistica", "Dettagli"],
    step1Title: "Dove vorresti andare?",
    step1Desc: "Seleziona i siti che non vuoi perdere.",
    step2Title: "Cosa ti interessa di più?",
    step2Desc: "Seleziona le tue attività preferite.",
    step3Title: "Quando prevedi di visitare?",
    step3Desc: "Aiutaci a capire le tue tempistiche e il budget.",
    step4Title: "Quasi finito!",
    step4Desc: "Dove dovremmo inviare il tuo itinerario?",
    actHistory: "Storia e Cultura",
    actNature: "Natura ed Escursionismo",
    actWellness: "Benessere e Spa",
    actFood: "Enogastronomia",
    actAdventure: "Campeggio e Avventura",
    actPhoto: "Fotografia",
    labelStart: "Data di inizio",
    labelDuration: "Durata (Giorni)",
    labelAdults: "Adulti",
    labelChildren: "Bambini",
    labelBudget: "Budget",
    budgetEco: "Economico",
    budgetEcoDesc: "Ostelli e trasporti pubblici",
    budgetStd: "Standard",
    budgetStdDesc: "Hotel e autisti privati",
    budgetLux: "Lusso",
    budgetLuxDesc: "Resort 5 stelle e VIP",
    labelName: "Nome completo",
    labelEmail: "Email",
    labelPhone: "Telefono",
    labelNotes: "Richieste speciali",
    btnNext: "Avanti",
    btnBack: "Indietro",
    btnSubmit: "Invia richiesta",
    successTitle: "Richiesta ricevuta!",
    successDesc: "Grazie. I nostri esperti esamineranno le tue preferenze.",
    btnNew: "Pianifica un altro viaggio"
  },
  tr: {
    headerTitle: "Hayalinizdeki Yolculuğu Tasarlayın",
    headerDesc: "Ürdün ziyaretinizin her detayını özelleştirin.",
    steps: ["Yerler", "Deneyim", "Lojistik", "Detaylar"],
    step1Title: "Nereye gitmek istersiniz?",
    step1Desc: "Kaçırmak istemediğiniz yerleri seçin.",
    step2Title: "En çok ne ilginizi çeker?",
    step2Desc: "Tercih ettiğiniz aktiviteleri seçin.",
    step3Title: "Ne zaman ziyaret etmeyi planlıyorsunuz?",
    step3Desc: "Zaman çizelgenizi ve bütçenizi anlamamıza yardımcı olun.",
    step4Title: "Neredeyse bitti!",
    step4Desc: "Seyahat planınızı nereye göndermeliyiz?",
    actHistory: "Tarih ve Kültür",
    actNature: "Doğa ve Yürüyüş",
    actWellness: "Sağlık ve Spa",
    actFood: "Yeme İçme",
    actAdventure: "Kamp ve Macera",
    actPhoto: "Fotoğrafçılık",
    labelStart: "Başlangıç Tarihi",
    labelDuration: "Süre (Gün)",
    labelAdults: "Yetişkinler",
    labelChildren: "Çocuklar",
    labelBudget: "Bütçe",
    budgetEco: "Ekonomik",
    budgetEcoDesc: "Hosteller ve Toplu Taşıma",
    budgetStd: "Standart",
    budgetStdDesc: "Oteller ve Özel Şoförler",
    budgetLux: "Lüks",
    budgetLuxDesc: "5 Yıldızlı Oteller ve VIP",
    labelName: "Ad Soyad",
    labelEmail: "E-posta",
    labelPhone: "Telefon",
    labelNotes: "Özel İstekler",
    btnNext: "İleri",
    btnBack: "Geri",
    btnSubmit: "Gönder",
    successTitle: "İstek Alındı!",
    successDesc: "Teşekkürler. Uzmanlarımız tercihlerinizi inceleyecek.",
    btnNew: "Başka Bir Gezi Planla"
  },
  ru: {
    headerTitle: "Создайте путешествие мечты",
    headerDesc: "Настройте каждую деталь вашего визита в Иорданию.",
    steps: ["Места", "Опыт", "Логистика", "Детали"],
    step1Title: "Куда бы вы хотели поехать?",
    step1Desc: "Выберите места, которые вы не хотите пропустить.",
    step2Title: "Что вас больше всего интересует?",
    step2Desc: "Выберите предпочтительные виды деятельности.",
    step3Title: "Когда вы планируете визит?",
    step3Desc: "Помогите нам понять ваши сроки и бюджет.",
    step4Title: "Почти готово!",
    step4Desc: "Куда нам отправить ваш маршрут?",
    actHistory: "История и Культура",
    actNature: "Природа и Хайкинг",
    actWellness: "Велнес и СПА",
    actFood: "Еда и Напитки",
    actAdventure: "Кемпинг и Приключения",
    actPhoto: "Фотография",
    labelStart: "Дата начала",
    labelDuration: "Длительность (Дней)",
    labelAdults: "Взрослые",
    labelChildren: "Дети",
    labelBudget: "Бюджет",
    budgetEco: "Эконом",
    budgetEcoDesc: "Хостелы и общественный транспорт",
    budgetStd: "Стандарт",
    budgetStdDesc: "Отели и частные водители",
    budgetLux: "Люкс",
    budgetLuxDesc: "5-звездочные курорты и VIP",
    labelName: "Полное имя",
    labelEmail: "Email",
    labelPhone: "Телефон",
    labelNotes: "Особые пожелания",
    btnNext: "Далее",
    btnBack: "Назад",
    btnSubmit: "Отправить",
    successTitle: "Запрос получен!",
    successDesc: "Спасибо. Наши эксперты рассмотрят ваши предпочтения.",
    btnNew: "Спланировать еще поездку"
  },
  zh: {
    headerTitle: "打造您的梦想之旅",
    headerDesc: "定制您访问约旦的每一个细节。",
    steps: ["目的地", "体验", "后勤", "详情"],
    step1Title: "您想去哪里？",
    step1Desc: "选择您不想错过的景点。",
    step2Title: "您最感兴趣的是什么？",
    step2Desc: "选择您喜欢的活动和旅行方式。",
    step3Title: "您计划什么时候访问？",
    step3Desc: "帮助我们了解您的时间表和预算。",
    step4Title: "快完成了！",
    step4Desc: "我们应该把行程发送到哪里？",
    actHistory: "历史与文化",
    actNature: "自然与徒步",
    actWellness: "健康与水疗",
    actFood: "美食与餐饮",
    actAdventure: "露营与冒险",
    actPhoto: "摄影",
    labelStart: "开始日期",
    labelDuration: "持续时间（天）",
    labelAdults: "成人",
    labelChildren: "儿童",
    labelBudget: "预算",
    budgetEco: "经济型",
    budgetEcoDesc: "旅舍和公共交通",
    budgetStd: "标准型",
    budgetStdDesc: "酒店和私人司机",
    budgetLux: "豪华型",
    budgetLuxDesc: "五星级度假村和VIP",
    labelName: "全名",
    labelEmail: "电子邮件",
    labelPhone: "电话号码",
    labelNotes: "特殊要求",
    btnNext: "下一步",
    btnBack: "返回",
    btnSubmit: "提交请求",
    successTitle: "收到请求！",
    successDesc: "谢谢。我们的专家将审核您的偏好。",
    btnNew: "计划另一次旅行"
  },
  ja: {
    headerTitle: "夢の旅を作ろう",
    headerDesc: "ヨルダン訪問の細部までカスタマイズしましょう。",
    steps: ["目的地", "体験", "ロジスティクス", "詳細"],
    step1Title: "どこに行きたいですか？",
    step1Desc: "見逃したくない場所を選択してください。",
    step2Title: "何に最も興味がありますか？",
    step2Desc: "好みの活動と旅行スタイルを選択してください。",
    step3Title: "いつ訪問する予定ですか？",
    step3Desc: "スケジュールと予算を教えてください。",
    step4Title: "ほぼ完了！",
    step4Desc: "旅程をどこに送ればよいですか？",
    actHistory: "歴史と文化",
    actNature: "自然とハイキング",
    actWellness: "ウェルネスとスパ",
    actFood: "食事とダイニング",
    actAdventure: "キャンプと冒険",
    actPhoto: "写真",
    labelStart: "開始日",
    labelDuration: "期間（日）",
    labelAdults: "大人",
    labelChildren: "子供",
    labelBudget: "予算",
    budgetEco: "エコノミー",
    budgetEcoDesc: "ホステルと公共交通機関",
    budgetStd: "標準",
    budgetStdDesc: "ホテルと専用ドライバー",
    budgetLux: "ラグジュアリー",
    budgetLuxDesc: "5つ星リゾートとVIP",
    labelName: "氏名",
    labelEmail: "メールアドレス",
    labelPhone: "電話番号",
    labelNotes: "特別なリクエスト",
    btnNext: "次へ",
    btnBack: "戻る",
    btnSubmit: "リクエスト送信",
    successTitle: "リクエストを受け付けました！",
    successDesc: "ありがとうございます。専門家があなたの好みを検討します。",
    btnNew: "別の旅行を計画する"
  }
};

const ACTIVITIES = [
    { id: 'history', icon: Landmark, labelKey: 'actHistory' },
    { id: 'nature', icon: Mountain, labelKey: 'actNature' },
    { id: 'wellness', icon: Sun, labelKey: 'actWellness' },
    { id: 'food', icon: Coffee, labelKey: 'actFood' },
    { id: 'adventure', icon: Tent, labelKey: 'actAdventure' },
    { id: 'photography', icon: Camera, labelKey: 'actPhoto' }
];

const BUDGET_OPTIONS = [
    { id: 'economy', labelKey: 'budgetEco', descKey: 'budgetEcoDesc' },
    { id: 'standard', labelKey: 'budgetStd', descKey: 'budgetStdDesc' },
    { id: 'luxury', labelKey: 'budgetLux', descKey: 'budgetLuxDesc' }
];

export const PlanVisit: React.FC = () => {
  const { state, addTripRequest, isRtl } = useAppContext();
  const { theme, sites, language } = state;
  const [step, setStep] = useState(1);
  
  // Get Current Locale Strings
  const pt = PLAN_LOCALE[language] || PLAN_LOCALE['en'];

  // Filter: Show only Main Regions/Cities for the planner, not sub-sites
  const plannerSites = sites.filter(site => site.isRegion);
  
  const [formData, setFormData] = useState<{
    selectedSites: string[];
    interests: string[];
    date: string;
    duration: number;
    adults: number;
    children: number;
    budget: 'economy' | 'standard' | 'luxury';
    name: string;
    email: string;
    phone: string;
    notes: string;
  }>({
    selectedSites: [],
    interests: [],
    date: '',
    duration: 5,
    adults: 2,
    children: 0,
    budget: 'standard',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const toggleSite = (id: string) => {
     setFormData(prev => ({
        ...prev,
        selectedSites: prev.selectedSites.includes(id) 
           ? prev.selectedSites.filter(s => s !== id) 
           : [...prev.selectedSites, id]
     }));
  };

  const toggleInterest = (id: string) => {
     setFormData(prev => ({
        ...prev,
        interests: prev.interests.includes(id) 
           ? prev.interests.filter(i => i !== id) 
           : [...prev.interests, id]
     }));
  };

  const handleSubmit = () => {
     const request: TripRequest = {
        id: 'trip-' + Date.now(),
        status: 'new',
        dateSubmitted: new Date().toISOString(),
        startDate: formData.date,
        duration: formData.duration,
        travelers: { adults: formData.adults, children: formData.children },
        budget: formData.budget,
        selectedSiteIds: formData.selectedSites,
        interests: formData.interests,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes
     };
     addTripRequest(request);
     setSubmitted(true);
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (submitted) {
     return (
        <div className="min-h-screen bg-white flex items-center justify-center pt-20">
           <div className="text-center p-8 max-w-lg">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle size={48} className="text-green-600" />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-4">{pt.successTitle}</h2>
              <p className="text-gray-500 text-lg mb-8">
                 {pt.successDesc}
              </p>
              <button 
                onClick={() => { setSubmitted(false); setStep(1); setFormData({...formData, selectedSites: []}); }}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold"
              >
                 {pt.btnNew}
              </button>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-12">
         <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{pt.headerTitle}</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{pt.headerDesc}</p>
         </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-16 z-30">
         <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-2 md:gap-4">
               {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-2">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === i ? 'bg-yellow-500 text-black' : step > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {step > i ? <CheckCircle size={16} /> : i}
                     </div>
                     <span className={`hidden md:block text-sm font-bold ${step === i ? 'text-gray-900' : 'text-gray-400'}`}>
                        {pt.steps[i-1]}
                     </span>
                     {i < 4 && <div className="w-8 h-0.5 bg-gray-200 mx-2 hidden md:block"></div>}
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
         
         {/* STEP 1: DESTINATIONS */}
         {step === 1 && (
            <div className="animate-fade-in space-y-8">
               <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{pt.step1Title}</h2>
                  <p className="text-gray-500">{pt.step1Desc}</p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {plannerSites.map(site => {
                     // Get Localized Name
                     const locName = site.translations?.[language]?.name || site.name;
                     return (
                        <div 
                        key={site.id}
                        onClick={() => toggleSite(site.id)}
                        className={`relative rounded-xl overflow-hidden cursor-pointer transition-all border-2 group ${formData.selectedSites.includes(site.id) ? 'border-blue-600 ring-2 ring-blue-200' : 'border-transparent hover:shadow-lg'}`}
                        >
                           <div className="aspect-square bg-gray-200">
                              <img src={site.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           </div>
                           <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${formData.selectedSites.includes(site.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                              {formData.selectedSites.includes(site.id) && <CheckCircle className="text-white w-12 h-12" />}
                           </div>
                           <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                              <p className="font-bold text-sm">{locName}</p>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}

         {/* STEP 2: INTERESTS */}
         {step === 2 && (
            <div className="animate-fade-in space-y-8">
               <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{pt.step2Title}</h2>
                  <p className="text-gray-500">{pt.step2Desc}</p>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {ACTIVITIES.map(act => (
                     <div 
                       key={act.id}
                       onClick={() => toggleInterest(act.id)}
                       className={`p-6 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${formData.interests.includes(act.id) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                     >
                        <act.icon size={32} />
                        <span className="font-bold">{pt[act.labelKey]}</span>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {/* STEP 3: LOGISTICS */}
         {step === 3 && (
            <div className="animate-fade-in space-y-8 max-w-2xl mx-auto">
               <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{pt.step3Title}</h2>
                  <p className="text-gray-500">{pt.step3Desc}</p>
               </div>

               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelStart}</label>
                        <input type="date" className="w-full p-3 border rounded-lg outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelDuration}</label>
                        <div className="flex items-center gap-3">
                           <input type="range" min="1" max="30" className="flex-1" value={formData.duration} onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})} />
                           <span className="font-bold w-12 text-center">{formData.duration}</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelAdults}</label>
                        <input type="number" min="1" className="w-full p-3 border rounded-lg outline-none" value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value)})} />
                     </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelChildren}</label>
                        <input type="number" min="0" className="w-full p-3 border rounded-lg outline-none" value={formData.children} onChange={e => setFormData({...formData, children: parseInt(e.target.value)})} />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelBudget}</label>
                     <div className="grid grid-cols-3 gap-3">
                        {BUDGET_OPTIONS.map(b => (
                           <button 
                             key={b.id}
                             onClick={() => setFormData({...formData, budget: b.id as any})}
                             className={`p-3 rounded-lg border text-left transition-all ${formData.budget === b.id ? 'border-yellow-500 bg-yellow-50 ring-1 ring-yellow-500' : 'border-gray-200 hover:bg-gray-50'}`}
                           >
                              <div className="font-bold text-sm">{pt[b.labelKey]}</div>
                              <div className="text-xs text-gray-500">{pt[b.descKey]}</div>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* STEP 4: CONTACT */}
         {step === 4 && (
             <div className="animate-fade-in space-y-8 max-w-2xl mx-auto">
               <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{pt.step4Title}</h2>
                  <p className="text-gray-500">{pt.step4Desc}</p>
               </div>

               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelName}</label>
                     <input type="text" className="w-full p-3 border rounded-lg outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelEmail}</label>
                     <input type="email" className="w-full p-3 border rounded-lg outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="email@example.com" />
                  </div>
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelPhone}</label>
                     <input type="tel" className="w-full p-3 border rounded-lg outline-none" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 234 567 890" />
                  </div>
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{pt.labelNotes}</label>
                     <textarea rows={3} className="w-full p-3 border rounded-lg outline-none" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="" />
                  </div>
               </div>
            </div>
         )}

         {/* Navigation Buttons */}
         <div className="flex justify-between items-center max-w-5xl mx-auto mt-12 pt-8 border-t">
            {step > 1 ? (
               <button onClick={prevStep} className="flex items-center gap-2 text-gray-600 font-bold hover:text-gray-900">
                  {isRtl ? <ArrowRight size={20}/> : <ArrowLeft size={20}/>} {pt.btnBack}
               </button>
            ) : <div></div>}

            {step < 4 ? (
               <button onClick={nextStep} className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-black transition-colors">
                  {pt.btnNext} {isRtl ? <ArrowLeft size={20}/> : <ArrowRight size={20}/>}
               </button>
            ) : (
               <button onClick={handleSubmit} disabled={!formData.name || !formData.email} className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {pt.btnSubmit}
               </button>
            )}
         </div>

      </div>
    </div>
  );
};
