const gallery = document.getElementById('gallery');

// img
const imageFilenames = [
  'after_doingBussines.jpg',
  'bussines_linkup_with_tonevbros.jpg',
  'big_bussines_event.jpg',
  'bussines_nbaStar.jpg',
  'bussines_hari.jpg',
  'bussines_meeting_onthetree.jpg',
  'bussines_dinner_with_bros.jpg',
  'official_wbro.jpg',
];

gallery.innerHTML = '';
imageFilenames.forEach(filename => {
  const container = document.createElement('div');
  container.className = 'gallery-img-container';
  const img = document.createElement('img');
  img.src = `images/${filename}`;
  img.alt = filename.split('.')[0].replace(/_/g, ' ');
  const hoverText = document.createElement('div');
  hoverText.className = 'gallery-hover-text';
  hoverText.textContent = 'Click for details';
  container.appendChild(img);
  container.appendChild(hoverText);
  container.addEventListener('click', () => {
    detailImg.src = img.src;
    detailImg.alt = img.alt;
    detailDesc.textContent = imageDescriptions[img.src.split('/').pop()] || '';
    imageDetailSection.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  gallery.appendChild(container);
});

// desc
const imageDescriptions = {
  'after_doingBussines.jpg': 'After doing business with partners.',
  'bussines_linkup_with_tonevbros.jpg': 'Business linkup with Tonev Bros.',
  'big_bussines_event.jpg': 'Big business event.',
  'bussines_nbaStar.jpg': 'Business with NBA star.',
  'bussines_hari.jpg': 'Business with Hari.',
  'bussines_meeting_onthetree.jpg': 'Business meeting on the tree.',
  'bussines_dinner_with_bros.jpg': 'Business dinner with bros.',
  'official_wbro.jpg': 'Official WBRO event.',
};

const imageDetailSection = document.getElementById('image-detail');
const detailImg = document.getElementById('detail-img');
const detailDesc = document.getElementById('detail-desc');
const closeDetailBtn = document.getElementById('close-detail');

closeDetailBtn.addEventListener('click', () => {
  imageDetailSection.style.display = 'none';
  detailImg.src = '';
  detailDesc.textContent = '';
  document.body.style.overflow = '';
});

// doggo
const dogGallery = document.getElementById('dog-gallery-images');
const dogImages = [
  'doggo1.jpg',
  'doggo2.jpg',
];
const dogDescriptions = {
  'doggo1.jpg': 'Doggo 1 at the meeting.',
  'doggo2.jpg': 'Doggo 2 enjoying the event.',
};
dogGallery.innerHTML = '';
dogImages.forEach(filename => {
  const container = document.createElement('div');
  container.className = 'gallery-img-container';
  const img = document.createElement('img');
  img.src = `images/${filename}`;
  img.alt = filename.split('.')[0].replace(/_/g, ' ');
  const hoverText = document.createElement('div');
  hoverText.className = 'gallery-hover-text';
  hoverText.textContent = 'Click for details';
  container.appendChild(img);
  container.appendChild(hoverText);
  container.addEventListener('click', () => {
    detailImg.src = img.src;
    detailImg.alt = img.alt;
    detailDesc.textContent = dogDescriptions[filename] || '';
    imageDetailSection.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  dogGallery.appendChild(container);
});

const githubUsername = 'Eazy-A';
const githubReposContainer = document.getElementById('github-repos');

fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => response.json())
    .then(repos => {
      githubReposContainer.innerHTML = '';
      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener" style="font-weight:bold; color:#4f8cff; text-decoration:none; font-size:1.1rem;">${repo.name}</a>
        <p style="margin:0.5rem 0 0 0; color:#333;">${repo.description ? repo.description : ''}</p>
      `;
        githubReposContainer.appendChild(card);
      });
      if (repos.length === 0) {
        githubReposContainer.innerHTML = '<p>No repositories found.</p>';
      }
    })
    .catch(() => {
      githubReposContainer.innerHTML = '<p>Could not load repositories.</p>';
    });
// spotify
const spotifyEmbed = document.getElementById('spotify-embed');
const spotifyPlaylists = [
  {
    title: 'classical asf',
    url: 'https://open.spotify.com/embed/playlist/07A4urNoMiGUDMHOVQtUDZ?utm_source=generator',
  },
  {
    title: '.real',
    url: 'https://open.spotify.com/embed/playlist/5qHg6oKvOkhjQzxGeUSzHI?utm_source=generator',
  },
  {
    title: '.opium',
    url: 'https://open.spotify.com/embed/playlist/46tU78K2CYyUDGnWAkp48g?utm_source=generator',
  },
  {
    title: 'turn up',
    url: 'https://open.spotify.com/embed/playlist/34ZCkc9nhjQwrZtR8K8u0b?utm_source=generator',
  },
  {
    title: '.thrifted',
    url: 'https://open.spotify.com/embed/playlist/1hbRabzfSyS1b6H5Pts5Pj?utm_source=generator',
  },
];
spotifyEmbed.innerHTML = `<div class="spotify-playlists-grid">` +
  spotifyPlaylists.map(pl => `
    <div class="spotify-playlist-block">
      <div class="spotify-playlist-title">${pl.title}</div>
      <iframe style="border-radius:12px" src="${pl.url}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  `).join('') +
  `</div>`;

// Back to Top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

// Smooth scroll with offset for nav links
const navLinks = document.querySelectorAll('.nav-links a');
const logo = document.querySelector('.logo');
if (logo) {
  logo.style.cursor = 'pointer';
  logo.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const yOffset = -60; // Offset in px
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
  // Highlight nav link for section in view
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
};
backToTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- Biography Section: Add hover overlay and click for details ---
const bioSection = document.getElementById('biography');
if (bioSection) {
  const bioImg = bioSection.querySelector('.bio-img');
  if (bioImg) {
    const container = document.createElement('div');
    container.className = 'gallery-img-container';
    const hoverText = document.createElement('div');
    hoverText.className = 'gallery-hover-text';
    hoverText.textContent = 'Click for details';
    bioImg.parentNode.insertBefore(container, bioImg);
    container.appendChild(bioImg);
    container.appendChild(hoverText);
    container.addEventListener('click', () => {
      detailImg.src = bioImg.src;
      detailImg.alt = bioImg.alt;
      detailDesc.textContent = 'Shtip Ago 3';
      imageDetailSection.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }
}

// --- Education Section: Add hover overlay and click for details ---
const eduSection = document.getElementById('education');
if (eduSection) {
  const eduImgs = eduSection.querySelectorAll('.edu-img');
  const eduDescriptions = [
    'Slavco Stojmenski',
    'The Best Class',
    'With Classmates',
  ];
  eduImgs.forEach((img, idx) => {
    const container = document.createElement('div');
    container.className = 'gallery-img-container';
    const hoverText = document.createElement('div');
    hoverText.className = 'gallery-hover-text';
    hoverText.textContent = 'Click for details';
    img.parentNode.insertBefore(container, img);
    container.appendChild(img);
    container.appendChild(hoverText);
    container.addEventListener('click', () => {
      detailImg.src = img.src;
      detailImg.alt = img.alt;
      detailDesc.textContent = eduDescriptions[idx] || '';
      if (img.src.includes('finkipic.png')) {
        detailImg.classList.add('finki-detail');
      } else {
        detailImg.classList.remove('finki-detail');
      }
      imageDetailSection.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
}
