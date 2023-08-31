# Product Selector

## Overview

The Product Selector is a small and simple web application that allows users to select a product and its variations. It dynamically generates variation options based on the selected product and displays a composite product code.

## Features

- Select a product from a dropdown list.
- Depending on the selected product, dynamically generate variation options.
- Display a composite product code based on the selected product and variations.

## Customization

- You can customize the product data by modifying the `data.json` file. Make sure to follow the provided structure.
- To apply custom styles, update the `styles.css` file to change the appearance of the web page.
- For more advanced customizations or functionality, you can modify the `script.js` file.

## Data Format

The `data.json` file contains product and variation information. It has two main sections:

### Varieties

- `code`: A unique identifier for the variation type.
- `description`: A human-readable description of the variation type.
- `options`: An array of available options for the variation.

### Items

- `code`: A unique identifier for the product.
- `description`: A human-readable description of the product.
- `varieties`: An array of variation types associated with the product.

## Acknowledgments

- Built with HTML, CSS, and JavaScript.