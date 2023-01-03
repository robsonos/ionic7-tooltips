import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipBox } from './components/tooltip-box/tooltip-box.component';
import { TooltipController } from './controllers/tooltip.cotroller';
import { TooltipDirective } from './directives/tooltip.directive';
import * as i0 from "@angular/core";
export class TooltipsModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvaW9uaWM0LXRvb2x0aXBzL3NyYy90b29sdGlwcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFpQmhFLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7YUFDbEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7MkdBUlUsY0FBYzs0R0FBZCxjQUFjLGlCQWJ2QixnQkFBZ0I7UUFDaEIsVUFBVSxhQVNWLFlBQVksYUFIWixnQkFBZ0I7NEdBTVAsY0FBYyxZQUh2QixZQUFZOzJGQUdILGNBQWM7a0JBZjFCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLGdCQUFnQjt3QkFDaEIsVUFBVTtxQkFDWDtvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsVUFBVTtxQkFDWDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTtxQkFDYjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7VG9vbHRpcEJveH0gZnJvbSAnLi9jb21wb25lbnRzL3Rvb2x0aXAtYm94L3Rvb2x0aXAtYm94LmNvbXBvbmVudCc7XG5pbXBvcnQge1Rvb2x0aXBDb250cm9sbGVyfSBmcm9tICcuL2NvbnRyb2xsZXJzL3Rvb2x0aXAuY290cm9sbGVyJztcbmltcG9ydCB7VG9vbHRpcERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3Rvb2x0aXAuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVG9vbHRpcERpcmVjdGl2ZSxcbiAgICBUb29sdGlwQm94XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIFRvb2x0aXBCb3hcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRvb2x0aXBEaXJlY3RpdmVcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBzTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTpNb2R1bGVXaXRoUHJvdmlkZXJzPFRvb2x0aXBzTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUb29sdGlwc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUb29sdGlwQ29udHJvbGxlclxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=