import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { useData, SiteContent, MenuItem, Notice, LayoutData, defaultContent } from '../context/DataContext';
import { motion } from 'motion/react';
import { Save, RotateCcw, Plus, Trash2, Image as ImageIcon, Type, Layout, Palette, Bell, Move, Grid, Dog, Download } from 'lucide-react';

import { EditableElement } from './EditableElement';

// Helper to generate static HTML
const generateStaticHtml = (content: SiteContent) => {
  // SVGs for Icons
  const iconInstagram = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;
  const iconMessageCircle = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`;
  const iconClock = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
  const iconPhone = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  const iconChevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m9 18 6-6-6-6"/></svg>`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.hero.headline.split('\n')[0]}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Noto+Serif+KR:wght@200;300;400;500;600;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: black; color: white; }
        .font-serif { font-family: 'Noto Serif KR', serif; }
        .font-sans-kr { font-family: 'Noto Sans KR', sans-serif; }
        
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        /* Animations */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        .star { position: absolute; background: white; border-radius: 50%; animation: twinkle 3s infinite ease-in-out; }
    </style>
</head>
<body class="bg-black text-white min-h-screen">
    <div class="w-full max-w-[480px] mx-auto relative overflow-hidden shadow-2xl bg-black min-h-screen">
        
        <!-- Global Background -->
        <div class="fixed inset-0 z-[-1]">
            <img src="https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=1000&auto=format&fit=crop" class="w-full h-full object-cover opacity-40 blur-3xl scale-110">
            <div class="absolute inset-0 bg-black/40"></div>
        </div>

        <!-- Hero Section -->
        <section class="relative h-[85vh] w-full overflow-hidden" style="padding-top: ${content.sectionSpacing?.hero?.paddingTop || 0}px; padding-bottom: ${content.sectionSpacing?.hero?.paddingBottom || 0}px;">
            <div class="absolute inset-0 z-0">
                <div class="w-full h-full bg-cover bg-center" style="background-image: url('${content.hero.backgroundImage}'); transform: scale(1);"></div>
                <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/40"></div>
                
                <!-- Twinkling Stars -->
                ${Array.from({ length: 25 }).map(() => `
                    <div class="star" style="
                        top: ${Math.random() * 100}%; 
                        left: ${Math.random() * 100}%; 
                        width: ${Math.random() * 2 + 1}px; 
                        height: ${Math.random() * 2 + 1}px; 
                        animation-delay: ${Math.random() * 3}s;
                    "></div>
                `).join('')}
            </div>
            
            <!-- Hero Content -->
            ${content.hero.layout ? `
            <!-- Logo -->
            ${content.hero.layout.logo ? `
            <div class="absolute z-20 flex flex-col items-center justify-center pointer-events-none" style="left: ${content.hero.layout.logo.x}px; top: ${content.hero.layout.logo.y}px; width: ${content.hero.layout.logo.width}px; height: ${content.hero.layout.logo.height}px;">
                <img src="${content.hero.logo}" alt="Logo" class="w-full h-full object-contain">
            </div>` : ''}

            <!-- Headline -->
            <div class="absolute z-10 flex flex-col items-center gap-4" style="left: ${content.hero.layout.headline.x}px; top: ${content.hero.layout.headline.y}px; width: ${content.hero.layout.headline.width}px; height: ${content.hero.layout.headline.height}px;">
                <h1 class="font-bold leading-tight whitespace-pre-line w-full text-center" style="
                    font-family: '${content.hero.layout.headline.fontFamily || 'Noto Serif KR'}';
                    font-size: ${content.hero.layout.headline.fontSize}px; 
                    color: ${content.hero.layout.headline.color}; 
                    text-shadow: ${content.hero.layout.headline.textShadowOffsetX || 0}px ${content.hero.layout.headline.textShadowOffsetY || 0}px ${content.hero.layout.headline.textShadowBlur || 0}px ${content.hero.layout.headline.textShadowColor || 'transparent'};
                    -webkit-text-stroke: ${content.hero.layout.headline.textStrokeWidth || 0}px ${content.hero.layout.headline.textStrokeColor || 'transparent'};
                ">
                    ${content.hero.headline}
                </h1>
            </div>

            <!-- Subheadline -->
            <div class="absolute z-10 flex flex-col items-center gap-6" style="left: ${content.hero.layout.subheadline.x}px; top: ${content.hero.layout.subheadline.y}px; width: ${content.hero.layout.subheadline.width}px; height: ${content.hero.layout.subheadline.height}px;">
                <p class="font-light text-sm w-full text-center" style="
                    font-family: '${content.hero.layout.subheadline.fontFamily || 'Noto Sans KR'}';
                    font-size: ${content.hero.layout.subheadline.fontSize}px; 
                    color: ${content.hero.layout.subheadline.color};
                    text-shadow: ${content.hero.layout.subheadline.textShadowOffsetX || 0}px ${content.hero.layout.subheadline.textShadowOffsetY || 0}px ${content.hero.layout.subheadline.textShadowBlur || 0}px ${content.hero.layout.subheadline.textShadowColor || 'transparent'};
                    -webkit-text-stroke: ${content.hero.layout.subheadline.textStrokeWidth || 0}px ${content.hero.layout.subheadline.textStrokeColor || 'transparent'};
                ">
                    ${content.hero.subheadline}
                </p>
            </div>

            <!-- CTA -->
            <div class="absolute z-10 flex flex-col items-center gap-6" style="left: ${content.hero.layout.cta.x}px; top: ${content.hero.layout.cta.y}px; width: ${content.hero.layout.cta.width}px; height: ${content.hero.layout.cta.height}px;">
                <a href="${content.contact.naverMapUrl}" target="_blank" class="w-full h-full flex items-center justify-center rounded-full text-white font-medium text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(0,71,171,0.5)] hover:shadow-[0_0_30px_rgba(0,71,171,0.8)] border border-white/20 backdrop-blur-md" style="
                    background-color: ${content.theme.primaryColor}dd;
                    font-family: '${content.hero.layout.cta.fontFamily || 'Noto Sans KR'}';
                    font-size: ${content.hero.layout.cta.fontSize}px;
                    color: ${content.hero.layout.cta.color};
                ">
                    ${content.hero.ctaText}
                </a>
            </div>
            ` : ''}

            <!-- Scroll Down Indicator -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span class="text-[10px] tracking-widest text-gray-400 uppercase">Scroll Down</span>
                <div class="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>

        <!-- USP 1: Aging -->
        <section class="relative overflow-hidden bg-black px-6 py-10" style="${[
            content.sectionSpacing?.usp_aging?.paddingTop ? `padding-top: ${content.sectionSpacing.usp_aging.paddingTop}px;` : '',
            content.sectionSpacing?.usp_aging?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.usp_aging.paddingBottom}px;` : '',
            content.sectionSpacing?.usp_aging?.marginTop ? `margin-top: ${content.sectionSpacing.usp_aging.marginTop}px;` : '',
            content.sectionSpacing?.usp_aging?.marginBottom ? `margin-bottom: ${content.sectionSpacing.usp_aging.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="absolute -bottom-[20%] -right-[20%] w-[500px] h-[500px] rounded-full bg-[#DC143C] opacity-20 blur-[120px] pointer-events-none z-0"></div>
            <div class="space-y-6 relative z-10">
                <div class="aspect-[4/5] w-full overflow-hidden rounded-sm scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                    <img src="${content.usps.aging.image}" alt="Dry Aging" class="w-full h-full object-cover">
                </div>
                <div class="space-y-4 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                    <h3 class="text-2xl font-serif text-white" style="font-size: ${content.usps.aging.titleFontSize || 24}px;">${content.usps.aging.title.replace(/\n/g, '<br/>')}</h3>
                    <p class="text-gray-400 font-light leading-relaxed text-sm whitespace-pre-line" style="font-size: ${content.usps.aging.descriptionFontSize || 14}px;">${content.usps.aging.description}</p>
                </div>
            </div>
        </section>

        <!-- USP 2: View -->
        <section class="relative w-full py-10" style="${[
            content.sectionSpacing?.usp_view?.paddingTop ? `padding-top: ${content.sectionSpacing.usp_view.paddingTop}px;` : '',
            content.sectionSpacing?.usp_view?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.usp_view.paddingBottom}px;` : '',
            content.sectionSpacing?.usp_view?.marginTop ? `margin-top: ${content.sectionSpacing.usp_view.marginTop}px;` : '',
            content.sectionSpacing?.usp_view?.marginBottom ? `margin-bottom: ${content.sectionSpacing.usp_view.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                <img src="${content.usps.view.image}" alt="View" class="absolute inset-0 w-full h-full object-cover scroll-animate opacity-0 scale-110 transition-all duration-1000 ease-out">
                <div class="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
                    <h3 class="text-3xl font-serif text-white mb-3 drop-shadow-lg" style="font-size: ${content.usps.view.titleFontSize || 30}px;">${content.usps.view.title}</h3>
                    <p class="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line" style="font-size: ${content.usps.view.descriptionFontSize || 14}px;">${content.usps.view.description}</p>
                </div>
            </div>
        </section>

        <!-- USP 3: Private Room -->
        <section class="relative w-full py-10" style="${[
            content.sectionSpacing?.usp_privateRoom?.paddingTop ? `padding-top: ${content.sectionSpacing.usp_privateRoom.paddingTop}px;` : '',
            content.sectionSpacing?.usp_privateRoom?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.usp_privateRoom.paddingBottom}px;` : '',
            content.sectionSpacing?.usp_privateRoom?.marginTop ? `margin-top: ${content.sectionSpacing.usp_privateRoom.marginTop}px;` : '',
            content.sectionSpacing?.usp_privateRoom?.marginBottom ? `margin-bottom: ${content.sectionSpacing.usp_privateRoom.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                <img src="${content.usps.privateRoom.image}" alt="Private Room" class="absolute inset-0 w-full h-full object-cover scroll-animate opacity-0 scale-110 transition-all duration-1000 ease-out">
                <div class="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-300">
                    <h3 class="text-3xl font-serif text-white mb-3 drop-shadow-lg" style="font-size: ${content.usps.privateRoom.titleFontSize || 30}px;">${content.usps.privateRoom.title}</h3>
                    <p class="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line" style="font-size: ${content.usps.privateRoom.descriptionFontSize || 14}px;">${content.usps.privateRoom.description}</p>
                </div>
            </div>
        </section>

        <!-- USP 4 & 5: Terrace & Pet -->
        <section class="relative overflow-hidden bg-black px-6 py-10" style="${[
            content.sectionSpacing?.usp_terrace_pet?.paddingTop ? `padding-top: ${content.sectionSpacing.usp_terrace_pet.paddingTop}px;` : '',
            content.sectionSpacing?.usp_terrace_pet?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.usp_terrace_pet.paddingBottom}px;` : '',
            content.sectionSpacing?.usp_terrace_pet?.marginTop ? `margin-top: ${content.sectionSpacing.usp_terrace_pet.marginTop}px;` : '',
            content.sectionSpacing?.usp_terrace_pet?.marginBottom ? `margin-bottom: ${content.sectionSpacing.usp_terrace_pet.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="absolute -bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#008080] opacity-20 blur-[100px] pointer-events-none z-0"></div>
            <div class="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-[#9400D3] opacity-20 blur-[100px] pointer-events-none z-0"></div>

            <div class="flex flex-col gap-16">
                <!-- Terrace -->
                <div class="space-y-4 relative z-10">
                    <div class="aspect-[3/4] w-full overflow-hidden rounded-sm scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                        <img src="${content.usps.terrace.image}" alt="Terrace" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-2 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                        <h4 class="text-xl font-serif text-white" style="font-size: ${content.usps.terrace.titleFontSize || 20}px;">${content.usps.terrace.title}</h4>
                        <p class="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line" style="font-size: ${content.usps.terrace.descriptionFontSize || 14}px;">${content.usps.terrace.description}</p>
                    </div>
                </div>
                <!-- Pet -->
                <div class="space-y-4 relative z-10">
                    <div class="aspect-[3/4] w-full overflow-hidden rounded-sm scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                        <img src="${content.usps.pet.image}" alt="Pet" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-2 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                        <h4 class="text-xl font-serif text-white" style="font-size: ${content.usps.pet.titleFontSize || 20}px;">${content.usps.pet.title}</h4>
                        <p class="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line" style="font-size: ${content.usps.pet.descriptionFontSize || 14}px;">${content.usps.pet.description}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Menu Section -->
        <section class="relative overflow-hidden bg-black py-10" style="${[
            content.sectionSpacing?.menu?.paddingTop ? `padding-top: ${content.sectionSpacing.menu.paddingTop}px;` : '',
            content.sectionSpacing?.menu?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.menu.paddingBottom}px;` : '',
            content.sectionSpacing?.menu?.marginTop ? `margin-top: ${content.sectionSpacing.menu.marginTop}px;` : '',
            content.sectionSpacing?.menu?.marginBottom ? `margin-bottom: ${content.sectionSpacing.menu.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="absolute top-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[#0F52BA] opacity-15 blur-[120px] pointer-events-none z-0"></div>
            <div class="absolute bottom-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[#FFD700] opacity-15 blur-[120px] pointer-events-none z-0"></div>

            <div class="mb-10 text-center relative z-10 px-6 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                <h3 class="text-2xl font-serif text-white mb-2">Signature Menu</h3>
                <div class="w-10 h-[1px] bg-white/30 mx-auto"></div>
            </div>

            <div class="relative z-10 w-full overflow-x-auto flex gap-4 px-6 pb-8 snap-x snap-mandatory scrollbar-hide scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                ${content.menu.map(item => `
                <div class="flex-shrink-0 w-[280px] snap-center bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
                    <div class="h-[200px] w-full overflow-hidden bg-gray-800 relative">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-5 flex-1 flex flex-col">
                        <div class="mb-2">
                            <h4 class="text-lg font-medium text-white truncate">${item.name}</h4>
                            <span class="text-sm font-serif block mt-1" style="color: ${content.theme.primaryColor}">${item.price}</span>
                        </div>
                        <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed whitespace-pre-line">${item.description}</p>
                    </div>
                </div>
                `).join('')}
                <div class="w-2 flex-shrink-0"></div>
            </div>
        </section>

        <!-- Gallery Section -->
        ${content.gallery && content.gallery.length > 0 ? `
        <section class="px-6 py-10" style="${[
            content.sectionSpacing?.gallery?.paddingTop ? `padding-top: ${content.sectionSpacing.gallery.paddingTop}px;` : '',
            content.sectionSpacing?.gallery?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.gallery.paddingBottom}px;` : '',
            content.sectionSpacing?.gallery?.marginTop ? `margin-top: ${content.sectionSpacing.gallery.marginTop}px;` : '',
            content.sectionSpacing?.gallery?.marginBottom ? `margin-bottom: ${content.sectionSpacing.gallery.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="mb-10 text-center scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                <h3 class="text-2xl font-serif text-white mb-2">Gallery</h3>
                <div class="w-10 h-[1px] bg-white/30 mx-auto"></div>
            </div>
            <div class="grid grid-cols-2 gap-2 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                ${content.gallery.map((image, index) => `
                <div class="rounded-sm overflow-hidden ${index % 3 === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}">
                    <img src="${image}" alt="Gallery ${index + 1}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Notices -->
        ${content.notices && content.notices.length > 0 ? `
        <section class="px-6 py-10" style="${[
            content.sectionSpacing?.notices?.paddingTop ? `padding-top: ${content.sectionSpacing.notices.paddingTop}px;` : '',
            content.sectionSpacing?.notices?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.notices.paddingBottom}px;` : '',
            content.sectionSpacing?.notices?.marginTop ? `margin-top: ${content.sectionSpacing.notices.marginTop}px;` : '',
            content.sectionSpacing?.notices?.marginBottom ? `margin-bottom: ${content.sectionSpacing.notices.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="mb-10 text-center scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                <h3 class="text-2xl font-serif text-white mb-2">Notice & Event</h3>
                <div class="w-10 h-[1px] bg-white/30 mx-auto"></div>
            </div>
            <div class="space-y-4 scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-200">
                ${content.notices.map(notice => `
                <div class="bg-white/5 backdrop-blur-md p-5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="text-white font-medium">${notice.title}</h4>
                        <span class="text-xs text-gray-500">${notice.date}</span>
                    </div>
                    <p class="text-sm text-gray-400 whitespace-pre-line leading-relaxed">${notice.content}</p>
                </div>
                `).join('')}
            </div>
        </section>
        ` : ''}

        <!-- Contact -->
        <section class="px-6 py-10" style="${[
            content.sectionSpacing?.contact?.paddingTop ? `padding-top: ${content.sectionSpacing.contact.paddingTop}px;` : '',
            content.sectionSpacing?.contact?.paddingBottom ? `padding-bottom: ${content.sectionSpacing.contact.paddingBottom}px;` : '',
            content.sectionSpacing?.contact?.marginTop ? `margin-top: ${content.sectionSpacing.contact.marginTop}px;` : '',
            content.sectionSpacing?.contact?.marginBottom ? `margin-bottom: ${content.sectionSpacing.contact.marginBottom}px;` : ''
        ].join(' ')}">
            <div class="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg scroll-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out">
                <div class="h-48 bg-gray-800 relative">
                    <img src="${content.contact.mapImage}" alt="Map" class="w-full h-full object-cover">
                </div>
                <div class="p-6 text-center space-y-6">
                    <div class="space-y-2">
                        <h3 class="text-xl font-serif text-white">오시는 길</h3>
                        <p class="text-sm text-gray-400">${content.contact.address}</p>
                    </div>
                    <a href="${content.contact.naverMapUrl}" target="_blank" class="block w-full py-4 rounded-lg font-bold text-white transition-colors flex items-center justify-center gap-2" style="background-color: #03C75A;">
                        <span>네이버 지도 예약하기</span>
                        ${iconChevronRight}
                    </a>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="py-12 px-6 bg-black border-t border-white/10 text-center">
            <div class="flex justify-center gap-6 mb-8">
                <a href="${content.contact.instagram}" target="_blank" class="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
                    ${iconInstagram}
                </a>
                <a href="${content.contact.blog}" target="_blank" class="p-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
                    ${iconMessageCircle}
                </a>
            </div>
            <div class="space-y-3 text-xs text-gray-500 font-light">
                <div class="flex items-center justify-center gap-2">
                    ${iconClock}
                    <span>${content.contact.hours}</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    ${iconPhone}
                    <span>${content.contact.phone}</span>
                </div>
                <p class="pt-4 border-t border-white/5 mt-4">&copy; ${new Date().getFullYear()} STARRY. All rights reserved.</p>
            </div>
        </footer>
    </div>

    <!-- Scroll Animation Script -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-y-10', 'scale-110');
                        entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            const elements = document.querySelectorAll('.scroll-animate');
            elements.forEach(el => observer.observe(el));
        });
    </script>
