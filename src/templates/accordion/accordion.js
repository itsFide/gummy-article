// Аккордеон
function accordion({ trigger, itemClass, activeClass }) {
    const items = document.querySelectorAll(trigger);
    items.forEach((item) => {
        item.addEventListener("click", () => {
            const parent = item.parentNode;
            if (parent.classList.contains(activeClass)) {
                parent.classList.remove(activeClass);
            } else {
                document
                    .querySelectorAll(itemClass)
                    .forEach((child) => child.classList.remove(activeClass));
                parent.classList.add(activeClass);
            }
        });
    });
}
