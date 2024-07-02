import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  },
})

export class SafeLinkDirective {
  queryParam = input('myapp', {alias: 'appSafeLink'})
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)

  onConfirmLeavePage(event: MouseEvent) {
    const watnsToLeave = window.confirm('Do you want to leave the page?')

    if (watnsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href
      // (event.target as HTMLAnchorElement).href = address + "?from=" + this.queryParam()

      const address = this.hostElementRef.nativeElement.href
      this.hostElementRef.nativeElement.href = address + "?from=" + this.queryParam()
      return
    }

    event.preventDefault()
  }

}