</body>
</html>`;
};

const InputGroup = ({ label, value, onChange, type = "text", textarea = false }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{label}</label>
    {textarea ? (
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-24 resize-none"
      />
    ) : (
      <input 
        type={type}
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#222] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
      />
    )}
  </div>
);

const SpacingSlider = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <label className="text-xs font-medium text-gray-400 uppercase">{label}</label>
      <span className="text-xs text-gray-400">{value}px</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="200" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full accent-blue-500"
    />
  </div>
);

export default function Admin() {
  const { content, updateContent, resetContent, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<'hero' | 'visual' | 'usps' | 'menu' | 'gallery' | 'notices' | 'contact' | 'theme'>('hero');
  const [localContent, setLocalContent] = useState<SiteContent>(content);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGuides, setShowGuides] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Auto-save logic to prevent data loss on reload
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (JSON.stringify(localContent) !== JSON.stringify(content)) {
        updateContent(localContent);
      }
    }, 1000); // 1 second debounce
    return () => clearTimeout(timer);
  }, [localContent, content, updateContent]);

  // Sync local state with context when context changes (optional, but good for reset)
  React.useEffect(() => {
    // Only sync if not currently editing or if content was reset
    if (JSON.stringify(content) === JSON.stringify(defaultContent)) {
      setLocalContent(content);
    }
  }, [content]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234';
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('비밀번호가 올바르지 않습니다.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">관리자 로그인</h2>
            <p className="text-gray-400 text-sm">컨텐츠를 수정하려면 비밀번호를 입력하세요.</p>
          </div>
          <div className="space-y-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  const handleSave = () => {
    updateContent(localContent);
    alert('변경사항이 저장되었습니다.');
  };

  const handleExport = () => {
    const html = generateStaticHtml(localContent);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (confirm('모든 변경사항을 초기화하시겠습니까?')) {
      resetContent();
      setLocalContent(content);
    }
  };

  const handleChange = (section: keyof SiteContent, key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleNestedChange = (section: keyof SiteContent, subsection: string, key: string, value: any) => {
    setLocalContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          // @ts-ignore
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
  };

  const handleMenuChange = (index: number, key: keyof MenuItem, value: string) => {
    const newMenu = [...localContent.menu];
    newMenu[index] = { ...newMenu[index], [key]: value };
    setLocalContent(prev => ({ ...prev, menu: newMenu }));
  };

  const addMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: "새 메뉴",
      description: "메뉴 설명",
      price: "0원",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop",
      layout: {
        image: { x: 0, y: 0, width: 280, height: 200 },
        name: { x: 20, y: 220, width: 240, height: 'auto', fontSize: 18, fontFamily: 'Noto Sans KR', color: '#ffffff' },
        price: { x: 20, y: 250, width: 240, height: 'auto', fontSize: 16, fontFamily: 'Noto Serif KR', color: '#0047AB' },
        description: { x: 20, y: 280, width: 240, height: 'auto', fontSize: 12, fontFamily: 'Noto Sans KR', color: '#9ca3af' }
      }
    };
    setLocalContent(prev => ({ ...prev, menu: [...prev.menu, newItem] }));
  };

  const removeMenuItem = (index: number) => {
    const newMenu = localContent.menu.filter((_, i) => i !== index);
    setLocalContent(prev => ({ ...prev, menu: newMenu }));
  };

  const handleNoticeChange = (index: number, key: keyof Notice, value: string) => {
    const newNotices = [...(localContent.notices || [])];
    newNotices[index] = { ...newNotices[index], [key]: value };
    setLocalContent(prev => ({ ...prev, notices: newNotices }));
  };

  const addNotice = () => {
    const newNotice: Notice = {
      id: Date.now().toString(),
      title: "새 공지사항",
      content: "내용을 입력하세요.\n줄바꿈이 가능합니다.",
      date: new Date().toISOString().split('T')[0]
    };
    setLocalContent(prev => ({ ...prev, notices: [...(prev.notices || []), newNotice] }));
  };

  const removeNotice = (index: number) => {
    const newNotices = (localContent.notices || []).filter((_, i) => i !== index);
    setLocalContent(prev => ({ ...prev, notices: newNotices }));
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...(localContent.gallery || [])];
    newGallery[index] = value;
    setLocalContent(prev => ({ ...prev, gallery: newGallery }));
  };

  const addGalleryItem = () => {
    setLocalContent(prev => ({ 
      ...prev, 
      gallery: [...(prev.gallery || []), "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1000&auto=format&fit=crop"] 
    }));
  };

  const removeGalleryItem = (index: number) => {
    const newGallery = (localContent.gallery || []).filter((_, i) => i !== index);
    setLocalContent(prev => ({ ...prev, gallery: newGallery }));
  };

  const handleLayoutChange = (path: string, data: Partial<LayoutData>) => {
    setLocalContent(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop()!;
      const newContent = { ...prev };
      
      let current: any = newContent;
      for (const key of keys) {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
      
      if (!current[lastKey]) current[lastKey] = {};

      current[lastKey] = {
        ...current[lastKey],
        ...data
      };
      
      return newContent;
    });
  };

  const handleSpacingChange = (sectionKey: string, property: 'marginTop' | 'marginBottom' | 'paddingTop' | 'paddingBottom', value: number) => {
    setLocalContent(prev => ({
      ...prev,
      sectionSpacing: {
        ...prev.sectionSpacing,
        [sectionKey]: {
          ...(prev.sectionSpacing?.[sectionKey] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }),
          [property]: value
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-black border-r border-gray-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold font-serif mb-8 text-white flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          STARRY Admin
        </h1>

        {/* Export Button - Added at the top for visibility */}
        <div className="mb-6 pb-6 border-b border-gray-800">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all active:scale-95 border border-green-500/30"
          >
            <Download className="w-5 h-5" />
            최종 웹사이트 다운로드
          </button>
          <p className="text-[10px] text-gray-500 text-center mt-2">
            * DB 없이 동작하는 순수 HTML 파일 생성
          </p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: 'hero', label: '히어로 섹션', icon: Layout },
            { id: 'visual', label: '비주얼 빌더', icon: Move },
            { id: 'usps', label: '소구점 (USP)', icon: ImageIcon },
            { id: 'menu', label: '메뉴 관리', icon: Type },
            { id: 'gallery', label: '갤러리 관리', icon: ImageIcon },
            { id: 'notices', label: '공지/이벤트', icon: Bell },
            { id: 'contact', label: '연락처 정보', icon: Layout },
            { id: 'theme', label: '테마 설정', icon: Palette },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-800' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-gray-800 space-y-3">
          <button 
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            <Save className="w-4 h-4" />
            저장하기
          </button>
          <button 
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab} Settings</h2>

            {activeTab === 'hero' && (
              <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <InputGroup 
                  label="메인 헤드라인" 
                  value={localContent.hero.headline} 
                  onChange={(v: string) => handleChange('hero', 'headline', v)} 
                  textarea
                />
                <InputGroup 
                  label="서브 헤드라인" 
                  value={localContent.hero.subheadline} 
                  onChange={(v: string) => handleChange('hero', 'subheadline', v)} 
                />
                <InputGroup 
                  label="CTA 버튼 텍스트" 
                  value={localContent.hero.ctaText} 
                  onChange={(v: string) => handleChange('hero', 'ctaText', v)} 
                />
                <InputGroup 
                  label="로고 이미지 URL (투명 PNG 권장)" 
                  value={localContent.hero.logo} 
                  onChange={(v: string) => handleChange('hero', 'logo', v)} 
                />
                <div className="mt-2 rounded-lg overflow-hidden h-24 w-24 border border-gray-700 bg-gray-800 flex items-center justify-center">
                  <img src={localContent.hero.logo} alt="Logo Preview" className="w-full h-full object-contain" />
                </div>
                <InputGroup 
                  label="배경 이미지 URL" 
                  value={localContent.hero.backgroundImage} 
                  onChange={(v: string) => handleChange('hero', 'backgroundImage', v)} 
                />
                <div className="mt-4 rounded-lg overflow-hidden h-48 border border-gray-700">
                  <img src={localContent.hero.backgroundImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {activeTab === 'visual' && (
              <div className="flex flex-row gap-6 items-start justify-center">
                <div className="flex flex-col items-center">
                  <div className="mb-4 text-center w-full flex justify-between items-center px-4">
                    <div>
                      <h2 className="text-lg font-bold">비주얼 웹 빌더</h2>
                      <p className="text-sm text-gray-400">요소를 클릭하여 스타일을 편집하세요.</p>
                    </div>
                    <button
                      onClick={() => setShowGuides(!showGuides)}
                      className={`p-2 rounded-lg transition-colors ${showGuides ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                      title="가이드라인 켜기/끄기"
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div 
                    className="relative overflow-y-auto overflow-x-hidden border-4 border-gray-700 rounded-[30px] shadow-2xl bg-black scrollbar-hide"
                    style={{ width: '480px', height: '85vh' }}
                    onClick={() => setSelectedElement(null)}
                  >
                    <style>{`
                      .scrollbar-hide::-webkit-scrollbar {
                          display: none;
                      }
                    `}</style>
                    
                    {/* Center Guide Line */}
                    {(showGuides || isDragging) && (
                      <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-cyan-400 z-[60] pointer-events-none opacity-50" />
                    )}

                    {/* Hero Section */}
                    <div 
                      className={`relative w-full ${selectedElement === 'section:hero' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.hero?.marginTop,
                        marginBottom: localContent.sectionSpacing?.hero?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.hero?.paddingTop,
                        paddingBottom: localContent.sectionSpacing?.hero?.paddingBottom,
                        minHeight: '85vh'
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:hero'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:hero' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.hero?.paddingTop || 0 }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.hero?.paddingBottom || 0 }} />
                        </>
                      )}

                      {/* Background */}
                      <div 
                        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
                        style={{ backgroundImage: `url(${localContent.hero.backgroundImage})` }}
                      />
                      
                      {/* Logo */}
                      {localContent.hero.layout?.logo && (
                        <EditableElement
                          id="logo"
                          layout={localContent.hero.layout.logo}
                          isSelected={selectedElement === 'logo'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.logo`, data)}
                          type="image"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <img src={localContent.hero.logo} alt="Logo" className="w-full h-full object-contain pointer-events-none" />
                        </EditableElement>
                      )}

                      {/* Headline */}
                      {localContent.hero.layout && (
                        <EditableElement
                          id="headline"
                          layout={localContent.hero.layout.headline}
                          isSelected={selectedElement === 'headline'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.headline`, data)}
                          type="text"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <h1 className="w-full text-center pointer-events-none whitespace-pre-line">
                            {localContent.hero.headline}
                          </h1>
                        </EditableElement>
                      )}

                      {/* Subheadline */}
                      {localContent.hero.layout && (
                        <EditableElement
                          id="subheadline"
                          layout={localContent.hero.layout.subheadline}
                          isSelected={selectedElement === 'subheadline'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.subheadline`, data)}
                          type="text"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <p className="w-full text-center pointer-events-none">
                            {localContent.hero.subheadline}
                          </p>
                        </EditableElement>
                      )}

                      {/* CTA */}
                      {localContent.hero.layout && (
                        <EditableElement
                          id="cta"
                          layout={localContent.hero.layout.cta}
                          isSelected={selectedElement === 'cta'}
                          onSelect={setSelectedElement}
                          onUpdate={(id, data) => handleLayoutChange(`hero.layout.cta`, data)}
                          type="button"
                          containerWidth={480}
                          onDragStart={() => setIsDragging(true)}
                          onDragEnd={() => setIsDragging(false)}
                        >
                          <div 
                            className="w-full h-full flex items-center justify-center rounded-full text-white font-medium text-sm shadow-lg pointer-events-none"
                            style={{ backgroundColor: `${localContent.theme.primaryColor}dd` }}
                          >
                            {localContent.hero.ctaText}
                          </div>
                        </EditableElement>
                      )}
                    </div>

                    {/* USP 1: Aging */}
                    <div 
                      className={`relative overflow-hidden bg-black ${selectedElement === 'section:usp_aging' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_aging?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_aging?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_aging?.paddingTop || '5rem',
                        paddingBottom: localContent.sectionSpacing?.usp_aging?.paddingBottom || '5rem',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_aging'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_aging' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_aging?.paddingTop || '5rem' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_aging?.paddingBottom || '5rem' }} />
                        </>
                      )}
                      
                      {/* Deep Crimson Glow */}
                      <div className="absolute -bottom-[20%] -right-[20%] w-[500px] h-[500px] rounded-full bg-[#DC143C] opacity-20 blur-[120px] pointer-events-none z-0" />

                      <div className="space-y-6 relative z-10 px-6">
                        <div className="aspect-[4/5] w-full overflow-hidden rounded-sm">
                          <img 
                            src={localContent.usps.aging.image} 
                            alt="Dry Aging" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-2xl font-serif text-white" style={{ fontSize: localContent.usps.aging.titleFontSize || 24 }}>{localContent.usps.aging.title}</h3>
                          <p className="text-gray-400 font-light leading-relaxed text-sm whitespace-pre-line" style={{ fontSize: localContent.usps.aging.descriptionFontSize || 14 }}>
                            {localContent.usps.aging.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USP 2: View */}
                    <div 
                      className={`relative w-full ${selectedElement === 'section:usp_view' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_view?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_view?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_view?.paddingTop || '0',
                        paddingBottom: localContent.sectionSpacing?.usp_view?.paddingBottom || '0',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_view'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_view' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_view?.paddingTop || '0' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_view?.paddingBottom || '0' }} />
                        </>
                      )}

                      <div className="relative w-full h-[400px] overflow-hidden">
                        {/* Background Image */}
                        <img 
                          src={localContent.usps.view.image} 
                          alt="Panoramic View" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

                        {/* Content at Bottom */}
                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left z-20">
                          <h3 className="text-3xl font-serif text-white mb-3 drop-shadow-lg" style={{ fontSize: localContent.usps.view.titleFontSize || 30 }}>
                            {localContent.usps.view.title}
                          </h3>
                          <p className="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line" style={{ fontSize: localContent.usps.view.descriptionFontSize || 14 }}>
                            {localContent.usps.view.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USP 3: Private Room */}
                    <div 
                      className={`relative w-full ${selectedElement === 'section:usp_privateRoom' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_privateRoom?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_privateRoom?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_privateRoom?.paddingTop || '0',
                        paddingBottom: localContent.sectionSpacing?.usp_privateRoom?.paddingBottom || '0',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_privateRoom'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_privateRoom' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_privateRoom?.paddingTop || '0' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_privateRoom?.paddingBottom || '0' }} />
                        </>
                      )}

                      <div className="relative w-full h-[400px] overflow-hidden">
                        {/* Background Image */}
                        <img 
                          src={localContent.usps.privateRoom.image} 
                          alt="Private Room" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/80 to-transparent" />

                        {/* Content at Bottom */}
                        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end items-start text-left z-20">
                          <h3 className="text-3xl font-serif text-white mb-3 drop-shadow-lg" style={{ fontSize: localContent.usps.privateRoom.titleFontSize || 30 }}>
                            {localContent.usps.privateRoom.title}
                          </h3>
                          <p className="text-white/90 font-light leading-relaxed text-sm drop-shadow-md max-w-lg whitespace-pre-line" style={{ fontSize: localContent.usps.privateRoom.descriptionFontSize || 14 }}>
                            {localContent.usps.privateRoom.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* USP 4 & 5: Terrace & Pet */}
                    <div 
                      className={`relative overflow-hidden bg-black ${selectedElement === 'section:usp_terrace_pet' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.usp_terrace_pet?.marginTop,
                        marginBottom: localContent.sectionSpacing?.usp_terrace_pet?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.usp_terrace_pet?.paddingTop || '5rem',
                        paddingBottom: localContent.sectionSpacing?.usp_terrace_pet?.paddingBottom || '5rem',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:usp_terrace_pet'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:usp_terrace_pet' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_terrace_pet?.paddingTop || '5rem' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.usp_terrace_pet?.paddingBottom || '5rem' }} />
                        </>
                      )}

                      {/* Glows */}
                      <div className="absolute -bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#008080] opacity-20 blur-[100px] pointer-events-none z-0" />
                      <div className="absolute -top-[10%] -right-[10%] w-[300px] h-[300px] rounded-full bg-[#9400D3] opacity-20 blur-[100px] pointer-events-none z-0" />

                      <div className="flex flex-col gap-16 px-6 relative z-10">
                        {/* Terrace */}
                        <div className="space-y-4">
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm">
                            <img src={localContent.usps.terrace.image} alt="Terrace" className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-serif text-white" style={{ fontSize: localContent.usps.terrace.titleFontSize || 20 }}>{localContent.usps.terrace.title}</h4>
                            <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line" style={{ fontSize: localContent.usps.terrace.descriptionFontSize || 14 }}>
                              {localContent.usps.terrace.description}
                            </p>
                          </div>
                        </div>

                        {/* Pet */}
                        <div className="space-y-4">
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-sm relative group">
                             <img src={localContent.usps.pet.image} alt="Pet Friendly" className="w-full h-full object-cover" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-serif text-white" style={{ fontSize: localContent.usps.pet.titleFontSize || 20 }}>{localContent.usps.pet.title}</h4>
                            <p className="text-gray-300 font-light text-sm leading-relaxed whitespace-pre-line" style={{ fontSize: localContent.usps.pet.descriptionFontSize || 14 }}>
                              {localContent.usps.pet.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Section (Horizontal Scroll) */}
                    <div 
                      className={`relative overflow-hidden bg-black ${selectedElement === 'section:menu' ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        marginTop: localContent.sectionSpacing?.menu?.marginTop,
                        marginBottom: localContent.sectionSpacing?.menu?.marginBottom,
                        paddingTop: localContent.sectionSpacing?.menu?.paddingTop || '5rem', // Default py-20 is 5rem
                        paddingBottom: localContent.sectionSpacing?.menu?.paddingBottom || '5rem',
                      }}
                      onClick={(e) => { e.stopPropagation(); setSelectedElement('section:menu'); }}
                    >
                      {/* Padding Guides */}
                      {selectedElement === 'section:menu' && (
                        <>
                          <div className="absolute top-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.menu?.paddingTop || '5rem' }} />
                          <div className="absolute bottom-0 left-0 right-0 bg-green-500/20 pointer-events-none z-50" style={{ height: localContent.sectionSpacing?.menu?.paddingBottom || '5rem' }} />
                        </>
                      )}

                      <div className="bg-black/40 backdrop-blur-sm absolute inset-0 z-0"></div>

                      <div className="mb-10 text-center relative z-10 px-6">
                        <h3 className="text-2xl font-serif text-white mb-2">Signature Menu</h3>
                        <div className="w-10 h-[1px] bg-white/30 mx-auto"></div>
                      </div>

                      <div className="relative z-10 w-full overflow-x-auto flex gap-4 px-6 pb-8 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {localContent.menu.map((item, index) => (
                          <div 
                            key={item.id}
                            className="flex-shrink-0 w-[280px] snap-center bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg relative"
                            style={{ height: '380px' }} // Fixed height for container
                          >
                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Delete this menu item?')) {
                                  removeMenuItem(index);
                                }
                              }}
                              className="absolute top-2 right-2 z-50 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                            
                            {/* Center Guide Line for Menu Card */}
                            {(showGuides || isDragging) && (
                              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-cyan-400 z-[60] pointer-events-none opacity-50" />
                            )}

                            {item.layout ? (
                              <>
                                {/* Image */}
                                <EditableElement
                                  id={`menu.${index}.image`}
                                  layout={item.layout.image}
                                  isSelected={selectedElement === `menu.${index}.image`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.image`, data)}
                                  type="image"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </EditableElement>

                                {/* Name */}
                                <EditableElement
                                  id={`menu.${index}.name`}
                                  layout={item.layout.name}
                                  isSelected={selectedElement === `menu.${index}.name`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.name`, data)}
                                  type="text"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <h4 className="w-full pointer-events-none truncate">{item.name}</h4>
                                </EditableElement>

                                {/* Price */}
                                <EditableElement
                                  id={`menu.${index}.price`}
                                  layout={item.layout.price}
                                  isSelected={selectedElement === `menu.${index}.price`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.price`, data)}
                                  type="text"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <span className="w-full pointer-events-none">{item.price}</span>
                                </EditableElement>

                                {/* Description */}
                                <EditableElement
                                  id={`menu.${index}.description`}
                                  layout={item.layout.description}
                                  isSelected={selectedElement === `menu.${index}.description`}
                                  onSelect={setSelectedElement}
                                  onUpdate={(id, data) => handleLayoutChange(`menu.${index}.layout.description`, data)}
                                  type="text"
                                  containerWidth={280}
                                  onDragStart={() => setIsDragging(true)}
                                  onDragEnd={() => setIsDragging(false)}
                                >
                                  <p className="w-full pointer-events-none text-xs line-clamp-2">{item.description}</p>
                                </EditableElement>
                              </>
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                No layout data. Reset content to see default layout.
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Add Button Card */}
                        <div 
                          className="flex-shrink-0 w-[280px] snap-center bg-[#111] border-2 border-dashed border-gray-800 rounded-xl overflow-hidden shadow-lg flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-900/10 transition-all"
                          style={{ height: '380px' }}
                          onClick={addMenuItem}
                        >
                          <div className="text-center text-gray-400">
                            <Plus className="w-12 h-12 mx-auto mb-2" />
                            <span>Add Menu Item</span>
                          </div>
                        </div>
                        
                        <div className="w-2 flex-shrink-0" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Editor Toolbar */}
                {selectedElement && (
                  <div className="w-80 bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-6 overflow-y-auto max-h-[85vh]">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                      <h3 className="font-bold text-lg capitalize">
                        {selectedElement.startsWith('section:') ? 'Spacing Editor' : 'Style Editor'}
                      </h3>
                      <button onClick={() => setSelectedElement(null)} className="text-gray-400 hover:text-white">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Spacing Editor */}
                    {selectedElement.startsWith('section:') && (() => {
                       const sectionKey = selectedElement.split(':')[1];
                       const spacing = localContent.sectionSpacing?.[sectionKey] || { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 };
                       
                       return (
                         <div className="space-y-6">
                           <div className="space-y-4">
                             <h4 className="text-sm font-semibold text-blue-400">Margin (Outside)</h4>
                             <SpacingSlider label="Top Margin" value={spacing.marginTop || 0} onChange={(val) => handleSpacingChange(sectionKey, 'marginTop', val)} />
                             <SpacingSlider label="Bottom Margin" value={spacing.marginBottom || 0} onChange={(val) => handleSpacingChange(sectionKey, 'marginBottom', val)} />
                           </div>
                           <div className="space-y-4 pt-4 border-t border-gray-800">
                             <h4 className="text-sm font-semibold text-green-400">Padding (Inside)</h4>
                             <SpacingSlider label="Top Padding" value={spacing.paddingTop || 0} onChange={(val) => handleSpacingChange(sectionKey, 'paddingTop', val)} />
                             <SpacingSlider label="Bottom Padding" value={spacing.paddingBottom || 0} onChange={(val) => handleSpacingChange(sectionKey, 'paddingBottom', val)} />
                           </div>

                           {/* USP Font Settings */}
                           {sectionKey.startsWith('usp_') && (() => {
                             const uspKey = sectionKey.replace('usp_', '');
                             
                             // Handle special case for terrace_pet
                             if (uspKey === 'terrace_pet') {
                               return (
                                 <div className="space-y-4 pt-4 border-t border-gray-800">
                                   <h4 className="text-sm font-semibold text-purple-400">Terrace Typography</h4>
                                   <SpacingSlider 
                                      label="Title Size" 
                                      value={localContent.usps.terrace.titleFontSize || 20} 
                                      onChange={(v) => handleNestedChange('usps', 'terrace', 'titleFontSize', v)} 
                                   />
                                   <SpacingSlider 
                                      label="Desc Size" 
                                      value={localContent.usps.terrace.descriptionFontSize || 14} 
                                      onChange={(v) => handleNestedChange('usps', 'terrace', 'descriptionFontSize', v)} 
                                   />
                                   
                                   <h4 className="text-sm font-semibold text-purple-400 mt-4">Pet Typography</h4>
                                   <SpacingSlider 
                                      label="Title Size" 
                                      value={localContent.usps.pet.titleFontSize || 20} 
                                      onChange={(v) => handleNestedChange('usps', 'pet', 'titleFontSize', v)} 
                                   />
                                   <SpacingSlider 
                                      label="Desc Size" 
                                      value={localContent.usps.pet.descriptionFontSize || 14} 
                                      onChange={(v) => handleNestedChange('usps', 'pet', 'descriptionFontSize', v)} 
                                   />
                                 </div>
                               );
                             }
                             
                             // Standard USPs
                             const uspData = localContent.usps[uspKey as keyof typeof localContent.usps];
                             if (!uspData) return null;
                             
                             return (
                               <div className="space-y-4 pt-4 border-t border-gray-800">
                                 <h4 className="text-sm font-semibold text-purple-400">Typography</h4>
                                 <SpacingSlider 
                                    label="Title Size" 
                                    value={(uspData as any).titleFontSize || (uspKey === 'aging' ? 24 : 30)} 
                                    onChange={(v) => handleNestedChange('usps', uspKey, 'titleFontSize', v)} 
                                 />
                                 <SpacingSlider 
                                    label="Desc Size" 
                                    value={(uspData as any).descriptionFontSize || 14} 
                                    onChange={(v) => handleNestedChange('usps', uspKey, 'descriptionFontSize', v)} 
                                 />
                               </div>
                             );
                           })()}
                         </div>
                       );
                    })()}

                    {/* Style Editor */}
                    {!selectedElement.startsWith('section:') && (() => {
                      const currentLayout = (() => {
                         if (['headline', 'subheadline', 'cta', 'logo'].includes(selectedElement)) {
                            return localContent.hero.layout?.[selectedElement as 'headline' | 'subheadline' | 'cta' | 'logo'];
                         }
                         if (selectedElement.startsWith('menu.')) {
                            const parts = selectedElement.split('.');
                            const index = parseInt(parts[1]);
                            const field = parts[2];
                            return localContent.menu[index]?.layout?.[field as 'name' | 'price' | 'description' | 'image'];
                         }
                         return null;
                      })();

                      if (!currentLayout) return <div className="text-gray-500">Select an element to edit style.</div>;

                      // Helper to update
                      const updateStyle = (key: string, value: any) => {
                         let path = '';
                         if (['headline', 'subheadline', 'cta', 'logo'].includes(selectedElement)) {
                            path = `hero.layout.${selectedElement}`;
                         } else if (selectedElement.startsWith('menu.')) {
                            const parts = selectedElement.split('.');
                            const index = parts[1];
                            const field = parts[2];
                            path = `menu.${index}.layout.${field}`;
                         }
                         handleLayoutChange(path, { [key]: value });
                      };

                      return (
                        <>
                          {/* Font Family */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Font Family</label>
                            <select 
                              className="w-full bg-[#222] border border-gray-700 rounded-lg p-2 text-white text-sm"
                              value={currentLayout.fontFamily || 'Noto Sans KR'}
                              onChange={(e) => updateStyle('fontFamily', e.target.value)}
                            >
                              <option value="Noto Sans KR">Noto Sans KR (Gothic)</option>
                              <option value="Noto Serif KR">Noto Serif KR (Myungjo)</option>
                              <option value="Pretendard">Pretendard</option>
                              <option value="Nanum Myeongjo">Nanum Myeongjo</option>
                            </select>
                          </div>

                          {/* Font Weight */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Font Weight</label>
                            <select 
                              className="w-full bg-[#222] border border-gray-700 rounded-lg p-2 text-white text-sm"
                              value={currentLayout.fontWeight || 400}
                              onChange={(e) => updateStyle('fontWeight', parseInt(e.target.value))}
                            >
                              <option value="100">Thin (100)</option>
                              <option value="200">Extra Light (200)</option>
                              <option value="300">Light (300)</option>
                              <option value="400">Regular (400)</option>
                              <option value="500">Medium (500)</option>
                              <option value="600">Semi Bold (600)</option>
                              <option value="700">Bold (700)</option>
                              <option value="800">Extra Bold (800)</option>
                              <option value="900">Black (900)</option>
                            </select>
                          </div>

                          {/* Font Size */}
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-xs font-medium text-gray-400 uppercase">Font Size</label>
                              <span className="text-xs text-gray-400">{currentLayout.fontSize}px</span>
                            </div>
                            <input 
                              type="range" 
                              min="10" 
                              max="100" 
                              value={currentLayout.fontSize || 16} 
                              onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>

                          {/* Color */}
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Text Color</label>
                            <div className="flex gap-2">
                              <input 
                                type="color" 
                                value={currentLayout.color || '#ffffff'} 
                                onChange={(e) => updateStyle('color', e.target.value)}
                                className="w-10 h-10 rounded cursor-pointer bg-transparent"
                              />
                              <input 
                                type="text" 
                                value={currentLayout.color || '#ffffff'} 
                                onChange={(e) => updateStyle('color', e.target.value)}
                                className="flex-1 bg-[#222] border border-gray-700 rounded-lg p-2 text-white text-sm"
                              />
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usps' && (
              <div className="space-y-8">
                {Object.entries(localContent.usps).map(([key, usp]) => {
                  const typedUsp = usp as { title: string; description: string; image: string; titleFontSize?: number; descriptionFontSize?: number; };
                  return (
                    <div key={key} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                      <h3 className="text-lg font-medium mb-4 capitalize text-blue-400">{key} Section</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <SpacingSlider 
                          label="제목 폰트 크기" 
                          value={typedUsp.titleFontSize || (key === 'aging' ? 24 : key === 'terrace' || key === 'pet' ? 20 : 30)} 
                          onChange={(v) => handleNestedChange('usps', key, 'titleFontSize', v)} 
                        />
                        <SpacingSlider 
                          label="설명 폰트 크기" 
                          value={typedUsp.descriptionFontSize || 14} 
                          onChange={(v) => handleNestedChange('usps', key, 'descriptionFontSize', v)} 
                        />
                      </div>
                      <InputGroup 
                        label="제목" 
                        value={typedUsp.title} 
                        onChange={(v: string) => handleNestedChange('usps', key, 'title', v)} 
                      />
                      <InputGroup 
                        label="설명" 
                        value={typedUsp.description} 
                        onChange={(v: string) => handleNestedChange('usps', key, 'description', v)} 
                        textarea
                      />
                      <InputGroup 
                        label="이미지 URL" 
                        value={typedUsp.image} 
                        onChange={(v: string) => handleNestedChange('usps', key, 'image', v)} 
                      />
                      <div className="mt-2 rounded-lg overflow-hidden h-32 w-32 border border-gray-700">
                        <img src={typedUsp.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                {localContent.menu.map((item, index) => (
                  <div key={item.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative group">
                    <button 
                      onClick={() => removeMenuItem(index)}
                      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputGroup 
                        label="메뉴명" 
                        value={item.name} 
                        onChange={(v: string) => handleMenuChange(index, 'name', v)} 
                      />
                      <InputGroup 
                        label="가격" 
                        value={item.price} 
                        onChange={(v: string) => handleMenuChange(index, 'price', v)} 
                      />
                    </div>
                    <InputGroup 
                      label="설명" 
                      value={item.description} 
                      onChange={(v: string) => handleMenuChange(index, 'description', v)} 
                      textarea
                    />
                    <InputGroup 
                      label="이미지 URL" 
                      value={item.image} 
                      onChange={(v: string) => handleMenuChange(index, 'image', v)} 
                    />
                    <div className="flex gap-4 items-center mt-2">
                       <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-700 bg-gray-800">
                          <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                       </div>
                       <span className="text-xs text-gray-500">이미지 미리보기</span>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={addMenuItem}
                  className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  새 메뉴 추가하기
                </button>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(localContent.gallery || []).map((image, index) => (
                    <div key={index} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 relative group">
                      <button 
                        onClick={() => removeGalleryItem(index)}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-600 transition-colors z-10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 bg-gray-800">
                        <img src={image} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                      </div>
                      <InputGroup 
                        label={`이미지 URL ${index + 1}`} 
                        value={image} 
                        onChange={(v: string) => handleGalleryChange(index, v)} 
                      />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addGalleryItem}
                  className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  새 이미지 추가하기
                </button>
              </div>
            )}

            {activeTab === 'notices' && (
              <div className="space-y-6">
                {(localContent.notices || []).map((notice, index) => (
                  <div key={notice.id} className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 relative group">
                    <button 
                      onClick={() => removeNotice(index)}
                      className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputGroup 
                        label="제목" 
                        value={notice.title} 
                        onChange={(v: string) => handleNoticeChange(index, 'title', v)} 
                      />
                      <InputGroup 
                        label="날짜" 
                        value={notice.date} 
                        onChange={(v: string) => handleNoticeChange(index, 'date', v)} 
                        type="date"
                      />
                    </div>
                    <InputGroup 
                      label="내용 (줄바꿈 가능)" 
                      value={notice.content} 
                      onChange={(v: string) => handleNoticeChange(index, 'content', v)} 
                      textarea
                    />
                  </div>
                ))}
                <button 
                  onClick={addNotice}
                  className="w-full py-4 border-2 border-dashed border-gray-700 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  새 공지사항 추가하기
                </button>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <InputGroup 
                  label="주소" 
                  value={localContent.contact.address} 
                  onChange={(v: string) => handleChange('contact', 'address', v)} 
                />
                <InputGroup 
                  label="전화번호" 
                  value={localContent.contact.phone} 
                  onChange={(v: string) => handleChange('contact', 'phone', v)} 
                />
                <InputGroup 
                  label="영업시간" 
                  value={localContent.contact.hours} 
                  onChange={(v: string) => handleChange('contact', 'hours', v)} 
                />
                <InputGroup 
                  label="네이버 지도 URL" 
                  value={localContent.contact.naverMapUrl} 
                  onChange={(v: string) => handleChange('contact', 'naverMapUrl', v)} 
                />
                <InputGroup 
                  label="인스타그램 URL" 
                  value={localContent.contact.instagram} 
                  onChange={(v: string) => handleChange('contact', 'instagram', v)} 
                />
                <InputGroup 
                  label="블로그 URL" 
                  value={localContent.contact.blog} 
                  onChange={(v: string) => handleChange('contact', 'blog', v)} 
                />
                <InputGroup 
                  label="지도 이미지 URL" 
                  value={localContent.contact.mapImage} 
                  onChange={(v: string) => handleChange('contact', 'mapImage', v)} 
                />
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-6 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
                <InputGroup 
                  label="포인트 컬러 (Primary)" 
                  value={localContent.theme.primaryColor} 
                  onChange={(v: string) => handleChange('theme', 'primaryColor', v)} 
                  type="color"
                />
                <InputGroup 
                  label="배경 컬러 (Background)" 
                  value={localContent.theme.backgroundColor} 
                  onChange={(v: string) => handleChange('theme', 'backgroundColor', v)} 
                  type="color"
                />
                <div className="p-4 rounded-lg border border-gray-700 flex items-center justify-center gap-4" style={{ backgroundColor: localContent.theme.backgroundColor }}>
                  <button 
                    className="px-6 py-2 rounded-full text-white text-sm"
                    style={{ backgroundColor: localContent.theme.primaryColor }}
                  >
                    Button Preview
                  </button>
                  <span className="text-white font-serif">Font Preview</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
