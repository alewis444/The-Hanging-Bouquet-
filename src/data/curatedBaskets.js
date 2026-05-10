// Curated baskets for Zone 9–10
// Each entry: { baskets: [{image, flowerIds}], replacementIds }
// flower IDs match those in flowers.js

const base = import.meta.env.BASE_URL;

export const CURATED_BASKETS = {
  pollinator: {
    spring: {
      baskets: [
        { image: `${base}baskets/pollinator_spring-summer_1.jpg`, flowerIds: [2, 5, 20, 7, 10] },
        { image: `${base}baskets/pollinator_spring-summer_2.jpg`, flowerIds: [18, 23, 24, 30, 32] },
        { image: `${base}baskets/pollinator_spring-summer_3.jpg`, flowerIds: [9, 34, 21, 13] },
      ],
      replacementIds: [26, 28],
    },
    summer: {
      baskets: [
        { image: `${base}baskets/pollinator_spring-summer_1.jpg`, flowerIds: [2, 5, 20, 7, 10] },
        { image: `${base}baskets/pollinator_spring-summer_2.jpg`, flowerIds: [18, 23, 24, 30, 32] },
        { image: `${base}baskets/pollinator_spring-summer_3.jpg`, flowerIds: [9, 34, 21, 13] },
      ],
      replacementIds: [26, 28],
    },
    autumn: {
      baskets: [
        { image: `${base}baskets/pollinator_autumn_4.jpg`, flowerIds: [2, 5, 23, 7, 10] },
        { image: `${base}baskets/pollinator_autumn_5.jpg`, flowerIds: [18, 34, 24, 30, 13] },
      ],
      replacementIds: [9],
    },
    winter: {
      baskets: [
        { image: `${base}baskets/pollinator_autumn_4.jpg`, flowerIds: [2, 5, 23, 7, 10] },
        { image: `${base}baskets/pollinator_autumn_5.jpg`, flowerIds: [18, 34, 24, 30, 13] },
      ],
      replacementIds: [9],
    },
  },
  romantic: {
    spring: {
      baskets: [
        { image: `${base}baskets/romantic_all_6.jpg`, flowerIds: [17, 5, 11, 6, 7] },
        { image: `${base}baskets/romantic_spring-summer_7.jpg`, flowerIds: [26, 20, 21, 13, 15] },
        { image: `${base}baskets/romantic_spring-summer_8.jpg`, flowerIds: [18, 27, 12, 31, 32] },
      ],
      replacementIds: [10, 23, 29, 30, 33],
    },
    summer: {
      baskets: [
        { image: `${base}baskets/romantic_all_6.jpg`, flowerIds: [17, 5, 11, 6, 7] },
        { image: `${base}baskets/romantic_spring-summer_7.jpg`, flowerIds: [26, 20, 21, 13, 15] },
        { image: `${base}baskets/romantic_spring-summer_8.jpg`, flowerIds: [18, 27, 12, 31, 32] },
      ],
      replacementIds: [10, 23, 30, 33],
    },
    autumn: {
      baskets: [
        { image: `${base}baskets/romantic_all_6.jpg`, flowerIds: [17, 5, 11, 6, 7] },
        { image: `${base}baskets/romantic_autumn_9.jpg`, flowerIds: [29, 23, 27, 13, 15] },
        { image: `${base}baskets/romantic_autumn_10.jpg`, flowerIds: [18, 12, 31, 33] },
      ],
      replacementIds: [10, 30],
    },
    winter: {
      baskets: [
        { image: `${base}baskets/romantic_all_6.jpg`, flowerIds: [17, 5, 11, 6, 7] },
        { image: `${base}baskets/romantic_autumn_9.jpg`, flowerIds: [29, 23, 27, 13, 15] },
        { image: `${base}baskets/romantic_autumn_10.jpg`, flowerIds: [18, 12, 31, 33] },
      ],
      replacementIds: [10, 30],
    },
  },
  wild: {
    spring: {
      baskets: [
        { image: `${base}baskets/wild_spring-summer_11.jpg`, flowerIds: [2, 3, 21, 4, 10] },
        { image: `${base}baskets/wild_spring-summer_12.jpg`, flowerIds: [24, 27, 14] },
      ],
      replacementIds: [22, 28, 34],
    },
    summer: {
      baskets: [
        { image: `${base}baskets/wild_spring-summer_11.jpg`, flowerIds: [2, 3, 21, 4, 10] },
        { image: `${base}baskets/wild_spring-summer_12.jpg`, flowerIds: [24, 27, 14] },
      ],
      replacementIds: [22, 28, 34],
    },
    autumn: {
      baskets: [
        { image: `${base}baskets/wild_autumn_13.jpg`, flowerIds: [2, 3, 22, 4, 10] },
        { image: `${base}baskets/wild_autumn_14.jpg`, flowerIds: [27, 34, 14] },
      ],
      replacementIds: [24],
    },
    winter: {
      baskets: [
        { image: `${base}baskets/wild_autumn_13.jpg`, flowerIds: [2, 3, 22, 4, 10] },
        { image: `${base}baskets/wild_autumn_14.jpg`, flowerIds: [27, 34, 14] },
      ],
      replacementIds: [24],
    },
  },
  apothecary: {
    spring: {
      baskets: [
        { image: `${base}baskets/apothecary_all_15.jpg`, flowerIds: [1, 5, 22, 10, 15] },
        { image: `${base}baskets/apothecary_all_16.jpg`, flowerIds: [17, 34, 33, 31] },
      ],
      replacementIds: [16, 18, 26, 29],
    },
    summer: {
      baskets: [
        { image: `${base}baskets/apothecary_all_15.jpg`, flowerIds: [1, 5, 22, 10, 15] },
        { image: `${base}baskets/apothecary_all_16.jpg`, flowerIds: [17, 34, 33, 31] },
      ],
      replacementIds: [16, 18, 26],
    },
    autumn: {
      baskets: [
        { image: `${base}baskets/apothecary_all_15.jpg`, flowerIds: [1, 5, 22, 10, 15] },
        { image: `${base}baskets/apothecary_all_16.jpg`, flowerIds: [17, 34, 33, 31] },
      ],
      replacementIds: [16, 18, 29],
    },
    winter: {
      baskets: [
        { image: `${base}baskets/apothecary_all_15.jpg`, flowerIds: [1, 5, 22, 10, 15] },
        { image: `${base}baskets/apothecary_all_16.jpg`, flowerIds: [17, 34, 33, 31] },
      ],
      replacementIds: [16, 18, 29],
    },
  },
  moody: {
    spring: {
      baskets: [
        { image: `${base}baskets/moody_all_17.jpg`, flowerIds: [1, 6, 7] },
        { image: `${base}baskets/moody_all_18.jpg`, flowerIds: [9, 30, 31] },
      ],
      replacementIds: [2, 14, 16],
    },
    summer: {
      baskets: [
        { image: `${base}baskets/moody_all_17.jpg`, flowerIds: [1, 6, 7] },
        { image: `${base}baskets/moody_all_18.jpg`, flowerIds: [9, 30, 31] },
      ],
      replacementIds: [2, 14, 16],
    },
    autumn: {
      baskets: [
        { image: `${base}baskets/moody_all_17.jpg`, flowerIds: [1, 6, 7] },
        { image: `${base}baskets/moody_all_18.jpg`, flowerIds: [9, 30, 31] },
      ],
      replacementIds: [2, 14, 16],
    },
    winter: {
      baskets: [
        { image: `${base}baskets/moody_all_17.jpg`, flowerIds: [1, 6, 7] },
        { image: `${base}baskets/moody_all_18.jpg`, flowerIds: [9, 30, 31] },
      ],
      replacementIds: [2, 14, 16],
    },
  },
  joyful: {
    spring: {
      baskets: [
        { image: `${base}baskets/joyful_spring-summer_19.jpg`, flowerIds: [1, 3, 11, 4, 32] },
        { image: `${base}baskets/joyful_spring_20.jpg`, flowerIds: [29, 20, 22] },
      ],
      replacementIds: [12, 23, 24, 27, 28, 34],
    },
    summer: {
      baskets: [
        { image: `${base}baskets/joyful_spring-summer_19.jpg`, flowerIds: [1, 3, 11, 4, 32] },
      ],
      replacementIds: [12, 20, 22, 23, 24, 27, 28, 34],
    },
    autumn: {
      baskets: [
        { image: `${base}baskets/joyful_autumn_21.jpg`, flowerIds: [1, 3, 11, 4] },
        { image: `${base}baskets/joyful_autumn_22.jpg`, flowerIds: [29, 22, 23] },
      ],
      replacementIds: [12, 24, 27, 34],
    },
    winter: {
      baskets: [
        { image: `${base}baskets/joyful_autumn_21.jpg`, flowerIds: [1, 3, 11, 4] },
        { image: `${base}baskets/joyful_autumn_22.jpg`, flowerIds: [29, 22, 23] },
      ],
      replacementIds: [12, 24, 27, 34],
    },
  },
};
