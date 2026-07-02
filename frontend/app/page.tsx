'use client';

import { useState } from 'react';
import { aiModels, AIModel } from '../data/models';

export default function Home() {
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeModel = aiModels[0];

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeature.trim()) return;
    setCustomFeatures([...customFeatures, newFeature.trim()]);
    setNewFeature('');
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setCustomFeatures(customFeatures.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmitRequest = async () => {
    if (customFeatures.length === 0) return;
    
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/customization/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baseModel: activeModel.id,
          features: customFeatures,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatusMessage('Customization requested successfully. Our team will be in touch.');
        setCustomFeatures([]);
      } else {
        setStatusMessage('Submission failed. Please try again.');
      }
    } catch (error) {
      setStatusMessage('Error connecting to backend service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-200">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="font-bold tracking-tighter text-xl">Platform.io</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-600">
          <a href="#" className="hover:text-black">Products</a>
          <a href="#" className="hover:text-black">Solutions</a>
          <a href="#" className="hover:text-black">Research</a>
          <a href="#" className="hover:text-black">Company</a>
        </div>
        <button className="text-sm font-medium border border-neutral-200 hover:border-neutral-400 rounded-full px-6 py-2 transition-all">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center px-8 py-20 max-w-7xl mx-auto">
        <div className="pr-12">
          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-4">AI Customization</p>
          <h1 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight mb-6">
            Your business is specialized. <br /> Your AI should be too.
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-md leading-relaxed">
            Work with our leading AI experts to build high-performance models tailored exclusively to your unique data, end-users, and infrastructure.
          </p>
          <button 
            onClick={() => document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-neutral-900 hover:bg-black text-white text-sm font-medium rounded-full px-8 py-3.5 transition-all shadow-lg hover:shadow-xl"
          >
            Start building
          </button>
        </div>

        {/* Hero Decorative Card (Mimicking the dark glassmorphic UI in the screenshot) */}
        <div className="bg-neutral-950 rounded-[2rem] p-8 h-[500px] relative overflow-hidden shadow-2xl flex flex-col justify-center border border-neutral-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full"></div>
          <div className="space-y-4 relative z-10 w-3/4">
            {['Conversational Agents', 'Security & Privacy', 'Routing & Escalation', 'Custom Model Training', 'Real-Time Analytics'].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl text-sm font-medium border ${i === 3 ? 'bg-white text-black border-white' : 'bg-neutral-900/50 text-neutral-400 border-neutral-800'}`}>
                {item}
              </div>
            ))}
          </div>
          {/* Abstract Network Graphic */}
          <div className="absolute bottom-12 right-12 opacity-40">
             <svg width="180" height="120" viewBox="0 0 180 120" fill="none" stroke="currentColor" strokeWidth="1" className="text-white">
                <path d="M10 60 L60 20 L110 60 L160 20 M10 60 L60 100 L110 60 L160 100 M60 20 L60 100 M110 20 L110 100" />
                <circle cx="10" cy="60" r="4" fill="white"/> <circle cx="60" cy="20" r="4" fill="white"/>
                <circle cx="60" cy="100" r="4" fill="white"/> <circle cx="110" cy="60" r="4" fill="white"/>
                <circle cx="160" cy="20" r="4" fill="white"/> <circle cx="160" cy="100" r="4" fill="white"/>
             </svg>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <section className="py-12 border-y border-neutral-100 bg-neutral-50/50">
        <p className="text-center text-sm font-medium text-neutral-500 mb-8">Trusted by leading enterprises</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
          {/* Placeholders for enterprise logos */}
          <div className="text-xl font-bold font-serif tracking-tighter">Acme Corp</div>
          <div className="text-xl font-black italic tracking-widest">GLOBAL</div>
          <div className="text-xl font-medium tracking-tight">TechFlow</div>
          <div className="text-xl font-bold uppercase tracking-widest">Nexus</div>
        </div>
      </section>

      {/* Interactive Customization Section */}
      <section id="customizer" className="py-32 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-medium tracking-tight mb-4">Low-effort, high-impact customization</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Let our platform handle the heavy lifting — from data annotation to compute — so you can get to production faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          {/* Left: Decorative Orange Card */}
          <div className="bg-gradient-to-br from-[#ff6b4a] to-[#ff4a2b] rounded-[2rem] h-[450px] p-10 relative overflow-hidden shadow-2xl shadow-orange-500/20 text-white flex flex-col justify-between">
             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
             <div>
                <div className="text-xs font-bold tracking-widest uppercase opacity-80 mb-1">Active Architecture</div>
                <div className="text-3xl font-medium">{activeModel.name}</div>
             </div>
             
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl relative z-10">
                <div className="text-sm opacity-90 mb-4">{activeModel.tagline}</div>
                <div className="space-y-2">
                  {activeModel.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-3 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                      {feature}
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* Right: Functional Form (Mimicking the accordion list) */}
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-medium tracking-tight border-b border-neutral-200 pb-4">Define Custom Pipeline</h3>
            
            <form onSubmit={handleAddFeature} className="flex gap-3 pt-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., Domain-specific fine-tuning"
                className="flex-1 bg-neutral-50 border border-neutral-200 focus:border-black rounded-full px-5 py-3 text-sm outline-none transition-all"
              />
              <button type="submit" className="bg-neutral-100 hover:bg-neutral-200 text-black text-sm font-medium px-6 py-3 rounded-full transition-all">
                Add
              </button>
            </form>

            <div className="min-h-[160px] space-y-3 pt-4">
              {customFeatures.length === 0 ? (
                <p className="text-sm text-neutral-400 italic">No custom parameters added yet.</p>
              ) : (
                customFeatures.map((feature, index) => (
                  <div key={index} className="group flex justify-between items-center bg-white border border-neutral-200 px-5 py-4 rounded-2xl shadow-sm hover:border-neutral-300 transition-all">
                    <span className="text-sm font-medium">{feature}</span>
                    <button 
                      onClick={() => handleRemoveFeature(index)}
                      className="text-neutral-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {customFeatures.length > 0 && (
              <div className="pt-6 border-t border-neutral-100">
                <button
                  onClick={handleSubmitRequest}
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-medium py-4 rounded-full text-sm transition-all shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Compile & Request Setup'}
                </button>
              </div>
            )}

            {statusMessage && (
               <div className={`text-sm p-4 rounded-2xl text-center ${statusMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                 {statusMessage}
               </div>
            )}
          </div>
        </div>
      </section>

      {/* 3-Column Features Section */}
      <section className="py-24 bg-neutral-50 px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Mobilize your proprietary data.<br/>Maximize your competitive edge.</h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { title: 'Tailored to your needs', desc: 'Augment our cutting-edge models with your proprietary data to build transformative applications.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
            { title: 'Scalable and efficient', desc: 'Our solutions are designed to scale as your business grows, helping you limit costs without compromising performance.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            { title: 'Completely private', desc: 'All custom models can be deployed privately so your data remains entirely within your own secure environment.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
          ].map((feature, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <svg className="w-5 h-5 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feature.icon}></path>
                </svg>
              </div>
              <h4 className="font-medium text-lg mb-3">{feature.title}</h4>
              <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}