document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        spaceBetween: 20,
        breakpoints: {
            // 820px以上のとき（PC）
            821: {
                slidesPerView: 2,
            },
            // 820px未満のとき（スマホ）
            0: {
                slidesPerView: 1,
            }
        }
    });

    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');

    prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        swiper.slidePrev();
    });

    nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        swiper.slideNext();
    });
});

