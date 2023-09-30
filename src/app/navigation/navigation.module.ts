import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';

import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'side-nav', component: SideNavComponent},
  {path: 'top-nav', component: TopNavComponent},
 
];

@NgModule({
  declarations: [
    TopNavComponent,
    SideNavComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],

  exports: [
    TopNavComponent,
    SideNavComponent,

    RouterModule,
  ]
})

export class NavigationModule { }
