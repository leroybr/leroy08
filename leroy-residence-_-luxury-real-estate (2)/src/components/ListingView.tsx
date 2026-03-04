import React from 'react';
import { Property, ListingType } from '../types';
import { MapPin, ArrowLeft } from 'lucide-react';

interface ListingViewProps {
  category: 'sale' | 'rent' | 'all';
  properties: Property[];
  onClearFilters: () => void;
  onPropertyClick: (id: string) => void;
  onGoHome: () => void;
}

const ListingView: React.FC<ListingViewProps> = ({ category, properties, onPropertyClick, onGoHome }) => {
  const filteredProperties = properties.filter(p => {
    if (category === 'sale') return p.listingType === ListingType.SALE;
    if (category === 'rent') return p.listingType === ListingType.RENT;
    return true;
  });

  const heroConfig = {
    sale: {
      title: 'Propiedades en Venta',
      subtitle: 'Descubre las residencias más exclusivas del mercado',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop'
    },
    rent: {
      title: 'Propiedades en Arriendo',
      subtitle: 'Vive la experiencia del lujo temporal',
      image: 'https://images.unsplash.com/photo-1600607687940-4e524cb35797?q=80&w=1920&auto=format&fit=crop'
    },
    all: {
      title: 'Catálogo de Lujo',
      subtitle: 'Explora nuestra colección completa de propiedades',
      image: 'https://images.unsplash.com/photo-1600596542815-2a434f678417?q=80&w=1920&auto=format&fit=crop'
    }
  };

  const currentHero = heroConfig[category] || heroConfig.all;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section for Listing */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={currentHero.image} 
            alt={currentHero.title}
            className="w-full h-full object-cover animate-slowZoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-8 max-w-4xl">
          <button 
            onClick={onGoHome} 
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Volver al inicio
          </button>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 animate-slideInRight">
            {currentHero.title}
          </h1>
          <p className="text-sm md:text-base font-bold uppercase tracking-[0.4em] text-leroy-orange animate-fadeIn">
            {currentHero.subtitle}
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-3xl font-serif text-leroy-black mb-2">Resultados</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {filteredProperties.length} Propiedades encontradas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {filteredProperties.map((p) => (
            <div 
              key={p.id} 
              className="group cursor-pointer fade-in"
              onClick={() => onPropertyClick(p.id)}
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 relative bg-gray-100">
                <img 
                  src={p.imageUrl} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-leroy-black shadow-sm">
                  {p.currency} {p.price.toLocaleString()}
                </div>
                {p.isPremium && (
                  <div className="absolute top-6 right-6 bg-leroy-orange text-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm">
                    Premium
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-serif mb-2 group-hover:text-leroy-orange transition-colors duration-500">{p.title}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{p.subtitle}</p>
              <div className="flex items-center gap-2 text-gray-400 border-t border-gray-50 pt-4">
                <MapPin size={14} className="text-leroy-orange" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{p.location}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-gray-300">No se encontraron propiedades en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingView;
