import { expect, test } from '@playwright/test';

test('demo app boots and renders the home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/UsaComponents/);
  await expect(page.getByRole('banner')).toContainText('Ngx USWDS');
  await expect(page.getByRole('heading', { name: 'Ngx USWDS - Home' })).toBeVisible();
  await expect(page.getByText('Use this space for testing new components')).toBeVisible();
});
