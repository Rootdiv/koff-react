import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';

import style from './Slider.module.scss';
import { API_URL } from '@/const';

import { useRef, useState } from 'react';

export const Slider = ({ images, title }) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images?.length) return <div>Загрузка картинок...</div>;

  return (
    <div className={style.picture}>
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        spaceBetween={10}
        className={style.sliderMain}>
        {images.map((image, i) => (
          <SwiperSlide key={i} className={style.slideMain}>
            <img src={`${API_URL}/${image}`} alt={title} className={style.image} />
          </SwiperSlide>
        ))}
        {images.length > 1 && (
          <>
            <button ref={navigationNextRef} type="button" className={`${style.arrow} ${style.arrowPrev}`}>
              <svg width="32" height="32" className={style.arrowSvg}>
                <use href="/img/sprite.svg#prev"></use>
              </svg>
            </button>
            <button ref={navigationPrevRef} type="button" className={`${style.arrow} ${style.arrowNext}`}>
              <svg width="32" height="32" className={style.arrowSvg}>
                <use href="/img/sprite.svg#next"></use>
              </svg>
            </button>
          </>
        )}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs]}
          watchSlidesProgress
          spaceBetween={14}
          slidesPerView={4}
          className={style.sliderThumbnails}>
          {images.map((image, i) => (
            <SwiperSlide key={i} className={style.thumbnailsSlide}>
              <img src={`${API_URL}/${image}`} alt={title} className={style.thumbnailsImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
