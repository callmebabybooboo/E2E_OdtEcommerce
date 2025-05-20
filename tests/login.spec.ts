import { test, expect } from '@playwright/test';

const goToWebsite = async (page) => {
    await page.goto('https://odt-ecommerce.onrender.com/');
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'สมัครสมาชิก' })).toBeVisible();
};

const goToLoginPage = async (page) => {
    await page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByRole('heading', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'อีเมล' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'รหัสผ่าน' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByText('ยังไม่มีบัญชี? สมัครสมาชิก')).toBeVisible();
};

const fillLoginForm = async (
    page,
    email: string,
    password: string,
  ) => {
    await page.getByRole('textbox', { name: 'อีเมล' }).fill(email);
    await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).press('Enter');
};

const clickLoginBtn = async (page) => {
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
};

const directToHomePageUser = async (page) => {
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole('link', { name: 'คำสั่งซื้อของฉัน' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ตะกร้าสินค้า' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ออกจากระบบ' })).toBeVisible();
};

const directToHomePageAdmin = async (page) => {
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole('link', { name: 'จัดการคำสั่งซื้อ' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'เพิ่มสินค้า' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ออกจากระบบ' })).toBeVisible();
};

test('เข้าสู่ระบบได้สำเร็จด้วยบัญชีผู้ใช้', async ({ page }) => {
    await goToWebsite(page);
    await goToLoginPage(page);
    await fillLoginForm(page, 'test_user_001@gmail.com', '123456');
    await directToHomePageUser(page);
});

test('เข้าสู่ระบบได้สำเร็จด้วยบัญชีแอดมิน', async ({ page }) => {
    await goToWebsite(page);
    await goToLoginPage(page);
    await fillLoginForm(page, 'admin@odds.team', 'AdminOddsEcommerce123');
    await directToHomePageAdmin(page);
});

test('เข้าสู่ระบบไม่สำเร็จด้วยบัญชีผู้ใช้แต่รหัสผ่านไม่ถูกต้อง', async ({ page }) => {
    await goToWebsite(page);
    await goToLoginPage(page);
    await fillLoginForm(page, 'test_user_001@gmail.com', '112233');
    await expect(page.getByText('อีเมลหรือรหัสผ่านไม่ถูกต้อง').first()).toBeVisible();
});

test('เข้าสู่ระบบไม่สำเร็จถ้าเว้นว่าง', async ({ page }) => {
    await goToWebsite(page);
    await goToLoginPage(page);
    await clickLoginBtn(page);
    await expect(page.getByText('อีเมลไม่สามารถเว้นว่างได้')).toBeVisible();
    await expect(page.getByText('รหัสผ่านไม่สามารถเว้นว่างได้')).toBeVisible();
});

test('เข้าสู่ระบบไม่สำเร็จด้วยบัญชีผู้ใช้ที่ไม่มีอยู่ในระบบ', async ({ page }) => {
    await goToWebsite(page);
    await goToLoginPage(page);
    await fillLoginForm(page, 'test_user_002@gmail.com', '123456');
    await expect(page.getByText('อีเมลหรือรหัสผ่านไม่ถูกต้อง').first()).toBeVisible();
});
