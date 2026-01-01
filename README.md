# 📚 Libraria - Library Information System

**Libraria** is a modern library information system designed to simplify the management of books, users, borrowing transactions, and statistical reports. Built with **Laravel**, **Inertia.js**, and **React.js**, and powered by **TailwindCSS** with the **ShadCN** UI kit, Libraria delivers a fast, responsive, and intuitive user experience.

## ✨ Key Features

✅ **Book Management** – Easily add, edit, delete, and manage book inventory.  
✅ **Categories & Publishers** – Organize books based on categories and publishers.  
✅ **User Management** – Manage library members with multiple roles & permissions.  
✅ **Borrowing & Returning System** – Record book borrowing and return transactions.  
✅ **Fine Management** – Automated late fees with an integrated payment system.  
✅ **Reports & Statistics** – Fine reports, book stock reports, and borrowing statistics.  
✅ **Dark Mode** – Modern interface with dark mode support.  
✅ **Payment Gateway Integration** – Online fine payments using **Midtrans**.

## 🛠️ Technologies Used

- **Backend:** Laravel + Inertia.js
- **Frontend:** React.js + TailwindCSS + ShadCN UI
- **Database:** MySQL / PostgreSQL
- **Payment Gateway:** Midtrans

🚀 **Libraria** is designed to deliver a modern, efficient, and flexible library management experience.

## 📦 Installation Guide

```bash
# 1. Clone this repository
git clone https://github.com/aditya250400/libraria.git

# 2. Navigate into the project directory
cd kanbanify

# 3. Install backend dependencies
composer install

# 4. Install frontend dependencies
npm install

# 5. Set up environment and database
cp .env.example .env
php artisan key:generate

# 6. Run database migrations
php artisan migrate

# 7. Start the development servers
npm run dev
php artisan serve
