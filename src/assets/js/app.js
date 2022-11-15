import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';
import Scrollbar, {
    ScrollbarPlugin
} from "smooth-scrollbar";
const bar = document.querySelector('.loading_bar--inner');
const counter_number = document.querySelector('.loading_counter--number');
let c = 0;

class DisableScrollPlugin extends ScrollbarPlugin {
    static pluginName = 'disableScroll';

    static defaultOptions = {
        direction: '',
    };

    transformDelta(delta) {
        if (this.options.direction) {
            delta[this.options.direction] = 0;
        }

        return {
            ...delta
        };
    }
}

// load the plugin
Scrollbar.use(DisableScrollPlugin);

class AnchorPlugin extends ScrollbarPlugin {
    static pluginName = 'anchor';

    onHashChange = () => {
        this.jumpToHash(window.location.hash);
    };

    onClick = (event) => {
        const {
            target
        } = event;

        if (target.tagName !== 'A') {
            return;
        }

        const hash = target.getAttribute('href');

        if (!hash || hash.charAt(0) !== '#') {
            return;
        }

        this.jumpToHash(hash);
    };

    jumpToHash = (hash) => {
        const {
            scrollbar
        } = this;

        if (!hash) {
            return;
        }

        // reset scrollTop
        scrollbar.containerEl.scrollTop = 0;

        scrollbar.scrollIntoView(document.querySelector(hash));
    };

    onInit() {
        this.jumpToHash(window.location.hash);

        window.addEventListener('hashchange', this.onHashChange);

        this.scrollbar.contentEl.addEventListener('click', this.onClick);
    }

    onDestory() {
        window.removeEventListener('hashchange', this.onHashChange);

        this.scrollbar.contentEl.removeEventListener('click', this.onClick);
    }
}

// usage
Scrollbar.use(AnchorPlugin);

let barInterval = setInterval(() => {
    bar.style.width = c + '%';
    counter_number.innerText = c + '%'
    c++;
    if (c === 101) {
        clearInterval(barInterval);
        gsap.to('.loading_bar', {
            duration: 3,
            rotate: "90deg",
            top: '200%',
            left: "1000%",
        });
        gsap.to('.loading_text, .loading_counter', {
            duration: 0.5,
            opacity: 0
        });
        gsap.to('.loading_box', {
            duration: 1,
            height: "500px",
            borderRadius: "50%"
        });
        gsap.to('.loading_svg', {
            duration: 5,
            opacity: 1,
            rotate: "360deg"

        });
        gsap.to('.loading_box', {
            delay: 2,
            border: 'none'
        });
        imagesLoaded(document.querySelectorAll('img'), () => {
            gsap.to('.loading', {

                delay: 2,
                duration: 2,
                zIndex: 1,
                background: "transparent",
                opacity: 0.5
            });
            gsap.to('.loading_svg', {
                delay: 2,
                duration: 100,
                rotate: "360deg"

            });
            gsap.to('header', {
                duration: 1,
                delay: 2,
                top: "0",
            });
            gsap.to('.socials', {
                duration: 1,
                delay: 2.5,
                bottom: "10rem",
            });
            gsap.to('.scrollDown', {
                duration: 1,
                delay: 3,
                bottom: "3rem",
            });
            gsap.to('.intro', {
                duration: 1,
                delay: 4,
                left: "5%",
            });
            setTimeout(() => {

                let options = {
                    damping: 0.1,
                    alwaysShowTracks: true,
                    plugins: {
                        disableScroll: {
                            direction: 'x',
                        },
                    },
                };
                let pageSmoothScroll = Scrollbar.init(document.body, options);
                pageSmoothScroll.track.xAxis.element.remove();
            }, 5000);
        })
    }
}, 20);