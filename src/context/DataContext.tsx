import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our content
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  layout?: {
    image: LayoutData;
    name: LayoutData;
    price: LayoutData;
    description: LayoutData;
  };
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface LayoutData {
  x: number;
  y: number;
  width: number | string;
  height: number | string;
  // Text Styling
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  textStrokeWidth?: number;
  textStrokeColor?: string;
  textShadowColor?: string;
  textShadowOffsetX?: number;
  textShadowOffsetY?: number;
  textShadowBlur?: number;
  color?: string;
}

export interface Spacing {
  marginTop: number;
  marginBottom: number;
  paddingTop: number;
  paddingBottom: number;
}

export interface SiteContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    backgroundImage: string;
    logo: string;
    layout?: {
      headline: LayoutData;
      subheadline: LayoutData;
      cta: LayoutData;
      logo: LayoutData;
    };
  };
  sectionSpacing: {
    [key: string]: Spacing;
  };
  usps: {
    aging: { title: string; description: string; image: string; titleFontSize?: number; descriptionFontSize?: number; };
    view: { title: string; description: string; image: string; titleFontSize?: number; descriptionFontSize?: number; };
    privateRoom: { title: string; description: string; image: string; titleFontSize?: number; descriptionFontSize?: number; };
    terrace: { title: string; description: string; image: string; titleFontSize?: number; descriptionFontSize?: number; };
    pet: { title: string; description: string; image: string; titleFontSize?: number; descriptionFontSize?: number; };
  };
  menu: MenuItem[];
  notices: Notice[];
  gallery: string[];
  contact: {
    address: string;
    phone: string;
    hours: string;
    instagram: string;
    blog: string;
    naverMapUrl: string;
    mapImage: string;
  };
  theme: {
    primaryColor: string; // e.g., #0047AB
    backgroundColor: string; // e.g., #111111
  };
}

