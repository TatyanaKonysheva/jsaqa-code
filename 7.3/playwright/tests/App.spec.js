const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");
const { chromium } = require("playwright");

test("Success Authorization", async ({ page }) => {
  const mail =
    "#__next > div:nth-child(2) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(1) > input[type=email]";
  const pass =
    "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(3) > input";
  const button =
    "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > button";
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "./screenshots/screenshot1.png" });
  await page.fill(mail, email);
  await page.fill(pass, password);
  await page.screenshot({ path: "./screenshots/screenshot2.png" });
  await page.click(button);
  const profile = "https://netology.ru/profile";
  await expect(page).toHaveURL(profile);
  await page.screenshot({ path: "./screenshots/screenshot3.png" });
  const h2 =
    "#app > div.src-LMS-containers-Layout--root--_7tuL.src-LMS-containers-Layout--inner--Vmi8T.src-LMS-containers-Layout--mobile--y2_ce > section > div.src-components-pages-Profile--root--GZ5Xm > div.src-components-layouts-ProfileTemplates-WrapTemplate--wrap--zrXel.src-components-layouts-ProfileTemplates-WrapTemplate--mobile--buwI5 > div > div > div.src-components-pages-Profile-Programs--root--kF8uD > div.src-components-pages-Profile-Programs--heading--vVw3p > h2";
  await page.waitForSelector(h2);
  const title = await page.$eval(h2, (element) => element.textContent);
  expect(title).toBe("Моё обучение");
});

test("Failed Authorization", async ({ page }) => {
  const mail =
    "#__next > div:nth-child(2) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(1) > input[type=email]";
  const pass =
    "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div:nth-child(3) > input";
  const button =
    "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > button";
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: "./screenshots/screenshot4.png" });
  await page.fill(mail, "tanya@.rqwe.ru");
  await page.fill(pass, "123456");
  await page.screenshot({ path: "./screenshots/screenshot5.png" });
  await page.click(button);
  const message =
    "#__next > div:nth-child(3) > div > div > div.modal_container__yO5GZ > div.modal_content__Flhjj > div.styles_root__l6N51 > div > form > div.Input_root__VNG5T.Input_size-m__VJJaZ.Input_fluid__Cycj8.Input_error__WgHA7 > span";
  await page.waitForSelector(message);
  await page.screenshot({ path: "./screenshots/screenshot6.png" });
  const messageError = await page.$eval(
    message,
    (element) => element.textContent
  );
  expect(messageError).toBe("Неверный email");
});

/*test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  );
});*/
