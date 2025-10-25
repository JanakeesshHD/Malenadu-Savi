# Malenadu Savi - Pure Front-End Website

A beautiful, responsive website for Malenadu Savi featuring pure forest honey and artisanal pickles. Built with vanilla HTML, CSS, and JavaScript - no frameworks required.

## 🚀 Quick Start

### Local Testing
1. **Download the files**: Save `index.html`, `styles.css`, and `script.js` in the same folder
2. **Open in browser**: Double-click `index.html` or open it in any web browser
3. **That's it!** The website will work locally without any server setup

### Live Deployment
- Upload all three files to any web hosting service
- No backend or database required
- Works on any static hosting platform (GitHub Pages, Netlify, Vercel, etc.)

## 🎨 Features

- **Mobile-First Design**: Fully responsive across all devices
- **WhatsApp Integration**: Direct ordering through WhatsApp with prefilled messages
- **Product Modal**: Quantity selector with order confirmation
- **Lazy Loading**: Optimized image loading for better performance
- **Accessibility**: WCAG compliant with keyboard navigation
- **Smooth Animations**: Subtle micro-interactions and scroll effects

## 🛠️ Customization Guide

### 1. Update WhatsApp Phone Number

**File**: `script.js`  
**Location**: Line 12

```javascript
const WHATSAPP_PHONE_NUMBER = '+919876543210'; // Replace with your number
```

**Format**: Include country code (e.g., `+919876543210` for India)

### 2. Replace Product Images

**File**: `index.html`

#### Hero Background Image
```html
<!-- Line ~45 -->
<img src="YOUR_FOREST_IMAGE_URL" alt="Malenadu forest landscape" class="hero-bg-image" loading="eager">
```

#### Product Images
```html
<!-- Honey product image - Line ~75 -->
<img src="YOUR_HONEY_JAR_IMAGE" alt="Malenadu Forest Honey jar" loading="lazy">

<!-- Pickle product image - Line ~95 -->
<img src="YOUR_PICKLE_JAR_IMAGE" alt="Amtekayi Pickle jar" loading="lazy">
```

#### Gallery Images
```html
<!-- Lines ~150-170 - Replace all gallery images -->
<img src="YOUR_GALLERY_IMAGE_1" alt="Description" loading="lazy">
```

### 3. Update Product Information

**File**: `script.js`  
**Location**: Lines 13-25

```javascript
const PRODUCT_DATA = {
    honey: {
        name: 'Your Honey Product Name',
        price: 450, // Update price
        image: 'YOUR_HONEY_IMAGE_URL',
        description: 'Your honey description...'
    },
    pickle: {
        name: 'Your Pickle Product Name',
        price: 280, // Update price
        image: 'YOUR_PICKLE_IMAGE_URL',
        description: 'Your pickle description...'
    }
};
```

### 4. Update Product Descriptions in HTML

**File**: `index.html`

#### Honey Product Description (Lines ~80-84)
```html
<p class="product-description">
    Your honey description line 1.<br>
    Your honey description line 2.<br>
    Your honey description line 3.
</p>
<div class="product-price">₹YOUR_PRICE per jar</div>
```

#### Pickle Product Description (Lines ~100-104)
```html
<p class="product-description">
    Your pickle description line 1.<br>
    Your pickle description line 2.<br>
    Your pickle description line 3.
</p>
<div class="product-price">₹YOUR_PRICE per jar</div>
```

### 5. Update About Section

**File**: `index.html`  
**Location**: Lines ~115-130

```html
<p class="about-description">
    Your company story paragraph 1...
</p>
<p class="about-description">
    Your company story paragraph 2...
</p>
```

### 6. Update Process Timeline

**File**: `index.html`  
**Location**: Lines ~140-170

```html
<div class="process-step">
    <div class="step-number">1</div>
    <div class="step-content">
        <h3>Your Step Title</h3>
        <p>Your step description...</p>
    </div>
</div>
```

### 7. Update Contact Information

**File**: `index.html`  
**Location**: Footer section (Lines ~200+)

```html
<a href="mailto:your-email@domain.com">Email</a>
```

## 🎨 Design Customization

### Colors
The website uses these design tokens (defined in `styles.css`):

- **Primary Brown**: `#7A4B2A` - Main brand color
- **Honey Gold**: `#F6D68A` - Accent color
- **Cream**: `#EAE2D6` - Background sections
- **Forest Green**: `#2E5A3A` - Secondary color
- **White**: `#FFFFFF` - Base background

### Fonts
- **Headings**: Merriweather (serif) - Google Fonts
- **Body Text**: Inter (sans-serif) - Google Fonts

### Customizing Colors
Edit the CSS variables in `styles.css`:

```css
/* Replace these values throughout the CSS file */
#7A4B2A  /* Primary brown */
#F6D68A  /* Honey gold */
#EAE2D6  /* Cream */
#2E5A3A  /* Forest green */
#FFFFFF  /* White */
```

## 📱 WhatsApp Integration

### How It Works
1. **Enquire Button**: Opens WhatsApp with general inquiry message
2. **Buy Button**: Opens product modal for quantity selection
3. **Confirm Order**: Opens WhatsApp with detailed order information

### Message Format
The WhatsApp messages are automatically formatted as:

```
Hi! I would like to order:

Product: [Product Name]
Quantity: [X] jar(s)
Price per jar: ₹[Price]
Total amount: ₹[Total]

Please confirm availability and delivery details. Thank you!
```

### Customizing Messages
Edit the `openWhatsApp()` function in `script.js` (Lines 180-200) to customize message templates.

## 🔧 Technical Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- **Lazy Loading**: Images load only when needed
- **Preloading**: Critical images preloaded for faster display
- **Optimized CSS**: No frameworks, minimal overhead
- **Compressed Assets**: Optimized images and code

### Accessibility Features
- **Semantic HTML**: Proper heading structure and landmarks
- **Alt Text**: All images have descriptive alt text
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Indicators**: Visible focus states
- **Screen Reader Support**: Proper ARIA labels

## 🐛 Troubleshooting

### Common Issues

1. **WhatsApp not opening**
   - Check phone number format (include country code)
   - Ensure number has no spaces or special characters

2. **Images not loading**
   - Verify image URLs are accessible
   - Check for HTTPS/HTTP protocol issues
   - Ensure images are publicly accessible

3. **Mobile menu not working**
   - Check if JavaScript is enabled
   - Verify all three files are in the same directory

4. **Modal not opening**
   - Check browser console for JavaScript errors
   - Ensure product data is properly configured

### Testing Checklist
- [ ] All images load correctly
- [ ] WhatsApp links open with correct phone number
- [ ] Product modal opens and calculates totals
- [ ] Mobile navigation works on small screens
- [ ] Smooth scrolling works for navigation links

## 📄 File Structure

```
malenadu-savi/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🚀 Deployment Options

### Free Hosting Platforms
1. **GitHub Pages**: Upload to a GitHub repository
2. **Netlify**: Drag and drop the folder
3. **Vercel**: Connect GitHub repository
4. **Firebase Hosting**: Use Firebase CLI

### Traditional Web Hosting
- Upload all files to your web server's public directory
- No special configuration required

## 📞 Support

For technical support or customization help:
- Check the browser console for error messages
- Verify all file paths are correct
- Ensure all three files are in the same directory

## 📝 License

This website template is provided as-is for Malenadu Savi. Feel free to modify and customize for your needs.

---

**Built with ❤️ for Malenadu Savi**  
*Pure forest honey & artisanal pickles from the heart of Karnataka*
