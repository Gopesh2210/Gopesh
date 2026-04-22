
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

		// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

		// Dark Mode toggler
		$('input[type="checkbox"]').click(function(){
			if($(this).prop("checked") == true){
				toggleDarkMode();
			}
			else if($(this).prop("checked") == false){
				toggleLightMode();
			}
		});

	// Professional experience — modal dialogs + Commure role tabs
	var $openExperienceModal = null;
	var $experienceFocusReturn = null;

	function resetCommureTabs($modal) {
		var $tabs = $modal.find('.exp-tab');
		var $panels = $modal.find('.exp-tabpanel');
		$tabs.removeClass('is-active').attr('aria-selected', 'false');
		$tabs.first().addClass('is-active').attr('aria-selected', 'true');
		$panels.prop('hidden', true).removeClass('is-active');
		$panels.first().prop('hidden', false).addClass('is-active');
	}

	function closeExperienceModal() {
		if (!$openExperienceModal || !$openExperienceModal.length)
			return;
		$openExperienceModal.removeClass('is-open').prop('hidden', true);
		$body.removeClass('exp-modal-open');
		$('[data-exp-modal]').attr('aria-expanded', 'false');
		if ($experienceFocusReturn && $experienceFocusReturn.length)
			$experienceFocusReturn.trigger('focus');
		$openExperienceModal = null;
		$experienceFocusReturn = null;
	}

	function openExperienceModal(modalId) {
		var $modal = $('#' + modalId);
		if ($modal.length < 1)
			return;

		if ($openExperienceModal && $openExperienceModal.length) {
			$openExperienceModal.removeClass('is-open').prop('hidden', true);
			$body.removeClass('exp-modal-open');
			$('[data-exp-modal]').attr('aria-expanded', 'false');
			$openExperienceModal = null;
		}

		$experienceFocusReturn = $(document.activeElement);

		$modal.prop('hidden', false).addClass('is-open');
		$body.addClass('exp-modal-open');
		$('[data-exp-modal="' + modalId + '"]').attr('aria-expanded', 'true');
		$openExperienceModal = $modal;

		if (modalId === 'modal-exp-commure')
			resetCommureTabs($modal);

		window.setTimeout(function() {
			$modal.find('.exp-modal__close').first().trigger('focus');
		}, 50);
	}

	$(document).on('click', '[data-exp-modal]', function() {
		var id = $(this).attr('data-exp-modal');
		openExperienceModal(id);
	});

	$(document).on('click', '.exp-modal__backdrop, .exp-modal__close', function() {
		closeExperienceModal();
	});

	$(document).on('keydown', function(e) {
		if (e.key === 'Escape' && $openExperienceModal && $openExperienceModal.length)
			closeExperienceModal();
	});

	$(document).on('click', '#modal-exp-commure .exp-tab', function() {
		var $btn = $(this);
		var paneId = $btn.attr('data-exp-tab');
		var $modal = $('#modal-exp-commure');
		if (!paneId || !$modal.length)
			return;
		$modal.find('.exp-tab').removeClass('is-active').attr('aria-selected', 'false');
		$modal.find('.exp-tabpanel').prop('hidden', true).removeClass('is-active');
		$btn.addClass('is-active').attr('aria-selected', 'true');
		$('#' + paneId).prop('hidden', false).addClass('is-active');
	});

})(jQuery);


// toggle dark mode
function toggleDarkMode() {
	var mainbody = document.getElementById("main");
	mainbody.classList.add("dark-mode");
	mainbody.classList.remove("light-mode");

	var showmore = document.getElementById("show-more");
	showmore.classList.add("dark-mode");
	showmore.classList.remove("light-mode");
	
 }

// toggle light mode
 function toggleLightMode() {
	var mainbody = document.getElementById("main");
	mainbody.classList.add("light-mode");
	mainbody.classList.remove("dark-mode");

	var showmore = document.getElementById("show-more");
	showmore.classList.add("light-mode");
	showmore.classList.remove("dark-mode");

 }