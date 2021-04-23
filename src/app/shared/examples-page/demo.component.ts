import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'documentation-widget-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DocumentationWidgetDemoComponent {
  @Input() demoTitle: string;
  @Input() component: string;
  @Input() id: string;
  @Input() code: string;
  @Input() markup: string;
  @Input() module: string;
  @Input() readme: string;
  @Input() path: string;
  @Input() files: { name: string; source: string }[];
  @Input() showCode = false;
  viewMode = 'code';
  tabs: any[] = [
    { name: 'Source Code', type: 'code' },
    { name: 'Template Markup', type: 'markUp'},
    { name: 'Module', type: 'module'},
  ];

  activeTab = 'code';
  
  getGithubLink() {
    const baseRepoURL = 'https://github.com/GSA/ngx-uswds/tree/main/';
    if (this.path) {
      return baseRepoURL + this.path;
    }
    return false;
  }

  tabType(name: string) {
    const ext = name.split('.').pop();
    return (
      {
        html: 'HTML',
        scss: 'Style (SCSS)',
        css: 'Style (CSS)',
        ts: 'Typescript',
      }[ext] || 'Code'
    );
  }
}
