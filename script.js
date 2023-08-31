import data from './data.json' assert { type: 'json' };

const findItemByCode = (code) => data.items.find((item) => item.code === code);

document.addEventListener("DOMContentLoaded", async () => {
    const productSelect = document.getElementById("productSelect");
    const variationOptions = document.getElementById("variationOptions");
    const productCode = document.getElementById("ProductCode");

    const populateProductSelect = () => {
        data.items.forEach(({ code, description }) =>
            productSelect.add(new Option(description, code))
        );
    };

    const updateVariationOptions = (productCode) => {
        variationOptions.innerHTML = "";
        const product = findItemByCode(productCode);
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
        const parts = Array.from(selectedVariationSelects).map(
            (select) => select.value
        );
        parts.unshift(findItemByCode(productSelect.value)?.code || "")
        if (parts.find(p => p === "") != null) {
            productCode.textContent = `Please select all options`;
        } else {
            productCode.textContent = `Product Code: ${parts.join(".")}`;
        }}

    populateProductSelect();
    productSelect.addEventListener("change", handleProductChange);
    variationOptions.addEventListener("change", updateProductCode);
});
