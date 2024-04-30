/*!***************************************
 * Level Up Theme for High Level (GHL)
 * https//levelupthemes.com
 * Version: v1.7.30
 ****************************************/

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiper = new Swiper(".swiper", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination]
});

export { swiper as default };
//# sourceMappingURL=swiper.js.map
