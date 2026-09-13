// Locally generated from the original project videos. Keeping these files in the
// site avoids unreliable remote thumbnail URLs and makes hover playback immediate.
const PROJECT_MEDIA = {
  "Dharamshala — The Lost Lhasa": { thumbnail: "assets/project-media/dharamshala.jpg", youtubePreview: "https://www.youtube-nocookie.com/embed/pVFX11OuAqU?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1" },
  "LaFetch — Ore Ofe": { thumbnail: "assets/project-media/ore-ofe.jpg", preview: "assets/project-media/ore-ofe.mp4" },
  "LaFetch — Sam & Marshall": { thumbnail: "assets/project-media/sam-marshall.jpg", preview: "assets/project-media/sam-marshall.mp4" },
  "LaFetch — Dusala": { thumbnail: "assets/project-media/dusala.jpg", preview: "assets/project-media/dusala.mp4" },
  "LaFetch — Streetwear Edit": { thumbnail: "assets/project-media/streetwear.jpg", preview: "assets/project-media/streetwear.mp4" },
  "LaFetch — Pop-up Event": { thumbnail: "assets/project-media/popup-event.jpg", preview: "assets/project-media/popup-event.mp4" },
  "VENQ at Dubai": { thumbnail: "assets/project-media/venq-dubai.jpg", preview: "assets/project-media/venq-dubai.mp4" },
  "Music Video": { thumbnail: "assets/project-media/music-video.jpg", preview: "assets/project-media/music-video.mp4" },
  "LaFetch — Spring Summer 2026": { thumbnail: "assets/project-media/spring-summer.jpg", preview: "assets/project-media/spring-summer.mp4" },
  "LaFetch — Evrhood": { thumbnail: "assets/project-media/evrhood.jpg", preview: "assets/project-media/evrhood.mp4" },
  "Magical Hour": { thumbnail: "assets/project-media/magical-hour.jpg", preview: "assets/project-media/magical-hour.mp4" },
  "The Flow": { thumbnail: "assets/project-media/the-flow.jpg", preview: "assets/project-media/the-flow.mp4" },
  "LaFetch — Campaign": { thumbnail: "assets/project-media/campaign.jpg", preview: "assets/project-media/campaign.mp4" },
  "LaFetch — L'avenir Skins": { thumbnail: "assets/project-media/avenir-skins.jpg", preview: "assets/project-media/avenir-skins.mp4" },
  "LaFetch — Nauvab": { thumbnail: "assets/project-media/nauvab.jpg", preview: "assets/project-media/nauvab.mp4" }
};

PROJECTS.forEach(project => Object.assign(project, PROJECT_MEDIA[project.title] || {}));
