import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, HostBinding, Input, Injectable, Directive, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@ionic/angular';

class TooltipBox {
    constructor(elementRef, rnd) {
        this.elementRef = elementRef;
        this.rnd = rnd;
        this.fadeState = 'invisible';
        this.role = 'status';
        this.tooltipStyles = {};
        this.init = new Promise((resolve) => {
            this.initResolve = resolve;
        });
    }
    set arrow(side) {
        this.rnd.setAttribute(this.getNativeElement(), 'class', 'has-arrow ' + 'arrow-' + side);
    }
    set posTop(val) {
        this.rnd.setStyle(this.getNativeElement(), 'top', val + 'px');
    }
    set posLeft(val) {
        this.rnd.setStyle(this.getNativeElement(), 'left', val + 'px');
    }
    getNativeElement() {
        return this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        this.initResolve();
    }
}
TooltipBox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipBox, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
TooltipBox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.4", type: TooltipBox, selector: "tooltip-box", inputs: { role: "role", text: "text", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", arrow: "arrow", posTop: "posTop", posLeft: "posLeft" }, host: { properties: { "@fade": "this.fadeState" } }, ngImport: i0, template: "<div class=\"tooltip-box\"\n     [attr.aria-role]=\"role\"\n     [ngStyle]=\"tooltipStyles\">\n  <div *ngIf=\"tooltipHtml; else txt\" [innerHTML]=\"tooltipHtml\"></div>\n\n  <ng-template #txt><div [innerHtml]=\"text\"></div></ng-template>\n</div>\n", styles: [":host{background-color:#000c;color:#fff;display:inline-block;position:fixed;padding:15px 25px;font-size:15px;z-index:3}:host.has-arrow:before{content:\"\";border:5px solid transparent;position:absolute;width:0;height:0}:host.has-arrow.arrow-top:before{border-bottom:5px solid rgba(0,0,0,.8);top:-10px}:host.has-arrow.arrow-left:before{border-right:5px solid rgba(0,0,0,.8);left:-10px}:host.has-arrow.arrow-right:before{border-left:5px solid rgba(0,0,0,.8);right:-10px}:host.has-arrow.arrow-bottom:before{border-top:5px solid rgba(0,0,0,.8);bottom:-10px}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('invisible', style({ opacity: 0 })),
            transition('visible <=> invisible', animate('300ms linear'))
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipBox, decorators: [{
            type: Component,
            args: [{ selector: 'tooltip-box', animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('invisible', style({ opacity: 0 })),
                            transition('visible <=> invisible', animate('300ms linear'))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"tooltip-box\"\n     [attr.aria-role]=\"role\"\n     [ngStyle]=\"tooltipStyles\">\n  <div *ngIf=\"tooltipHtml; else txt\" [innerHTML]=\"tooltipHtml\"></div>\n\n  <ng-template #txt><div [innerHtml]=\"text\"></div></ng-template>\n</div>\n", styles: [":host{background-color:#000c;color:#fff;display:inline-block;position:fixed;padding:15px 25px;font-size:15px;z-index:3}:host.has-arrow:before{content:\"\";border:5px solid transparent;position:absolute;width:0;height:0}:host.has-arrow.arrow-top:before{border-bottom:5px solid rgba(0,0,0,.8);top:-10px}:host.has-arrow.arrow-left:before{border-right:5px solid rgba(0,0,0,.8);left:-10px}:host.has-arrow.arrow-right:before{border-left:5px solid rgba(0,0,0,.8);right:-10px}:host.has-arrow.arrow-bottom:before{border-top:5px solid rgba(0,0,0,.8);bottom:-10px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { fadeState: [{
                type: HostBinding,
                args: ['@fade']
            }], role: [{
                type: Input
            }], text: [{
                type: Input
            }], tooltipHtml: [{
                type: Input
            }], tooltipStyles: [{
                type: Input
            }], arrow: [{
                type: Input
            }], posTop: [{
                type: Input
            }], posLeft: [{
                type: Input
            }] } });

var TooltipEvent;
(function (TooltipEvent) {
    TooltipEvent["CLICK"] = "click";
    TooltipEvent["HOVER"] = "hover";
    TooltipEvent["PRESS"] = "press";
})(TooltipEvent || (TooltipEvent = {}));

class TooltipController {
    constructor() {
        this.allowMultiple = true;
        this.activeTooltips = [];
    }
    addTooltip(instance) {
        if (instance.hideOthers || !this.allowMultiple && this.activeTooltips.length > 0) {
            this.hideAll();
        }
        this.activeTooltips.push(instance);
    }
    removeTooltip(instance) {
        this.activeTooltips.splice(this.activeTooltips.indexOf(instance), 1);
    }
    hideAll() {
        this.activeTooltips.forEach((tooltip) => {
            tooltip.removeTooltip();
        });
    }
}
TooltipController.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipController, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TooltipController.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipController, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipController, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

class TooltipDirective {
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
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipDirective, deps: [{ token: i0.ElementRef }, { token: i0.ApplicationRef }, { token: i1$1.Platform }, { token: i0.ComponentFactoryResolver }, { token: TooltipController }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: TooltipDirective, selector: "[tooltip]", inputs: { debounce: "debounce", desktopEvent: "desktopEvent", event: "event", hideOthers: "hideOthers", leftOffset: "leftOffset", mobileEvent: "mobileEvent", positionV: "positionV", positionH: "positionH", role: "role", tooltip: "tooltip", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", topOffset: "topOffset", navTooltip: "navTooltip", arrow: "arrow", duration: "duration", active: "active" }, host: { listeners: { "click": "onClick()", "press": "onPress()", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ApplicationRef }, { type: i1$1.Platform }, { type: i0.ComponentFactoryResolver }, { type: TooltipController }, { type: i0.ViewContainerRef }]; }, propDecorators: { debounce: [{
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

class TooltipsModule {
    static forRoot() {
        return {
            ngModule: TooltipsModule,
            providers: [
                TooltipController
            ],
        };
    }
}
TooltipsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TooltipsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: TooltipsModule, declarations: [TooltipDirective,
        TooltipBox], imports: [CommonModule], exports: [TooltipDirective] });
TooltipsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipsModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: TooltipsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        TooltipDirective,
                        TooltipBox
                    ],
                    entryComponents: [
                        TooltipBox
                    ],
                    exports: [
                        TooltipDirective
                    ],
                    imports: [
                        CommonModule
                    ]
                }]
        }] });

/*
 * Public API Surface of ionic-tooltips
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TooltipBox, TooltipController, TooltipDirective, TooltipsModule };
//# sourceMappingURL=ionic4-tooltips.mjs.map
//# sourceMappingURL=ionic4-tooltips.mjs.map
