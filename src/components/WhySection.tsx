import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Droplets, Sun, ShieldCheck, CheckCircle2, Award, HeartHandshake } from 'lucide-react';

export const WhySection: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      desc: 'Inspired by carefully selected whole botanical ingredients from nature, cold-macerated to protect native enzymes.',
      tag: '100% Plant Sourced'
    },
    {
      icon: Droplets,
      title: 'Convenient',
      desc: 'A thoughtfully prepared blend designed for modern busy routines — no messy juicing, grating, or preparation required.',
      tag: 'Ready in 30 Seconds'
    },
    {
      icon: Sun,
      title: 'Everyday Wellness',
      desc: 'Created to complement mindful lifestyle choices, uplifting morning hydration and daily vitality naturally.',
      tag: 'Daily Balance'
    },
    {
      icon: ShieldCheck,
      title: 'Made With Care',
      desc: 'A relentless focus on quality, consistency, tamper-evident glass bottling, and zero artificial preservatives.',
      tag: 'Lab Verified'
    }
  ];

  return (
    <section id="why-us" className="py-20 md:py-32 bg-[#0D1711] text-[#F7F3E8] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            WHY CHOOSE AMRUT SANJEEVANI
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            A Simple Addition to Your Wellness Routine.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3E8]/80 leading-relaxed">
            Designed for those who value authenticity, clean organic nourishment, and straightforward daily habits.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#E8D85B]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8D85B]/20 to-[#3E6B45]/30 border border-[#E8D85B]/30 flex items-center justify-center mb-6 shadow-inner text-[#E8D85B]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8D85B] bg-[#E8D85B]/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#F7F3E8] font-serif-luxury">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F3E8]/75 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center space-x-2 text-xs text-[#E8D85B] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Guaranteed</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#163020] via-[#22442B] to-[#163020] border border-[#E8D85B]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#E8D85B]/20 flex items-center justify-center text-[#E8D85B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F7F3E8]">Crafted Under Strict Food Safety Standards</h4>
              <p className="text-xs text-[#F7F3E8]/75">Packaged in UV-resistant amber glass bottles to prevent photo-oxidation.</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#E8D85B] tracking-wider uppercase bg-[#0D1711]/60 px-4 py-2 rounded-full border border-[#E8D85B]/30">
            100% Vegetarian • Non-GMO
          </span>
        </div>

      </div>
    </section>
  );
};

export const HowToUseSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Open & Shake',
      subtitle: 'Gentle Activation',
      desc: 'Shake the bottle gently to distribute the active raw botanicals and living Mother cultures evenly.',
      img: 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=500&q=80'
    },
    {
      num: '02',
      title: 'Measure & Dilute',
      subtitle: 'Recommended Serving',
      desc: 'Pour 10ml to 15ml (approx. 1 tablespoon) into a glass of lukewarm or room-temperature water (150ml).',
      img: '/src/assets/images/apple cider vinegar.jpg'
    },
    {
      num: '03',
      title: 'Make It a Routine',
      subtitle: 'Morning Hydration',
      desc: 'Sip slowly first thing in the morning on an empty stomach. Enjoy your nourishing breakfast 20-30 minutes later.',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <section id="how-to-use" className="py-20 md:py-32 bg-[#F7F3E8] text-[#0D1711] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#3E6B45] uppercase px-4 py-1 rounded-full bg-[#3E6B45]/10 border border-[#3E6B45]/20 inline-block mb-3">
            DAILY CEREMONY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0D1711] leading-tight font-serif-luxury">
            Make It Part of Your Routine.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#0D1711]/80 leading-relaxed">
            Three simple steps each morning to awaken your senses and nurture everyday vitality.
          </p>
        </div>

        {/* 3 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#163020]/10 shadow-lg shadow-[#163020]/5 flex flex-col justify-between relative group hover:shadow-xl transition-all"
            >
              {/* Step Number Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold font-serif-luxury text-[#3E6B45]">
                  STEP {s.num}
                </span>
                <span className="text-[11px] font-semibold text-[#163020]/60 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                  {s.subtitle}
                </span>
              </div>

              {/* Step Image Visual */}
              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0D1711] font-serif-luxury">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0D1711]/75 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#3E6B45]">
                <span>✓ 30-Second Morning Ritual</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer Area */}
        <div className="mt-12 bg-white/70 border border-[#163020]/15 rounded-2xl p-5 text-center max-w-3xl mx-auto">
          <p className="text-xs text-[#0D1711]/70 leading-relaxed italic">
            * <strong>Disclaimer:</strong> Please follow the recommended serving and usage instructions provided on the product packaging. Amrut Sanjeevani is a wellness food product and is not intended to diagnose, treat, cure, or prevent any medical condition.
          </p>
        </div>

      </div>
    </section>
  );
};

export const LifestyleSection: React.FC = () => {
  const lifestyleCards = [
    {
      title: 'Mindful Morning Ritual',
      time: '07:00 AM',
      desc: 'Wake up with a glass of warm water infused with Amrut Sanjeevani to awaken digestion and start the day centered.',
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'High-Pace Work Focus',
      time: '11:00 AM',
      desc: 'Stay clean, light, and focused through morning strategy meetings and deep work sessions without midday sluggishness.',
      img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Fitness & Movement',
      time: '05:30 PM',
      desc: 'Daily walks, yoga, or gym training are enhanced when your baseline routine supports everyday stamina.',
      img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Peaceful Evening Rest',
      time: '09:30 PM',
      desc: 'Close the day with balanced nutrition, mindful reflection, and restorative deep sleep for tomorrow\'s vitality.',
      img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-[#0D1711] text-[#F7F3E8] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] text-[#E8D85B] uppercase px-4 py-1 rounded-full border border-[#E8D85B]/20 bg-[#E8D85B]/5 inline-block mb-3">
            LIFESTYLE HARMONY
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F3E8] leading-tight font-serif-luxury">
            Small Choices.<br />Meaningful Routines.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#F7F3E8]/80 leading-relaxed">
            Wellness is not built in a single moment. It grows through the choices we make every day.
          </p>
        </div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyleCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-3xl overflow-hidden glass-panel border border-white/10 group hover:border-[#E8D85B]/40 transition-all flex flex-col"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-black">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <span className="absolute top-3 right-3 bg-[#0D1711]/80 backdrop-blur-md text-[#E8D85B] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#E8D85B]/30">
                  {card.time}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#F7F3E8] font-serif-luxury">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#F7F3E8]/75 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
