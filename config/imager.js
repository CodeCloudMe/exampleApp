
/**
 * Expose
 */

module.exports =  {
  variants: {
    article: {
      resize: {
        detail: 'x440'
      },
      crop: {

      },
      resizeAndCrop: {
        mini: { resize: '63504@', crop: '252x210' }
      }
    },

    gallery: {
      crop: {
        thumb: '100x100'
      }
    }
  },
  secure:false,

  storage: {
    Local: {
      path: "../uploads"
    },

    S3: {
      key: "AKIAIMPJESSKDQDYF2AA",
      secret: "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",
      bucket: "http://codeswatch.s3-website-us-west-2.amazonaws.com/codeswatch"
    }
  },

  debug: true
}