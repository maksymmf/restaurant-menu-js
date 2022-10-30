'use strict';

function menuNav() {
    const menuWrapper = document.querySelector('.menu-items-wrapper');
    const menuButtons = document.querySelectorAll('.button');
    const url = 'http://127.0.0.1:5500/js/data.json';

    let fetchData = [];
    async function catchError(url) {
        try {
            const response = await fetch(url);
            fetchData = await response.json();
        } catch (err) {
            return fetchData;
        }
    }

    function htmlItemMenuTemplate(res, item) {
        return res.innerHTML += `
        <div class="menu-item">
            <img src="${item.img}">
            <div class="item-info">
                <div class="item-title">
                    <h4>${item.title}</h4>
                    <span class="price">${item.price}</span>
                </div>
                <div class="item-descr">
                    <p>"${item.description}</p>
                </div>
            </div>
        </div>
        `;
    }

    async function displayDefault() {
        let fetchData = [];
        try {
            const response = await fetch(url);
            fetchData = await response.json();
        } catch (err) {
            return fetchData;
        }

        fetchData.forEach(element => {
            htmlItemMenuTemplate(menuWrapper, element);
        });
    }

    displayDefault();

    const filter = async (categoryButton, categoryCards) => {
        await catchError(url);
        categoryCards.replaceChildren();
        fetchData.forEach(element => {
            const matchingCards = element.type;
            const isAttributesEqual = categoryButton.toLowerCase() === matchingCards.toLowerCase();

            if (isAttributesEqual || categoryButton === 'all') {
                htmlItemMenuTemplate(categoryCards, element);
            }
        });
    };

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const actualButton = button.dataset.filter;

            filter(actualButton, menuWrapper);

            menuButtons.forEach(button => {
                button.classList.remove('active');
            });
            button.classList.add('active');
        });
    });
}

menuNav();