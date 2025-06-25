const gallery = document.getElementById('gallery');

// img
const imageFilenames = [
  'after_doingBussines.jpg',
  'bussines_linkup_with_tonevbros.jpg',
  'bussines_nbaStar.jpg',
  'bussines_hari.jpg',
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
  'after_doingBussines.jpg': 'After making a huge business deal with partners',
  'bussines_linkup_with_tonevbros.jpg': 'Occasional business linkup with friends',
  'bussines_nbaStar.jpg': 'Business with future promising NBA star',
  'bussines_hari.jpg': 'Networking with a friend who is a drink service specialist',
  'bussines_dinner_with_bros.jpg': 'Late night dinner with potential partners',
  'official_wbro.jpg': 'Entering a huge business gathering',
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
  'doggo1.jpg': 'Just my dog',
  'doggo2.jpg': 'Just my dog pt2',
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
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      const newestRepo = {
        name: 'Web-design',
        html_url: 'https://github.com/Eazy-A/Web-design',
        description: 'Latest web design project',
      };
      if (!repos.some(r => r.name === 'Web-design')) {
        repos.unshift(newestRepo);
      }
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
      const card = document.createElement('div');
      card.className = 'repo-card';
      card.innerHTML = `
        <a href="https://github.com/Eazy-A/Web-design" target="_blank" rel="noopener" style="font-weight:bold; color:#4f8cff; text-decoration:none; font-size:1.1rem;">Web-design</a>
        <p style="margin:0.5rem 0 0 0; color:#333;">Latest web design project</p>
      `;
      githubReposContainer.appendChild(card);
    });
// spotify
const spotifyEmbed = document.getElementById('spotify-embed');
const spotifyPlaylists = [
  {
    title: 'classical asf',
    url: 'https://open.spotify.com/embed/playlist/07A4urNoMiGUDMHOVQtUDZ',
  },
  {
    title: 'turn up',
    url: 'https://open.spotify.com/embed/playlist/34ZCkc9nhjQwrZtR8K8u0b',
  },
  {
    title: 'realMusic',
    url: 'https://open.spotify.com/embed/playlist/5qHg6oKvOkhjQzxGeUSzHI',
  },
  {
    title: 'opium',
    url: 'https://open.spotify.com/embed/playlist/46tU78K2CYyUDGnWAkp48g',
  },
  {
    title: 'thrifted',
    url: 'https://open.spotify.com/embed/playlist/1hbRabzfSyS1b6H5Pts5Pj',
  },
  {
    title: 'dripActivator 💧',
    url: 'https://open.spotify.com/embed/playlist/5xHPLVPz0YhT7VbZuMjNTH',
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
// back to top button
const backToTopBtn = document.getElementById('backToTopBtn');

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
      detailDesc.textContent = 'I was born in 2005 in Stip, a town in eastern Macedonia.';
      imageDetailSection.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  }
}

const eduSection = document.getElementById('education');
if (eduSection) {
  const eduImgs = eduSection.querySelectorAll('.edu-img');
  const eduDescriptions = [
    'I finished Slavco Stojmenski high school. In Macedonia this type of high school is called gymnasium',
    'A picture of me and my classmates at the end of year 3',
    'With classmates chillin\'',
      'And recently I\'ve finished my first year of undergraduate studies at Finki'
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
