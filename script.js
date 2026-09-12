
// защита: библиотека AOS может быть не подключена (например, при локальном запуске)
    if (typeof AOS !== 'undefined') {
        AOS.init();
        document.querySelector('body').setAttribute('data-aos-enabled', true);
    }

    // защита: не полагаемся на jQuery ($) - используем нативный DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function () {
        // refresh animations positions after page was rendered.
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });

// защита: библиотека vanilla-lazyload может быть не подключена
		if (typeof LazyLoad !== 'undefined') {
			var lazyLoadImages = new LazyLoad({
				elements_selector: ".lazy",
				threshold: 500
			});
		}

// защита: не полагаемся на jQuery ($) и на то, что window.b12 успел загрузиться
		document.addEventListener('DOMContentLoaded', function () {
			if (window.b12) {
				if (window.b12.popup) {
					window.b12.popup.init()
				}
				if (window.b12.banner) {
					window.b12.banner.init()
				}
			}
		})

// защита: платформенный скрипт b12 (аналитика/__CLIENT_UID__) может падать
		// при локальном запуске вне хостинга b12.io - оборачиваем в try/catch,
		// чтобы ошибка не прерывала выполнение остальных скриптов на странице
		try {
			!function (b12) { var e = b12.createElement("script"), t = b12.getElementsByTagName("script")[0]; e.async = 1, e.src = "//cdn.b12.io/prod_traffic/global.js", t.parentNode.insertBefore(e, t) }(document);
		} catch (err) {
			console.warn('b12 global.js не был загружен:', err);
		}
	
// защита: ./js/api.js доступен только на хостинге b12.io,
		// локально файла может не быть - грузим его вручную и ловим ошибку 404,
		// чтобы браузер не пытался выполнить html-страницу ошибки как JS
		(function () {
			var s = document.createElement('script');
			s.src = './js/api.js';
			s.async = true;
			s.onerror = function () {
				console.warn('./js/api.js не найден (нормально при локальном запуске вне b12.io)');
			};
			document.head.appendChild(s);
		})();

    window.addEventListener('load', () => {
			// защита: полная опциональная цепочка на случай,
			// если window.b12 / nextSteps / parseUrlParams не определены
			const toastMessage = window.b12?.nextSteps?.parseUrlParams?.()?.toastMessage;

			if (window.b12 && toastMessage) {
				window.b12.toastNotification?.show(toastMessage);
			}
		})

// защита: проверяем, что оба элемента реально найдены на странице
		const burger = document.getElementById("sb-mobile-nav-btn");
		const nav = document.getElementById("sb-nav-ae5b5476-4f27-469c-b18d-a0abe38b832f");

		if (burger && nav) {
			burger.addEventListener("click", () => {
				nav.classList.toggle("active");
			});
		}

// Кнопка "Наверх" появляется при скролле вниз и плавно скроллит страницу вверх при клике
// защита: проверяем, что кнопка реально найдена на странице
		const backToTop = document.getElementById('backToTop');

		if (backToTop) {
			window.addEventListener('scroll', () => {
				if (window.scrollY > 500) {
					backToTop.classList.add('show');
				} else {
					backToTop.classList.remove('show');
				}
			});

			backToTop.addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			});
		}
// скролл к определенному месту на странице при клике на ссылку с якорем

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 0;

  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 0; 
  // -20px — небольшой дополнительный отступ, можно убрать или изменить

  window.scrollTo({ top, behavior: 'smooth' });
}


document.querySelectorAll('.apprent').forEach(el => {
  el.addEventListener('click', () => scrollToSection(el.dataset.id));
});

// синхронизация элементов на SVG-плане

document.querySelectorAll('.apprent').forEach(shape => {
	shape.addEventListener('mouseenter', () => {
		const id = shape.getAttribute('data-id');
		document.querySelectorAll(`.apprent[data-id="${id}"]`)
			.forEach(el => el.classList.add('hovered'));
	});

	shape.addEventListener('mouseleave', () => {
		const id = shape.getAttribute('data-id');
		document.querySelectorAll(`.apprent[data-id="${id}"]`)
			.forEach(el => el.classList.remove('hovered'));
	});
});

const data = {
  
  chervona_ruta: {
    title: 'Будинок "Червона Рута"',
    scrollTo: "chervona_ruta"  
  },
  edelveys: {
    title: 'Апартаменти "Едельвейс"',
    scrollTo: "edelveys" 
  },
  sakura: {
    title: 'Апартаменти "Сакура"',
    scrollTo: "sakura"  
  },
  magnolia: {
    title: 'Апартаменти "Магнолія"',
    scrollTo: "magnolia"  
  },
  shaphran: {
    title: 'Будинок "Шафран"',
    scrollTo: "shaphran"  
  },
  houses: {
	title: 'Будинки',
	scrollTo: "houses"  
  },
  location: {
	title: 'Локация',
	scrollTo: "location"  
  },
  contact: {
	title: 'Контакты',
	scrollTo: "contact"  
  }
}


    