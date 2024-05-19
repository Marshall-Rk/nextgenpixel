document.addEventListener('DOMContentLoaded', function() {
    // Set animation timing
    var animationDelay = 4000;
    var barAnimationDelay = 3800;
    var barWaiting = barAnimationDelay - 3000;
    var lettersDelay = 50;
    var typeLettersDelay = 150;
    var selectionDuration = 500;
    var typeAnimationDelay = selectionDuration + 800;
    var revealDuration = 600;
    var revealAnimationDelay = 1500;

    initHeadline();

    function initHeadline() {
        // Insert <i> element for each letter of a changing word
        singleLetters(Array.from(document.querySelectorAll('.cd-headline.letters b')));
        // Initialize headline animation
        animateHeadline(Array.from(document.querySelectorAll('.cd-headline')));
    }

    function singleLetters(words) {
        words.forEach(function(word) {
            var letters = word.textContent.split('');
            var selected = word.classList.contains('is-visible');
            for (var i = 0; i < letters.length; i++) {
                if (word.parentElement.classList.contains('rotate-2')) {
                    letters[i] = '<em>' + letters[i] + '</em>';
                }
                letters[i] = selected ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.innerHTML = newLetters;
            word.style.opacity = 1;
        });
    }

    function animateHeadline(headlines) {
        var duration = animationDelay;
        headlines.forEach(function(headline) {
            if (headline.classList.contains('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function() {
                    headline.querySelector('.cd-words-wrapper').classList.add('is-loading');
                }, barWaiting);
            } else if (headline.classList.contains('clip')) {
                var spanWrapper = headline.querySelector('.cd-words-wrapper');
                var newWidth = spanWrapper.offsetWidth + 10;
                spanWrapper.style.width = newWidth + 'px';
            } else if (!headline.classList.contains('type')) {
                var words = Array.from(headline.querySelectorAll('.cd-words-wrapper b'));
                var width = 0;
                words.forEach(function(word) {
                    var wordWidth = word.offsetWidth;
                    if (wordWidth > width) {
                        width = wordWidth;
                    }
                });
                headline.querySelector('.cd-words-wrapper').style.width = width + 'px';
            }

            setTimeout(function() {
                hideWord(headline.querySelector('.is-visible'));
            }, duration);
        });
    }

    function hideWord(word) {
        var nextWord = takeNext(word);

        if (word.parentElement.classList.contains('type')) {
            var parentSpan = word.parentElement.querySelector('.cd-words-wrapper');
            parentSpan.classList.add('selected');
            parentSpan.classList.remove('waiting');
            setTimeout(function() {
                parentSpan.classList.remove('selected');
                word.classList.remove('is-visible');
                word.classList.add('is-hidden');
                Array.from(word.querySelectorAll('i')).forEach(function(i) {
                    i.classList.remove('in');
                    i.classList.add('out');
                });
            }, selectionDuration);
            setTimeout(function() {
                showWord(nextWord, typeLettersDelay);
            }, typeAnimationDelay);
        } else if (word.parentElement.classList.contains('letters')) {
            var bool = word.querySelectorAll('i').length >= nextWord.querySelectorAll('i').length;
            hideLetter(word.querySelector('i'), word, bool, lettersDelay);
            showLetter(nextWord.querySelector('i'), nextWord, bool, lettersDelay);
        } else if (word.parentElement.classList.contains('clip')) {
            var wordsWrapper = word.parentElement.querySelector('.cd-words-wrapper');
            var width = wordsWrapper.offsetWidth;
            wordsWrapper.style.width = '2px';
            setTimeout(function() {
                switchWord(word, nextWord);
                showWord(nextWord);
            }, revealDuration);
        } else if (word.parentElement.classList.contains('loading-bar')) {
            var wordsWrapper = word.parentElement.querySelector('.cd-words-wrapper');
            wordsWrapper.classList.remove('is-loading');
            switchWord(word, nextWord);
            setTimeout(function() {
                hideWord(nextWord);
            }, barAnimationDelay);
            setTimeout(function() {
                wordsWrapper.classList.add('is-loading');
            }, barWaiting);
        } else {
            switchWord(word, nextWord);
            setTimeout(function() {
                hideWord(nextWord);
            }, animationDelay);
        }
    }

    function showWord(word, duration) {
        if (word.parentElement.classList.contains('type')) {
            showLetter(word.querySelector('i'), word, false, duration);
            word.classList.add('is-visible');
            word.classList.remove('is-hidden');
        } else if (word.parentElement.classList.contains('clip')) {
            var wordsWrapper = word.parentElement.querySelector('.cd-words-wrapper');
            var width = word.offsetWidth + 10;
            wordsWrapper.style.width = width + 'px';
            setTimeout(function() {
                hideWord(word);
            }, revealAnimationDelay);
        }
    }

    function hideLetter(letter, word, bool, duration) {
        letter.classList.remove('in');
        letter.classList.add('out');
        if (letter.nextElementSibling) {
            setTimeout(function() {
                hideLetter(letter.nextElementSibling, word, bool, duration);
            }, duration);
        } else if (bool) {
            setTimeout(function() {
                hideWord(takeNext(word));
            }, animationDelay);
        }
        if (!letter.nextElementSibling && !document.documentElement.classList.contains('no-csstransitions')) {
            var nextWord = takeNext(word);
            switchWord(word, nextWord);
        }
    }

    function showLetter(letter, word, bool, duration) {
        letter.classList.add('in');
        letter.classList.remove('out');
        if (letter.nextElementSibling) {
            setTimeout(function() {
                showLetter(letter.nextElementSibling, word, bool, duration);
            }, duration);
        } else {
            if (word.parentElement.classList.contains('type')) {
                setTimeout(function() {
                    word.parentElement.querySelector('.cd-words-wrapper').classList.add('waiting');
                }, 200);
            }
            if (!bool) {
                setTimeout(function() {
                    hideWord(word);
                }, animationDelay);
            }
        }
    }

    function takeNext(word) {
        return word.nextElementSibling ? word.nextElementSibling : word.parentElement.firstElementChild;
    }

    function takePrev(word) {
        return word.previousElementSibling ? word.previousElementSibling : word.parentElement.lastElementChild;
    }

    function switchWord(oldWord, newWord) {
        oldWord.classList.remove('is-visible');
        oldWord.classList.add('is-hidden');
        newWord.classList.remove('is-hidden');
        newWord.classList.add('is-visible');
    }
});
