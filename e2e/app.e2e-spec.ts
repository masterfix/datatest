import { DatatestPage } from './app.po';

describe('datatest App', () => {
  let page: DatatestPage;

  beforeEach(() => {
    page = new DatatestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
