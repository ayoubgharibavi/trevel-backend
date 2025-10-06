# راهنمای استقرار پروژه Trevel Backend روی Liara

## پیش‌نیازها

1. اکانت Liara
2. Liara CLI نصب شده
3. پروژه Git آماده

## مراحل استقرار

### 1. نصب Liara CLI

```bash
# نصب Liara CLI
npm install -g @liara/cli

# ورود به اکانت Liara
liara login
```

### 2. تنظیم متغیرهای محیطی

فایل `env.production` را کپی کرده و متغیرهای زیر را تنظیم کنید:

```bash
cp env.production .env
```

متغیرهای مهم:
- `JWT_SECRET`: کلید مخفی JWT (باید تغییر کند)
- `DATABASE_URL`: مسیر پایگاه داده SQLite
- `SEPEHR_API_KEY` و `SEPEHR_API_SECRET`: کلیدهای API سپهر
- `CHARTER118_API_KEY`: کلید API Charter118
- `CORS_ORIGIN`: دامنه فرانت‌اند

### 3. تنظیم پایگاه داده

```bash
# تولید کلاینت Prisma
npx prisma generate

# اجرای migration ها
npx prisma migrate deploy

# اجرای seed (اختیاری)
npm run prisma:seed
```

### 4. ساخت پروژه

```bash
# ساخت پروژه
npm run build
```

### 5. استقرار روی Liara

```bash
# استقرار پروژه
liara deploy

# یا با تنظیمات خاص
liara deploy --app trevel-backend
```

## تنظیمات Liara

### فایل liara.json

```json
{
  "app": "trevel-backend",
  "port": 3000,
  "build": {
    "location": "iran"
  },
  "disks": [
    {
      "name": "database",
      "mountPath": "/app/prisma"
    }
  ],
  "env": {
    "NODE_ENV": "production",
    "PORT": "3000"
  }
}
```

### متغیرهای محیطی در Liara

در پنل Liara، متغیرهای زیر را اضافه کنید:

- `DATABASE_URL`: `file:/app/prisma/prod.db`
- `JWT_SECRET`: کلید مخفی JWT
- `NODE_ENV`: `production`
- `PORT`: `3000`

## مدیریت پایگاه داده

### پشتیبان‌گیری

```bash
# پشتیبان‌گیری از پایگاه داده
cp /app/prisma/prod.db /app/prisma/backup_$(date +%Y%m%d_%H%M%S).db
```

### بازیابی

```bash
# بازیابی از پشتیبان
cp /app/prisma/backup_YYYYMMDD_HHMMSS.db /app/prisma/prod.db
```

## مانیتورینگ

### لاگ‌ها

```bash
# مشاهده لاگ‌های اپلیکیشن
liara logs --app trevel-backend

# مشاهده لاگ‌های real-time
liara logs --app trevel-backend --follow
```

### وضعیت اپلیکیشن

```bash
# بررسی وضعیت
liara status --app trevel-backend
```

## عیب‌یابی

### مشکلات رایج

1. **خطای پایگاه داده**: بررسی کنید که disk به درستی mount شده باشد
2. **خطای JWT**: کلید JWT_SECRET را بررسی کنید
3. **خطای CORS**: دامنه فرانت‌اند را در CORS_ORIGIN تنظیم کنید

### دستورات مفید

```bash
# ورود به container
liara shell --app trevel-backend

# ری‌استارت اپلیکیشن
liara restart --app trevel-backend

# بررسی منابع
liara metrics --app trevel-backend
```

## به‌روزرسانی

```bash
# به‌روزرسانی کد
git push origin main

# استقرار مجدد
liara deploy --app trevel-backend
```

## نکات مهم

1. همیشه قبل از استقرار، پروژه را محلی تست کنید
2. متغیرهای محیطی حساس را در پنل Liara تنظیم کنید
3. پایگاه داده را به صورت منظم پشتیبان‌گیری کنید
4. لاگ‌ها را به صورت منظم بررسی کنید

## پشتیبانی

در صورت بروز مشکل، لاگ‌ها را بررسی کرده و با تیم پشتیبانی Liara تماس بگیرید.
