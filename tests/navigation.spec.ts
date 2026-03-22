import { test, expect } from '@playwright/test';

test('User can navigate to form Layouts and see Inline form', async ({ page }) => {
  //1. go to the app
  await page.goto('/');

  //2. click the forms menu to expand it
  await page.getByText('Forms').first().click();
  
  //3. click on 'Form Layouts
  await page.getByText('Form Layouts').click();
  
  //4. verificatin: check if a specific header on the page is visible
  const inlineFormHeader = page.locator('nb-card-header', { hasText: 'Inline form' });
  
  await expect(inlineFormHeader).toBeVisible();
  
  //5. interaction: type into an input to prove the page is responsive
    //const emailInput = page.locator('input [placeholder="Email"]').first();
  const emailInput = await page.getByPlaceholder('Email').first();
  
  await emailInput.fill('barry@test.com.au');
  
  await expect(emailInput).toHaveValue('barry@test.com.au');
});
