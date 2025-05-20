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
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).press('Enter');

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
    await page.getByRole('textbox', { name: 'รหัสผ่าน' }).press('Enter');
    await expect(page.getByRole('link', { name: 'ODT E-Commerce' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'คำสั่งซื้อของฉัน' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ตะกร้าสินค้า' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'ออกจากระบบ' })).toBeVisible();
};

const addProduct = async (page) => {
    await page.getByRole('link', { name: 'เพิ่มสินค้า' }).click();
    await expect(page.getByRole('heading', { name: 'เพิ่มสินค้าใหม่' })).toBeVisible();
    await page.getByRole('textbox', { name: 'ชื่อสินค้า' }).fill('Manchester United Tiro 24 Training Pants');
    await page.getByRole('textbox', { name: 'รายละเอียดสินค้า' }).fill('This product is excluded from all promotional discounts and offers.');
    await page.locator('#product_category').selectOption('เสื้อผ้า');
    await page.getByRole('textbox', { name: 'ราคา' }).fill('2600');
    await page.getByRole('textbox', { name: 'จำนวนสินค้า' }).fill('10');
    await page.locator('#product_status').selectOption('แสดงสินค้า');
    await page.getByRole('textbox', { name: 'URL รูปภาพสินค้าหลัก URL' }).fill('https://assets.adidas.com/images/w_500,h_500,f_auto,q_auto,fl_lossy,c_fill,g_auto/1c49a9ba0f9a42629cfe701b3e522089_9366/Manchester_United_Tiro_24_Training_Pants_Black_JE3729_21_model.jpg');
    await page.getByRole('textbox', { name: 'วางลิงก์ URL รูปสินค้า' }).fill('https://assets.adidas.com/images/w_500,h_500,f_auto,q_auto,fl_lossy,c_fill,g_auto/1bef38e579264201986854b95014deb2_9366/Manchester_United_Tiro_24_Training_Pants_Black_JE3729_23_hover_model.jpg');
    await page.getByRole('button', { name: 'สร้างสินค้า' }).click();
    await expect(page.getByText('สร้างสินค้าเรียบร้อยแล้ว')).toBeVisible();
    await page.getByRole('heading', { name: 'Manchester United Tiro 24 Training Pants' });
};

test('แอดมินสามารถเพิ่มสินค้าใหม่ได้สำเร็จ', async ({ page }) => {
    await goToWebsite(page);
    await loginWithAdmin(page);
    await addProduct(page);
});

test('แอดมินเพิ่มสินค้าใหม่ไม่สำเร็จถ้าเว้นว่างไว้', async ({ page }) => {
    await goToWebsite(page);
    await loginWithAdmin(page);
    await page.getByRole('link', { name: 'เพิ่มสินค้า' }).click();
    await expect(page.getByRole('heading', { name: 'เพิ่มสินค้าใหม่' })).toBeVisible();
    await page.getByRole('button', { name: 'สร้างสินค้า' }).click();
    await expect(page.getByText('ชื่อสินค้าห้ามเว้นว่าง')).toBeVisible();
    await expect(page.getByText('คำอธิบายสินค้าห้ามเว้นว่าง')).toBeVisible();
    await expect(page.getByText('กรุณาเลือกหมวดหมู่')).toBeVisible();
    await expect(page.getByText('ราคาสินค้าห้ามเว้นว่าง')).toBeVisible();
    await expect(page.getByText('จำนวนสินค้าห้ามเว้นว่าง')).toBeVisible();
    await expect(page.getByText('กรุณาเลือกสถานะ')).toBeVisible();
    await expect(page.getByText('รูปภาพสินค้าห้ามเว้นว่าง')).toBeVisible();
});

test ('แอดมินสามารถแก้ไขสินค้าได้', async ({ page }) => {
    await goToWebsite(page);
    await loginWithAdmin(page);
    await page.getByRole('link', { name: 'Manchester United Tiro 24' }).click();
    await expect(page.getByRole('heading', { name: 'Manchester United Tiro 24 Training Pants' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'แก้ไขสินค้า' })).toBeVisible();
    await page.getByRole('link', { name: 'แก้ไขสินค้า' }).click();
    await expect(page.getByRole('heading', { name: 'แก้ไขสินค้า' })).toBeVisible();
    await page.getByRole('textbox', { name: 'ชื่อสินค้า' }).fill('Manchester United Tiro 24 Training Pants-Updated');
    await page.getByRole('textbox', { name: 'รายละเอียดสินค้า' }).fill('This product is excluded from all promotional discounts and offers. - Updated');
    await page.locator('#product_category').selectOption('เสื้อผ้า');
    await page.getByRole('textbox', { name: 'ราคา' }).fill('2600');
    await page.getByRole('textbox', { name: 'จำนวนสินค้า' }).fill('10');
    await page.locator('#product_status').selectOption('แสดงสินค้า');
    await page.getByRole('textbox', { name: 'URL รูปภาพสินค้าหลัก URL' }).fill('https://assets.adidas.com/images/w_500,h_500,f_auto,q_auto,fl_lossy,c_fill,g_auto/1c49a9ba0f9a42629cfe701b3e522089_9366/Manchester_United_Tiro_24_Training_Pants_Black_JE3729_21_model.jpg');
    await page.getByRole('textbox', { name: 'วางลิงก์ URL รูปสินค้า' }).fill('https://assets.adidas.com/images/w_500,h_500,f_auto,q_auto,fl_lossy,c_fill,g_auto/1bef38e579264201986854b95014deb2_9366/Manchester_United_Tiro_24_Training_Pants_Black_JE3729_23_hover_model.jpg');
    await page.getByRole('button', { name: 'บันทึกสินค้า' }).click();
    await expect(page.getByText('อัปเดตสินค้าเรียบร้อยแล้ว')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Manchester United Tiro 24 Training Pants-Updated' })).toBeVisible();
 });

 test ('ผู้ใช้สามารถดูรายละเอียดสินค้าได้', async ({ page }) => {
    await goToWebsite(page);
    await loginWithUser(page);
    await page.getByRole('link', { name: 'เสื้อยืด Manchester United UBP' }).click();
    await expect(page.getByRole('heading', { name: 'เสื้อยืด Manchester United UBP' })).toBeVisible();
    await expect(page.getByText('ราคา ฿1,700.00')).toBeVisible();
    await expect(page.getByText('ประเภทสินค้า: เสื้อผ้า')).toBeVisible();
    await expect(page.getByText('รายละเอียดสินค้า')).toBeVisible();
    await expect(page.getByText('This product is excluded from all promotional discounts and offers.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'เพิ่มลงตะกร้า' })).toBeVisible();
 });