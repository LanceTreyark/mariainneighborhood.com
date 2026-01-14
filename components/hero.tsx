<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hero</title>

  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>

<body class="overflow-x-hidden">

<section class="relative flex min-h-[80vh] items-center overflow-hidden pt-12">

  <!-- Background -->
  <div class="absolute inset-0 z-0">
    <img
      src="https://dezcord.com/resources/min/hero.jpg"
      alt="La Jolla aerial view"
      class="h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
  </div>

  <!-- Content -->
  <div class="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6">

    <!-- Maria Image -->
    <div id="maria" class="relative z-10 pointer-events-none">
      <div
        class="
          relative
          -ml-52 sm:-ml-52 md:-ml-[150px] lg:ml-0
          h-[620px] w-[420px]  
          sm:h-[620px] sm:w-[420px]
          md:h-[735px] md:w-[455px]
          lg:h-[875px] lg:w-[525px]
          overflow-hidden
          [mask-image:linear-gradient(to_bottom,black_30%,rgba(0,0,0,0.6)_60%,transparent)]
        "
      >
        <img
          src="https://dezcord.com/resources/min/mariaUmbrella.png"
          alt="Maria"
          class="h-full w-full object-contain"
        />
      </div>
    </div>

    <!-- Logo -->
    <div class="flex items-center justify-center text-center lg:justify-start lg:text-left">
      <div
        id="logo" 
        class="relative 
        h-50 w-[260px] 
        ml-[-130px] sm:-ml-40 md:-ml-49 lg:-ml-11 
        sm:h-50 sm:w-[500px] 
        md:h-56 md:w-[560px] "
      >
        <img
          src="https://dezcord.com/resources/min/logo.png"
          alt="Maria in the Neighborhood"
          class="h-full w-full object-contain"
        />
      </div>
    </div>

  </div>
</section>

<script>
  gsap.from("#maria", {
    opacity: 0,
    x: -40,
    duration: 0.8,
    ease: "power2.out"
  });

  gsap.from("#logo", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: "power2.out"
  });
</script>

</body>
</html>
