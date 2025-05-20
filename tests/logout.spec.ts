import {test, expect} from '@playwright/test';

const goToWebsite = async (page) => {
    await page.goto('https://odt-ecommerce.onrender.com/');
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'สมัครสมาชิก' })).toBeVisible();
};

const loginWithAdmin = async (page) => {
    await page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByRole('heading', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'อีเมล' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'รหัสผ่าน' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByText('ยังไม่มีบัญชี? สมัครสมาชิก')).toBeVisible();
    await page.getByRole('textbox', { name: 'อีเมล' }).fill('Admin@odds.team');
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('AdminOddsEcommerce123');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'จัดการคำสั่งซื้อ' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'เพิ่มสินค้า' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ออกจากระบบ' })).toBeVisible();
};

const loginWithUser = async (page) => {
    await page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByRole('heading', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'อีเมล' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'รหัสผ่าน' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByText('ยังไม่มีบัญชี? สมัครสมาชิก')).toBeVisible();
    await page.getByRole('textbox', { name: 'อีเมล' }).fill('test_user_001@gmail.com');
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).fill('123456');
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'คำสั่งซื้อของฉัน' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ตะกร้าสินค้า' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ออกจากระบบ' })).toBeVisible();
};

const clickLogoutBtn = async (page) => {
    await page.getByRole('link', { name: 'ออกจากระบบ' }).click();
};

test ('ออกจากระบบด้วยบัญชีแอดมิน', async ({ page }) => {
    await goToWebsite(page);
    await loginWithAdmin(page);
    await clickLogoutBtn(page);
    await expect(page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'สมัครสมาชิก' })).toBeVisible();
});

test ('ออกจากระบบด้วยบัญชีผู้ใช้', async ({ page }) => {
    await goToWebsite(page);
    await loginWithUser(page);
    await clickLogoutBtn(page);
    await expect(page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'สมัครสมาชิก' })).toBeVisible();
});