/*!
 * Encode/decode HTML Entities mixin for Chocolat
 * WTFPL 2 Licensed
 */

var ent = require('ent');

// TODO: make encoding of ampersands intelligent
// (where the "&" in &copy; wouldn't be encoded)
Hooks.addMenuItem('Text/Convert/Encode HTML Entities', 'cmd-shift-8', function () {
  Recipe.run(function (r) {
    var text = r.textInRange(r.selection),
        encodedText = ent.encode(text).replace(
          /&(lt|gt|apos|quot);/gi,
          function (m, e) {
            var entities = {
              "gt"   : ">",
              "lt"   : "<",
              "quot" : "\"",
              "apos" : "'"
            };

            return entities[e];
          }
        );

    r.replaceTextInRange(r.selection, encodedText);
  });
});

Hooks.addMenuItem('Text/Convert/Decode HTML Entities', '', function () {
  Recipe.run(function (r) {
    var text = r.textInRange(r.selection),
        decodedText = ent.decode(text);

    r.replaceTextInRange(r.selection, decodedText);
  });
});
