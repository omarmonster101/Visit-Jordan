
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SiteCard } from './SiteCard';

export const Discover: React.FC = () => {
  const { state, t } = useAppContext();
  const { theme, sites } = state;

  // Filter to show only "Regions" (Main Sites) in Discover
  const mainRegions = sites.filter(site => site.isRegion);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header Section */}
      <div className="relative h-[60vh] overflow-hidden bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1549141098-b2a8d46db684?q=80&w=2000&auto=format&fit=crop" 
          alt="Wadi Rum" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">{t.explore}</h1>
          <p className="text-xl md:text-2xl max-w-3xl font-light">{t.discoverDesc}</p>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">{t.discoverTitle}</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            {state.language === 'ar' 
              ? 'الأردن بلد غني بالتاريخ والثقافة والطبيعة الخلابة. من آثار الحضارات القديمة في الشمال إلى صحراء وادي رم الساحرة في الجنوب، ومن أخفض نقطة على وجه الأرض في البحر الميت إلى قمم جبال الشراة. الأردن يقدم مزيجاً فريداً من المغامرة والراحة.'
              : 'Jordan is a land rich in history, culture, and breathtaking nature. From the ruins of ancient civilizations in the north to the enchanting desert of Wadi Rum in the south, and from the lowest point on Earth at the Dead Sea to the peaks of the Sharah Mountains. Jordan offers a unique blend of adventure and relaxation.'}
          </p>
        </div>
      </section>

      {/* ALL DESTINATIONS GRID (Regions Only) */}
      <section className="py-20 bg-gray-50 border-t border-gray-100" id="all-sites">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <span className="text-yellow-600 font-bold uppercase tracking-widest mb-2 block">
                  {state.language === 'ar' ? 'وجهاتنا' : 'Destinations'}
               </span>
               <h2 className="text-4xl font-serif font-bold text-gray-900">
                  {state.language === 'ar' ? 'جميع المدن والمناطق' : 'All Regions & Cities'}
               </h2>
               <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${theme.layoutMode === 'compact' ? 'gap-4' : 'gap-8'}`}>
              {mainRegions.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
        </div>
      </section>

      {/* Diversity Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-serif font-bold mb-4">{t.natureTitle}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                       {state.language === 'ar'
                        ? 'تتمتع الأردن بتنوع بيئي مذهل. تمتع بالمشي في غابات عجلون الكثيفة، أو استكشف الوديان العميقة مثل وادي الموجب، الملقب بجراند كانيون الأردن.'
                        : 'Jordan boasts stunning ecological diversity. Enjoy hiking in the dense forests of Ajloun, or explore deep canyons like Wadi Mujib, known as the Grand Canyon of Jordan.'}
                    </p>
                    <button className="text-yellow-600 font-bold hover:underline">{t.readMore}</button>
                </div>
                <div className="order-1 md:order-2 h-96 overflow-hidden rounded-2xl shadow-xl">
                    <img src="https://images.unsplash.com/photo-1465311440653-ba9bf47debd3?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Nature" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="h-96 overflow-hidden rounded-2xl shadow-xl">
                    <img src="https://images.unsplash.com/photo-1546706900-50b282928120?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Culture" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold mb-4">{t.cultureTitle}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                       {state.language === 'ar'
                        ? 'الضيافة جزء لا يتجزأ من الثقافة الأردنية. استمتع بالقهوة العربية التقليدية وتعرف على حياة البدو في الصحراء، واكتشف الفنون والحرف اليدوية المحلية.'
                        : 'Hospitality is an integral part of Jordanian culture. Enjoy traditional Arabic coffee, learn about Bedouin life in the desert, and discover local arts and crafts.'}
                    </p>
                    <button className="text-yellow-600 font-bold hover:underline">{t.readMore}</button>
                </div>
            </div>
        </div>
      </section>

      {/* Map Concept */}
      <section className="py-20 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-12">{state.language === 'ar' ? 'خريطة الأردن' : 'Explore the Map'}</h2>
          <div className="bg-slate-900 rounded-3xl p-8 h-[500px] flex items-center justify-center relative overflow-hidden text-white shadow-2xl">
               {/* Abstract placeholder for map */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Jordan_location_map.svg/1709px-Jordan_location_map.svg.png')] bg-contain bg-center bg-no-repeat"></div>
               <div className="z-10 bg-white/10 backdrop-blur-md p-8 rounded-xl max-w-md border border-white/10">
                   <h3 className="text-2xl font-bold mb-2">{t.countryName}</h3>
                   <p className="mb-4 text-gray-300">
                     {state.language === 'ar' ? 'من أم قيس شمالاً إلى العقبة جنوباً.' : 'From Umm Qais in the North to Aqaba in the South.'}
                   </p>
                   <button className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg">
                     {state.language === 'ar' ? 'تحميل الخريطة' : 'Download Map'}
                   </button>
               </div>
          </div>
      </section>
    </div>
  );
};
