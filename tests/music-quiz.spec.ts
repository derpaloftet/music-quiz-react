import {test, expect} from '@playwright/test';

const quizLocalUrl = 'http://localhost:5173/';

test('Intro page is opened', async ({page}) => {
  await page.goto(quizLocalUrl);

  await expect(page.getByRole('heading', {name: 'Music Quiz!'})).toBeVisible();
});

test('Genre page is opened', async ({page}) => {
  await page.goto(quizLocalUrl);

  await page.getByRole('button', {name: 'START'}).click();

  await expect(page.getByRole('heading', {name: 'Choose a category:'})).toBeVisible();
});

test('Genre is chosen', async ({page}) => {
  await page.goto(quizLocalUrl);

  await page.getByRole('button', {name: 'START'}).click();
  await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();
  await page.getByRole('button', {name: 'NEXT'}).click();
  await page.getByRole('button', {name: 'NEXT'}).click();
  await page.getByRole('button', {name: 'NEXT'}).click();

  await expect(page.getByAltText("The picture of a sad cat")).toBeVisible();
});

test('No more questions page shown', async ({page}) => {
  await page.goto(quizLocalUrl);
  await page.getByRole('button', {name: 'START'}).click();
  await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

  for (let i = 0; i < 4; i++) {
    await page.getByRole('button').nth(0).click();  // Locate the first button
    await page.getByRole('button', {name: 'Next'}).click();
  }

  await expect(page.getByText("Wow! No more questions left!")).toBeVisible();
});
