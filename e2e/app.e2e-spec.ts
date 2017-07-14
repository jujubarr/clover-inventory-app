import { WallPage } from './app.po';

describe('wall App', () => {
  let page: WallPage;

  beforeEach(() => {
    page = new WallPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
