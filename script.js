document.addEventListener("DOMContentLoaded", async () => {
    const productSelect = document.getElementById("productSelect");
    const variationOptions = document.getElementById("variationOptions");
    const productCode = document.getElementById("ProductCode");

    const response = await fetch("data.json");
    const data = await response.json();

    const populateProductSelect = () => {
        data.items.forEach(({ code, description }) =>
            productSelect.add(new Option(description, code))
        );
    };

    const updateVariationOptions = (productCode) => {
        variationOptions.innerHTML = "";
        const product = data.items.find((item) => item.code === productCode);
        if (!product) return;

        product.varieties.forEach((varietyCode) => {
            const variety = data.varieties.find((variety) => variety.code === varietyCode);
            if (!variety) return;

            const select = document.createElement("select");
            select.dataset.varietyCode = varietyCode;

            const defaultOption = new Option(`Select ${variety.description}`, "");
            select.add(defaultOption);

            variety.options.forEach((option) =>
                select.add(new Option(option.description, option.code))
            );

            const div = document.createElement("div");
            div.appendChild(select);
            variationOptions.appendChild(div);
        });
    };

    const handleProductChange = () => {
        const selectedProductCode = productSelect.value;
        updateVariationOptions(selectedProductCode);
        updateProductCode();
    };

    const updateProductCode = () => {
        const selectedVariationSelects = variationOptions.querySelectorAll("select");
        const selectedVariations = Array.from(selectedVariationSelects).map(
            (select) => select.value
        );

        const selectedProduct = data.items.find(
            (item) => item.code === productSelect.value
        );

        const variationSeparator = selectedVariations.length > 0 ? "." : "";
        const compositeCode = `${selectedProduct?.code || ""}${variationSeparator}${selectedVariations.join(
            "."
        )}`;
        productCode.textContent = `Product Code: ${compositeCode}`;
    };

    populateProductSelect();
    productSelect.addEventListener("change", handleProductChange);
    variationOptions.addEventListener("change", updateProductCode);
});
