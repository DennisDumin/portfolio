import { Component } from '@angular/core';
import { HeroSectionComponent } from '../hero/hero.component';

@Component({
  selector: 'app-about-me',
  imports: [HeroSectionComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
