let tl = gsap.timeline({defaults: {ease: "power1.out"}});

tl.to('.text-content', {x: 0, duration: 0.8})
  .from('.intro .intro-slider',{x: '100%', duration: 1.5})
  .to('.intro', {x: '-100%', duration: 0.8},'-=1.2')
  .to('.text-content', {opacity: 0, duration:0.3},'-=1.2');