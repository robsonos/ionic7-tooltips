import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TooltipBox {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW9uaWM0LXRvb2x0aXBzL3NyYy9jb21wb25lbnRzL3Rvb2x0aXAtYm94L3Rvb2x0aXAtYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lvbmljNC10b29sdGlwcy9zcmMvY29tcG9uZW50cy90b29sdGlwLWJveC90b29sdGlwLWJveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFdBQVcsRUFDWCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7OztBQWlCdkIsTUFBTSxPQUFPLFVBQVU7SUF1Q3JCLFlBQ1MsVUFBcUIsRUFDcEIsR0FBYTtRQURkLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDcEIsUUFBRyxHQUFILEdBQUcsQ0FBVTtRQXhDRCxjQUFTLEdBQVUsV0FBVyxDQUFDO1FBRTVDLFNBQUksR0FBVSxRQUFRLENBQUM7UUFHdkIsa0JBQWEsR0FBNEIsRUFBRSxDQUFDO1FBcUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUNyQixDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDL0IsQ0FBQyxDQUNBLENBQUM7SUFDSixDQUFDO0lBeENELElBQ0ksS0FBSyxDQUFDLElBQVc7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUN2QixPQUFPLEVBQ1AsWUFBWSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQy9CLENBQUM7SUFDSixDQUFDO0lBRUQsSUFDSSxNQUFNLENBQUMsR0FBVTtRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FDZixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFDdkIsS0FBSyxFQUNMLEdBQUcsR0FBRyxJQUFJLENBQ1gsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUNJLE9BQU8sQ0FBQyxHQUFVO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNmLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUN2QixNQUFNLEVBQ04sR0FBRyxHQUFHLElBQUksQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQWlCRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O3VHQXhEVSxVQUFVOzJGQUFWLFVBQVUsa1FDMUJ2QiwwUEFPQSxneEJEVWM7UUFDVixPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2QsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDN0QsQ0FBQztLQUNIOzJGQUdVLFVBQVU7a0JBZnRCLFNBQVM7K0JBQ0ssYUFBYSxjQUtkO3dCQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ2QsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDekMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDN0QsQ0FBQztxQkFDSCxtQkFDZSx1QkFBdUIsQ0FBQyxNQUFNO3lIQUd4QixTQUFTO3NCQUE5QixXQUFXO3VCQUFDLE9BQU87Z0JBRVgsSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBR0YsS0FBSztzQkFEUixLQUFLO2dCQVVGLE1BQU07c0JBRFQsS0FBSztnQkFVRixPQUFPO3NCQURWLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICAgICd0b29sdGlwLWJveCcsXG4gIHRlbXBsYXRlVXJsOiAndG9vbHRpcC1ib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtcbiAgICAndG9vbHRpcC1ib3guY29tcG9uZW50LnNjc3MnXG4gIF0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmYWRlJywgW1xuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgICAgc3RhdGUoJ2ludmlzaWJsZScsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBpbnZpc2libGUnLCBhbmltYXRlKCczMDBtcyBsaW5lYXInKSlcbiAgICBdKVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBCb3ggaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQEhvc3RCaW5kaW5nKCdAZmFkZScpIGZhZGVTdGF0ZTpzdHJpbmcgPSAnaW52aXNpYmxlJztcblxuICBASW5wdXQoKSByb2xlOnN0cmluZyA9ICdzdGF0dXMnO1xuICBASW5wdXQoKSB0ZXh0OnN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcEh0bWw6c3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwU3R5bGVzOnsgW2tleTpzdHJpbmddOnN0cmluZzsgfSA9IHt9O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBhcnJvdyhzaWRlOnN0cmluZykge1xuICAgIHRoaXMucm5kLnNldEF0dHJpYnV0ZShcbiAgICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpLFxuICAgICAgJ2NsYXNzJyxcbiAgICAgICdoYXMtYXJyb3cgJyArICdhcnJvdy0nICsgc2lkZVxuICAgICk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgcG9zVG9wKHZhbDpudW1iZXIpIHtcbiAgICB0aGlzLnJuZC5zZXRTdHlsZShcbiAgICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpLFxuICAgICAgJ3RvcCcsXG4gICAgICB2YWwgKyAncHgnXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBwb3NMZWZ0KHZhbDpudW1iZXIpIHtcbiAgICB0aGlzLnJuZC5zZXRTdHlsZShcbiAgICAgIHRoaXMuZ2V0TmF0aXZlRWxlbWVudCgpLFxuICAgICAgJ2xlZnQnLFxuICAgICAgdmFsICsgJ3B4J1xuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGluaXRSZXNvbHZlOkZ1bmN0aW9uO1xuXG4gIHB1YmxpYyBpbml0OlByb21pc2U8dm9pZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnRSZWY6RWxlbWVudFJlZixcbiAgICBwcml2YXRlIHJuZDpSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5pbml0ID0gbmV3IFByb21pc2U8dm9pZD4oXG4gICAgICAocmVzb2x2ZSkgPT4ge1xuICAgICAgICB0aGlzLmluaXRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldE5hdGl2ZUVsZW1lbnQoKTpIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6dm9pZCB7XG4gICAgdGhpcy5pbml0UmVzb2x2ZSgpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwidG9vbHRpcC1ib3hcIlxuICAgICBbYXR0ci5hcmlhLXJvbGVdPVwicm9sZVwiXG4gICAgIFtuZ1N0eWxlXT1cInRvb2x0aXBTdHlsZXNcIj5cbiAgPGRpdiAqbmdJZj1cInRvb2x0aXBIdG1sOyBlbHNlIHR4dFwiIFtpbm5lckhUTUxdPVwidG9vbHRpcEh0bWxcIj48L2Rpdj5cblxuICA8bmctdGVtcGxhdGUgI3R4dD48ZGl2IFtpbm5lckh0bWxdPVwidGV4dFwiPjwvZGl2PjwvbmctdGVtcGxhdGU+XG48L2Rpdj5cbiJdfQ==