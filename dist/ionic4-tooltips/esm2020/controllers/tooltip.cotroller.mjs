import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TooltipController {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb3Ryb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9pb25pYzQtdG9vbHRpcHMvc3JjL2NvbnRyb2xsZXJzL3Rvb2x0aXAuY290cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBTXpDLE1BQU0sT0FBTyxpQkFBaUI7SUFIOUI7UUFJUyxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFzQixFQUFFLENBQUM7S0FxQi9DO0lBbkJDLFVBQVUsQ0FBQyxRQUF5QjtRQUNsQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsYUFBYSxDQUFDLFFBQXlCO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3pCLENBQUMsT0FBd0IsRUFBRSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7OzhHQXRCVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtUb29sdGlwRGlyZWN0aXZlfSBmcm9tICcuLi9kaXJlY3RpdmVzL3Rvb2x0aXAuZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb250cm9sbGVyIHtcbiAgcHVibGljIGFsbG93TXVsdGlwbGU6Ym9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBhY3RpdmVUb29sdGlwczpUb29sdGlwRGlyZWN0aXZlW10gPSBbXTtcblxuICBhZGRUb29sdGlwKGluc3RhbmNlOlRvb2x0aXBEaXJlY3RpdmUpOnZvaWQge1xuICAgIGlmIChpbnN0YW5jZS5oaWRlT3RoZXJzIHx8ICF0aGlzLmFsbG93TXVsdGlwbGUgJiYgdGhpcy5hY3RpdmVUb29sdGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmhpZGVBbGwoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZVRvb2x0aXBzLnB1c2goaW5zdGFuY2UpO1xuICB9XG5cbiAgcmVtb3ZlVG9vbHRpcChpbnN0YW5jZTpUb29sdGlwRGlyZWN0aXZlKTp2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZVRvb2x0aXBzLnNwbGljZSh0aGlzLmFjdGl2ZVRvb2x0aXBzLmluZGV4T2YoaW5zdGFuY2UpLCAxKTtcbiAgfVxuXG4gIGhpZGVBbGwoKTp2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZVRvb2x0aXBzLmZvckVhY2goXG4gICAgICAodG9vbHRpcDpUb29sdGlwRGlyZWN0aXZlKSA9PiB7XG4gICAgICAgIHRvb2x0aXAucmVtb3ZlVG9vbHRpcCgpO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==