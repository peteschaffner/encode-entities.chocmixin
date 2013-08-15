/**
 * Module dependencies.
 */

var ent = require('ent');


/**
 * Encode HTML entities.
 *
 * @param {String} text
 */
function encode(text) {
  // Decode the text first to keep from
  // encoding ampersands in encoded entities
  text = decode(text);
  var re = /&(lt|gt|apos|quot|semi|colon|sol|equals|comma);/gi;
  var encodedText = ent.encode(text)
    .replace(re, function(match, subMatch) {
      var entities = {
        gt: '>',
        lt: '<',
        quot: '"',
        apos: '\'',
        semi: ';',
        colon: ':',
        sol: '/',
        equals: '=',
        comma: ','
      };

      return entities[subMatch];
    });

  return encodedText;
}

/**
 * Decode HTML entities.
 *
 * @param {String} text
 */
function decode(text) {
  var decodedText = ent.decode(text);

  return decodedText;
}


Hooks.addMenuItem('Text/Convert/Encode HTML Entities', '', function () {
  Recipe.run(function(r) {
    var text = r.textInRange(r.selection);

    r.replaceTextInRange(r.selection, encode(text));
  });
});

Hooks.addMenuItem('Text/Convert/Decode HTML Entities', '', function () {
  Recipe.run(function(r) {
    var text = r.textInRange(r.selection);

    r.replaceTextInRange(r.selection, decode(text));
  });
});