export const defaultContent: SiteContent = {
  hero: {
    headline: "유럽 감성의 통창 뷰,\n분위기 맛집 스테리",
    subheadline: "서울에서 만나는 가장 완벽한 스테이크",
    ctaText: "예약하기",
    backgroundImage: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1000&auto=format&fit=crop",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    layout: {
      logo: {
        x: 190, y: 40, width: 100, height: 'auto',
      },
      headline: { 
        x: 20, y: 140, width: 440, height: 'auto',
        fontFamily: 'Noto Serif KR', fontSize: 30, color: '#ffffff',
        textStrokeWidth: 0, textStrokeColor: '#000000',
        textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffsetX: 0, textShadowOffsetY: 4, textShadowBlur: 6
      },
      subheadline: { 
        x: 20, y: 600, width: 440, height: 'auto',
        fontFamily: 'Noto Sans KR', fontSize: 14, color: '#f3f4f6',
        textStrokeWidth: 0, textStrokeColor: '#000000',
        textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffsetX: 0, textShadowOffsetY: 2, textShadowBlur: 4
      },
      cta: { 
        x: 140, y: 680, width: 200, height: 'auto',
        fontFamily: 'Noto Sans KR', fontSize: 14, color: '#ffffff'
      },
    }
  },
  sectionSpacing: {
    hero: { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    usp_aging: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
    usp_view: { marginTop: 0, marginBottom: 0, paddingTop: 128, paddingBottom: 128 },
    usp_privateRoom: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
    usp_terrace_pet: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
    menu: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
    gallery: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
    notices: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
    contact: { marginTop: 0, marginBottom: 0, paddingTop: 80, paddingBottom: 80 },
  },
  usps: {
    aging: {
      title: "168시간의 기다림,\n드라이에이징 스테이크",
      description: "최적의 온도와 습도에서 168시간 동안 숙성하여 깊은 풍미와 부드러운 식감을 완성했습니다.",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop",
      titleFontSize: 24,
      descriptionFontSize: 14,
    },
    view: {
      title: "도심 속 파노라마 뷰",
      description: "탁 트인 통창 너머로 펼쳐지는 아름다운 야경과 함께 로맨틱한 식사를 즐기세요.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
      titleFontSize: 30,
      descriptionFontSize: 14,
    },
    privateRoom: {
      title: "프라이빗 다이닝 룸",
      description: "2인부터 14인까지 수용 가능한 프라이빗 룸에서 소중한 사람들과 오붓한 시간을 보내세요.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
      titleFontSize: 30,
      descriptionFontSize: 14,
    },
    terrace: {
      title: "로맨틱 테라스",
      description: "선선한 바람과 함께 와인 한 잔의 여유를 즐길 수 있는 야외 테라스 공간입니다.",
      image: "https://images.unsplash.com/photo-1519671482538-518b5c2bf1c6?q=80&w=1000&auto=format&fit=crop",
      titleFontSize: 20,
      descriptionFontSize: 14,
    },
    pet: {
      title: "반려견 동반 가능",
      description: "사랑하는 반려견과 함께 특별한 추억을 만드세요. 펫 프렌들리 존이 마련되어 있습니다.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000&auto=format&fit=crop",
      titleFontSize: 20,
      descriptionFontSize: 14,
    },
  },
  menu: [
    {
      id: '1',
      name: "채끝 스테이크",
      description: "고소한 풍미와 쫄깃한 식감이 일품인 스테리의 시그니처 스테이크",
      price: "89,000원",
      image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=1000&auto=format&fit=crop",
      layout: {
        image: { x: 0, y: 0, width: 280, height: 200 },
        name: { x: 20, y: 220, width: 240, height: 'auto', fontSize: 18, fontFamily: 'Noto Sans KR', color: '#ffffff' },
        price: { x: 20, y: 250, width: 240, height: 'auto', fontSize: 16, fontFamily: 'Noto Serif KR', color: '#0047AB' },
        description: { x: 20, y: 280, width: 240, height: 'auto', fontSize: 12, fontFamily: 'Noto Sans KR', color: '#9ca3af' }
      }
    },
    {
      id: '2',
      name: "토마호크 스테이크",
      description: "압도적인 비주얼과 풍부한 육즙을 자랑하는 프리미엄 스테이크",
      price: "145,000원",
      image: "https://images.unsplash.com/photo-1544025162-d76690b60943?q=80&w=1000&auto=format&fit=crop",
      layout: {
        image: { x: 0, y: 0, width: 280, height: 200 },
        name: { x: 20, y: 220, width: 240, height: 'auto', fontSize: 18, fontFamily: 'Noto Sans KR', color: '#ffffff' },
        price: { x: 20, y: 250, width: 240, height: 'auto', fontSize: 16, fontFamily: 'Noto Serif KR', color: '#0047AB' },
        description: { x: 20, y: 280, width: 240, height: 'auto', fontSize: 12, fontFamily: 'Noto Sans KR', color: '#9ca3af' }
      }
    },
    {
      id: '3',
      name: "감태 명란 파스타",
      description: "향긋한 감태와 짭조름한 명란이 어우러진 오일 파스타",
      price: "28,000원",
      image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1000&auto=format&fit=crop",
      layout: {
        image: { x: 0, y: 0, width: 280, height: 200 },
        name: { x: 20, y: 220, width: 240, height: 'auto', fontSize: 18, fontFamily: 'Noto Sans KR', color: '#ffffff' },
        price: { x: 20, y: 250, width: 240, height: 'auto', fontSize: 16, fontFamily: 'Noto Serif KR', color: '#0047AB' },
        description: { x: 20, y: 280, width: 240, height: 'auto', fontSize: 12, fontFamily: 'Noto Sans KR', color: '#9ca3af' }
      }
    },
  ],
  notices: [
    {
      id: '1',
      title: "여름 시즌 한정 메뉴 출시",
      content: "무더운 여름을 맞아 시원한 콜드 파스타와\n상큼한 에이드를 준비했습니다.\n\n기간: 7월 1일 ~ 8월 31일",
      date: "2024-06-20",
    },
    {
      id: '2',
      title: "와인 콜키지 프리 이벤트",
      content: "평일 디너 예약 시\n테이블당 와인 1병 콜키지 프리 혜택을 드립니다.",
      date: "2024-06-15",
    }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544025162-d76690b60943?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519671482538-518b5c2bf1c6?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop",
  ],
  contact: {
    address: "서울특별시 강남구 도산대로 123, 스테리 빌딩 2층",
    phone: "02-1234-5678",
    hours: "매일 11:30 - 22:00 (B.T 15:00 - 17:00)",
    instagram: "https://instagram.com",
    blog: "https://blog.naver.com",
    naverMapUrl: "https://map.naver.com",
    mapImage: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop",
  },
  theme: {
    primaryColor: "#0047AB",
    backgroundColor: "#111111",
  },
};

interface DataContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const deepMerge = (target: any, source: any) => {
  const output = { ...target };
  if (source && typeof source === 'object' && !Array.isArray(source)) {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const savedContent = localStorage.getItem('site_content_v1');
        if (savedContent) {
          setContent(deepMerge(defaultContent, JSON.parse(savedContent)));
        }
      } catch (e) {
        console.error("Failed to load content from localStorage", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem('site_content_v1', JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save content to localStorage", e);
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    try {
      localStorage.setItem('site_content_v1', JSON.stringify(defaultContent));
    } catch (e) {
      console.error("Failed to reset content in localStorage", e);
    }
  };

  return (
    <DataContext.Provider value={{ content, updateContent, resetContent, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
