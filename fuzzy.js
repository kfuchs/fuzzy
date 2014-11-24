"use strict";

var Fuzzy = {

    /**
     * Keeps track if the current message is Fuzzy.
     */
    isFuzzed : 1,

    /**
     * Default fuzzy message.
     */
    msg: 'Elegantly unscramble this message using the space provided. ' +
        'Then write the scrambler that made it. The answer is an object with ' +
        'global scope that can scramble and unscramble any text any number of times.',

    /**
     * Fuzzies up a message.
     *
     * @param {string} msg The msg to fuzzify.
     */
    fuzzify: function(msg) {
        this.isFuzzed = 1;
        msg = msg || this.msg;
        msg = msg.split('');
        var fuzzyKeys = 0;
        var docFrag = document.createDocumentFragment();

        // Clear elements from body tag
        while (document.body.lastChild) {
            document.body.removeChild(document.body.lastChild);
        }

        // Create the fuzzy message.
        while (msg.length) {
            // Add the hidden message
            var hiddenKey = document.createElement('span');
            hiddenKey.setAttribute('hidden', '');
            hiddenKey.textContent = msg.shift();
            docFrag.appendChild(hiddenKey);

            // Add the fuzzy keys
            for (var i = 0; i < Math.floor(Math.random() * 998 + 2); i++) {
                fuzzyKeys++;

                var span = document.createElement('span');
                span.textContent = this.fuzzyKey();
                docFrag.appendChild(span);

                // Lets limit it to 100 fuzzy keys per line.
                if ((fuzzyKeys % 100) === 0) {
                    docFrag.appendChild(document.createElement('br'));
                }
            }
        }

        // Place our fuzzy message in the body.
        document.body.appendChild(docFrag);
    },

    /**
     * Clears up a fuzzy message.
     */
    unFuzzify: function() {

        if (this.isFuzzed) {
            var msg = [], spans = document.getElementsByTagName('span');

            for (var i = 0; i < spans.length; i++) {
                if (spans[i].getAttribute('hidden') != null) {
                    msg.push(spans[i].innerHTML);
                }
            }

            document.body.innerHTML = msg.join('');
            this.isFuzzed = 0;
        }
    },

    /**
     * Returns a fuzzy key.
     *
     * @returns {string}
     */
    fuzzyKey: function() {
        var cryptoKeys = 'FiR$9zcT@(LasgOKDN#YoE^:kb2jV&mp;?weI6*BMhG)7x%fd!ZSAJWQq{HUurt1nl0Xy5vP4}8C3'
            .split('');
        return cryptoKeys[Math.floor(Math.random() * (cryptoKeys.length - 1))];
    }
};