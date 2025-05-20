import { test, expect } from '@playwright/test';

const goToWebsite = async (page) => {
    await page.goto('https://odt-ecommerce.onrender.com/');
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'เข้าสู่ระบบ' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'สมัครสมาชิก' })).toBeVisible();
};

const goToRegisterPage = async (page) => {
    await page.getByRole('navigation').getByRole('link', { name: 'สมัครสมาชิก' }).click();
    await expect(page.getByRole('heading', { name: 'สมัครสมาชิก' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'อีเมล' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'สร้างบัญชีใหม่' })).toBeVisible();
    await expect(page.getByText('มีบัญชีอยู่แล้ว? เข้าสู่ระบบ')).toBeVisible();
};

const fillSignUpForm = async (
    page,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    await page.getByRole('textbox', { name: 'อีเมล' }).fill(email);
    await page.getByRole('textbox', { name: 'รหัสผ่าน', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'ยืนยันรหัสผ่าน' }).fill(confirmPassword);
};

const clickRegisterBtn = async (page) => {
    await page.getByRole('button', { name: 'สร้างบัญชีใหม่' }).click();
};

const directToHomePageUser = async (page) => {
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'คำสั่งซื้อของฉัน' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ตะกร้าสินค้า' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ออกจากระบบ' })).toBeVisible();
};

test('สมัครสมาชิกสำเร็จด้วยข้อมูลที่ถูกต้อง', async ({ page }) => {
    await goToWebsite(page);
    await goToRegisterPage(page);
    await fillSignUpForm(page, 'test_user_001@gmail.com', '123456', '123456');
    await clickRegisterBtn(page);
    await directToHomePageUser(page);
});

test('สมัครสมาชิกไม่สำเร็จถ้ามีอีเมลนี้อยู่แล้ว', async ({ page }) => {
    await goToWebsite(page);
    await goToRegisterPage(page);
    await fillSignUpForm(page, 'test_user_001@gmail.com', '123456', '123456');
    await clickRegisterBtn(page);
    await expect(page.getByText('อีเมลนี้มีอยู่แล้ว')).toBeVisible();
});

test('สมัครสมาชิกไม่สำเร็จถ้าเว้นว่าง', async ({ page }) => {
    await goToWebsite(page);
    await goToRegisterPage(page);
    await clickRegisterBtn(page);
    await expect(page.getByText('อีเมลไม่สามารถเว้นว่างได้')).toBeVisible();
    await expect(page.getByText('รหัสผ่านไม่สามารถเว้นว่างได้')).toBeVisible();
    await expect(page.getByText('กรุณายืนยันรหัสผ่าน')).toBeVisible();
});

test('สมัครสมาชิกไม่สำเร็จถ้ารหัสผ่านไม่ตรงกัน', async ({ page }) => {
    await goToWebsite(page);
    await goToRegisterPage(page);
    await fillSignUpForm(page, 'test_user_002@gmail.com', '123456', '112233');
    await clickRegisterBtn(page);
    await expect(page.getByText('รหัสผ่านไม่ตรงกัน')).toBeVisible();
});
