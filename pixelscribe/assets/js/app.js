"use strict";

document.addEventListener("DOMContentLoaded", function () {
	const body = document.querySelector("body");
	/**
	 * Slide Up
	 */
	const slideUp = (target, duration = 500) => {
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.boxSizing = "border-box";
		target.style.height = target.offsetHeight + "px";
		target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = "none";
			target.style.removeProperty("height");
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
		}, duration);
	};
	/**
	 * Slide Down
	 */
	const slideDown = (target, duration = 500) => {
		target.style.removeProperty("display");
		let display = window.getComputedStyle(target).display;

		if (display === "none") display = "block";

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = "border-box";
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
		}, duration);
	};
	/**
	 * Slide Toggle
	 */
	const slideToggle = (target, duration = 500) => {
		if (target.attributes.style === undefined || target.style.display === "none") {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};
	/**
	 * Primary Menu
	 */
	const mdScreen = "(max-width: 991px)";
	const mdScreenSize = window.matchMedia(mdScreen);
	const menuHasSub = document.querySelectorAll(".has-sub");

	const mdScreenSizeActive = (screen) => {
		if (screen.matches) {
			// Menu Toggle
			const menuToggleHandler = document.querySelectorAll(".menu-toggle");
			if (menuToggleHandler) {
				menuToggleHandler.forEach((e) => {
					e.addEventListener("click", (el) => {
						el.stopPropagation();
						document.body.classList.toggle("menu-open");
					});
				});
			}
			// Menu Toggle End

			// if menu has sub
			menuHasSub.forEach((e) => {
				e.addEventListener("click", (el) => {
					el.preventDefault();
					el.stopPropagation();
					el.target.classList.toggle("active");
					const menuSub = e.nextElementSibling;
					slideToggle(menuSub, 500);
				});
			});
			// if menu has sub end

			// Close submenu on click outside
			document.addEventListener("click", () => {
				if (document.body.classList.contains("menu-open")) {
					document.body.classList.remove("menu-open");
				}
			});
			// Close submenu on click outside end

			// Menu Nav Stop Propagation
			const menuNav = document.querySelectorAll(".menu-nav");
			if (menuNav.length) {
				menuNav.forEach((e) => {
					e.addEventListener("click", (el) => {
						el.stopPropagation();
					});
				});
			}
			// Menu Nav Stop Propagation end
		} else {
			menuHasSub.forEach((e) => {
				e.addEventListener("click", (el) => {
					el.preventDefault();
				});
			});
		}
	};
	mdScreenSize.addEventListener("change", (e) => {
		if (e.matches) {
			window.location.reload();
			mdScreenSizeActive(e);
		} else {
			mdScreenSize.removeEventListener("change", (e) => {
				mdScreenSizeActive(e);
			});
			window.location.reload();
		}
	});
	mdScreenSizeActive(mdScreenSize);
	/**
	 * Header Fixed On Scroll
	 */
	window.addEventListener("scroll", () => {
		const fixedHeader = document.querySelector(".header");
		if (fixedHeader) {
			const headerTop = fixedHeader.offsetHeight / 3;
			const scrolled = window.scrollY;
			const headerFixed = () => {
				if (scrolled > headerTop) {
					body.classList.add("header-crossed");
				} else if (scrolled < headerTop) {
					body.classList.remove("header-crossed");
				} else {
					body.classList.remove("header-crossed");
				}
			};
			headerFixed();
		}
	});
	/**
	 * Dropdown Init
	 */
	const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
	const dropdownList = [...dropdownElementList].map((dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl));
	/**
	 * Sidebar Content Stop Propagation
	 */
	const sidebarContent = document.querySelector(".doc-sidebar__content");
	if (sidebarContent) {
		sidebarContent.addEventListener("click", (e) => {
			e.stopPropagation();
		});
	}
	/**
	 * Sidebar Menu Current Page Status
	 */
	const sidebarMenuList = document.querySelectorAll(".doc-sidebar-menu__list li");
	sidebarMenuList.forEach(function (item) {
		item.addEventListener("click", function () {
			// Add "current-page" class to the clicked item
			item.classList.add("current-page");

			// Remove "current-page" class from sibling items
			sidebarMenuList.forEach(function (sibling) {
				if (sibling !== item) {
					sibling.classList.remove("current-page");
				}
			});
		});
	});
	/**
	 * Horizontal Scrolling
	 */
	const scrollers = document.querySelectorAll(".scroller-x");
	scrollers.forEach((scroller) => {
		scroller.setAttribute("data-animated", true);
		const scrollerInner = scroller.querySelector(".scroller-x__list");
		const scrollerContent = Array.from(scrollerInner.children);
		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			duplicatedItem.setAttribute("aria-hidden", true);
			scrollerInner.appendChild(duplicatedItem);
		});
	});
	/**
	 * Vertical Scrolling
	 */
	const scrollersY = document.querySelectorAll(".scroller-y");
	scrollersY.forEach((scroller) => {
		scroller.setAttribute("data-animated", true);
		const scrollerInner = scroller.querySelector(".scroller-y__list");
		const scrollerContent = Array.from(scrollerInner.children);
		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			duplicatedItem.setAttribute("aria-hidden", true);
			scrollerInner.appendChild(duplicatedItem);
		});
	});
	/**
	 * Circle Button Text
	 */
	const circleText = document.querySelectorAll(".circle-btn__text");
	circleText.forEach((e) => {
		e.innerHTML = e.textContent.replace(/\S/g, "<span>$&</span>");
	});
	const circleTextElement = document.querySelectorAll(".circle-btn__text span");
	for (let i = 0; i < circleTextElement.length; i++) {
		circleTextElement[i].style.transform = "rotate(" + i * 15.5 + "deg)";
	}
	/**
	 * FAQ 1
	 */
	const faq1 = document.querySelector(".faq-1");
	if (faq1) {
		const faq1Init = new Swiper(faq1, {
			loop: true,
			slidesPerView: "auto",
			spaceBetween: 24,
			speed: 2000,
			autoplay: true,
			breakpoints: {
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
				},
			},
		});
	}
	/**
	 * Sidebar Toggle
	 */
	function toggleSidebar() {
		const sidebar = document.querySelector(".doc-sidebar");
		if (sidebar) {
			sidebar.classList.toggle("active");
		}
	}
	const sidebarToggler = document.querySelector(".toggle-sidebar");
	if (sidebarToggler) {
		sidebarToggler.addEventListener("click", () => {
			toggleSidebar();
		});
	}
	const docSideBar = document.querySelector(".doc-sidebar");
	if (docSideBar) {
		docSideBar.addEventListener("click", () => toggleSidebar());
	}
	/**
	 * About AI Slider
	 */
	const aboutAiSlider = document.querySelector(".about-ai-slider");
	if (aboutAiSlider) {
		const aboutAiSliderInit = new Swiper(aboutAiSlider, {
			direction: "vertical",
			slidesPerView: 1,
			mousewheel: true,
			scrollbar: {
				el: ".about-ai-slider .swiper-scrollbar",
				verticalClass: "swiper-scrollbar-vertical",
			},
			pagination: {
				el: ".about-ai-slider .swiper-pagination",
				type: "fraction",
				verticalClass: "swiper-pagination-vertical",
				renderFraction: function (currentClass, totalClass) {
					return (
						'<span class="' + currentClass + '"></span>' + " " + '<span class="' + totalClass + '"></span>'
					);
				},
			},
		});
	}
	/**
	 * Select pricing
	 */
	var selectedBtn = document.querySelectorAll(".pricing-btn");
	selectedBtn.forEach(function (item) {
		item.addEventListener("click", function () {
			item.classList.add("active");
			selectedBtn.forEach(function (sibling) {
				if (sibling !== item) {
					sibling.classList.remove("active");
				}
			});
		});
	});
	const selectMontlyPricing = document.querySelector("#selectMonthly");
	const selectYearlPricing = document.querySelector("#selectYearly");
	const monthlyPricing = document.querySelectorAll(".monthly-price");
	const yearlyPricing = document.querySelectorAll(".yearly-price");
	if (selectYearlPricing) {
		selectYearlPricing.addEventListener("click", () => {
			monthlyPricing.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			yearlyPricing.forEach((e) => {
				e.style.cssText = `display: flex;`;
			});
		});
	}
	if (selectMontlyPricing) {
		selectMontlyPricing.addEventListener("click", () => {
			monthlyPricing.forEach((e) => {
				e.style.cssText = `display: flex;`;
			});
			yearlyPricing.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
		});
	}
	/**
	 * Pricing Toggle with Checkbox
	 */
	const priceSwitch = document.querySelectorAll(".pricing-toggle");
	if (priceSwitch) {
		priceSwitch.forEach((priceCheck) => {
			priceCheck.addEventListener("change", () => {
				if (priceCheck.checked === true) {
					monthlyPricing.forEach((e) => {
						e.style.cssText = `display: none;`;
					});
					yearlyPricing.forEach((e) => {
						e.style.cssText = `display: flex;`;
					});
				} else {
					monthlyPricing.forEach((e) => {
						e.style.cssText = `display: flex;`;
					});
					yearlyPricing.forEach((e) => {
						e.style.cssText = `display: none;`;
					});
				}
			});
		});
	}

	// pricing
	var selectedPriceBtn = document.querySelectorAll(".pricing-btn-5");
	selectedPriceBtn.forEach(function (item) {
		item.addEventListener("click", function () {
			item.classList.add("active");
			selectedPriceBtn.forEach(function (sibling) {
				if (sibling !== item) {
					sibling.classList.remove("active");
				}
			});
		});
	});
	const selectMonthlyPrice = document.querySelector("#selectMonthly");
	const selectYearlyPrice = document.querySelector("#selectYearly");
	const selectLifetimePrice = document.querySelector("#selectLifetime");
	const selectPrepaidPrice = document.querySelector("#selectPrepaid");

	const monthlyPrice = document.querySelectorAll(".monthly-price");
	const yearlyPrice = document.querySelectorAll(".yearly-price");
	const lifetimePrice = document.querySelectorAll(".lifetime-price");
	const prepaidPrice = document.querySelectorAll(".prepaid-price");

	if (selectYearlyPrice) {
		selectYearlyPrice.addEventListener("click", () => {
			monthlyPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			lifetimePrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			prepaidPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			yearlyPrice.forEach((e) => {
				e.style.cssText = `display: flex;`;
			});
		});
	}
	if (selectLifetimePrice) {
		selectLifetimePrice.addEventListener("click", () => {
			monthlyPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			lifetimePrice.forEach((e) => {
				e.style.cssText = `display: flex;`;
			});
			prepaidPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			yearlyPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
		});
	}
	if (selectPrepaidPrice) {
		selectPrepaidPrice.addEventListener("click", () => {
			monthlyPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			lifetimePrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			prepaidPrice.forEach((e) => {
				e.style.cssText = `display: flex;`;
			});
			yearlyPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
		});
	}

	if (selectMonthlyPrice) {
		selectMonthlyPrice.addEventListener("click", () => {
			monthlyPrice.forEach((e) => {
				e.style.cssText = `display: flex;`;
			});
			lifetimePrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			prepaidPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
			yearlyPrice.forEach((e) => {
				e.style.cssText = `display: none;`;
			});
		});
	}

	/**
	 * Testimonial Slider 3
	 */
	const testimonialSliderThree = document.querySelector(".testimonial-slider-3__is");
	if (testimonialSliderThree) {
		const testimonialSliderThreeInit = new Swiper(testimonialSliderThree, {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 24,
			navigation: {
				nextEl: ".testimonial-slider-3__nav-next",
				prevEl: ".testimonial-slider-3__nav-prev",
			},
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
			},
		});
	}

	// Blog list slider
	const blogListSlider = document.querySelector(".blog-single-slider");
	if (blogListSlider) {
		const blogListSliderInit = new Swiper(blogListSlider, {
			slidesPerView: 1,
			loop: true,
			spaceBetween: 24,
			pagination: {
				el: ".swiper-pagination",
			},
		});
	}

	/**
	 * Hero 2 Slider
	 */
	const heroTwoSlider = document.querySelector(".hero-2-slider");
	const heroTwoSliderThumb = document.querySelector(".hero-2-slider-thumb");
	if (heroTwoSlider || heroTwoSliderThumb) {
		const heroTwoSliderThumbInit = new Swiper(heroTwoSliderThumb, {
			spaceBetween: 16,
			slidesPerView: 2,
			freeMode: true,
			autoplay: true,
		});
		const heroTwoSliderInit = new Swiper(heroTwoSlider, {
			spaceBetween: 16,
			effect: "fade",
			autoplay: true,
			thumbs: {
				swiper: heroTwoSliderThumbInit,
			},
		});
	}
	/**
	 * Selected Product Details
	 */
	var selectedProduct = document.querySelectorAll(".selected-product");
	if (selectedProduct) {
		selectedProduct.forEach(function (item) {
			item.addEventListener("click", function () {
				// Add "active" class to the clicked item
				item.classList.add("active");

				// Remove "active" class from sibling items
				selectedProduct.forEach(function (sibling) {
					if (sibling !== item) {
						sibling.classList.remove("active");
					}
				});
			});
		});
	}

	/**
	 * Video Popup
	 */
	const lightbox = GLightbox({
		selector: ".glightbox",
	});

	// Only Large Screen
	const lgScreen = "(min-width: 992px)";
	if (window.matchMedia(lgScreen).matches) {
		/**
		 * Custom Cursor
		 */
		const cursorTag = document.querySelector(".custom-cursor");
		if (cursorTag) {
			const balls = cursorTag.querySelectorAll("div");
			const ballMessage = cursorTag.querySelector("div span");
			const cursorData = document.querySelectorAll("[data-cursor]");
			const cursorImg = cursorTag.querySelector(".custom-cursor__img");
			let aimX = 0;
			let aimY = 0;
			balls.forEach((ball, index) => {
				let currentX = 0;
				let currentY = 0;
				let speed = 0.15 - index * 0.025;

				const animateCursor = () => {
					currentX += (aimX - currentX) * speed;
					currentY += (aimY - currentY) * speed;

					ball.style.left = currentX + "px";
					ball.style.top = currentY + "px";

					requestAnimationFrame(animateCursor);
				};
				animateCursor();
			});

			document.addEventListener("mousemove", (event) => {
				aimX = event.pageX;
				aimY = event.pageY;
			});

			cursorData.forEach((data) => {
				data.addEventListener("mouseover", () => {
					ballMessage.classList.add("visible");
					cursorImg.classList.add("visible");
					ballMessage.innerHTML = data.getAttribute("data-cursor");
				});
				data.addEventListener("mouseout", () => {
					ballMessage.classList.remove("visible");
					cursorImg.classList.remove("visible");
				});
			});
		}
		/**
		 * GSAP Register Plugin
		 */
		gsap.registerPlugin(ScrollTrigger, SplitText);
		/**
		 * GSAP ScrollTrigger Integration With Lenis
		 */
		const lenis = new Lenis();
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 700);
		});
		gsap.ticker.lagSmoothing(0);

		/**
		 * Animate Line 3D Rotation
		 */
		const animateLine3d = gsap.utils.toArray(".animate-line-3d");
		animateLine3d.forEach((item) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			const animateLine3dSplitted = new SplitText(item, { type: "chars, words, lines" });
			gsap.set(item, { perspective: 400 });
			animateLine3dSplitted.split({ type: "lines" });
			tl.from(animateLine3dSplitted.lines, {
				duration: 1,
				delay: 0.3,
				opacity: 0,
				rotationX: -80,
				force3D: true,
				transformOrigin: "top center -50",
				stagger: 0.1,
				onComplete: () => {
					animateLine3dSplitted.revert();
				},
			});
		});

		/**
		 * Animate Text From Right
		 */
		const animateTextFromRight = gsap.utils.toArray(".animate-text-from-right");
		animateTextFromRight.forEach((item) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			const animateTextFromRightSplitted = new SplitText(item, { type: "chars, words, lines" });
			animateTextFromRightSplitted.split({ type: "words" });
			tl.from(animateTextFromRightSplitted.words, {
				duration: 1,
				x: 50,
				autoAlpha: 0,
				stagger: 0.05,
				onComplete: () => {
					animateTextFromRightSplitted.revert();
				},
			});
		});

		/**
		 * Animate Text From Left
		 */
		const animateTextFromLeft = gsap.utils.toArray(".animate-text-from-left");
		animateTextFromLeft.forEach((item) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			const animateTextFromLeftSplitted = new SplitText(item, { type: "chars, words, lines" });
			animateTextFromLeftSplitted.split({ type: "words" });
			tl.from(animateTextFromLeftSplitted.words, {
				duration: 1,
				x: -50,
				autoAlpha: 0,
				stagger: 0.05,
				onComplete: () => {
					animateTextFromLeftSplitted.revert();
				},
			});
		});

		/**
		 * Animate Text From Bottom
		 */
		const animateTextFromBottom = gsap.utils.toArray(".animate-text-from-bottom");
		animateTextFromBottom.forEach((item) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			const animateTextFromBottomSplitted = new SplitText(item, { type: "chars, words, lines" });
			animateTextFromBottomSplitted.split({ type: "words" });
			tl.from(animateTextFromBottomSplitted.words, {
				duration: 1,
				y: 50,
				autoAlpha: 0,
				stagger: 0.05,
				onComplete: () => {
					animateTextFromBottomSplitted.revert();
				},
			});
		});

		/**
		 * Animate Text From Top
		 */
		const animateTextFromTop = gsap.utils.toArray(".animate-text-from-top");
		animateTextFromTop.forEach((item) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			const animateTextFromTopSplitted = new SplitText(item, { type: "chars, words, lines" });
			animateTextFromTopSplitted.split({ type: "words" });
			tl.from(animateTextFromTopSplitted.words, {
				duration: 1,
				y: -50,
				autoAlpha: 0,
				stagger: 0.05,
				onComplete: () => {
					animateTextFromTopSplitted.revert();
				},
			});
		});

		/**
		 * Reveal Text
		 */
		const revealText = gsap.utils.toArray(".reveal-text");
		revealText.forEach((item) => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			const revealTextSplitted = new SplitText(item, {
				type: "chars, words, lines",
				linesClass: "d-inline-block overflow-hidden",
			});
			revealTextSplitted.split({ type: "words" });
			tl.from(revealTextSplitted.words, {
				duration: 1,
				y: 30,
				autoAlpha: 0,
				stagger: 0.05,
				ease: "circ.out",
				onComplete: () => {
					revealTextSplitted.revert();
				},
			});
		});

		/**
		 * Fade In From Bottom
		 */
		function fadeIn(targets, properties, options) {
			const elements = document.querySelectorAll(targets);

			if (!elements || elements.length === 0) {
				return;
			}

			gsap.from(elements, {
				...properties,
				stagger: options.stagger || 0.5,
				duration: options.duration || 1,
				ease: options.ease || "power2.out",
				scrollTrigger: {
					trigger: elements,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
		}
		// Fade In - Usage
		fadeIn(".animate-fadeInBottom", { opacity: 0, y: 50 }, { stagger: 0.1 });
		fadeIn(".pricing-card", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".img-fadeIn-1", { opacity: 0, y: 100 }, { stagger: 0.15 });
		fadeIn(".img-fadeIn-2", { opacity: 0, y: 100 }, { stagger: 0.15 });
		fadeIn(".img-fadeIn-3", { opacity: 0, y: 100 }, { stagger: 0.15 });
		fadeIn(".img-fadeIn-4", { opacity: 0, y: 100 }, { stagger: 0.15 });
		fadeIn(".reveal-from-bottom", { opacity: 0, y: 100 }, { stagger: 0.15 });
		fadeIn(".welcome-dash", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_1", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_2", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_3", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_4", { opacity: 0, x: 80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_5", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_6", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".subtitle_line_7", { opacity: 0, x: -80 }, { stagger: 0.15 });
		fadeIn(".welcome-list-1", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_1", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_2", { opacity: 0, y: 80 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_3", { opacity: 0, y: 80 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_4", { opacity: 0, y: 80 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_5", { opacity: 0, y: 80 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_6", { opacity: 0, y: 80 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_7", { opacity: 0, y: 80 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_8", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_9", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_10", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_11", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_12", { opacity: 0, y: 100, duration: 3, delay: 0.5 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_13", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_14", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_15", { opacity: 0, y: 100 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_16", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_17", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_18", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_19", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_20", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_21", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_22", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_23", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_24", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_25", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_26", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_27", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_28", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_29", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_30", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_31", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_32", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_33", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_34", { opacity: 0, y: 50 }, { stagger: 0.15 });
		fadeIn(".fadein_bottom_35", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_36", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_37", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_38", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_bottom_39", { opacity: 0, y: 50 }, { stagger: 0.25 });
		fadeIn(".fadein_1", { opacity: 0, duration: 2, delay: 0.25 }, { stagger: 0.25 });
		fadeIn(".fadein_2", { opacity: 0, duration: 2, delay: 0.25 }, { stagger: 0.25 });
		fadeIn(".fadein_3", { opacity: 0, duration: 2, delay: 0.25 }, { stagger: 0.25 });
		fadeIn(".fadein_4", { opacity: 0, duration: 2, delay: 0.25 }, { stagger: 0.25 });
		fadeIn(".fadein_5", { opacity: 0, duration: 2, delay: 0.25 }, { stagger: 0.25 });
		fadeIn(".fadein_6", { opacity: 0, duration: 2, delay: 0.25 }, { stagger: 0.25 });

		function fadeInBottom() {
			gsap.utils.toArray(".fadeIn_bottom").forEach((element) => {
				gsap.from(element, {
					opacity: 0,
					y: 50,
					duration: 1,
					scrollTrigger: {
						trigger: element,
						start: "top 80%",
						end: "bottom 20%",
						toggleActions: "play none none none",
					},
				});
			});
		}

		fadeInBottom();

		/**
		 * Parallax Image
		 */
		// Select all elements with the class "parallax-image"
		const imageParallax = document.querySelectorAll(".parallax-image");

		// Check if there are any matching elements
		if (imageParallax.length > 0) {
			// Iterate through each element
			imageParallax.forEach(function (element) {
				// Create the wrapper elements
				const wrapper = document.createElement("div");
				wrapper.className = "parallax-image-wrap";

				const innerWrapper = document.createElement("div");
				innerWrapper.className = "parallax-image-inner";

				// Wrap the element with the created wrappers
				element.parentNode.insertBefore(wrapper, element);
				wrapper.appendChild(innerWrapper);
				innerWrapper.appendChild(element);

				// Apply CSS styles to the wrapper
				wrapper.style.overflow = "hidden";

				// Animation setup for parallax effect
				const animImageParallax = element;
				const imgParallaxWrapper = wrapper;
				const innerWrap = innerWrapper;

				const tlImageParallax = gsap.timeline({
					scrollTrigger: {
						trigger: imgParallaxWrapper,
						start: "top bottom",
						end: "bottom top",
						scrub: true,
						onEnter: animImgParallaxRefresh,
					},
				});

				tlImageParallax.to(animImageParallax, {
					yPercent: 35,
					ease: "none",
				});

				// Function to refresh the scroll trigger
				function animImgParallaxRefresh() {
					tlImageParallax.scrollTrigger.refresh();
				}

				// Animation setup for zoom-in effect
				const tlZoomIn = gsap.timeline({
					scrollTrigger: {
						trigger: imgParallaxWrapper,
						start: "top 99%",
					},
				});

				tlZoomIn.from(innerWrap, {
					duration: 1.5,
					opacity: 0,
					scale: 1.2,
					ease: "power2.out",
					clearProps: "all",
				});
			});
		}

		/**
		 * Hero Section
		 */
		const heroOne = gsap.utils.toArray(".hero-1");

		heroOne.forEach((element) => {
			const tl = gsap.timeline({
				defaults: { duration: 0.5, ease: "Power1.out" },
				scrollTrigger: {
					trigger: element,
					start: "top 90%",
					end: "bottom 60%",
					toggleActions: "play none none none",
				},
			});
			tl.fromTo(".hero-1-shapes__img--5", { y: 0 }, { y: 50, yoyo: true, repeat: -1, duration: 3 });
			tl.fromTo(".hero-1-shapes__img--6", { y: 0 }, { y: 20, yoyo: true, repeat: -1, duration: 2.5 }, "<");
		});
	}
	// Only Large Screen End
});

/**
 * Preloader
 */
const preloader = document.querySelector(".preloader");
window.addEventListener("load", () => {
	if (preloader) {
		preloader.style.display = "none";
	}
});

// Get all the elements to be parallaxed
const parallaxElements = document.querySelectorAll(".parallax");

// The parallax function
const parallax = (elements) => {
	if ("undefined" !== elements && elements.length > 0) {
		elements.forEach((element) => {
			let y = window.innerHeight - element.getBoundingClientRect().top;
			if (y > 0) {
				element.style.transform = "translate3d(0, -" + 0.2 * y + "px ,0)";
			}
		});
	}
};

//If element is in viewport, set its position
parallax(parallaxElements);

//Call the function on scroll
window.onscroll = () => {
	parallax(parallaxElements);
};

// smooth scroll animation
var butterElement = document.getElementById("butter");
if (butterElement) {
	var options = {
		wrapperId: "butter",
		wrapperDamper: 0.1,
		cancelOnTouch: true,
	};
	butter.init(options);
}

document.addEventListener("DOMContentLoaded", function (event) {
	animateTextByClass("text-anim");
});

function animateTextByClass(className) {
	var elements = document.querySelectorAll("." + className);

	elements.forEach(function (element) {
		var newText = "";
		for (var i = 0; i < element.innerText.length; i++) {
			newText += "<div>";
			if (element.innerText[i] == " ") {
				newText += "&nbsp;";
			} else {
				newText += element.innerText[i];
			}
			newText += "</div>";
		}
		element.innerHTML = newText;

		gsap.fromTo(
			"." + className + " div",
			{
				opacity: 0,
				y: 90,
			},
			{
				duration: 2,
				opacity: 1,
				y: 0,
				stagger: 0.03,
				ease: "elastic(1.2, 0.5)",
				scrollTrigger: {
					trigger: element,
					start: "top 70%",
					toggleActions: "restart none none reverse",
				},
			}
		);
	});
}

// ai-template-card-item
var cardWrapper = document.getElementById("ai-template-card-wrapper");

if (cardWrapper) {
	document.getElementById("seeMore").style.display = "none";

	function showAllCards() {
		var cards = document.querySelectorAll(".ai-template-card-item");

		cards.forEach(function (card) {
			card.style.display = "block";
		});

		document.getElementById("seeMore").style.display = "none";
	}

	var cards = document.querySelectorAll(".ai-template-card-item");

	var seeMoreButton = document.getElementById("seeMore");

	if (window.innerWidth > 1400) {
		if (cards.length > 8) {
			seeMoreButton.style.display = "flex";
		}

		for (var i = 8; i < cards.length; i++) {
			cards[i].style.display = "none";
		}
	} else if (window.innerWidth < 1400) {
		if (cards.length > 6) {
			seeMoreButton.style.display = "flex";
		}

		for (var i = 6; i < cards.length; i++) {
			cards[i].style.display = "none";
		}
	}

	seeMoreButton.addEventListener("click", showAllCards);
}

var passEyeButtons = document.querySelectorAll(".pass-eye");

if (passEyeButtons) {
	passEyeButtons.forEach(function (button) {
		button.addEventListener("click", function () {
			var passwordInput = this.previousElementSibling;
			var eyeIconOff = this.querySelector(".eye-off");
			var eyeIconOn = this.querySelector(".eye-on");

			if (passwordInput.type === "password") {
				passwordInput.type = "text";
				eyeIconOff.style.display = "none";
				eyeIconOn.style.display = "inline-block";
			} else {
				passwordInput.type = "password";
				eyeIconOn.style.display = "none";
				eyeIconOff.style.display = "inline-block";
			}
		});
	});
}

const listSlider = document.querySelector(".listSlider");

if (listSlider) {
	const listSliderInit = new Swiper(listSlider, {
		direction: "vertical",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		spaceBetween: 20,
		loop: false,
		speed: 1000,
		autoplay: {
			delay: 1000,
		},
	});
}
