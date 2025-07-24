class ParallaxController {
  constructor() {
    this.silhouettes = document.querySelectorAll('.parallax-silhouette');
    this.init();
  }

  init() {
    if (!this.silhouettes.length) {
      console.error('Parallax silhouette elements not found');
      return;
    }

    this.updateSilhouettePositions();

    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;

      this.silhouettes.forEach((silhouette, index) => {
        let parallaxSpeed;
        let initialOffset = 0;

        if (index === 0) {
          parallaxSpeed = 1.2;
        } else {
          if (index === 1) {
            parallaxSpeed = 1.4;
          } else {
            parallaxSpeed = 1.2 + ((index - 2) * 0.1);
          }

          const currentTop = parseInt(silhouette.style.top) || 0;
          initialOffset = currentTop;
        }

        const yPos = initialOffset - (scrolled * parallaxSpeed);
        silhouette.style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });

    window.addEventListener('resize', () => {
      this.updateSilhouettePositions();
    });

    updateParallax();
  }

  updateSilhouettePositions() {
    const pressSection = document.getElementById('press');
    const videosSection = document.getElementById('videos');

    if (pressSection) {
      const pressOffset = pressSection.offsetTop;

      const cesarSilhouette = document.querySelector('.parallax-silhouette-3');
      if (cesarSilhouette) {
        cesarSilhouette.style.top = `${pressOffset - 900}px`;
      }

      const mattSilhouette = document.querySelector('.parallax-silhouette-4');
      if (mattSilhouette) {
        mattSilhouette.style.top = `${pressOffset - 650}px`;
      }
    }

    if (videosSection) {
      const videosOffset = videosSection.offsetTop;
      const stasSilhouette = document.querySelector('.parallax-silhouette-2');
      if (stasSilhouette) {
        stasSilhouette.style.top = `${videosOffset - 300}px`;
      }
    }
  }
}

export default ParallaxController;
