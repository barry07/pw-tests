// spec: Navigate to Auth Register Page
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Auth Navigation', () => {
  test('Navigate to the auth register page', async ({ page }) => {
    // 1. Navigate to the application home page
    await page.goto('http://localhost:4201');

    // 2. Click on the Auth menu to expand it
    await page.getByRole('link', { name: 'Auth' }).click();

    // 3. Click on the Register link in the Auth menu
    await page.getByRole('link', { name: 'Register' }).click();

    // 4. Verify navigation to the register page
    await expect(page).toHaveURL('http://localhost:4201/auth/register');
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
    await expect(page.locator('input[name="fullName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="rePass"]')).toBeVisible();
  });
});
