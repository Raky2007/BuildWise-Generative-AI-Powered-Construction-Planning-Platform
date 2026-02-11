
import React, { useState, useEffect, useRef } from 'react';
import { ProjectInfo, ProjectType } from '../types';

interface ProjectFormProps {
  onSubmit: (data: ProjectInfo) => void;
  isLoading: boolean;
}

const INDIAN_CITIES = [
  "Mumbai, Maharashtra", "Delhi, NCR", "Bengaluru, Karnataka", "Hyderabad, Telangana",
  "Ahmedabad, Gujarat", "Chennai, Tamil Nadu", "Kolkata, West Bengal", "Surat, Gujarat",
  "Pune, Maharashtra", "Jaipur, Rajasthan", "Lucknow, Uttar Pradesh", "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra", "Indore, Madhya Pradesh", "Thane, Maharashtra", "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh", "Pimpri-Chinchwad, Maharashtra", "Patna, Bihar", "Vadodara, Gujarat",
  "Ghaziabad, Uttar Pradesh", "Ludhiana, Punjab", "Coimbatore, Tamil Nadu", "Agra, Uttar Pradesh",
  "Madurai, Tamil Nadu", "Nashik, Maharashtra", "Vijayawada, Andhra Pradesh", "Faridabad, Haryana",
  "Meerut, Uttar Pradesh", "Rajkot, Gujarat"
];

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProjectInfo>({
    name: 'My New Home',
    type: 'residential',
    area: 1500,
    floors: 2,
    budget: 5000000,
    timeline: 10,
    location: '',
  });

  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'location') {
      const filtered = INDIAN_CITIES.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setCitySuggestions(filtered);
      setShowSuggestions(true);
    }

    setFormData(prev => ({
      ...prev,
      [name]: name === 'area' || name === 'floors' || name === 'budget' || name === 'timeline' ? Number(value) : value,
    }));
  };

  const selectCity = (city: string) => {
    setFormData(prev => ({ ...prev, location: city }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-10 text-center">
        <div className="inline-block px-3 py-1 bg-orange-500 text-black text-[9px] font-black tracking-widest uppercase rounded-full mb-4 shadow-sm">Project Setup</div>
        <h2 className="text-3xl font-black text-black tracking-tight mb-2">Build Your Plan</h2>
        <p className="text-slate-500 font-semibold text-sm">Fill in the details below to create your construction plan instantly.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-full">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all font-bold text-black placeholder-slate-400"
            placeholder="e.g. My Dream House"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Building Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all appearance-none font-bold text-black"
          >
            <option value="residential">House / Flat</option>
            <option value="commercial">Shop / Office</option>
            <option value="industrial">Factory / Warehouse</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Total Area (Sq. Ft.)</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all font-bold text-black"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Number of Floors</label>
          <input
            type="number"
            name="floors"
            value={formData.floors}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all font-bold text-black"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Total Budget (₹)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all font-bold text-black"
            required
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Time to Build (Months)</label>
          <input
            type="number"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all font-bold text-black"
            required
          />
        </div>

        <div className="relative" ref={suggestionRef}>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">City / Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-6 py-4 rounded-xl border-2 border-slate-50 bg-white focus:border-orange-500 outline-none transition-all font-bold text-black"
            placeholder="Type your city..."
            autoComplete="off"
            required
          />
          {showSuggestions && citySuggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden">
              {citySuggestions.map((city, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectCity(city)}
                  className="w-full text-left px-5 py-3 hover:bg-orange-500 hover:text-black text-xs font-bold text-slate-700 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-full pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-orange-500 hover:text-black text-white font-black py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 group text-sm uppercase tracking-widest"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white group-hover:text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Show My Plan
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
