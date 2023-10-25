const puppeteer = require("puppeteer");
const user = require("./user.js");
let page;
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("Github page new tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com");
  });

  test("The title Actions", async () => {
    jest.setTimeout(10000);
    const product =
      "body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > nav > ul > li:nth-child(1) > button";
    await page.waitForSelector(product);
    await page.click(product);
    await page.click(
      "body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > nav > ul > li:nth-child(1) > div > div.px-lg-4.border-lg-right.mb-4.mb-lg-0.pr-lg-7 > ul > li:nth-child(1) > a > div > div"
    );
    await page.waitForSelector(
      "body > div.logged-out.env-production.page-responsive.overflow-x-hidden > div.application-main > main > div.overflow-x-hidden.overflow-y-hidden > div > div > div > div.col-12.text-center.text-lg-left.mx-auto.mx-lg-0.py-8.position-relative > h1 > span:nth-child(1)"
    );
    const actualElement = await page.$(
      "body > div.logged-out.env-production.page-responsive.overflow-x-hidden > div.application-main > main > div.overflow-x-hidden.overflow-y-hidden > div > div > div > div.col-12.text-center.text-lg-left.mx-auto.mx-lg-0.py-8.position-relative > h1 > span:nth-child(1)"
    );
    const actual = await page.evaluate(
      (element) => element.textContent,
      actualElement
    );
    expect(actual).toEqual("Automate your workflow");
  });

  test("The title Pricing page", async () => {
    const button =
      "body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.application-main > main > div:nth-child(1) > div.px-3.home-campaign-hero > div > div > div.col-11.text-left.pt-12.mt-12.pl-2.pl-sm-0 > div.position-relative.top-md-8.z-1 > a > div > div.pr-3.mr-md-1.pl-md-1";
    await page.waitForSelector(button);
    await page.click(button);
    const actualElement =
      "#__next > div > div > div.Primer_Brand__SubdomainNavBar-module__SubdomainNavBar-outer-container___aE8uv.Primer_Brand__SubdomainNavBar-module__SubdomainNavBar-outer-container--fixed___ZhyZf > header > div > nav:nth-child(1) > ol > li:nth-child(3) > a";
    await page.waitForSelector(actualElement);
    const actual = await page.$eval(actualElement, (link) => link.textContent);
    expect(actual).toBe("GitHub Universe");
  });

  test("The title h3 Home page", async () => {
    await page.click(
      "body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu--logged-out.p-responsive.height-fit.position-lg-relative.d-lg-flex.flex-column.flex-auto.pt-7.pb-4.top-0 > div > div > div > a"
    );
    await page.waitForSelector("#login > div.auth-form-header.p-0 > h1");
    await page.type("#login_field", user.mail);
    await page.type("#password", user.password);
    await page.click(
      "#login > div.auth-form-body.mt-3 > form > div > input.btn.btn-primary.btn-block.js-sign-in-button"
    );
    await page.waitForNavigation();
    const actualElement = await page.$("h3");
    const actual = await page.evaluate(
      (element) => element.textContent,
      actualElement
    );
    expect(actual).toEqual("Email");
  });
});
