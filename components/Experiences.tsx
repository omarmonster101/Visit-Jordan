
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

export const Experiences: React.FC = () => {
  const { state, t, isRtl } = useAppContext();
  
  const experiences = [
    {
        id: 1,
        title: state.language === 'ar' ? 'البتراء والبتراء ليلاً' : 'Petra & Petra by Night',
        desc: state.language === 'ar' 
            ? 'لا تكتمل الزيارة دون المشي في "السيق" وصولاً إلى "الخزنة". النشاط المميز جداً هو "البتراء ليلاً"، حيث تضاء المدينة بآلاف الشموع مع عزف موسيقى بدوية، مما يخلق جواً ساحراً للتصوير.'
            : 'No visit is complete without walking the Siq to the Treasury. The "Petra by Night" experience lights up the ancient city with thousands of candles and Bedouin music, creating a magical atmosphere.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Petra_Jordan_Treasury_at_night.jpg/800px-Petra_Jordan_Treasury_at_night.jpg',
        location: 'Petra'
    },
    {
        id: 2,
        title: state.language === 'ar' ? 'سفاري وادي رم والمنطاد' : 'Wadi Rum Jeep & Hot Air Balloon',
        desc: state.language === 'ar'
            ? 'جولات سيارات "الجيب" لاستكشاف الصحراء الحمراء ومشهد الغروب. التجربة الأكثر فخامة هي ركوب المنطاد (Hot Air Balloon) عند الشروق لرؤية التشكيلات الصخرية من الأعلى.'
            : 'Explore the red desert and sunsets on a 4x4 Jeep tour. For a luxurious experience, take a hot air balloon ride at sunrise to see the rock formations from above.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Wadi_Rum_Hot_Air_Balloon.jpg/800px-Wadi_Rum_Hot_Air_Balloon.jpg',
        location: 'Wadi Rum'
    },
    {
        id: 3,
        title: state.language === 'ar' ? 'تجربة الطفو في البحر الميت' : 'Floating in the Dead Sea',
        desc: state.language === 'ar'
            ? 'النشاط الكلاسيكي الذي لا يفوت هو تجربة انعدام الوزن والطفو على سطح المياه المالحة، بالإضافة إلى تغطية الجسم بالطين العلاجي الغني بالمعادن.'
            : 'A classic unmissable activity: weightless floating on saline waters and covering your body in mineral-rich therapeutic mud at the lowest point on Earth.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Dead_Sea_by_David_Shankbone.jpg/800px-Dead_Sea_by_David_Shankbone.jpg',
        location: 'Dead Sea'
    },
    {
        id: 4,
        title: state.language === 'ar' ? 'مغامرة وادي الموجب' : 'Canyoning in Wadi Mujib',
        desc: state.language === 'ar'
            ? 'المغامرة رقم 1 للشباب ومحبي الإثارة. تتضمن المشي عكس تيار الماء في ممر "السيق" الضيق بين الجبال الشاهقة وتسلق الشلالات الصغيرة.'
            : 'The #1 adventure for thrill-seekers. Hike upstream through the narrow "Siq" canyon between towering cliffs and climb small waterfalls.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Wadi_Mujib_Siq_Trail.jpg/800px-Wadi_Mujib_Siq_Trail.jpg',
        location: 'Wadi Mujib'
    },
    {
        id: 5,
        title: state.language === 'ar' ? 'الغوص في العقبة' : 'Diving & Snorkeling in Aqaba',
        desc: state.language === 'ar'
            ? 'وجهة عالمية للغوص بفضل حيدها المرجاني ومواقع مثل "الدبابة الغارقة" و"المتحف العسكري تحت الماء" الذي يجذب الغواصين المحترفين والمصورين.'
            : 'A world-class diving destination featuring coral reefs, the sunken tank, and the underwater military museum attracting professional divers and photographers.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Aqaba_Coral_Reef.jpg/800px-Aqaba_Coral_Reef.jpg',
        location: 'Aqaba'
    },
    {
        id: 6,
        title: state.language === 'ar' ? 'مطبخ البتراء التقليدي' : 'Petra Kitchen Cooking Class',
        desc: state.language === 'ar'
            ? 'نشاط ثقافي ممتع في وادي موسى، حيث يشارك الزوار في طبخ وجبة عشاء أردنية كاملة (مثل المقلوبة) مع طهاة محليين، ثم يتناولون ما طبخوه.'
            : 'A fun cultural activity in Wadi Musa. Cook a full traditional Jordanian dinner (like Maqluba) alongside local chefs, then enjoy the meal you prepared.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mansaf.jpg/800px-Mansaf.jpg',
        location: 'Petra'
    },
    {
        id: 7,
        title: state.language === 'ar' ? 'مسار الأردن (ضانا للبتراء)' : 'Jordan Trail (Dana to Petra)',
        desc: state.language === 'ar'
            ? 'للمحترفين ومحبي المشي الطويل، يعتبر المقطع الممتد من "محمية ضانا" إلى "البتراء" واحداً من أجمل مسارات المشي في العالم حسب تصنيف ناشيونال جيوغرافيك.'
            : 'For hikers and pros, the trek from Dana Biosphere Reserve to Petra is rated as one of the world\'s best hikes by National Geographic.',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Dana_Biosphere_Reserve_Landscape.jpg/800px-Dana_Biosphere_Reserve_Landscape.jpg',
        location: 'Dana'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-slate-900 text-white py-24 text-center px-4 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-90"></div>
         {/* Background Image for Header */}
         <img src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover -z-10" />
         
         <div className="relative z-10 container mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">{t.experiences}</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {state.language === 'ar' 
                    ? 'اكتشف الجوهر الحقيقي للأردن من خلال هذه التجارب المختارة بعناية، والتي تمزج بين المغامرة والثقافة والاسترخاء.' 
                    : 'Discover the true essence of Jordan through these hand-picked experiences blending adventure, culture, and relaxation.'}
            </p>
         </div>
      </div>

      <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 gap-12">
              {experiences.map((exp, index) => (
                  <div key={exp.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center group`}>
                      
                      {/* Image Side */}
                      <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-xl relative h-[400px]">
                          <img 
                            src={exp.img} 
                            alt={exp.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            loading="lazy"
                          />
                          <div className="absolute top-4 left-4 bg-yellow-500 text-black font-bold px-4 py-1 rounded-full text-sm flex items-center gap-1">
                             <MapPin size={14} /> {exp.location}
                          </div>
                      </div>

                      {/* Content Side */}
                      <div className="w-full lg:w-1/2 space-y-4">
                          <h2 className="text-3xl font-serif font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                              {exp.title}
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed">
                              {exp.desc}
                          </p>
                          <button className="flex items-center gap-2 text-yellow-600 font-bold hover:gap-3 transition-all uppercase tracking-widest text-sm mt-4">
                             {state.language === 'ar' ? 'اعرف المزيد' : 'Learn More'} 
                             {isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                          </button>
                      </div>

                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
