
var products = [
    {
        id: 1,
        name: 'Panther',
        price: '$45.00',
        image: 'images/product1.jpg',
        messages: []
    },
    {
        id: 2,
        name: 'BLACK SHEEP',
        price: '$40.00',
        image: 'images/product2.jpg',
        messages: []
    },
    {
        id: 3,
        name: 'COCK',
        price: '$35.99',
        image: 'images/product3.jpg',
        messages: []
    },
    {
        id: 4,
        name: 'LONE WOLF',
        price: '$30.00',
        image: 'images/product4.jpg',
        messages: []
    },
    {
        id: 5,
        name: 'STALLION',
        price: '$45.99',
        image: 'images/product5.jpg',
        messages: []
    },
    {
        id: 6,
        name: 'LION',
        price: '$50.00',
        image: 'images/product6.jpg',
        messages: []
    },
    {
        id: 7,
        name: 'TIGER',
        price: '$40.00',
        image: 'images/product7.jpg',
        messages: []
    },
    {
        id: 8,
        name: 'AMERICAN FREEDOM',
        price: '$100.99',
        image: 'images/product8.jpg',
        messages: []
    }

];

var messageType = {
    out: 'out-message',
    unknown: 'unknown-message'
};

function Message(type, user, message) {
    this.type = type;
    this.user = user;
    this.message = message;
}

function createMessageElement(message) {
    var messageText = document.createTextNode(
        message.user + ': ' + message.message
    );

    var messageEl = document.createElement('div');
    messageEl.appendChild(messageText);

    messageEl.className = message.type;

    return messageEl;
}

function createMessageHandler(event) {
    var messageInput = event.target.previousElementSibling;
    var productId = event.target.dataset.productId;
    var product = products.find(function (p) { return p.id == productId; });

    if (messageInput.value != '') {
        var message = new Message(messageType.out, 'user', messageInput.value);
        product.messages.push(message);

        var messagesContainerEl = document.querySelector(
            '.product-box[data-product-id="' + productId + '"] .messages'
        );

        var el = createMessageElement(message);
        messagesContainerEl.appendChild(el);
        el.scrollIntoView();

        messageInput.value = '';
    }
}


function loadSeedData() {
    var messagesContainerEls = document.querySelectorAll('.messages');
    messagesContainerEls.forEach(function (containerEl) {
        var productId = containerEl.closest('.product-box').dataset.productId;
        var product = products.find(function (p) { return p.id == productId; });

        product.messages.forEach(function (message) {
            var elelement = createMessageElement(message);
            containerEl.appendChild(elelement);
        });
    });
}

var init = function () {
    var sendButtons = document.querySelectorAll('.product-box button');
    sendButtons.forEach(function (button) {
        button.addEventListener('click', createMessageHandler);
    });

    loadSeedData();
};

init();
