// Minimal site JS: set current year in footer if needed
// Set current year in footer and add scroll reveal
(function(){
	document.documentElement.classList.add('js');
	try{
		var y=new Date().getFullYear();
		var footer=document.querySelector('.site-footer p');
		if(footer && !footer.textContent.includes(String(y))){
			footer.innerHTML = footer.innerHTML.replace(/©.*?•/, '© '+y+' •');
		}
	}catch(e){console.error(e)}

	// Smooth scroll for anchor links
	document.addEventListener('click', function(e){
		var a = e.target.closest('a[href^="#"]');
		if(!a) return;
		e.preventDefault();
		var tgt = document.querySelector(a.getAttribute('href'));
		if(tgt) tgt.scrollIntoView({behavior:'smooth'});
	});

	// IntersectionObserver reveal for elements with .reveal
	try{
		var observer = new IntersectionObserver(function(entries){
			entries.forEach(function(entry){
				if(entry.isIntersecting){
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		},{threshold:0.12});
		document.querySelectorAll('.reveal').forEach(function(el){observer.observe(el)});
	}catch(e){/* graceful fallback */}

  // Mobile nav toggle
  try{
    var navToggle = document.getElementById('nav-toggle');
    var siteNav = document.getElementById('site-nav');
    if(navToggle && siteNav){
      navToggle.addEventListener('click', function(){
        var open = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // Close nav when a link is clicked
      siteNav.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          if(siteNav.classList.contains('open')){ siteNav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false'); }
        });
      });
      // Close on outside click
      document.addEventListener('click', function(e){
        if(!siteNav.contains(e.target) && !navToggle.contains(e.target) && siteNav.classList.contains('open')){
          siteNav.classList.remove('open'); navToggle.setAttribute('aria-expanded','false');
        }
      });
    }
  }catch(e){/* ignore */}

	// Image debug: mark broken images and log natural sizes
	try{
		document.querySelectorAll('img').forEach(function(img){
			// If already loaded, check naturalWidth
			function mark(){
				if(img.naturalWidth && img.naturalHeight){
					console.log('IMG OK:', img.src, img.naturalWidth+'x'+img.naturalHeight);
				} else {
					img.classList.add('img-broken');
					console.warn('IMG BROKEN:', img.src);
				}
			}
			img.addEventListener('load', mark);
			img.addEventListener('error', function(){ img.classList.add('img-broken'); console.warn('IMG ERROR:', img.src); });
			if(img.complete) mark();
		});
	}catch(e){console.error(e)}

})();
