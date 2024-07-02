import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required({alias: 'appAuth'})
  private authService = inject(AuthService)
  private templateRef = inject(TemplateRef)
  private viewContainerRef = inject(ViewContainerRef)

  constructor() {

    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      } else {
       this.viewContainerRef.clear()
      }
    })
  }

}
