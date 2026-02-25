import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useData } from '../context/DataContext';
import { MapPin, Phone, Clock, Instagram, MessageCircle, Dog, ChevronRight } from 'lucide-react';
import ShootingStars from './ShootingStars';

export default function Frontend() {
  const { content } = useData();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div 
      className="min-h-screen w-full max-w-[480px] mx-auto relative overflow-hidden shadow-2xl text-white"
    >
      {/* Global Background - Starry Night Vibe */}
      <div className="fixed inset-0 z-[-1]">
        <img 
          src="https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=1000&auto=format&fit=crop" 
          alt="Starry Background" 
          className="w-full h-full object-cover opacity-40 blur-3xl scale-110" 
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Section */}
      <section 
        className="relative h-[85vh] w-full overflow-hidden"
        style={{
          marginTop: content.sectionSpacing?.hero?.marginTop,
          marginBottom: content.sectionSpacing?.hero?.marginBottom,
          paddingTop: content.sectionSpacing?.hero?.paddingTop,
          paddingBottom: content.sectionSpacing?.hero?.paddingBottom,
        }}
      >
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 z-0"
        >
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            style={{ 
              backgroundImage: `url(${content.hero.backgroundImage})`,
              y: y 
            }}
            className="w-full h-full bg-cover bg-center"
          />
          {/* Gradient Overlay for Emphasis - Darker at top for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/40" />
          
          {/* Starry Night Effect at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-64 z-10 pointer-events-none opacity-60 mix-blend-screen">
             <img 
               src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop" 
               alt="Starry Night Texture" 
               className="w-full h-full object-cover blur-sm"
               style={{ maskImage: 'linear-gradient(to top, black, transparent)' }}
             />
          </div>
        </div>
        
        {/* Shooting Stars Animation */}
        <ShootingStars />
        
        {/* Twinkling Stars */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
             <motion.div
               key={`star-${i}`}
               initial={{ opacity: Math.random() * 0.5 + 0.1, scale: Math.random() * 0.5 + 0.5 }}
               animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.2, 0.8] }}
               transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, ease: "easeInOut" }}
               className="absolute w-[2px] h-[2px] bg-white rounded-full blur-[0.5px]"
               style={{
                 top: Math.random() * 100 + "%", 
                 left: Math.random() * 100 + "%"
               }}
             />
          ))}
        </div>

        {/* Top Content: Logo & Headline */}
        {content.hero.layout ? (
          <>
            {/* Logo */}
            {content.hero.layout.logo && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="absolute z-20 flex flex-col items-center justify-center pointer-events-none"
                style={{
                  left: content.hero.layout.logo.x,
                  top: content.hero.layout.logo.y,
                  width: content.hero.layout.logo.width,
                  height: content.hero.layout.logo.height,
                }}
              >
                <img 
                  src={content.hero.logo} 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="absolute z-10 flex flex-col items-center gap-4"
              style={{
                left: content.hero.layout.headline.x,
                top: content.hero.layout.headline.y,
                width: content.hero.layout.headline.width,
                height: content.hero.layout.headline.height,
              }}
            >
              <motion.h1 
                variants={fadeInUp} 
                className="font-bold leading-tight whitespace-pre-line w-full text-center"
                style={{
                  fontFamily: content.hero.layout.headline.fontFamily || 'Noto Serif KR',
                  fontWeight: content.hero.layout.headline.fontWeight || 700,
                  fontSize: `${content.hero.layout.headline.fontSize || 30}px`,
                  color: content.hero.layout.headline.color || '#ffffff',
                  WebkitTextStroke: content.hero.layout.headline.textStrokeWidth ? `${content.hero.layout.headline.textStrokeWidth}px ${content.hero.layout.headline.textStrokeColor}` : 'none',
                  textShadow: `${content.hero.layout.headline.textShadowOffsetX || 0}px ${content.hero.layout.headline.textShadowOffsetY || 0}px ${content.hero.layout.headline.textShadowBlur || 0}px ${content.hero.layout.headline.textShadowColor || 'transparent'}`
                }}
              >
                {content.hero.headline}
              </motion.h1>
            </motion.div>

            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="absolute z-10 flex flex-col items-center gap-6"
              style={{
                left: content.hero.layout.subheadline.x,
                top: content.hero.layout.subheadline.y,
                width: content.hero.layout.subheadline.width,
                height: content.hero.layout.subheadline.height,
              }}
            >
              <motion.p 
                variants={fadeInUp} 
                className="font-light text-sm w-full text-center"
                style={{
                  fontFamily: content.hero.layout.subheadline.fontFamily || 'Noto Sans KR',
                  fontWeight: content.hero.layout.subheadline.fontWeight || 400,
                  fontSize: `${content.hero.layout.subheadline.fontSize || 14}px`,
                  color: content.hero.layout.subheadline.color || '#f3f4f6',
                  WebkitTextStroke: content.hero.layout.subheadline.textStrokeWidth ? `${content.hero.layout.subheadline.textStrokeWidth}px ${content.hero.layout.subheadline.textStrokeColor}` : 'none',
                  textShadow: `${content.hero.layout.subheadline.textShadowOffsetX || 0}px ${content.hero.layout.subheadline.textShadowOffsetY || 0}px ${content.hero.layout.subheadline.textShadowBlur || 0}px ${content.hero.layout.subheadline.textShadowColor || 'transparent'}`
                }}
              >
                {content.hero.subheadline}
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="absolute z-10 flex flex-col items-center gap-6"
              style={{
                left: content.hero.layout.cta.x,
                top: content.hero.layout.cta.y,
                width: content.hero.layout.cta.width,
                height: content.hero.layout.cta.height,
              }}
            >
              <motion.a
                href={content.contact.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="w-full h-full flex items-center justify-center rounded-full text-white font-medium text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(0,71,171,0.5)] hover:shadow-[0_0_30px_rgba(0,71,171,0.8)] border border-white/20 backdrop-blur-md"
                style={{ 
                  backgroundColor: `${content.theme.primaryColor}dd`,
                  fontFamily: content.hero.layout.cta.fontFamily || 'Noto Sans KR',
                  fontWeight: content.hero.layout.cta.fontWeight || 500,
                  fontSize: `${content.hero.layout.cta.fontSize || 14}px`,
                  color: content.hero.layout.cta.color || '#ffffff'
                }}
              >
                {content.hero.ctaText}
              </motion.a>
            </motion.div>
          </>
        ) : (
          <>
        {/* Top Content: Logo & Headline */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center gap-4 pt-10"
        >
          {/* Logo Placeholder */}
          <div className="w-24 h-auto mb-2">
             <img src={content.hero.logo} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <motion.h1 
            variants={fadeInUp} 
            className="text-3xl font-serif font-bold leading-tight text-white whitespace-pre-line drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          >
            {content.hero.headline}
          </motion.h1>
        </motion.div>

        {/* Bottom Content: Subheadline, CTA, Scroll Down */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center gap-6"
        >
          <motion.p 
            variants={fadeInUp} 
            className="text-gray-100 font-light text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            {content.hero.subheadline}
          </motion.p>
          
          <motion.a
            href={content.contact.naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeInUp}
            className="px-10 py-4 rounded-full text-white font-medium text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(0,71,171,0.5)] hover:shadow-[0_0_30px_rgba(0,71,171,0.8)] border border-white/20 backdrop-blur-md mb-2"
            style={{ backgroundColor: `${content.theme.primaryColor}dd` }}
          >
            {content.hero.ctaText}
          </motion.a>
        </motion.div>
          </>
        )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer"
          >
            <a href="#about" className="flex flex-col items-center gap-2 group">
              <span className="text-[10px] tracking-widest text-gray-400 uppercase group-hover:text-white transition-colors">Scroll Down</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"
              />
            </a>
          </motion.div>
      </section>

      {/* Appeal Points Container */}
      <div className="relative">
        
        {/* USP 1: Aging */}
        <section 
          id="about" 
          className="relative overflow-hidden bg-black"
          style={{
            marginTop: content.sectionSpacing?.usp_aging?.marginTop,
            marginBottom: content.sectionSpacing?.usp_aging?.marginBottom,
            paddingTop: content.sectionSpacing?.usp_aging?.paddingTop || '5rem',
            paddingBottom: content.sectionSpacing?.usp_aging?.paddingBottom || '5rem',
          }}
        >
          {/* Deep Crimson Glow - Bottom Right */}
          <div className="absolute -bottom-[20%] -right-[20%] w-[500px] h-[500px] rounded-full bg-[#DC143C] opacity-20 blur-[120px] pointer-events-none z-0" />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={fadeInUp}
            className="space-y-6 relative z-10 px-6"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
              <img 
                src={content.usps.aging.image} 
                alt="Dry Aging" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif text-white">{content.usps.aging.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm whitespace-pre-line">
                {content.usps.aging.description}
              </p>
            </div>
          </motion.div>
        </section>

        {/* USP 2: View - Panoramic Window Effect */}
        <section 
          className="relative w-full"
          style={{
            marginTop: content.sectionSpacing?.usp_view?.marginTop,
            marginBottom: content.sectionSpacing?.usp_view?.marginBottom,
            paddingTop: content.sectionSpacing?.usp_view?.paddingTop || '0',
            paddingBottom: content.sectionSpacing?.usp_view?.paddingBottom || '0',
          }}
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={fadeInUp}
            className="relative w-full h-[50vh] min-h-[400px] overflow-hidden"
          >
            {/* Background Image */}
            <img 
              src={content.usps.view.image} 
              alt="Panoramic View" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay - Shorter and more transparent */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

            {/* Content at Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left">
              <h3 className="text-3xl font-serif text-white mb-3 drop-shadow-lg">
                {content.usps.view.title}
              </h3>
              <p className="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line">
                {content.usps.view.description}
              </p>
            </div>
          </motion.div>
        </section>

        {/* USP 3: Private Room */}
        <section 
          className="relative w-full"
          style={{
            marginTop: content.sectionSpacing?.usp_privateRoom?.marginTop,
            marginBottom: content.sectionSpacing?.usp_privateRoom?.marginBottom,
            paddingTop: content.sectionSpacing?.usp_privateRoom?.paddingTop || '0',
            paddingBottom: content.sectionSpacing?.usp_privateRoom?.paddingBottom || '0',
          }}
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={fadeInUp}
            className="relative w-full h-[50vh] min-h-[400px] overflow-hidden"
          >
            {/* Background Image */}
            <img 
              src={content.usps.privateRoom.image} 
              alt="Private Room" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay - Shorter and more transparent */}
            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

            {/* Content at Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left">
              <h3 className="text-3xl font-serif text-white mb-3 drop-shadow-lg">
                {content.usps.privateRoom.title}
              </h3>
              <p className="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line">
                {content.usps.privateRoom.description}
              </p>
            </div>
          </motion.div>
        </section>

        {/* USP 4 & 5: Terrace & Pet */}
        <section 
          className="relative overflow-hidden bg-black"
          style={{
            marginTop: content.sectionSpacing?.usp_terrace_pet?.marginTop,
            marginBottom: content.sectionSpacing?.usp_terrace_pet?.marginBottom,
            paddingTop: content.sectionSpacing?.usp_terrace_pet?.paddingTop || '5rem',
            paddingBottom: content.sectionSpacing?.usp_terrace_pet?.paddingBottom || '5rem',
          }}
        >
          {/* Dark Teal Glow - Bottom (for Terrace) */}
          <div className="absolute -bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#008080] opacity-20 blur-[100px] pointer-events-none z-0" />
          {/* Deep Violet Glow - Top Right (for Pet) */}
          <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-[#9400D3] opacity-20 blur-[100px] pointer-events-none z-0" />

          <div className="flex flex-col gap-16 px-6">
            {/* Terrace */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: "-50px" }}
              variants={fadeInUp}
              className="space-y-4 relative z-10"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm">
                <img src={content.usps.terrace.image} alt="Terrace" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif text-white">{content.usps.terrace.title}</h4>
                <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line">
                  {content.usps.terrace.description}
                </p>
              </div>
            </motion.div>

            {/* Pet */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="space-y-4 relative z-10"
            >
              <div className="aspect-[3/4] w-full overflow-hidden rounded-sm relative group">
                 <img src={content.usps.pet.image} alt="Pet Friendly" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-serif text-white">{content.usps.pet.title}</h4>
                <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line">
                  {content.usps.pet.description}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Menu Section */}
        <section 
          className="relative overflow-hidden bg-black"
          style={{
            marginTop: content.sectionSpacing?.menu?.marginTop,
            marginBottom: content.sectionSpacing?.menu?.marginBottom,
            paddingTop: content.sectionSpacing?.menu?.paddingTop || '5rem',
            paddingBottom: content.sectionSpacing?.menu?.paddingBottom || '5rem',
          }}
        >
          {/* Sapphire Blue & Gold Glow - Both Sides */}
          <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#0F52BA] opacity-15 blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[#FFD700] opacity-15 blur-[120px] pointer-events-none z-0" />

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-10 text-center relative z-10 px-6"
          >
            <h3 className="text-2xl font-serif text-white mb-2">Signature Menu</h3>
            <div className="w-10 h-[1px] bg-white/30 mx-auto"></div>
          </motion.div>


          <div className="relative z-10 w-full overflow-x-auto flex gap-4 px-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
            `}</style>
            {content.menu.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] snap-center bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col"
              >
                <div className="h-[200px] w-full overflow-hidden bg-gray-800 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-2">
                    <h4 className="text-lg font-medium text-white truncate">{item.name}</h4>
                    <span className="text-sm font-serif block mt-1" style={{ color: content.theme.primaryColor }}>{item.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed whitespace-pre-line">{item.description}</p>
                </div>
              </motion.div>
            ))}
            {/* Spacer for right padding in scroll */}
            <div className="w-2 flex-shrink-0" />
          </div>
        </section>
      </div>

      {/* Gallery Section */}
      {content.gallery && content.gallery.length > 0 && (
        <section 
          className="px-6"
          style={{
            marginTop: content.sectionSpacing?.gallery?.marginTop,
            marginBottom: content.sectionSpacing?.gallery?.marginBottom,
            paddingTop: content.sectionSpacing?.gallery?.paddingTop || '5rem',
            paddingBottom: content.sectionSpacing?.gallery?.paddingBottom || '5rem',
          }}
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-10 text-center"
          >
            <h3 className="text-2xl font-serif text-white mb-2">Gallery</h3>
            <div className="w-10 h-[1px] bg-white/30 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-2 gap-2">
            {content.gallery.map((image, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-sm overflow-hidden ${index % 3 === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
              >
                <img 
                  src={image} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Notices Section */}
      {content.notices && content.notices.length > 0 && (
        <section 
          className="px-6"
          style={{
            marginTop: content.sectionSpacing?.notices?.marginTop,
            marginBottom: content.sectionSpacing?.notices?.marginBottom,
            paddingTop: content.sectionSpacing?.notices?.paddingTop || '5rem',
            paddingBottom: content.sectionSpacing?.notices?.paddingBottom || '5rem',
          }}
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-10 text-center"
          >
            <h3 className="text-2xl font-serif text-white mb-2">Notice & Event</h3>
            <div className="w-10 h-[1px] bg-white/30 mx-auto"></div>
          </motion.div>

          <div className="space-y-4">
            {content.notices.map((notice, index) => (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-medium">{notice.title}</h4>
                  <span className="text-xs text-gray-500">{notice.date}</span>
                </div>
                <p className="text-sm text-gray-400 whitespace-pre-line leading-relaxed">
                  {notice.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Map & CTA */}
      <section 
        className="px-6"
        style={{
          marginTop: content.sectionSpacing?.contact?.marginTop,
          marginBottom: content.sectionSpacing?.contact?.marginBottom,
          paddingTop: content.sectionSpacing?.contact?.paddingTop || '5rem',
          paddingBottom: content.sectionSpacing?.contact?.paddingBottom || '5rem',
        }}
      >
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-50px" }}
          variants={fadeInUp}
          className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg"
        >
          <div className="h-48 bg-gray-800 relative">
             {/* Map Image */}
             <img 
               src={content.contact.mapImage} 
               alt="Map" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="p-6 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-serif text-white">오시는 길</h3>
              <p className="text-sm text-gray-400">{content.contact.address}</p>
            </div>
            <a 
              href={content.contact.naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2"
              style={{ backgroundColor: '#03C75A' }} // Naver Green
            >
              <span>네이버 지도 예약하기</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-white/10 text-center">
        <div className="flex justify-center gap-6 mb-8">
          <a href={content.contact.instagram} className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href={content.contact.blog} className="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
        
        <div className="space-y-3 text-xs text-gray-500 font-light">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{content.contact.hours}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-3 h-3" />
            <span>{content.contact.phone}</span>
          </div>
          <p className="pt-4 border-t border-white/5 mt-4">
            &copy; {new Date().getFullYear()} STARRY. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
