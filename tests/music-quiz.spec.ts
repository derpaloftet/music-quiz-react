import {test, expect} from '@playwright/test';

const quizLocalUrl = 'http://localhost:2012/';
test.beforeEach(async ({page}) => {
  await page.goto(quizLocalUrl);
})

test.describe('Page is opened', () => {
  test('Intro page', async ({page}) => {
    await expect(page.getByRole('heading', {name: 'Music Quiz!'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'START'} )).toBeVisible();
  });

  test('Genre page', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();

    await expect(page.getByRole('heading', {name: 'Choose a category:'})).toBeVisible();
    await expect(page.locator('.btn-basic')).toHaveCount(4)
  });

  test('Quiz page', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    await expect(page.locator('.btn-answer')).toHaveCount(4)
  });

  test('No more questions page', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 4 times clicked correctly
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button').nth(0).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }

    await expect(page.getByText("Wow! No more questions left!")).toBeVisible();
  });

  test('Outro page', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 4 times clicked correctly
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button').nth(0).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    await page.getByRole('button', {name: 'FINISH'}).click();

    await expect(page.getByText("Your Final Score:")).toBeVisible();
  });

  test('Genre page after restart', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 4 times clicked correctly
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button').nth(0).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    await page.getByRole('button', {name: 'FINISH'}).click();
    await page.getByRole('button', {name: 'PLAY AGAIN'}).click();

    await expect(page.getByRole('heading', {name: 'Choose a category:'})).toBeVisible();
  });
})

test.describe('No attempts left', () => {
  test('All questions skipped', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    for (let i = 0; i < 3; i++) {
      await page.getByRole('button', {name: 'NEXT'}).click();
    }

    await expect(page.locator(".skipped-attempts-img")).toBeVisible();
    await expect(page.locator(".attempts-finish")).toBeVisible();
  });

  test('3 questions wrong', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 2 times clicked not correctly, NEXT button shown
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button').nth(1).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    // 1 time clicked correctly, FINISH button shown
    await page.getByRole('button').nth(1).click();

    await expect(page.locator(".attempts-finish")).toBeVisible();
  });
});

test.describe('Outro', () => {

  test('All correct score', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 4 times clicked correctly
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button').nth(0).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    await page.getByRole('button', {name: 'FINISH'}).click();

    await expect(page.getByText("Your Final Score: 4")).toBeVisible();
  });

  test('2 answered correctly, score is 2', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 2 times clicked correctly
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button').nth(0).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    // 2 times clicked not correctly
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button').nth(1).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    await page.getByRole('button', {name: 'FINISH'}).click();

    await expect(page.getByText("Your Final Score: 2")).toBeVisible();
  });
  test('3 wrong, score 0', async ({page}) => {
    await page.getByRole('button', {name: 'START'}).click();
    await page.getByRole('button', {name: 'Pop Songs 2000s'}).click();

    // 2 times clicked not correctly, NEXT button shown
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button').nth(1).click();
      await page.getByRole('button', {name: 'NEXT'}).click();
    }
    // 1 time clicked not correctly, FINISH button shown
    await page.getByRole('button').nth(1).click();
    await page.getByRole('button', {name: 'FINISH'}).click();

    await expect(page.getByText("Your Final Score: 0")).toBeVisible();
  });
});

