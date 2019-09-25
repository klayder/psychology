import $ from 'jquery';
import 'slick-carousel';

import agreementContent from './agreement';

import "../../node_modules/reset-css/sass/_reset.scss";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import '../../node_modules/slick-carousel/slick/slick.scss';
import '../../node_modules/slick-carousel/slick/slick-theme.scss';
import '../styles/index.scss';

function getOverlay(content) {
    return `
    <section class="modal-overlay">
        <button class="modal-overlay__button-close close-modal">
            <span class="modal-overlay__button-close--leftright"></span>
            <span class="modal-overlay__button-close--rightleft"></span>
            <label class="modal-overlay__button-close--close">close</label>
        </button>
        ${content}
    </section>
    `;
};
const payment = `
<form class=" main-content__contacts-form action=" '.$URL.' " method="post ">
    <!-- <input type="hidden " name="EP_MerNo " value=" '.$EP_MerNo.' " />
    <input type="hidden " name="EP_Expires " value=" '.$EP_Expires.' " />
    <input type="hidden " name="EP_Hash " value=" '.$EP_Hash.' " />
    <input type="hidden " name="EP_Success_URL " value=" '.$EP_Success_URL.' " />
    <input type="hidden " name="EP_Cancel_URL " 		value=" '.$EP_Cancel_URL.' " />
    <input type="hidden " name="EP_Debug " value=" '.$EP_Debug.' " />
    <input type="hidden " name="EP_OrderNo " value=" '.$EP_OrderNo.' " readonly />
    <input type="hidden " name="EP_Comment " value=" '.$EP_Comment.' " readonly />
    <input type="hidden " name="EP_OrderInfo " value=" '.$EP_OrderInfo.' " readonly />
    <input type="hidden " name="EP_Sum " value=" '.$EP_Sum.' " readonly /> -->
    <input class="main-content__form-input " required placeholder="Ваше имя " type="text " name="CustName " />
    <input class="main-content__form-input " required placeholder="Адрес " type="text " name="CustAddr " />
    <input class="main-content__form-input " required placeholder="E-mail " type="text " name="CustEMail " />
    <textarea class="main-content__form-input " required placeholder="Коментарий " type="text " name="OrderDetails "></textarea>
    
    <div class="main-content__form-controls-wrapper ">
        <button type="submit " class="main-content__form-button ">Перейти к оплате</button>
        <button type="button " class="main-content__form-button close-modal ">Отмена</button>
    </div>
</form>
`;

const moneyback = `
<div class="document-wrapper">
    <h3 class="main-content__section-description">УСЛОВИЯ ВОЗВРАТА</h3>
    <p class="main-content__skills-content-item text-content">
        В случае, если Вы не получили заказ( не оказана услуга), Вам необходимо обратиться поставщику услуги по телефонам и e-mail.».
    </p>
    <p class="main-content__skills-content-item text-content">
        Возврат денежных средств осуществляется на ту  карточку с которой была произведена оплата.
    </p>
    <p class="main-content__skills-content-item text-content">
        После совершения оплаты с использованием банковской карточки необходимо сохранять полученные карт-чеки (подтверждения об оплате, полученные в Интернет-магазине) для сверки с выпиской из карт-счёта (с целью подтверждения совершённых операций в случае возникновения спорных ситуаций)
    </p>
</div>
`;

const agreement = `
<div class="document-wrapper" style="font-family: Arial;">
    ${agreementContent}  
</div>
`;


const modals = {
    payment,
    moneyback,
    agreement,
};

$(document).ready(() => {
    let modal = null;
    let closeModalButton = null;
    const body = $('body');
    const main = $('main');
    const makePaymentButton = $('.make-payment');
    const openModalButtons = $('.open-modal');
    const links = $('.main-header__navigation-link');

    const closeModal = () => {
        if (modal) {
            main.removeClass('blur');
            body.css({
                overflow: 'auto',
            });
            modal.remove();
            modal = null;
        }
    };

    const openModal = (inner) => {
        if (modal) {
            modal.remove();
        } else {
            main.addClass('blur');
            body.css({
                overflow: 'hidden',
            });
        }

        const curretModal = getOverlay(inner);

        body.append(curretModal);
        closeModalButton = $('.close-modal');
        closeModalButton.click(closeModal);
        modal = $('.modal-overlay');
    };

    makePaymentButton.click(function() {
        $.ajax({
            type: 'GET',
            url: 'php/payment.php',
        }).done(function(url) {
            debugger;
            window.location.href = url;
        });
        return false;
    });

    openModalButtons.click(function() {
        const key = $(this).data('modal');
        const modalConten = modals[key] || paymentForm;

        return openModal(modalConten);
    });
    links.click(closeModal);

    $('.main-content__skills-list').slick({
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: true,
        pauseOnFocus: true,

    });

    $('#feedback').submit(() => {
        $.ajax({
            type: 'POST',
            url: 'php/mail.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            alert('Спасибо за заявку! Скоро мы с вами свяжемся.');
            $('#feedback').trigger('reset');
        });
        return false;
    });
});