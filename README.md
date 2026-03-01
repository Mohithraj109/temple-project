# Temple Ticket Counter PWA

A modern, offline-capable Progressive Web App for temple ticket management.

## Features

✅ Offline PWA - Works without internet
✅ Dynamic ticket types (Adult, Child, Custom)
✅ Editable prices
✅ Print receipts
✅ Daily reports
✅ CSV export
✅ IndexedDB storage
✅ Beautiful UI with animations

## Quick Deploy to GitHub Pages

### Option 1: Use the Deploy Script

1. Double-click `deploy.bat`
2. Enter your GitHub repository URL
3. Wait for deployment to complete
4. Enable GitHub Pages in repository settings

### Option 2: Manual Deployment

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages:
1. Go to repository Settings
2. Click Pages
3. Select Branch: main, Folder: / (root)
4. Click Save

## Local Development

Open `index.html` in a browser or use:

```bash
python -m http.server 8000
```

Then visit: http://localhost:8000

## Technologies

- Pure HTML/CSS/JavaScript
- IndexedDB for storage
- Service Worker for offline support
- Google Fonts (Elsie Swash Caps)

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## License

MIT License - Free to use and modify
