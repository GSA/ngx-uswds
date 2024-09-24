import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('usa-components app is running!');
  });

  afterEach(waitForAsync ( () => {
    // Assert that there are no errors emitted from the browser
    const logs =  browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  }));
});
function waitForAsync(arg0: () => void): (done: DoneFn) => Promise<void> {
  throw new Error('Function not implemented.');
}

