import { Directive, HostListener, Input, } from '@angular/core';
import { TooltipBox } from '../components/tooltip-box/tooltip-box.component';
import { TooltipEvent } from '../models/tooltip-event.model';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "../controllers/tooltip.cotroller";
export class TooltipDirective {
    constructor(el, appRef, platform, cfr, tooltipCtrl, vcr) {
        this.el = el;
        this.appRef = appRef;
        this.platform = platform;
        this.cfr = cfr;
        this.tooltipCtrl = tooltipCtrl;
        this.vcr = vcr;
        this.debounce = 0;
        this.desktopEvent = TooltipEvent.HOVER;
        this.tooltipStyles = {};
        this.duration = 3000;
        this._active = false;
        this._arrow = false;
        this._canShow = true;
        this._debouncedPromise = null;
        this._navTooltip = false;
    }
    set navTooltip(val) {
        this._navTooltip = typeof val !== 'boolean' || val !== false;
    }
    get navTooltip() {
        return this._navTooltip;
    }
    set arrow(val) {
        this._arrow = typeof val !== 'boolean' || val !== false;
    }
    get arrow() {
        return this._arrow;
    }
    set active(val) {
        this._active = typeof val !== 'boolean' || val !== false;
        this._active && this.canShow ?
            this.showTooltip() : this.removeTooltip();
    }
    get active() {
        return this._active;
    }
    ngOnInit() {
        if (typeof this.event === 'undefined') {
            this.event = this.platform.is('mobile') ?
                this.mobileEvent : this.desktopEvent;
        }
        // if the timer hasn't expired or active is true when the component gets destroyed, the tooltip will remain in the DOM
        // this removes it
        this.removeTooltip();
    }
    /**
     * Show the tooltip immediately after initiating view if set to
     */
    ngAfterViewInit() {
        if (this._active) {
            this.trigger();
        }
    }
    ngOnDestroy() {
        if (this._tooltipElement && typeof this._tooltipElement.destroy === 'function') {
            this._tooltipElement.destroy();
        }
    }
    /**
     * Set the canShow property
     * Ensure that tooltip is shown only if the tooltip string is not falsey
     */
    set canShow(show) {
        this._canShow = show;
    }
    /**
     * @return TRUE if the tooltip can be shown
     */
    get canShow() {
        return this._canShow &&
            ((typeof this.tooltip === 'string' && this.tooltip !== '')
                || (typeof this.tooltipHtml === 'string' && this.tooltipHtml !== ''));
    }
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    trigger() {
        if (this.canShow) {
            if (this._tooltipElement) {
                this._resetTimer();
            }
            else {
                this.showTooltip();
            }
        }
    }
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    showTooltip() {
        this._debouncedPromise = setTimeout(() => {
            this._debouncedPromise = null;
            this._createTooltipComponent();
            const tooltipComponent = this._tooltipElement.instance;
            tooltipComponent.role = this.role;
            tooltipComponent.text = this.tooltip;
            tooltipComponent.tooltipStyles = this.tooltipStyles;
            tooltipComponent.tooltipHtml = this.tooltipHtml;
            tooltipComponent.init.then(() => {
                const tooltipPosition = this._getTooltipPosition();
                tooltipComponent.posLeft = tooltipPosition.left;
                tooltipComponent.posTop = tooltipPosition.top;
                tooltipComponent.fadeState = 'visible';
                if (this.arrow) {
                    let arrowPosition;
                    if (this.positionV === 'top') {
                        arrowPosition = 'bottom';
                    }
                    else if (this.positionV === 'bottom') {
                        arrowPosition = 'top';
                    }
                    else if (this.positionH === 'left') {
                        arrowPosition = 'right';
                    }
                    else {
                        arrowPosition = 'left';
                    }
                    tooltipComponent.arrow = arrowPosition;
                }
                if (!this._active) {
                    this._tooltipTimeout = setTimeout(this.removeTooltip.bind(this), this.duration);
                }
            });
        }, this.debounce);
    }
    onClick() {
        if (this.event === TooltipEvent.CLICK) {
            this.trigger();
        }
    }
    onPress() {
        if (this.event === TooltipEvent.PRESS) {
            this.trigger();
        }
    }
    onMouseEnter() {
        if (this.event === TooltipEvent.HOVER) {
            this.active = true;
        }
    }
    onMouseLeave() {
        if (this.event === TooltipEvent.HOVER) {
            this.active = false;
        }
    }
    _createTooltipComponent() {
        const componentFactory = this.cfr.resolveComponentFactory(TooltipBox);
        this._tooltipElement = this.vcr.createComponent(componentFactory);
        this.tooltipCtrl.addTooltip(this);
    }
    _getTooltipPosition() {
        const tooltipNativeElement = this._tooltipElement.instance.getNativeElement(), el = this.el.nativeElement, rect = el.getBoundingClientRect();
        let positionLeft, positionTop, spacing = 10;
        if (this.navTooltip) {
            this.positionV = 'bottom';
            this.arrow = false;
            spacing = 20;
        }
        if (this.positionH === 'right') {
            positionLeft = rect.right + spacing;
        }
        else if (this.positionH === 'left') {
            positionLeft = rect.left - spacing - tooltipNativeElement.offsetWidth;
            // -79, 19
        }
        else if (this.navTooltip) {
            positionLeft = rect.left + el.offsetWidth / 2;
        }
        else {
            positionLeft = rect.left;
        }
        if (this.positionV === 'top') {
            positionTop = rect.top - spacing - tooltipNativeElement.offsetHeight;
        }
        else if (this.positionV === 'bottom') {
            positionTop = rect.bottom + spacing;
        }
        else {
            positionTop = rect.top + el.offsetHeight / 2 - tooltipNativeElement.offsetHeight / 2;
        }
        this.topOffset++;
        if (this.topOffset) {
            positionTop += +this.topOffset;
        }
        this.leftOffset++;
        if (this.leftOffset) {
            positionLeft += +this.leftOffset;
        }
        if (positionLeft + tooltipNativeElement.offsetWidth + spacing > this.platform.width()) {
            positionLeft = this.platform.width() - tooltipNativeElement.offsetWidth - spacing;
        }
        else if (positionLeft + tooltipNativeElement.offsetWidth - spacing < 0) {
            positionLeft = spacing;
        }
        if (positionTop + tooltipNativeElement.offsetHeight + spacing > this.platform.height()) {
            positionTop = this.platform.height() - tooltipNativeElement.offsetHeight - spacing;
        }
        else if (positionTop + tooltipNativeElement.offsetHeight - spacing < 0) {
            positionTop = spacing;
        }
        return {
            left: positionLeft,
            top: positionTop,
        };
    }
    removeTooltip() {
        if (this._debouncedPromise) {
            clearTimeout(this._debouncedPromise);
            this._debouncedPromise = null;
        }
        if (!this._tooltipElement) {
            this._tooltipElement = undefined;
            this._tooltipTimeout = undefined;
            return;
        }
        this._tooltipElement.instance.fadeState = 'invisible';
        this.canShow = false;
        // wait for animation to finish then clear everything out
        setTimeout(() => {
            if (this._tooltipElement &&
                typeof this._tooltipElement.destroy === 'function') {
                this._tooltipElement.destroy();
            }
            this.tooltipCtrl.removeTooltip(this);
            this._tooltipElement = this._tooltipTimeout = undefined;
            this.canShow = true;
        }, 300);
    }
    _resetTimer() {
        clearTimeout(this._tooltipTimeout);
        this._tooltipTimeout = setTimeout(() => {
            this.active = false;
        }, this.duration);
    }
}
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.ApplicationRef }, { token: i1.Platform }, { token: i0.ComponentFactoryResolver }, { token: i2.TooltipController }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: TooltipDirective, selector: "[tooltip]", inputs: { debounce: "debounce", desktopEvent: "desktopEvent", event: "event", hideOthers: "hideOthers", leftOffset: "leftOffset", mobileEvent: "mobileEvent", positionV: "positionV", positionH: "positionH", role: "role", tooltip: "tooltip", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", topOffset: "topOffset", navTooltip: "navTooltip", arrow: "arrow", duration: "duration", active: "active" }, host: { listeners: { "click": "onClick()", "press": "onPress()", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ApplicationRef }, { type: i1.Platform }, { type: i0.ComponentFactoryResolver }, { type: i2.TooltipController }, { type: i0.ViewContainerRef }]; }, propDecorators: { debounce: [{
                type: Input
            }], desktopEvent: [{
                type: Input
            }], event: [{
                type: Input
            }], hideOthers: [{
                type: Input
            }], leftOffset: [{
                type: Input
            }], mobileEvent: [{
                type: Input
            }], positionV: [{
                type: Input
            }], positionH: [{
                type: Input
            }], role: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipHtml: [{
                type: Input
            }], tooltipStyles: [{
                type: Input
            }], topOffset: [{
                type: Input
            }], navTooltip: [{
                type: Input
            }], arrow: [{
                type: Input
            }], duration: [{
                type: Input
            }], active: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }], onPress: [{
                type: HostListener,
                args: ['press']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9pb25pYzQtdG9vbHRpcHMvc3JjL2RpcmVjdGl2ZXMvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUtMLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxHQUlOLE1BQU0sZUFBZSxDQUFDO0FBSXZCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUUzRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7Ozs7QUFLM0QsTUFBTSxPQUFPLGdCQUFnQjtJQXVEM0IsWUFDVSxFQUFhLEVBQ2IsTUFBcUIsRUFDckIsUUFBaUIsRUFDakIsR0FBNEIsRUFDNUIsV0FBNkIsRUFDN0IsR0FBb0I7UUFMcEIsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUNiLFdBQU0sR0FBTixNQUFNLENBQWU7UUFDckIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixRQUFHLEdBQUgsR0FBRyxDQUF5QjtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFDN0IsUUFBRyxHQUFILEdBQUcsQ0FBaUI7UUE1RHJCLGFBQVEsR0FBVSxDQUFDLENBQUM7UUFDcEIsaUJBQVksR0FBZ0IsWUFBWSxDQUFDLEtBQUssQ0FBQztRQVUvQyxrQkFBYSxHQUE0QixFQUFFLENBQUM7UUFxQjVDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFjakIsWUFBTyxHQUFXLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVcsS0FBSyxDQUFDO1FBQ3ZCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDeEIsc0JBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsS0FBSyxDQUFDO0lBYXBDLENBQUM7SUFqREQsSUFDSSxVQUFVLENBQUMsR0FBVztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sR0FB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QWxCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdGLFVBQVU7c0JBRGIsS0FBSztnQkFVRixLQUFLO3NCQURSLEtBQUs7Z0JBU0csUUFBUTtzQkFBaEIsS0FBSztnQkFHRixNQUFNO3NCQURULEtBQUs7Z0JBMklOLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPO2dCQVFyQixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTztnQkFRckIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7Z0JBUTFCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtQbGF0Zm9ybX0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuXG5pbXBvcnQge1Rvb2x0aXBCb3h9IGZyb20gJy4uL2NvbXBvbmVudHMvdG9vbHRpcC1ib3gvdG9vbHRpcC1ib3guY29tcG9uZW50JztcbmltcG9ydCB7VG9vbHRpcENvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3Rvb2x0aXAuY290cm9sbGVyJztcbmltcG9ydCB7VG9vbHRpcEV2ZW50fSBmcm9tICcuLi9tb2RlbHMvdG9vbHRpcC1ldmVudC5tb2RlbCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0b29sdGlwXScsXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRlYm91bmNlOm51bWJlciA9IDA7XG4gIEBJbnB1dCgpIGRlc2t0b3BFdmVudDpUb29sdGlwRXZlbnQgPSBUb29sdGlwRXZlbnQuSE9WRVI7XG4gIEBJbnB1dCgpIGV2ZW50OlRvb2x0aXBFdmVudDtcbiAgQElucHV0KCkgaGlkZU90aGVyczpib29sZWFuO1xuICBASW5wdXQoKSBsZWZ0T2Zmc2V0Om51bWJlcjtcbiAgQElucHV0KCkgbW9iaWxlRXZlbnQ6VG9vbHRpcEV2ZW50O1xuICBASW5wdXQoKSBwb3NpdGlvblY6c3RyaW5nO1xuICBASW5wdXQoKSBwb3NpdGlvbkg6c3RyaW5nO1xuICBASW5wdXQoKSByb2xlOnN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcDpzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBIdG1sOnN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcFN0eWxlczp7IFtrZXk6c3RyaW5nXTpzdHJpbmc7IH0gPSB7fTtcbiAgQElucHV0KCkgdG9wT2Zmc2V0Om51bWJlcjtcblxuICBASW5wdXQoKVxuICBzZXQgbmF2VG9vbHRpcCh2YWw6Ym9vbGVhbikge1xuICAgIHRoaXMuX25hdlRvb2x0aXAgPSB0eXBlb2YgdmFsICE9PSAnYm9vbGVhbicgfHwgdmFsICE9PSBmYWxzZTtcbiAgfVxuXG4gIGdldCBuYXZUb29sdGlwKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX25hdlRvb2x0aXA7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgYXJyb3codmFsOmJvb2xlYW4pIHtcbiAgICB0aGlzLl9hcnJvdyA9IHR5cGVvZiB2YWwgIT09ICdib29sZWFuJyB8fCB2YWwgIT09IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGFycm93KCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Fycm93O1xuICB9XG5cbiAgQElucHV0KCkgZHVyYXRpb24gPSAzMDAwO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhY3RpdmUodmFsOmJvb2xlYW4pIHtcbiAgICB0aGlzLl9hY3RpdmUgPSB0eXBlb2YgdmFsICE9PSAnYm9vbGVhbicgfHwgdmFsICE9PSBmYWxzZTtcblxuICAgIHRoaXMuX2FjdGl2ZSAmJiB0aGlzLmNhblNob3cgP1xuICAgICAgdGhpcy5zaG93VG9vbHRpcCgpIDogdGhpcy5yZW1vdmVUb29sdGlwKCk7XG4gIH1cblxuICBnZXQgYWN0aXZlKCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZTpib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2Fycm93OmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2FuU2hvdzpib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfZGVib3VuY2VkUHJvbWlzZSA9IG51bGw7XG4gIHByaXZhdGUgX25hdlRvb2x0aXA6Ym9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF90b29sdGlwRWxlbWVudDpDb21wb25lbnRSZWY8VG9vbHRpcEJveD47XG4gIHByaXZhdGUgX3Rvb2x0aXBUaW1lb3V0OmFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsOkVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBhcHBSZWY6QXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBwbGF0Zm9ybTpQbGF0Zm9ybSxcbiAgICBwcml2YXRlIGNmcjpDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB0b29sdGlwQ3RybDpUb29sdGlwQ29udHJvbGxlcixcbiAgICBwcml2YXRlIHZjcjpWaWV3Q29udGFpbmVyUmVmLFxuICApIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5ldmVudCA9IHRoaXMucGxhdGZvcm0uaXMoJ21vYmlsZScpID9cbiAgICAgICAgdGhpcy5tb2JpbGVFdmVudCA6IHRoaXMuZGVza3RvcEV2ZW50O1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSB0aW1lciBoYXNuJ3QgZXhwaXJlZCBvciBhY3RpdmUgaXMgdHJ1ZSB3aGVuIHRoZSBjb21wb25lbnQgZ2V0cyBkZXN0cm95ZWQsIHRoZSB0b29sdGlwIHdpbGwgcmVtYWluIGluIHRoZSBET01cbiAgICAvLyB0aGlzIHJlbW92ZXMgaXRcbiAgICB0aGlzLnJlbW92ZVRvb2x0aXAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IHRoZSB0b29sdGlwIGltbWVkaWF0ZWx5IGFmdGVyIGluaXRpYXRpbmcgdmlldyBpZiBzZXQgdG9cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdG9vbHRpcEVsZW1lbnQgJiYgdHlwZW9mIHRoaXMuX3Rvb2x0aXBFbGVtZW50LmRlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX3Rvb2x0aXBFbGVtZW50LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjYW5TaG93IHByb3BlcnR5XG4gICAqIEVuc3VyZSB0aGF0IHRvb2x0aXAgaXMgc2hvd24gb25seSBpZiB0aGUgdG9vbHRpcCBzdHJpbmcgaXMgbm90IGZhbHNleVxuICAgKi9cbiAgc2V0IGNhblNob3coc2hvdzogYm9vbGVhbikge1xuICAgIHRoaXMuX2NhblNob3cgPSBzaG93O1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4gVFJVRSBpZiB0aGUgdG9vbHRpcCBjYW4gYmUgc2hvd25cbiAgICovXG4gIGdldCBjYW5TaG93KCk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhblNob3cgJiZcbiAgICAgICgodHlwZW9mIHRoaXMudG9vbHRpcCA9PT0gJ3N0cmluZycgJiYgdGhpcy50b29sdGlwICE9PSAnJylcbiAgICAgICAgfHwgKHR5cGVvZiB0aGlzLnRvb2x0aXBIdG1sID09PSAnc3RyaW5nJyAmJiB0aGlzLnRvb2x0aXBIdG1sICE9PSAnJykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNsaWNrL3ByZXNzIGV2ZW50IGFuZCBzaG93cyBhIHRvb2x0aXAuXG4gICAqIElmIGEgdG9vbHRpcCBhbHJlYWR5IGV4aXN0cywgaXQgd2lsbCBqdXN0IHJlc2V0IGl0J3MgdGltZXIuXG4gICAqL1xuICB0cmlnZ2VyKCk6dm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuU2hvdykge1xuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0VGltZXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hvd1Rvb2x0aXAoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB0b29sdGlwIGNvbXBvbmVudCBhbmQgYWRqdXN0cyBpdCdzIHByb3BlcnRpZXMgdG8gc2hvdyBwcm9wZXJseS5cbiAgICovXG4gIHNob3dUb29sdGlwKCk6dm9pZCB7XG4gICAgdGhpcy5fZGVib3VuY2VkUHJvbWlzZSA9IHNldFRpbWVvdXQoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFByb21pc2UgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2NyZWF0ZVRvb2x0aXBDb21wb25lbnQoKTtcblxuICAgICAgICBjb25zdCB0b29sdGlwQ29tcG9uZW50OiBUb29sdGlwQm94ID0gdGhpcy5fdG9vbHRpcEVsZW1lbnQuaW5zdGFuY2U7XG5cbiAgICAgICAgdG9vbHRpcENvbXBvbmVudC5yb2xlID0gdGhpcy5yb2xlO1xuICAgICAgICB0b29sdGlwQ29tcG9uZW50LnRleHQgPSB0aGlzLnRvb2x0aXA7XG4gICAgICAgIHRvb2x0aXBDb21wb25lbnQudG9vbHRpcFN0eWxlcyA9IHRoaXMudG9vbHRpcFN0eWxlcztcbiAgICAgICAgdG9vbHRpcENvbXBvbmVudC50b29sdGlwSHRtbCA9IHRoaXMudG9vbHRpcEh0bWw7XG4gICAgICAgIHRvb2x0aXBDb21wb25lbnQuaW5pdC50aGVuKCgpID0+IHtcbiAgICAgICAgICBjb25zdCB0b29sdGlwUG9zaXRpb24gPSB0aGlzLl9nZXRUb29sdGlwUG9zaXRpb24oKTtcblxuICAgICAgICAgIHRvb2x0aXBDb21wb25lbnQucG9zTGVmdCA9IHRvb2x0aXBQb3NpdGlvbi5sZWZ0O1xuICAgICAgICAgIHRvb2x0aXBDb21wb25lbnQucG9zVG9wID0gdG9vbHRpcFBvc2l0aW9uLnRvcDtcblxuICAgICAgICAgIHRvb2x0aXBDb21wb25lbnQuZmFkZVN0YXRlID0gJ3Zpc2libGUnO1xuXG4gICAgICAgICAgaWYgKHRoaXMuYXJyb3cpIHtcbiAgICAgICAgICAgIGxldCBhcnJvd1Bvc2l0aW9uO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zaXRpb25WID09PSAndG9wJykge1xuICAgICAgICAgICAgICBhcnJvd1Bvc2l0aW9uID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25WID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICBhcnJvd1Bvc2l0aW9uID0gJ3RvcCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25IID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgYXJyb3dQb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhcnJvd1Bvc2l0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9vbHRpcENvbXBvbmVudC5hcnJvdyA9IGFycm93UG9zaXRpb247XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUaW1lb3V0ID0gc2V0VGltZW91dChcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUb29sdGlwLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgIHRoaXMuZHVyYXRpb24sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgdGhpcy5kZWJvdW5jZVxuICAgICk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTp2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudCA9PT0gVG9vbHRpcEV2ZW50LkNMSUNLKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdwcmVzcycpXG4gIG9uUHJlc3MoKTp2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudCA9PT0gVG9vbHRpcEV2ZW50LlBSRVNTKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgb25Nb3VzZUVudGVyKCk6dm9pZCB7XG4gICAgaWYgKHRoaXMuZXZlbnQgPT09IFRvb2x0aXBFdmVudC5IT1ZFUikge1xuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlTGVhdmUoKTp2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudCA9PT0gVG9vbHRpcEV2ZW50LkhPVkVSKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVRvb2x0aXBDb21wb25lbnQoKSB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFRvb2x0aXBCb3gpO1xuICAgIHRoaXMuX3Rvb2x0aXBFbGVtZW50ID0gdGhpcy52Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgIHRoaXMudG9vbHRpcEN0cmwuYWRkVG9vbHRpcCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRvb2x0aXBQb3NpdGlvbigpIHtcbiAgICBjb25zdCB0b29sdGlwTmF0aXZlRWxlbWVudDpIVE1MRWxlbWVudCA9IHRoaXMuX3Rvb2x0aXBFbGVtZW50Lmluc3RhbmNlLmdldE5hdGl2ZUVsZW1lbnQoKSxcbiAgICAgIGVsOkhUTUxFbGVtZW50ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LFxuICAgICAgcmVjdDpDbGllbnRSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBsZXQgcG9zaXRpb25MZWZ0Om51bWJlcixcbiAgICAgIHBvc2l0aW9uVG9wOm51bWJlcixcbiAgICAgIHNwYWNpbmcgPSAxMDtcblxuICAgIGlmICh0aGlzLm5hdlRvb2x0aXApIHtcbiAgICAgIHRoaXMucG9zaXRpb25WID0gJ2JvdHRvbSc7XG4gICAgICB0aGlzLmFycm93ID0gZmFsc2U7XG4gICAgICBzcGFjaW5nID0gMjA7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9zaXRpb25IID09PSAncmlnaHQnKSB7XG4gICAgICBwb3NpdGlvbkxlZnQgPSByZWN0LnJpZ2h0ICsgc3BhY2luZztcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25IID09PSAnbGVmdCcpIHtcbiAgICAgIHBvc2l0aW9uTGVmdCA9IHJlY3QubGVmdCAtIHNwYWNpbmcgLSB0b29sdGlwTmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICAgIC8vIC03OSwgMTlcbiAgICB9IGVsc2UgaWYgKHRoaXMubmF2VG9vbHRpcCkge1xuICAgICAgcG9zaXRpb25MZWZ0ID0gcmVjdC5sZWZ0ICsgZWwub2Zmc2V0V2lkdGggLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3NpdGlvbkxlZnQgPSByZWN0LmxlZnQ7XG4gICAgfVxuXG5cbiAgICBpZiAodGhpcy5wb3NpdGlvblYgPT09ICd0b3AnKSB7XG4gICAgICBwb3NpdGlvblRvcCA9IHJlY3QudG9wIC0gc3BhY2luZyAtIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICB9IGVsc2UgaWYgKHRoaXMucG9zaXRpb25WID09PSAnYm90dG9tJykge1xuICAgICAgcG9zaXRpb25Ub3AgPSByZWN0LmJvdHRvbSArIHNwYWNpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc2l0aW9uVG9wID0gcmVjdC50b3AgKyBlbC5vZmZzZXRIZWlnaHQgLyAyIC0gdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICB0aGlzLnRvcE9mZnNldCsrO1xuICAgIGlmICh0aGlzLnRvcE9mZnNldCkge1xuICAgICAgcG9zaXRpb25Ub3AgKz0gK3RoaXMudG9wT2Zmc2V0O1xuICAgIH1cblxuICAgIHRoaXMubGVmdE9mZnNldCsrO1xuICAgIGlmICh0aGlzLmxlZnRPZmZzZXQpIHtcbiAgICAgIHBvc2l0aW9uTGVmdCArPSArdGhpcy5sZWZ0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbkxlZnQgKyB0b29sdGlwTmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCArIHNwYWNpbmcgPiB0aGlzLnBsYXRmb3JtLndpZHRoKCkpIHtcbiAgICAgIHBvc2l0aW9uTGVmdCA9IHRoaXMucGxhdGZvcm0ud2lkdGgoKSAtIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gc3BhY2luZztcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uTGVmdCArIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC0gc3BhY2luZyA8IDApIHtcbiAgICAgIHBvc2l0aW9uTGVmdCA9IHNwYWNpbmc7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uVG9wICsgdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgc3BhY2luZyA+IHRoaXMucGxhdGZvcm0uaGVpZ2h0KCkpIHtcbiAgICAgIHBvc2l0aW9uVG9wID0gdGhpcy5wbGF0Zm9ybS5oZWlnaHQoKSAtIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAtIHNwYWNpbmc7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvblRvcCArIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAtIHNwYWNpbmcgPCAwKSB7XG4gICAgICBwb3NpdGlvblRvcCA9IHNwYWNpbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IHBvc2l0aW9uTGVmdCxcbiAgICAgIHRvcDogIHBvc2l0aW9uVG9wLFxuICAgIH07XG4gIH1cblxuICByZW1vdmVUb29sdGlwKCkge1xuICAgIGlmICh0aGlzLl9kZWJvdW5jZWRQcm9taXNlKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVib3VuY2VkUHJvbWlzZSk7XG5cbiAgICAgIHRoaXMuX2RlYm91bmNlZFByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fdG9vbHRpcEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3Rvb2x0aXBFbGVtZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fdG9vbHRpcFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdG9vbHRpcEVsZW1lbnQuaW5zdGFuY2UuZmFkZVN0YXRlID0gJ2ludmlzaWJsZSc7XG5cbiAgICB0aGlzLmNhblNob3cgPSBmYWxzZTtcblxuICAgIC8vIHdhaXQgZm9yIGFuaW1hdGlvbiB0byBmaW5pc2ggdGhlbiBjbGVhciBldmVyeXRoaW5nIG91dFxuICAgIHNldFRpbWVvdXQoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLl90b29sdGlwRWxlbWVudCAmJlxuICAgICAgICAgIHR5cGVvZiB0aGlzLl90b29sdGlwRWxlbWVudC5kZXN0cm95ID09PSAnZnVuY3Rpb24nXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuX3Rvb2x0aXBFbGVtZW50LmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvb2x0aXBDdHJsLnJlbW92ZVRvb2x0aXAodGhpcyk7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBFbGVtZW50ID0gdGhpcy5fdG9vbHRpcFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY2FuU2hvdyA9IHRydWU7XG4gICAgICB9LFxuICAgICAgMzAwXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0VGltZXIoKTp2b2lkIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdG9vbHRpcFRpbWVvdXQpO1xuICAgIHRoaXMuX3Rvb2x0aXBUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sIHRoaXMuZHVyYXRpb24pO1xuICB9XG59XG4iXX0=