import { Routes } from '@angular/router';

import { AboutMeComponent } from './components/about-me/about-me.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  { path: '', component: AboutMeComponent, title: 'Dennis Dumin | Junior Full-Stack Developer' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Projects | Dennis Dumin' },
  { path: 'contact', component: ContactComponent, title: 'Contact | Dennis Dumin' },
  { path: 'legal-notice', component: LegalNoticeComponent, title: 'Legal Notice | Dennis Dumin' },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, title: 'Privacy Policy | Dennis Dumin' },
  { path: '**', redirectTo: '' }
];
