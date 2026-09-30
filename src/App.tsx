import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemStatement } from './components/ProblemStatement';
import { SolutionOverview } from './components/SolutionOverview';
import { ProductModules } from './components/ProductModules';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { SocialProof } from './components/SocialProof';
import { FeaturesGrid } from './components/FeaturesGrid';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

// Pages
import { LocumProvisionPage } from './components/pages/LocumProvisionPage';
import { RecruitmentSoftwarePage } from './components/pages/RecruitmentSoftwarePage';
import { CareManagementPage } from './components/pages/CareManagementPage';
import { RecruitmentServicePage } from './components/pages/RecruitmentServicePage';
import { ProductDesignPage } from './components/pages/ProductDesignPage';
import { WebDevelopmentPage } from './components/pages/WebDevelopmentPage';

// Modals
import { BookDemoModal } from './components/modals/BookDemoModal';
import { FreeTrialModal } from './components/modals/FreeTrialModal';
import { VideoModal } from './components/modals/VideoModal';
import { ModuleDetailModal } from './components/modals/ModuleDetailModal';
import { CaseStudyModal } from './components/modals/CaseStudyModal';

import { PRODUCT_MODULES } from './data/mockData';
import { UserRole, ProductModule } from './types';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>('all');
  const [activeView, setActiveView] = useState<string>('home');
  
  // Modal states
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [freeTrialOpen, setFreeTrialOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ProductModule | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [initialDemoModule, setInitialDemoModule] = useState('All Modules');

  const handleNavigate = (viewId: string) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModule = (modId: string) => {
    if (modId === 'recruitment' || modId === 'recruitment-software') {
      handleNavigate('recruitment-software');
    } else if (modId === 'care-management') {
      handleNavigate('care-management');
    } else if (modId === 'locums-staffing' || modId === 'locum-provision') {
      handleNavigate('locum-provision');
    } else if (modId === 'recruitment-service') {
      handleNavigate('recruitment-service');
    } else if (modId === 'product-design') {
      handleNavigate('product-design');
    } else if (modId === 'web-development') {
      handleNavigate('web-development');
    } else {
      const found = PRODUCT_MODULES.find(m => m.id === modId);
      if (found) {
        setSelectedModule(found);
      }
    }
  };

  const handleBookDemoWithModule = (moduleTitle?: string) => {
    setInitialDemoModule(moduleTitle || 'All Modules');
    setBookDemoOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-slate-900 selection:text-white">
      
      {/* Header */}
      <Navbar
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        onBookDemo={(mod) => handleBookDemoWithModule(mod)}
        onStartTrial={() => setFreeTrialOpen(true)}
        onNavigate={handleNavigate}
        activeView={activeView}
      />

      {/* Main View Router */}
      <main>
        {activeView === 'home' && (
          <>
            <Hero
              activeRole={activeRole}
              onRoleChange={setActiveRole}
              onBookDemo={() => handleBookDemoWithModule()}
              onStartTrial={() => setFreeTrialOpen(true)}
              onWatchVideo={() => setVideoModalOpen(true)}
              onOpenModule={handleOpenModule}
            />

            <ProblemStatement onBookDemo={() => handleBookDemoWithModule()} />

            <SolutionOverview
              onOpenModule={handleOpenModule}
              onBookDemo={() => handleBookDemoWithModule()}
            />

            <ProductModules
              onOpenModule={handleOpenModule}
              onBookDemo={handleBookDemoWithModule}
            />

            <HowItWorks
              onBookDemo={() => handleBookDemoWithModule()}
              onStartTrial={() => setFreeTrialOpen(true)}
            />

            <Benefits onBookDemo={() => handleBookDemoWithModule()} />

            <SocialProof
              onOpenCaseStudy={() => setCaseStudyOpen(true)}
              onBookDemo={() => handleBookDemoWithModule()}
            />

            <FeaturesGrid onBookDemo={() => handleBookDemoWithModule()} />

            <Pricing
              onBookDemo={() => handleBookDemoWithModule()}
              onStartTrial={() => setFreeTrialOpen(true)}
            />

            <FAQ onBookDemo={() => handleBookDemoWithModule()} />

            <FinalCTA
              onBookDemo={() => handleBookDemoWithModule()}
              onStartTrial={() => setFreeTrialOpen(true)}
            />
          </>
        )}

        {/* Dedicated Landing Pages */}
        {activeView === 'locum-provision' && (
          <LocumProvisionPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Locum Provision')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}

        {activeView === 'recruitment-software' && (
          <RecruitmentSoftwarePage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Recruitment Software')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}

        {activeView === 'care-management' && (
          <CareManagementPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Care Management Software')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}

        {activeView === 'recruitment-service' && (
          <RecruitmentServicePage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Recruitment Service')}
            onStartTrial={() => setFreeTrialOpen(true)}
          />
        )}

        {activeView === 'product-design' && (
          <ProductDesignPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Product Design Service')}
          />
        )}

        {activeView === 'web-development' && (
          <WebDevelopmentPage
            onBackToHome={() => handleNavigate('home')}
            onBookDemo={(mod) => handleBookDemoWithModule(mod || 'Web Development Service')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onBookDemo={() => handleBookDemoWithModule()}
        onStartTrial={() => setFreeTrialOpen(true)}
      />

      {/* Interactive Modals */}
      <BookDemoModal
        isOpen={bookDemoOpen}
        onClose={() => setBookDemoOpen(false)}
        initialModule={initialDemoModule}
      />

      <FreeTrialModal
        isOpen={freeTrialOpen}
        onClose={() => setFreeTrialOpen(false)}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        onBookDemo={() => handleBookDemoWithModule()}
      />

      <ModuleDetailModal
        module={selectedModule}
        isOpen={!!selectedModule}
        onClose={() => setSelectedModule(null)}
        onBookDemo={(modTitle) => handleBookDemoWithModule(modTitle)}
      />

      <CaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
        onBookDemo={() => handleBookDemoWithModule('Meadowview Case Study')}
      />

    </div>
  );
}
