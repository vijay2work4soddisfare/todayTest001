import { TodayTest001Page } from './app.po';

describe('today-test001 App', function() {
  let page: TodayTest001Page;

  beforeEach(() => {
    page = new TodayTest001Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
