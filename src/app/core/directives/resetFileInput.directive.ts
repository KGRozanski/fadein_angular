import {
    Directive,
    Renderer2,
    ElementRef,
    OnInit
} from '@angular/core';
import { HelperService } from '../services/helper.service';

@Directive({
    selector: '[appReset]'
})
export class ResetFileInputDirective implements OnInit {
    constructor(private renderer: Renderer2, private el: ElementRef, private helperService: HelperService) {}

    ngOnInit() {
        this.helperService.clearFileInputEvent.subscribe((flag) => {
            if (flag) {
                this.renderer.setProperty(this.el.nativeElement, 'value', null);
            }
        });
    }
}