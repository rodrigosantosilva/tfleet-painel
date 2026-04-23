import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-painel',
  imports: [SidebarComponent, ToolbarComponent, FooterComponent, CommonModule ],
  templateUrl: './painel.component.html',
  styleUrl: './painel.component.scss' 
})
export class PainelComponent  implements OnInit {

  mobile: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 768) { // 768px portrait
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

}
